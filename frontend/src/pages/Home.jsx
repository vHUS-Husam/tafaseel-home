import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Truck, Shield, Headphones, ChevronLeft } from 'lucide-react';
import { productAPI, categoryAPI } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';
import CategoryCard from '../components/CategoryCard.jsx';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productAPI.getAll({ featured: 'true', limit: 8 }),
          categoryAPI.getAll(),
        ]);
        setFeaturedProducts(productsRes.data.products);
        setCategories(categoriesRes.data.categories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    { icon: Truck, title: 'توصيل لجميع المناطق', desc: 'نوصل لك أينما كنت في فلسطين' },
    { icon: Shield, title: 'جودة مضمونة', desc: 'أثاث فاخر بأعلى معايير الجودة' },
    { icon: Headphones, title: 'دعم ممتاز', desc: 'فريق خدمة عملاء على مدار الساعة' },
    { icon: Star, title: 'تقييمات موثوقة', desc: 'آراء حقيقية من عملائنا' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-primary-900/90 via-primary-800/80 to-primary-700/70" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-primary-900/80 via-primary-800/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="تفاصيل هوم" className="h-16 w-16 object-contain bg-white/20 rounded-xl p-2" />
              <div>
                <h2 className="text-2xl font-bold">تفاصيل هوم</h2>
                <p className="text-primary-200 text-sm">Tafaseel Home</p>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              أثاث يعكس<br />ذوقك الرفيع
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed">
              اكتشف تشكيلتنا الفاخرة من الأثاث العصري والكلاسيكي في نابلس - فلسطين
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary flex items-center gap-2 text-lg">
                تصفح المنتجات <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-secondary border-white text-white hover:bg-white/10 flex items-center gap-2 text-lg">
                تعرف علينا <ChevronLeft className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-primary-600 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">تصفح حسب الفئة</h2>
            <p className="text-gray-600">اختر الفئة التي تهمك واستكشف منتجاتنا</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <CategoryCard key={category._id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="section-title mb-2">منتجات مميزة</h2>
              <p className="text-gray-600">اخترنا لك أفضل منتجاتنا بعناية</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors">
              عرض الكل <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-80" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="mt-8 text-center md:hidden">
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              عرض الكل <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                alt="متجرنا"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">من نحن</h2>
              <p className="text-primary-200 leading-relaxed text-lg">
                تفاصيل هوم هو متجر أثاث فاخر يقدم أجود أنواع الأثاث العصري والكلاسيكي في نابلس وفلسطين.
                نحن نؤمن بأن كل تفصيلة في منزلك تهم، لذلك نقدم لك منتجات بأعلى جودة وأفضل الأسعار.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold-400">+500</p>
                  <p className="text-sm text-primary-200">منتج</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold-400">+1000</p>
                  <p className="text-sm text-primary-200">عميل سعيد</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold-400">+5</p>
                  <p className="text-sm text-primary-200">سنوات خبرة</p>
                </div>
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-gold-400 font-medium hover:text-gold-500 transition-colors">
                اقرأ المزيد <ArrowLeft className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
