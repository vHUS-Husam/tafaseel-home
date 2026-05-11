import { Message, Notification } from '../models/index.js';
import { createLog } from '../middleware/logger.js';

export const createMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const msg = await Message.create({ name, email, phone, subject, message });

    await Notification.create({
      type: 'message',
      title: 'رسالة جديدة',
      message: `${name}: ${subject}`,
      link: '/admin/messages'
    });

    await createLog('message_received', `رسالة جديدة من ${email}: ${subject}`, req);
    res.status(201).json({ success: true, message: 'تم إرسال رسالتك بنجاح', data: msg });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { isRead, page = 1, limit = 20 } = req.query;
    const query = {};
    if (isRead !== undefined) query.isRead = isRead === 'true';

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Message.countDocuments(query);
    res.status(200).json({ success: true, messages, totalPages: Math.ceil(count / limit), total: count });
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'الرسالة غير موجودة' });
    }
    if (!message.isRead) {
      message.isRead = true;
      message.readAt = new Date();
      message.readBy = req.user.id;
      await message.save();
      await createLog('message_read', `قراءة رسالة: ${message.subject}`, req, req.user);
    }
    res.status(200).json({ success: true, message: message });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'تم حذف الرسالة' });
  } catch (error) {
    next(error);
  }
};
