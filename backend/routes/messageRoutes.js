import express from 'express';
import { createMessage, getMessages, getMessage, deleteMessage } from '../controllers/messageController.js';
import { protect, staffAndAbove } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/', protect, staffAndAbove, getMessages);
router.get('/:id', protect, staffAndAbove, getMessage);
router.delete('/:id', protect, staffAndAbove, deleteMessage);

export default router;
