import { User } from '../models/index.js';
import { createLog } from '../middleware/logger.js';

export const getUsers = async (req, res, next) => {
  try {
    const { role, page = 1, limit = 20, search } = req.query;
    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(query);
    res.status(200).json({ success: true, users, totalPages: Math.ceil(count / limit), total: count });
  } catch (error) { next(error); }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('wishlist');
    if (!user) return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    res.status(200).json({ success: true, user });
  } catch (error) { next(error); }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    await createLog('role_changed', `تغيير دور المستخدم ${user.email} إلى ${role}`, req, req.user);
    res.status(200).json({ success: true, user });
  } catch (error) { next(error); }
};

export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) { next(error); }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.productId;
    if (user.wishlist.includes(productId)) {
      user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    } else {
      user.wishlist.push(productId);
    }
    await user.save();
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) { next(error); }
};
