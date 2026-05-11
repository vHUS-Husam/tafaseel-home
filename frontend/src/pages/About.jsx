import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Award, Users, Truck, Shield } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Award, title: 'جودة عالية', desc: 'نختار أفضل المواد والتصاميم لضمان رضاكم' },
    { icon: Users, title: 'خدمة متميزة', desc: 'فريق متخصص لخدمتكم قبل وبعد البيع' },
    { icon: Truck, title: 'توصيل سريع', desc: 'نوصل لجميع مناطق فلسطين بأسرع وقت' },
    { icon: Shield, title: 'ضمان الجودة', desc: 'ضمان على جميع منتجاتنا لمدة سنتين' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative py-24 bg-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src="/logo.png" alt="تفاصيل هوم" className="h-24 w-24 mx-auto mb-6 bg-white/10 rounded-2xl p-2" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">من نحن</h1>
            <p className="text-xl text-primary-200 max-w-2xl mx-auto">
              تفاصيل هوم هو متجر أثاث فاخر يقدم أجود أنواع الأثاث العصري والكلاسيكي في نابلس وفلسطين
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" alt="متجرنا" className="rounded-2xl shadow-xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="section-title">قصتنا</h2>
              <p className="text-gray-600 leading-relaxed">
                بدأت رحلة تفاصيل هوم من شغفنا بالأثاث الجميل والجودة العالية. نؤمن بأن كل تفصيلة في منزلك تهم، 
                ولهذا السبب نحرص على تقديم منتجات تلبي أعلى معايير الجودة والتصميم.
              </p>
              <p className="text-gray-600 leading-relaxed">
                منذ افتتاحنا في نابلس - شارع القدس، ونحن نعمل بجد لتقديم تجربة تسوق فريدة لعملائنا، 
                مع التركيز على الجودة، الخدمة المتميزة، والأسعار المناسبة.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-700">+500</p>
                  <p className="text-sm text-gray-500">منتج</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-700">+1000</p>
                  <p className="text-sm text-gray-500">عميل سعيد</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-700">+5</p>
                  <p className="text-sm text-gray-500">سنوات</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">قيمنا</h2>
            <p className="text-gray-600">ما نؤمن به ونعمل من أجله كل يوم</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-primary-600 rounded-xl flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="section-title text-center mb-8">موقعنا</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">فلسطين - نابلس - شارع القدس</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">+970 9 234 5678</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">info@tafasel.ps</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">السبت - الخميس: 9:00 ص - 8:00 م</span>
                </div>
              </div>
              <div className="bg-primary-50 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary-400 mx-auto mb-2" />
                  <p className="text-primary-600 font-medium">نابلس - شارع القدس</p>
                  <p className="text-sm text-gray-500">فلسطين</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
