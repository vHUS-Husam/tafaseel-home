import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, Truck, CheckCircle, XCircle, ChevronLeft, Eye } from 'lucide-react';
import { orderAPI } from '../services/api.js';
import toast from 'react-hot-toast';

const statusConfig = {
  pending: { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  preparing: { label: 'قيد التحضير', color: 'bg-blue-100 text-blue-700', icon: Package },
  'on-delivery': { label: 'في الطريق', color: 'bg-purple-100 text-purple-700', icon: Truck },
  delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-700', icon: XCircle },
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderAPI.getMyOrders();
        setOrders(data.orders);
      } catch (error) {
        toast.error('خطأ في تحميل الطلبات');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title mb-8">طلباتي</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-600 mb-2">لا توجد طلبات</h2>
            <p className="text-gray-500 mb-4">لم تقم بإجراء أي طلبات بعد</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              تصفح المنتجات <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const status = statusConfig[order.status];
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">رقم الطلب</p>
                      <p className="font-bold text-lg">#{order.orderNumber}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${status.color}`}>
                      <status.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-500">الإجمالي</p>
                      <p className="font-bold text-primary-700">{Math.round(order.finalPrice)} ₪</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="shrink-0 flex items-center gap-3">
                          <img src={item.image || '/logo.png'} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div>
                            <p className="text-sm font-medium truncate max-w-[150px]">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.quantity} × {Math.round(item.price)} ₪</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4" />
                      <span>{order.shippingAddress?.city}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
