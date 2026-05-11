import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'غير مصرح، يرجى تسجيل الدخول' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'المستخدم غير موجود' });
    }

    if (!req.user.isActive) {
      return res.status(401).json({ success: false, message: 'الحساب معطل' });
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'غير مصرح، يرجى تسجيل الدخول' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'غير مصرح بالوصول' });
    }
    next();
  };
};

export const adminOnly = authorize('admin');
export const staffAndAbove = authorize('admin', 'staff');
