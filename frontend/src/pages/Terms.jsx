import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Terms = () => (
  <div className="min-h-screen bg-cream py-8">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <FileText className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h1 className="section-title">الشروط والأحكام</h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-8 shadow-sm space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">1. قبول الشروط</h2>
          <p>باستخدامك لموقع تفاصيل هوم، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام الموقع.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">2. المنتجات والأسعار</h2>
          <p>نحن نسعى جاهدين لضمان دقة وصف المنتجات والأسعار. ومع ذلك، قد تحدث أخطاء في بعض الأحيان. نحتفظ بالحق في تعديل الأسعار والمعلومات في أي وقت.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">3. الطلبات والدفع</h2>
          <p>جميع الطلبات خاضعة للتوفر. الدفع عند الاستلام هو الطريقة الوحيدة المتاحة. يجب دفع المبلغ كاملاً عند استلام الطلب.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">4. التوصيل</h2>
          <p>نحن نلتزم بتوصيل طلباتك في الوقت المحدد قدر الإمكان. ومع ذلك، قد تتأخر التوصيل بسبب ظروف خارجة عن إرادتنا.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">5. الملكية الفكرية</h2>
          <p>جميع المحتويات على الموقع بما فيها الصور والنصوص والشعارات هي ملك لـ تفاصيل هوم ومحمية بموجب قوانين حقوق النشر.</p>
        </section>
      </motion.div>
    </div>
  </div>
);

export default Terms;
