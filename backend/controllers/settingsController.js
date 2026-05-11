import { Setting } from '../models/index.js';
import { createLog } from '../middleware/logger.js';

export const getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) settings = await Setting.create({});
    res.status(200).json({ success: true, settings });
  } catch (error) { next(error); }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    await createLog('settings_updated', 'تحديث إعدادات الموقع', req, req.user);
    res.status(200).json({ success: true, settings });
  } catch (error) { next(error); }
};
