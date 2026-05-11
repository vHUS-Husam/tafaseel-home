import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, XCircle, Clock } from 'lucide-react';

const ReturnPolicy = () => (
  <div className="min-h-screen bg-cream py-8">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <RotateCcw className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h1 className="section-title">سياسة الإرجاع والاستبدال</h1>
        <p className="text-gray-600">نحن نهتم برضاكم ونسعى لتقديم أفضل تجربة</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold">فترة الإرجاع</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            يمكنك إرجاع المنتج خلال <strong>14 يوماً</strong> من تاريخ استلام الطلب. يجب أن يكون المنتج في حالته الأصلية 
            مع جميع الملحقات والتغليف الأصلي.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold">شروط الإرجاع المقبول</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            {[
              'المنتج في حالته الأصلية ولم يتم استخدامه',
              'المصنع الأصلي والتغليف سليمان',
              'إرفاق الفاتورة الأصلية',
              'عدم تجاوز فترة 14 يوماً من تاريخ الاستلام',
              'عدم وجود أي تلف ناتج عن سوء الاستخدام',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold">حالات لا يمكن إرجاعها</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            {[
              'المنتجات المخصصة حسب الطلب',
              'المنتجات التي تم استخدامها أو تلفت',
              'المنتجات التي تم تجاوز فترة الإرجاع',
              'المنتجات بدون الفاتورة الأصلية',
              'المنتجات التي تم فتحها أو تركيبها',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary-50 rounded-xl p-8">
          <h2 className="text-xl font-bold mb-3">كيفية الإرجاع</h2>
          <p className="text-gray-600 leading-relaxed">
            للإرجاع، يرجى التواصل معنا عبر الهاتف أو البريد الإلكتروني خلال فترة الإرجاع. سيقوم فريقنا بترتيب 
            استلام المنتج من عنوانك. بعد فحص المنتج، سيتم إرجاع المبلغ خلال 5-7 أيام عمل.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default ReturnPolicy;
