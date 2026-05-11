import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'ما هي مناطق التوصيل المتاحة؟', a: 'نوفر التوصيل لجميع مناطق فلسطين بما فيها نابلس، رام الله، القدس، الخليل، جنين، وباقي المدن والقرى.' },
  { q: 'كم تستغرق عملية التوصيل؟', a: 'عادة ما تستغرق عملية التوصيل من 1-3 أيام عمل داخل نابلس، و3-5 أيام للمناطق الأخرى حسب الموقع.' },
  { q: 'هل يمكنني إرجاع المنتج؟', a: 'نعم، يمكنك إرجاع المنتج خلال 14 يوماً من تاريخ الاستلام شريطة أن يكون في حالته الأصلية مع الفاتورة.' },
  { q: 'ما هي طرق الدفع المتاحة؟', a: 'الدفع عند الاستلام (Cash on Delivery) هو الطريقة الوحيدة المتاحة حالياً.' },
  { q: 'هل يوجد ضمان على المنتجات؟', a: 'نعم، جميع منتجاتنا مضمونة لمدة سنتين ضد عيوب الصناعة.' },
  { q: 'كيف يمكنني تتبع طلبي؟', a: 'يمكنك تتبع حالة طلبك من خلال صفحة "طلباتي" في حسابك الشخصي.' },
  { q: 'هل يمكنني تغيير لون المنتج بعد الطلب؟', a: 'يمكنك تغيير اللون قبل تأكيد الطلب فقط. يرجى التواصل معنا فوراً إذا كنت بحاجة لتعديل.' },
  { q: 'هل تقدمون خدمة التركيب؟', a: 'نعم، نوفر خدمة تركيب مجانية للمنتجات الكبيرة داخل نابلس، وبتكلفة رمزية للمناطق الأخرى.' },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h1 className="section-title">الأسئلة الشائعة</h1>
          <p className="text-gray-600">إليك إجابات على أكثر الأسئلة شيوعاً</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-right hover:bg-primary-50 transition-colors"
              >
                <span className="font-medium text-gray-800">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
