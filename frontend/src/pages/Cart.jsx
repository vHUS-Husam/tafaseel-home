import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center py-20">
        <div className="text-center">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">السلة فارغة</h2>
          <p className="text-gray-500 mb-6">لم تقم بإضافة أي منتجات بعد</p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> تصفح المنتجات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title mb-8">سلة التسوق ({cart.length})</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => {
                const price = item.discount > 0
                  ? item.price - (item.price * item.discount / 100)
                  : item.price;
                return (
                  <motion.div
                    key={`${item._id}-${item.selectedColor?.name}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white rounded-xl p-4 shadow-sm flex gap-4"
                  >
                    <Link to={`/products/${item.slug}`} className="shrink-0">
                      <img
                        src={item.images?.[0] || '/logo.png'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${item.slug}`}>
                        <h3 className="font-bold text-gray-800 truncate hover:text-primary-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      {item.selectedColor && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">اللون:</span>
                          <span
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="text-sm">{item.selectedColor.name}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.selectedColor?.name, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.selectedColor?.name, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-primary-700">{Math.round(price * item.quantity)} ₪</p>
                          {item.discount > 0 && (
                            <p className="text-xs text-gray-400 line-through">{item.price * item.quantity} ₪</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id, item.selectedColor?.name)}
                      className="shrink-0 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors self-start"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="text-red-500 text-sm hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" /> إفراغ السلة
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-lg mb-6">ملخص الطلب</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>المجموع الفرعي</span>
                  <span>{Math.round(cartTotal)} ₪</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>التوصيل</span>
                  <span className="text-green-600">مجاني</span>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي</span>
                    <span className="text-primary-700">{Math.round(cartTotal)} ₪</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> إتمام الطلب
              </button>
              <Link to="/products" className="block text-center mt-4 text-primary-600 hover:underline text-sm">
                مواصلة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
