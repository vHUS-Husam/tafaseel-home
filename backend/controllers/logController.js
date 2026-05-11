import { Log } from '../models/index.js';

export const getLogs = async (req, res, next) => {
  try {
    const { action, page = 1, limit = 50 } = req.query;
    const query = {};
    if (action) query.action = action;

    const logs = await Log.find(query)
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Log.countDocuments(query);
    res.status(200).json({ success: true, logs, totalPages: Math.ceil(count / limit), total: count });
  } catch (error) { next(error); }
};

export const getLogStats = async (req, res, next) => {
  try {
    const stats = await Log.aggregate([
      { $group: { _id: '$action', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.status(200).json({ success: true, stats });
  } catch (error) { next(error); }
};
