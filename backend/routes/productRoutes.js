import express from 'express';
import {
  getProducts, getProduct, createProduct, updateProduct,
  deleteProduct, getAdminProducts
} from '../controllers/productController.js';
import { protect, staffAndAbove, adminOnly } from '../middleware/auth.js';
import { uploadProductImages } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/admin/all', protect, staffAndAbove, getAdminProducts);
router.get('/:slug', getProduct);
router.post('/', protect, staffAndAbove, uploadProductImages, createProduct);
router.put('/:id', protect, staffAndAbove, uploadProductImages, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
