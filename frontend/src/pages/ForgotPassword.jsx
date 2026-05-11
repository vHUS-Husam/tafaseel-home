import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { authAPI } from '../services/api.js';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setSent(true);
      toast.success('تم إرسال رابط إعادة التعيين إلى بريدك');
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في الإرسال');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="تفاصيل هوم" className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">نسيت كلمة المرور؟</h1>
            <p className="text-gray-500 mt-2">أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين</p>
          </div>

          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">تم الإرسال!</h2>
              <p className="text-gray-600 mb-4">تحقق من بريدك الإلكتروني للحصول على رابط إعادة التعيين</p>
              <Link to="/login" className="text-primary-600 hover:underline">العودة لتسجيل الدخول</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field pl-10"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-50">
                {loading ? 'جاري الإرسال...' : 'إرسال الرابط'}
              </button>
            </form>
          )}

          <Link to="/login" className="flex items-center justify-center gap-2 mt-6 text-primary-600 hover:underline text-sm">
            <ArrowLeft className="w-4 h-4" /> العودة لتسجيل الدخول
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
