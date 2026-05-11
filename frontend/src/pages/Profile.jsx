import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Lock, Camera, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { authAPI } from '../services/api.js';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.address?.city || '',
    street: user?.address?.street || '',
    details: user?.address?.details || '',
  });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append('name', formData.name);
    form.append('phone', formData.phone);
    form.append('address', JSON.stringify({ city: formData.city, street: formData.street, details: formData.details }));
    await updateProfile(form);
    setLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('كلمات المرور غير متطابقة');
      return;
    }
    setLoading(true);
    try {
      await authAPI.changePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
      toast.success('تم تغيير كلمة المرور بنجاح');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في تغيير كلمة المرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title mb-8">الملف الشخصي</h1>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-600" />
                  </div>
                )}
                <button className="absolute bottom-0 left-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="font-bold text-lg">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                {user?.role === 'admin' ? 'مدير' : user?.role === 'staff' ? 'موظف' : 'عميل'}
              </span>
            </div>

            <div className="bg-white rounded-xl shadow-sm mt-4 overflow-hidden">
              {[
                { id: 'info', label: 'المعلومات الشخصية', icon: User },
                { id: 'password', label: 'تغيير كلمة المرور', icon: Lock },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-right transition-colors ${
                    activeTab === tab.id ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3"
          >
            {activeTab === 'info' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">المعلومات الشخصية</h2>
                <form onSubmit={handleUpdateInfo} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">الاسم</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-field" />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-5">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary-600" /> عنوان التوصيل
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">المدينة</label>
                        <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="input-field" placeholder="نابلس" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">الشارع</label>
                        <input type="text" value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} className="input-field" placeholder="شارع القدس" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">تفاصيل إضافية</label>
                      <input type="text" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className="input-field" placeholder="رقم البناية، الطابق..." />
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                    <Save className="w-5 h-5" /> {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">تغيير كلمة المرور</h2>
                <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                  <div>
                    <label className="block text-sm font-medium mb-2">كلمة المرور الحالية</label>
                    <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">كلمة المرور الجديدة</label>
                    <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required minLength={6} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور الجديدة</label>
                    <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required className="input-field" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
                    {loading ? 'جاري الحفظ...' : 'تغيير كلمة المرور'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
