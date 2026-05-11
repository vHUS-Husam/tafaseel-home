import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Package, Clock, Truck, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { orderAPI } from '../../services/api.js';
import toast from 'react-hot-toast';

const statusOptions = [
  { value: 'pending', label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'preparing', label: 'قيد التحضير', color: 'bg-blue-100 text-blue-700' },
  { value: 'on-delivery', label: 'في الطريق', color: 'bg-purple-100 text-purple-700' },
  { value: 'delivered', label: 'تم التوصيل', color: 'bg-green-100 text-green-700' },
  { value: 'cancelled', label: 'ملغي', color: 'bg-red-100 text-red-700' },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getAll();
      setOrders(data.orders);
    } catch (error) {
      toast.error('خطأ في تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await orderAPI.updateStatus(orderId, { status, note: 'تم التحديث من لوحة التحكم' });
      toast.success('تم تحديث حالة الطلب');
      fetchOrders();
    } catch (error) {
      toast.error('خطأ في التحديث');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">إدارة الطلبات</h1>

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
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">رقم الطلب</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">العميل</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المنتجات</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الإجمالي</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الحالة</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">التاريخ</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-sm">#{order.orderNumber}</td>
                      <td className="px-6 py-4 text-sm">
                        <p className="font-medium">{order.user?.name}</p>
                        <p className="text-gray-500 text-xs">{order.user?.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">{order.items.length} منتج</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary-700">{Math.round(order.finalPrice)} ₪</td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`text-xs px-3 py-1.5 rounded-full border-0 cursor-pointer font-medium ${
                            statusOptions.find(s => s.value === order.status)?.color || 'bg-gray-100'
                          }`}
                        >
                          {statusOptions.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details */}
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-bold mb-4">تفاصيل الطلب #{selectedOrder.orderNumber}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-gray-500 text-sm">معلومات العميل</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <p><span className="text-gray-500">الاسم:</span> {selectedOrder.shippingAddress?.name}</p>
                  <p><span className="text-gray-500">الهاتف:</span> {selectedOrder.shippingAddress?.phone}</p>
                  <p><span className="text-gray-500">المدينة:</span> {selectedOrder.shippingAddress?.city}</p>
                  <p><span className="text-gray-500">العنوان:</span> {selectedOrder.shippingAddress?.street}</p>
                  {selectedOrder.shippingAddress?.details && (
                    <p><span className="text-gray-500">تفاصيل:</span> {selectedOrder.shippingAddress?.details}</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-gray-500 text-sm">المنتجات</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <img src={item.image || '/logo.png'} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} × {Math.round(item.price)} ₪</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between font-bold">
                    <span>الإجمالي</span>
                    <span className="text-primary-700">{Math.round(selectedOrder.finalPrice)} ₪</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
