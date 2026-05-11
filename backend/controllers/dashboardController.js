import { User, Product, Order, Message, Review, Log } from '../models/index.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();
    const totalMessages = await Message.countDocuments({ isRead: false });
    const totalReviews = await Review.countDocuments();

    const ordersToday = await Order.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    const revenue = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'on-delivery'] } } },
      { $group: { _id: null, total: { $sum: '$finalPrice' } } }
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    const recentLogs = await Log.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(20);

    const monthlySales = await Order.aggregate([
      { $match: { status: { $in: ['delivered', 'on-delivery'] } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          total: { $sum: '$finalPrice' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 12 }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers, totalProducts, totalOrders, totalMessages,
        totalReviews, ordersToday, totalRevenue: revenue[0]?.total || 0
      },
      recentOrders, recentLogs, monthlySales
    });
  } catch (error) { next(error); }
};
