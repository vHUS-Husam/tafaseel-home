import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, User, FileText, CheckCircle, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { orderAPI } from '../services/api.js';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.address?.city || '',
    street: user?.address?.street || '',
    details: user?.address?.details || '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('السلة فارغة');
      return;
    }

    setLoading(true);
    try {
      const items = cart.map(item => ({
        product: item._id,
        name: item.name,
        image: item.images?.[0] || '',
        price: item.discount > 0 ? item.price - (item.price * item.discount / 100) : item.price,
        quantity: item.quantity,
        color: item.selectedColor,
      }));

      await orderAPI.create({
        items,
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          street: formData.street,
          details: formData.details,
        },
        notes: formData.notes,
      });

      toast.success('تم إرسال الطلب بنجاح!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في إرسال الطلب');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">لا يوجد منتجات في السلة</h2>
          <p className="text-gray-500 mb-4">أضف منتجات للمتابعة</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            تصفح المنتجات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title mb-8">إتمام الطلب</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-6 h-6 text-primary-600" />
                <h2 className="text-xl font-bold">معلومات التوصيل</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field pl-10"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field pl-10"
                      placeholder="مثال: 0599123456"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">المدينة *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="input-field pl-10"
                    placeholder="مثال: نابلس"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">العنوان (الشارع/الحي) *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="مثال: شارع القدس - مقابل مدرسة النجاح"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">تفاصيل إضافية</label>
                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="رقم البناية، الطابق، علامة مميزة..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ملاحظات الطلب</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="input-field pl-10"
                    placeholder="أي ملاحظات خاصة بالطلب..."
                  />
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-4">
                <p className="text-sm text-primary-700 font-medium">
                  💡 طريقة الدفع: الدفع عند الاستلام (Cash on Delivery)
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50"
              >
                {loading ? 'جاري إرسال الطلب...' : 'تأكيد الطلب'}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-lg mb-6">ملخص الطلب</h2>
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {cart.map((item) => {
                  const price = item.discount > 0
                    ? item.price - (item.price * item.discount / 100)
                    : item.price;
                  return (
                    <div key={`${item._id}-${item.selectedColor?.name}`} className="flex gap-3">
                      <img src={item.images?.[0] || '/logo.png'} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        {item.selectedColor && (
                          <p className="text-xs text-gray-500">{item.selectedColor.name}</p>
                        )}
                        <p className="text-sm text-gray-600">{item.quantity} × {Math.round(price)} ₪</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span>{Math.round(cartTotal)} ₪</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>التوصيل</span>
                  <span className="text-green-600">مجاني</span>
                </div>
                <div className="border-t border-gray-100 pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي</span>
                    <span className="text-primary-700">{Math.round(cartTotal)} ₪</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
