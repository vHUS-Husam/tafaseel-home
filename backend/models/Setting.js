import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  siteName: { type: String, default: 'تفاصيل هوم' },
  siteDescription: { type: String, default: 'متجر أثاث فاخر في نابلس - فلسطين' },
  siteLogo: { type: String, default: '' },
  siteFavicon: { type: String, default: '' },
  email: { type: String, default: 'info@tafasel.ps' },
  phone: { type: String, default: '+970 9 234 5678' },
  whatsapp: { type: String, default: '+970599123456' },
  address: { type: String, default: 'فلسطين - نابلس - شارع القدس' },
  workingHours: {
    saturday: { type: String, default: '9:00 ص - 8:00 م' },
    sunday: { type: String, default: '9:00 ص - 8:00 م' },
    monday: { type: String, default: '9:00 ص - 8:00 م' },
    tuesday: { type: String, default: '9:00 ص - 8:00 م' },
    wednesday: { type: String, default: '9:00 ص - 8:00 م' },
    thursday: { type: String, default: '9:00 ص - 8:00 م' },
    friday: { type: String, default: 'مغلق' }
  },
  socialMedia: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    telegram: { type: String, default: '' },
    tiktok: { type: String, default: '' }
  },
  aboutUs: {
    title: { type: String, default: 'من نحن' },
    content: { type: String, default: 'تفاصيل هوم هو متجر أثاث فاخر يقدم أجود أنواع الأثاث العصري والكلاسيكي في نابلس وفلسطين.' },
    image: { type: String, default: '' }
  },
  homePage: {
    heroTitle: { type: String, default: 'أثاث يعكس ذوقك الرفيع' },
    heroSubtitle: { type: String, default: 'اكتشف تشكيلتنا الفاخرة من الأثاث العصري والكلاسيكي' },
    heroImage: { type: String, default: '' }
  },
  footer: {
    description: { type: String, default: 'متجر تفاصيل هوم - وجهتك الأولى للأثاث الفاخر في فلسطين' },
    links: [{
      title: String,
      url: String
    }]
  },
  policies: {
    privacyPolicy: { type: String, default: '' },
    termsConditions: { type: String, default: '' },
    shippingPolicy: { type: String, default: '' },
    returnPolicy: { type: String, default: '' },
    faq: { type: String, default: '' }
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  freeShippingThreshold: {
    type: Number,
    default: 500
  },
  currency: {
    type: String,
    default: '₪'
  }
}, { timestamps: true });

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
