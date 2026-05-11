import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/index.js';
import { sendVerificationEmail, sendResetPasswordEmail } from '../config/email.js';
import { createLog } from '../middleware/logger.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
        address: user.address
      }
    });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'هذا البريد مسجل مسبقاً' });
    }

    const user = await User.create({ name, email, phone, password });
    const verifyToken = user.getVerificationToken();
    await user.save({ validateBeforeSave: false });

    await sendVerificationEmail(email, verifyToken);
    await createLog('register', `تسجيل حساب جديد: ${email}`, req, user);

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'يرجى إدخال البريد وكلمة المرور' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      await createLog('login', `محاولة تسجيل دخول فاشلة: ${email}`, req);
      return res.status(401).json({ success: false, message: 'بيانات الدخول غير صحيحة' });
    }

    if (!user.isActive) {
      return res.status(401).json({ success: false, message: 'الحساب معطل' });
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    await createLog('login', `تسجيل دخول ناجح: ${email}`, req, user);
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await createLog('logout', `تسجيل خروج: ${req.user.email}`, req, req.user);
    res.cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
    res.status(200).json({ success: true, message: 'تم تسجيل الخروج بنجاح' });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address } = req.body;
    const updateData = { name, phone };
    if (address) updateData.address = address;

    if (req.file) {
      updateData.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
    await createLog('user_updated', `تحديث الملف الشخصي: ${user.email}`, req, user);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select('+password');

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ success: false, message: 'كلمة المرور الحالية غير صحيحة' });
    }

    user.password = newPassword;
    await user.save();
    await createLog('password_reset', 'تغيير كلمة المرور', req, user);
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'لا يوجد حساب بهذا البريد' });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    await sendResetPasswordEmail(email, resetToken);
    await createLog('password_reset', `طلب إعادة تعيين كلمة المرور: ${email}`, req, user);

    res.status(200).json({ success: true, message: 'تم إرسال رابط إعادة التعيين إلى بريدك' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'الرابط غير صالح أو منتهي' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    await createLog('password_reset', 'إعادة تعيين كلمة المرور بنجاح', req, user);
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    const verificationToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      verificationToken,
      verificationTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'الرابط غير صالح أو منتهي' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

    await createLog('email_verified', `تأكيد البريد الإلكتروني: ${user.email}`, req, user);
    res.status(200).json({ success: true, message: 'تم تأكيد البريد الإلكتروني بنجاح' });
  } catch (error) {
    next(error);
  }
};

export const resendVerification = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'البريد مؤكد مسبقاً' });
    }
    const verifyToken = user.getVerificationToken();
    await user.save({ validateBeforeSave: false });
    await sendVerificationEmail(user.email, verifyToken);
    res.status(200).json({ success: true, message: 'تم إرسال رابط التأكيد' });
  } catch (error) {
    next(error);
  }
};
