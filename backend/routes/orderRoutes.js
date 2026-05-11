import express from 'express';
import {
  createOrder, getMyOrders, getOrder,
  getAllOrders, updateOrderStatus
} from '../controllers/orderController.js';
import { protect, staffAndAbove } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/all', protect, staffAndAbove, getAllOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, staffAndAbove, updateOrderStatus);

export default router;
