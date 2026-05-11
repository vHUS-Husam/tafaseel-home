import express from 'express';
import { getLogs, getLogStats } from '../controllers/logController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, adminOnly, getLogs);
router.get('/stats', protect, adminOnly, getLogStats);

export default router;
