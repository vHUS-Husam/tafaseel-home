import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { messageAPI } from '../services/api.js';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await messageAPI.create(formData);
      setSent(true);
      toast.success('تم إرسال رسالتك بنجاح');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في الإرسال');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, title: 'العنوان', value: 'فلسطين - نابلس - شارع القدس' },
    { icon: Phone, title: 'الهاتف', value: '+970 9 234 5678' },
    { icon: Mail, title: 'البريد', value: 'info@tafasel.ps' },
    { icon: Clock, title: 'أوقات الدوام', value: 'السبت - الخميس: 9:00 ص - 8:00 م' },
  ];

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="section-title">تواصل معنا</h1>
          <p className="text-gray-600">نحن هنا لمساعدتك، لا تتردد في التواصل معنا</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <info.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{info.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{info.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="bg-primary-900 rounded-xl p-6 text-white">
              <MessageSquare className="w-8 h-8 text-gold-400 mb-3" />
              <h3 className="font-bold text-lg mb-2">هل تحتاج مساعدة فورية؟</h3>
              <p className="text-primary-200 text-sm mb-4">تواصل معنا عبر الواتساب للحصول على رد سريع</p>
              <a href="https://wa.me/970599123456" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                <MessageSquare className="w-4 h-4" /> تواصل عبر واتساب
              </a>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-8 shadow-sm">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">تم الإرسال بنجاح!</h2>
                  <p className="text-gray-600 mb-6">سنقوم بالرد عليك في أقرب وقت ممكن</p>
                  <button onClick={() => setSent(false)} className="btn-secondary">إرسال رسالة جديدة</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">الاسم *</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="input-field" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">الموضوع *</label>
                      <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} required className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الرسالة *</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} className="input-field" placeholder="اكتب رسالتك هنا..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                    <Send className="w-5 h-5" /> {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
