import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Package, ShoppingBag, MessageSquare, TrendingUp, DollarSign, Activity, BarChart3 } from 'lucide-react';
import { dashboardAPI } from '../../services/api.js';
import toast from 'react-hot-toast';

const StatCard = ({ title, value, icon: Icon, color, link }) => (
  <Link to={link}>
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await dashboardAPI.getStats();
        setStats(data);
      } catch (error) {
        toast.error('خطأ في تحميل الإحصائيات');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">لوحة التحكم</h1>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="المستخدمين" value={stats?.stats?.totalUsers || 0} icon={Users} color="bg-blue-500" link="/admin/users" />
          <StatCard title="المنتجات" value={stats?.stats?.totalProducts || 0} icon={Package} color="bg-green-500" link="/admin/products" />
          <StatCard title="الطلبات" value={stats?.stats?.totalOrders || 0} icon={ShoppingBag} color="bg-purple-500" link="/admin/orders" />
          <StatCard title="الرسائل الجديدة" value={stats?.stats?.totalMessages || 0} icon={MessageSquare} color="bg-orange-500" link="/admin/messages" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="الإيرادات" value={`${Math.round(stats?.stats?.totalRevenue || 0)} ₪`} icon={DollarSign} color="bg-emerald-500" link="/admin/orders" />
          <StatCard title="طلبات اليوم" value={stats?.stats?.ordersToday || 0} icon={TrendingUp} color="bg-cyan-500" link="/admin/orders" />
          <StatCard title="التقييمات" value={stats?.stats?.totalReviews || 0} icon={Activity} color="bg-rose-500" link="/admin/products" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">آخر الطلبات</h2>
              <Link to="/admin/orders" className="text-sm text-primary-600 hover:underline">عرض الكل</Link>
            </div>
            <div className="space-y-3">
              {stats?.recentOrders?.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">#{order.orderNumber}</p>
                    <p className="text-xs text-gray-500">{order.user?.name}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-primary-700">{Math.round(order.finalPrice)} ₪</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status === 'pending' ? 'قيد الانتظار' :
                       order.status === 'preparing' ? 'قيد التحضير' :
                       order.status === 'on-delivery' ? 'في الطريق' :
                       order.status === 'delivered' ? 'تم التوصيل' : 'ملغي'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">آخر النشاطات</h2>
              <Link to="/admin/logs" className="text-sm text-primary-600 hover:underline">عرض الكل</Link>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {stats?.recentLogs?.slice(0, 10).map((log, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 truncate">{log.details}</p>
                    <p className="text-xs text-gray-500">
                      {log.user?.name || 'مجهول'} • {new Date(log.createdAt).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
