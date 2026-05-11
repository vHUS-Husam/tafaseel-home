import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { protect, staffAndAbove } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, staffAndAbove, getDashboardStats);

export default router;
