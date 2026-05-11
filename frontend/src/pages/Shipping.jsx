import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, Package } from 'lucide-react';

const Shipping = () => (
  <div className="min-h-screen bg-cream py-8">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <Truck className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h1 className="section-title">سياسة الشحن والتوصيل</h1>
        <p className="text-gray-600">معلومات حول التوصيل والشحن لجميع مناطق فلسطين</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold">مناطق التوصيل</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">نوفر التوصيل لجميع مناطق فلسطين بما فيها:</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {['نابلس', 'رام الله', 'القدس', 'الخليل', 'جنين', 'بيت لحم', 'طولكرم', 'قلقيلية', 'أريحا', 'سalfit'].map((city) => (
              <div key={city} className="flex items-center gap-2 text-gray-700">
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
                <span>{city}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold">مدة التوصيل</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg">
              <span className="font-medium">نابلس وضواحيها</span>
              <span className="text-primary-700 font-bold">1-2 يوم عمل</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg">
              <span className="font-medium">المدن الرئيسية (رام الله، القدس، الخليل، جنين)</span>
              <span className="text-primary-700 font-bold">2-3 أيام عمل</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg">
              <span className="font-medium">باقي المناطق</span>
              <span className="text-primary-700 font-bold">3-5 أيام عمل</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold">تكلفة التوصيل</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            التوصيل مجاني لجميع الطلبات داخل نابلس. للمناطق الأخرى، تكلفة التوصيل رمزية ويتم تحديدها عند إتمام الطلب.
            الطلبات التي تتجاوز 500 ₪ تحصل على توصيل مجاني لجميع المناطق.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Shipping;
