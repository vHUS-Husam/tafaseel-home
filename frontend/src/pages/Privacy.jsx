import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Privacy = () => (
  <div className="min-h-screen bg-cream py-8">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h1 className="section-title">سياسة الخصوصية</h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-8 shadow-sm space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">1. جمع المعلومات</h2>
          <p>نقوم بجمع المعلومات التي تقدمها لنا عند إنشاء حساب أو إجراء طلب، بما في ذلك الاسم، البريد الإلكتروني، رقم الهاتف، والعنوان. هذه المعلومات ضرورية لتقديم خدماتنا وتوصيل طلباتك.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">2. استخدام المعلومات</h2>
          <p>نستخدم معلوماتك فقط لأغراض تقديم خدماتنا، معالجة الطلبات، التواصل معك، وتحسين تجربة المستخدم. لن نقوم ببيع أو مشاركة معلوماتك مع أطراف ثالثة دون إذنك.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">3. حماية البيانات</h2>
          <p>نستخدم تقنيات أمان متقدمة لحماية بياناتك. يتم تشفير كلمات المرور وتخزينها بشكل آمن. نحن ملتزمون بحماية خصوصيتك بأعلى معايير الأمان.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">4. ملفات تعريف الارتباط</h2>
          <p>نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح وتذكر تفضيلاتك. يمكنك تعطيلها من إعدادات المتصفح إذا رغبت في ذلك.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">5. حقوقك</h2>
          <p>لديك الحق في الوصول إلى بياناتك، تعديلها، أو طلب حذفها. يمكنك التواصل معنا في أي وقت لممارسة هذه الحقوق.</p>
        </section>
      </motion.div>
    </div>
  </div>
);

export default Privacy;
