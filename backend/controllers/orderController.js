import { Order, Product, User, Notification } from '../models/index.js';
import { sendOrderNotification } from '../config/email.js';
import { createLog } from '../middleware/logger.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, notes } = req.body;
    let totalPrice = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `المنتج ${item.name} غير متوفر بالكمية المطلوبة` });
      }
      totalPrice += product.finalPrice * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      notes,
      totalPrice,
      finalPrice: totalPrice,
      statusHistory: [{ status: 'pending', note: 'تم إنشاء الطلب' }]
    });

    await sendOrderNotification(req.user.email, order);
    await Notification.create({
      type: 'order',
      title: 'طلب جديد',
      message: `طلب جديد #${order.orderNumber}`,
      link: `/admin/orders/${order._id}`
    });

    await createLog('order_created', `إنشاء طلب: ${order.orderNumber}`, req, req.user, { orderId: order._id });
    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name images slug')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id })
      .populate('items.product', 'name images slug');
    if (!order) {
      return res.status(404).json({ success: false, message: 'الطلب غير موجود' });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments(query);
    res.status(200).json({ success: true, orders, totalPages: Math.ceil(count / limit), total: count });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'الطلب غير موجود' });
    }

    order.status = status;
    order.statusHistory.push({ status, note, date: new Date() });

    if (status === 'delivered') {
      order.isPaid = true;
      order.paidAt = new Date();
      order.deliveredAt = new Date();
    }

    await order.save();
    await createLog('order_updated', `تحديث حالة الطلب ${order.orderNumber} إلى ${status}`, req, req.user, { orderId: order._id });
    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};
