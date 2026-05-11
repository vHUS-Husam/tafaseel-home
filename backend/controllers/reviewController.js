import { Review, Product } from '../models/index.js';
import { createLog } from '../middleware/logger.js';

export const createReview = async (req, res, next) => {
  try {
    const { product, rating, comment } = req.body;
    const review = await Review.create({ user: req.user.id, product, rating, comment });

    const reviews = await Review.find({ product });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(product, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews: reviews.length
    });

    await createLog('review_created', `تقييم جديد للمنتج ${product}`, req, req.user);
    res.status(201).json({ success: true, review });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'لقد قمت بتقييم هذا المنتج مسبقاً' });
    }
    next(error);
  }
};

export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId, isApproved: true })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'التقييم غير موجود' });
    }

    await review.deleteOne();
    const reviews = await Review.find({ product: review.product });
    const avgRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;

    await Product.findByIdAndUpdate(review.product, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews: reviews.length
    });

    await createLog('review_deleted', `حذف تقييم: ${req.params.id}`, req, req.user);
    res.status(200).json({ success: true, message: 'تم حذف التقييم' });
  } catch (error) {
    next(error);
  }
};
