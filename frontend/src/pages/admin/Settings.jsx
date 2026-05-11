import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Store, Phone, Mail, MapPin, Clock, Globe, Facebook, Instagram, MessageCircle, Send } from 'lucide-react';
import { settingsAPI } from '../../services/api.js';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await settingsAPI.get();
      setSettings(data.settings);
    } catch (error) {
      toast.error('خطأ في تحميل الإعدادات');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsAPI.update(settings);
      toast.success('تم حفظ الإعدادات');
    } catch (error) {
      toast.error('خطأ في الحفظ');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path, value) => {
    const keys = path.split('.');
    const newSettings = { ...settings };
    let current = newSettings;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]] = { ...current[keys[i]] };
    }
    current[keys[keys.length - 1]] = value;
    setSettings(newSettings);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'عام', icon: Store },
    { id: 'contact', label: 'تواصل', icon: Phone },
    { id: 'social', label: 'سوشيال', icon: Globe },
    { id: 'about', label: 'من نحن', icon: MapPin },
    { id: 'policies', label: 'سياسات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">إعدادات الموقع</h1>
          <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
            <Save className="w-5 h-5" /> {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {tabs.map((tab) => (
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
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              {activeTab === 'general' && (
                <>
                  <h2 className="text-lg font-bold mb-4">إعدادات عامة</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">اسم المتجر</label>
                      <input type="text" value={settings?.siteName || ''} onChange={(e) => updateField('siteName', e.target.value)} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">وصف الموقع</label>
                      <input type="text" value={settings?.siteDescription || ''} onChange={(e) => updateField('siteDescription', e.target.value)} className="input-field" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">العملة</label>
                      <input type="text" value={settings?.currency || '₪'} onChange={(e) => updateField('currency', e.target.value)} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">تكلفة الشحن</label>
                      <input type="number" value={settings?.shippingCost || 0} onChange={(e) => updateField('shippingCost', Number(e.target.value))} className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">حد الشحن المجاني</label>
                    <input type="number" value={settings?.freeShippingThreshold || 500} onChange={(e) => updateField('freeShippingThreshold', Number(e.target.value))} className="input-field" />
                  </div>
                </>
              )}

              {activeTab === 'contact' && (
                <>
                  <h2 className="text-lg font-bold mb-4">معلومات التواصل</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                      <input type="email" value={settings?.email || ''} onChange={(e) => updateField('email', e.target.value)} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                      <input type="tel" value={settings?.phone || ''} onChange={(e) => updateField('phone', e.target.value)} className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">واتساب</label>
                    <input type="tel" value={settings?.whatsapp || ''} onChange={(e) => updateField('whatsapp', e.target.value)} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">العنوان</label>
                    <input type="text" value={settings?.address || ''} onChange={(e) => updateField('address', e.target.value)} className="input-field" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                      <div key={day}>
                        <label className="block text-sm font-medium mb-2 capitalize">
                          {day === 'saturday' ? 'السبت' : day === 'sunday' ? 'الأحد' : day === 'monday' ? 'الإثنين' : day === 'tuesday' ? 'الثلاثاء' : day === 'wednesday' ? 'الأربعاء' : day === 'thursday' ? 'الخميس' : 'الجمعة'}
                        </label>
                        <input
                          type="text"
                          value={settings?.workingHours?.[day] || ''}
                          onChange={(e) => updateField(`workingHours.${day}`, e.target.value)}
                          className="input-field"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'social' && (
                <>
                  <h2 className="text-lg font-bold mb-4">روابط السوشيال ميديا</h2>
                  <div className="space-y-4">
                    {[
                      { key: 'facebook', label: 'Facebook', icon: Facebook },
                      { key: 'instagram', label: 'Instagram', icon: Instagram },
                      { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                      { key: 'telegram', label: 'Telegram', icon: Send },
                    ].map((social) => (
                      <div key={social.key}>
                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                          <social.icon className="w-4 h-4" /> {social.label}
                        </label>
                        <input
                          type="url"
                          value={settings?.socialMedia?.[social.key] || ''}
                          onChange={(e) => updateField(`socialMedia.${social.key}`, e.target.value)}
                          className="input-field"
                          placeholder={`رابط ${social.label}`}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'about' && (
                <>
                  <h2 className="text-lg font-bold mb-4">من نحن</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">العنوان</label>
                    <input type="text" value={settings?.aboutUs?.title || ''} onChange={(e) => updateField('aboutUs.title', e.target.value)} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">المحتوى</label>
                    <textarea value={settings?.aboutUs?.content || ''} onChange={(e) => updateField('aboutUs.content', e.target.value)} rows={6} className="input-field" />
                  </div>
                </>
              )}

              {activeTab === 'policies' && (
                <>
                  <h2 className="text-lg font-bold mb-4">السياسات</h2>
                  {[
                    { key: 'privacyPolicy', label: 'سياسة الخصوصية' },
                    { key: 'termsConditions', label: 'الشروط والأحكام' },
                    { key: 'shippingPolicy', label: 'سياسة الشحن' },
                    { key: 'returnPolicy', label: 'سياسة الإرجاع' },
                    { key: 'faq', label: 'الأسئلة الشائعة' },
                  ].map((policy) => (
                    <div key={policy.key} className="mb-4">
                      <label className="block text-sm font-medium mb-2">{policy.label}</label>
                      <textarea
                        value={settings?.policies?.[policy.key] || ''}
                        onChange={(e) => updateField(`policies.${policy.key}`, e.target.value)}
                        rows={4}
                        className="input-field"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
