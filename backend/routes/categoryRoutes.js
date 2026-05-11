import express from 'express';
import {
  getCategories, getCategory, createCategory,
  updateCategory, deleteCategory
} from '../controllers/categoryController.js';
import { protect, staffAndAbove, adminOnly } from '../middleware/auth.js';
import { uploadCategoryImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug', getCategory);
router.post('/', protect, adminOnly, uploadCategoryImage, createCategory);
router.put('/:id', protect, adminOnly, uploadCategoryImage, updateCategory);
router.delete('/:id', protect, adminOnly, deleteCategory);

export default router;
