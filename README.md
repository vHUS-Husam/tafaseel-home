# 🏠 تفاصيل هوم | Tafaseel Home

<p align="center">
  <img src="frontend/public/logo.png" alt="Tafaseel Home Logo" width="120">
</p>

<p align="center">
  <strong>متجر أثاث إلكتروني احترافي - نابلس، فلسطين</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white" alt="MongoDB">
</p>

---

## 📋 محتويات المشروع

- [الميزات](#-الميزات)
- [التقنيات المستخدمة](#-التقنيات-المستخدمة)
- [متطلبات التشغيل](#-متطلبات-التشغيل)
- [التثبيت والتشغيل](#-التثبيت-والتشغيل)
- [حسابات الاختبار](#-حسابات-الاختبار)
- [هيكل المشروع](#-هيكل-المشروع)
- [النشر](#-النشر)
- [الترخيص](#-الترخيص)

---

## ✨ الميزات

### 🛍️ المتجر
- ✅ تصميم فاخر وهادئ يناسب متجر أثاث عصري
- ✅ دعم كامل للغة العربية (RTL)
- ✅ تصميم متجاوب 100% (موبايل، تابلت، كمبيوتر)
- ✅ PWA كامل - يعمل كتطبيق عند الإضافة للشاشة الرئيسية
- ✅ نظام بحث متقدم مع فلترة حسب الفئة والسعر
- ✅ نظام تقييم بالنجوم مع تعليقات
- ✅ قائمة المفضلة (Wishlist)

### 🛒 السلة والطلبات
- ✅ إدارة السلة مع تعديل الكميات والألوان
- ✅ نظام طلبات كامل مع رقم تلقائي
- ✅ حالات الطلب: قيد الانتظار، قيد التحضير، في الطريق، تم التوصيل، ملغي
- ✅ الدفع عند الاستلام فقط (Cash on Delivery)
- ✅ توصيل لجميع مناطق فلسطين

### 🔐 المصادقة والأمان
- ✅ تسجيل الدخول والتسجيل
- ✅ تأكيد البريد الإلكتروني
- ✅ نسيان كلمة المرور وإعادة التعيين عبر البريد
- ✅ JWT Authentication مع Cookies آمنة
- ✅ حماية Helmet, Rate Limiting, XSS, CORS
- ✅ تشفير كلمات المرور بـ bcrypt

### 👥 نظام الصلاحيات
- **Admin**: صلاحيات كاملة
- **Staff**: إضافة/حذف منتجات، تعديل المخزون والألوان
- **Customer**: عميل عادي

### ⚙️ لوحة التحكم
- ✅ إحصائيات حية (المستخدمين، الطلبات، المبيعات)
- ✅ إدارة المنتجات مع رفع الصور
- ✅ إدارة الفئات
- ✅ إدارة الطلبات مع تغيير الحالة
- ✅ إدارة المستخدمين والأدوار
- ✅ الرسائل الواردة
- ✅ إعدادات الموقع الديناميكية
- ✅ سجل النشاطات (Logs) مع IP وتفاصيل العملية

---

## 🛠️ التقنيات المستخدمة

### Frontend
| التقنية | الاستخدام |
|---------|----------|
| React 18 | واجهة المستخدم |
| Vite | بناء المشروع |
| TailwindCSS | التصميم |
| React Router DOM | التنقل |
| Framer Motion | الحركات |
| Axios | الطلبات HTTP |
| React Hot Toast | الإشعارات |
| Swiper | عارض الشرائح |
| Lucide React | الأيقونات |
| Vite PWA | تطبيق ويب تقدمي |

### Backend
| التقنية | الاستخدام |
|---------|----------|
| Node.js | بيئة التشغيل |
| Express.js | إطار العمل |
| MongoDB + Mongoose | قاعدة البيانات |
| JWT | المصادقة |
| bcryptjs | تشفير كلمات المرور |
| Multer | رفع الملفات |
| Nodemailer | إرسال البريد |
| Helmet | حماية HTTP |
| Express Rate Limit | تقييد الطلبات |
| Express Mongo Sanitize | تنظيف المدخلات |
| CORS | السماح بالطلبات المتقاطعة |

---

## 📦 متطلبات التشغيل

- **Node.js** >= 18.0.0
- **MongoDB** >= 5.0 (محلي أو MongoDB Atlas)
- **npm** أو **yarn**

---

## 🚀 التثبيت والتشغيل

### 1. استنساخ المشروع

```bash
git clone <repo-url>
cd tafaseel-home
```

### 2. إعداد الباك إند

```bash
cd backend
npm install
```

أنشئ ملف `.env` من النموذج:

```bash
cp .env.example .env
```

عدل المتغيرات في ملف `.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/tafaseel-home
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Tafaseel Home <noreply@tafasel.ps>
FRONTEND_URL=http://localhost:5173
```

### 3. تشغيل قاعدة البيانات

تأكد من تشغيل MongoDB:

```bash
# على macOS/Linux
mongod

# أو استخدم MongoDB Atlas
```

### 4. تعبئة البيانات الأولية

```bash
npm run seed
```

هذا سيُنشئ:
- 3 حسابات Admin
- 3 حسابات Staff
- 6 فئات
- 6 منتجات
- الإعدادات الافتراضية

### 5. تشغيل الباك إند

```bash
npm run dev
```

سيعمل الخادم على `http://localhost:5000`

### 6. إعداد الفرونت إند

في نافذة طرفية جديدة:

```bash
cd frontend
npm install
```

أنشئ ملف `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 7. تشغيل الفرونت إند

```bash
npm run dev
```

سيعمل الموقع على `http://localhost:5173`

---

## 👤 حسابات الاختبار

### Admin
| البريد | كلمة المرور |
|--------|------------|
| admin1@tafasel.ps | admin123 |
| admin2@tafasel.ps | admin123 |
| admin3@tafasel.ps | admin123 |

### Staff
| البريد | كلمة المرور |
|--------|------------|
| staff1@tafasel.ps | staff123 |
| staff2@tafasel.ps | staff123 |
| staff3@tafasel.ps | staff123 |

---

## 📁 هيكل المشروع

```
tafaseel-home/
├── backend/
│   ├── config/
│   │   ├── db.js              # إعدادات MongoDB
│   │   └── email.js           # إعدادات البريد
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   ├── reviewController.js
│   │   ├── messageController.js
│   │   ├── settingsController.js
│   │   ├── logController.js
│   │   ├── dashboardController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js            # حماية المسارات
│   │   ├── error.js           # معالجة الأخطاء
│   │   ├── upload.js          # رفع الملفات
│   │   └── logger.js          # تسجيل النشاطات
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   ├── Message.js
│   │   ├── Setting.js
│   │   ├── Log.js
│   │   ├── Banner.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── settingsRoutes.js
│   │   ├── logRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── seed.js            # بيانات أولية
│   ├── uploads/               # مجلد رفع الملفات
│   ├── server.js              # نقطة الدخول
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   ├── logo.png           # شعار المتجر
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Privacy.jsx
│   │   │   ├── Terms.jsx
│   │   │   ├── Shipping.jsx
│   │   │   ├── ReturnPolicy.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Products.jsx
│   │   │       ├── Orders.jsx
│   │   │       ├── Messages.jsx
│   │   │       ├── Users.jsx
│   │   │       ├── Settings.jsx
│   │   │       └── Logs.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

---

## 🌐 النشر

### Frontend (Netlify)

```bash
cd frontend
npm run build
```

ارفع مجلد `dist/` إلى Netlify.

### Backend (Render / Railway)

```bash
cd backend
```

أضف متغيرات البيئة في لوحة التحكم:
- `NODE_ENV=production`
- `MONGO_URI` (رابط MongoDB Atlas)
- `JWT_SECRET`
- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`
- `FRONTEND_URL` (رابط Netlify)

### MongoDB Atlas

1. أنشئ حساباً على [MongoDB Atlas](https://www.mongodb.com/atlas)
2. أنشئ Cluster جديد
3. أضف IP إلى القائمة البيضاء
4. أنشئ مستخدماً وانسخ رابط الاتصال
5. ضع الرابط في `MONGO_URI`

---

## 📄 الترخيص

هذا المشروع مخصص لـ **تفاصيل هوم - Tafaseel Home**.
جميع الحقوق محفوظة © 2024.

---

<p align="center">
  <strong>🏠 تفاصيل هوم - Tafaseel Home</strong><br>
  <em>فلسطين - نابلس - شارع القدس</em>
</p>
