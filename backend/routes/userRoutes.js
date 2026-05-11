import express from 'express';
import { getUsers, getUser, updateUserRole, toggleUserStatus, addToWishlist } from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, adminOnly, getUser);
router.put('/:id/role', protect, adminOnly, updateUserRole);
router.put('/:id/toggle-status', protect, adminOnly, toggleUserStatus);
router.put('/wishlist/:productId', protect, addToWishlist);

export default router;
