import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Filter, Clock, User, Globe, LogIn, LogOut, ShoppingCart, Settings, Shield, AlertTriangle } from 'lucide-react';
import { logAPI } from '../../services/api.js';
import toast from 'react-hot-toast';

const actionIcons = {
  login: LogIn,
  logout: LogOut,
  register: User,
  password_reset: Shield,
  email_verified: Shield,
  product_created: ShoppingCart,
  product_updated: ShoppingCart,
  product_deleted: ShoppingCart,
  order_created: ShoppingCart,
  order_updated: ShoppingCart,
  settings_updated: Settings,
  role_changed: Shield,
  message_received: Activity,
  message_read: Activity,
};

const actionLabels = {
  login: 'تسجيل دخول',
  logout: 'تسجيل خروج',
  register: 'تسجيل حساب',
  password_reset: 'تغيير كلمة المرور',
  email_verified: 'تأكيد بريد',
  product_created: 'إضافة منتج',
  product_updated: 'تعديل منتج',
  product_deleted: 'حذف منتج',
  order_created: 'طلب جديد',
  order_updated: 'تحديث طلب',
  settings_updated: 'تحديث إعدادات',
  role_changed: 'تغيير دور',
  message_received: 'رسالة جديدة',
  message_read: 'قراءة رسالة',
};

const actionColors = {
  login: 'bg-green-100 text-green-700',
  logout: 'bg-gray-100 text-gray-700',
  register: 'bg-blue-100 text-blue-700',
  password_reset: 'bg-orange-100 text-orange-700',
  email_verified: 'bg-emerald-100 text-emerald-700',
  product_created: 'bg-purple-100 text-purple-700',
  product_updated: 'bg-indigo-100 text-indigo-700',
  product_deleted: 'bg-red-100 text-red-700',
  order_created: 'bg-cyan-100 text-cyan-700',
  order_updated: 'bg-teal-100 text-teal-700',
  settings_updated: 'bg-yellow-100 text-yellow-700',
  role_changed: 'bg-pink-100 text-pink-700',
  message_received: 'bg-sky-100 text-sky-700',
  message_read: 'bg-slate-100 text-slate-700',
};

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logsRes, statsRes] = await Promise.all([
        logAPI.getLogs(),
        logAPI.getLogStats(),
      ]);
      setLogs(logsRes.data.logs);
      setStats(statsRes.data.stats);
    } catch (error) {
      toast.error('خطأ في تحميل السجلات');
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = filter
    ? logs.filter((log) => log.action === filter)
    : logs;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">سجل النشاطات</h1>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.slice(0, 8).map((stat, index) => {
            const Icon = actionIcons[stat._id] || Activity;
            return (
              <motion.div
                key={stat._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setFilter(filter === stat._id ? '' : stat._id)}
                className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                  filter === stat._id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${actionColors[stat._id]?.split(' ')[0] || 'bg-gray-100'}`}>
                    <Icon className={`w-5 h-5 ${actionColors[stat._id]?.split(' ')[1] || 'text-gray-600'}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.count}</p>
                    <p className="text-xs text-gray-500">{actionLabels[stat._id] || stat._id}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm"
          >
            <option value="">جميع النشاطات</option>
            {Object.entries(actionLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          {filter && (
            <button onClick={() => setFilter('')} className="text-sm text-red-500 hover:underline">
              مسح الفلتر
            </button>
          )}
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent mx-auto" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">النشاط</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">التفاصيل</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المستخدم</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">IP</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLogs.map((log, index) => {
                    const Icon = actionIcons[log.action] || Activity;
                    return (
                      <motion.tr
                        key={log._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${actionColors[log.action] || 'bg-gray-100 text-gray-700'}`}>
                            <Icon className="w-3 h-3" />
                            {actionLabels[log.action] || log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{log.details}</td>
                        <td className="px-6 py-4 text-sm">
                          <div>
                            <p className="font-medium">{log.user?.name || 'مجهول'}</p>
                            <p className="text-xs text-gray-500">{log.userEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500 font-mono">{log.ip}</td>
                        <td className="px-6 py-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(log.createdAt).toLocaleString('ar-SA')}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {filteredLogs.length === 0 && !loading && (
            <div className="p-12 text-center text-gray-500">لا توجد سجلات</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;
