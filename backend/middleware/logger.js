import { Log } from '../models/index.js';

export const createLog = async (action, details, req, user = null, metadata = {}) => {
  try {
    await Log.create({
      user: user?._id || null,
      userEmail: user?.email || req.body?.email || 'anonymous',
      action,
      details,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      metadata
    });
  } catch (error) {
    console.error('Logging error:', error);
  }
};
