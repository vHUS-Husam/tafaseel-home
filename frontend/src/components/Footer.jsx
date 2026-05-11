import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="تفاصيل هوم" className="h-14 w-14 object-contain bg-white/10 rounded-lg p-1" />
              <div>
                <h3 className="text-xl font-bold">تفاصيل هوم</h3>
                <p className="text-xs text-gray-400">Tafaseel Home</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              وجهتك الأولى للأثاث الفاخر في فلسطين. نقدم تشكيلة واسعة من الأثاث العصري والكلاسيكي بأعلى جودة.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-r-4 border-primary-600 pr-3">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'الرئيسية' },
                { to: '/products', label: 'المنتجات' },
                { to: '/about', label: 'من نحن' },
                { to: '/contact', label: 'تواصل معنا' },
                { to: '/faq', label: 'الأسئلة الشائعة' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-r-4 border-primary-600 pr-3">سياساتنا</h4>
            <ul className="space-y-3">
              {[
                { to: '/privacy', label: 'سياسة الخصوصية' },
                { to: '/terms', label: 'الشروط والأحكام' },
                { to: '/shipping', label: 'سياسة الشحن' },
                { to: '/return-policy', label: 'سياسة الإرجاع' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-r-4 border-primary-600 pr-3">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">فلسطين - نابلس - شارع القدس</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-gray-400 text-sm">+970 9 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-gray-400 text-sm">info@tafasel.ps</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-500 shrink-0" />
                <span className="text-gray-400 text-sm">السبت - الخميس: 9:00 ص - 8:00 م</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} تفاصيل هوم - Tafaseel Home. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
