import express from 'express';
import { createReview, getProductReviews, deleteReview } from '../controllers/reviewController.js';
import { protect, staffAndAbove } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/product/:productId', getProductReviews);
router.delete('/:id', protect, staffAndAbove, deleteReview);

export default router;
