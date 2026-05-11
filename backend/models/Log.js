import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  userEmail: {
    type: String,
    required: false
  },
  action: {
    type: String,
    required: true,
    enum: [
      'login', 'logout', 'register', 'password_reset', 'email_verified',
      'product_created', 'product_updated', 'product_deleted',
      'category_created', 'category_updated', 'category_deleted',
      'order_created', 'order_updated', 'order_cancelled',
      'review_created', 'review_deleted',
      'settings_updated', 'user_updated', 'role_changed',
      'message_received', 'message_read'
    ]
  },
  details: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  userAgent: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { timestamps: true });

logSchema.index({ createdAt: -1 });
logSchema.index({ action: 1 });
logSchema.index({ user: 1 });

const Log = mongoose.model('Log', logSchema);
export default Log;
