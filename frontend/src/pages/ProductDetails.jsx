import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Minus, Plus, Truck, Shield, ArrowLeft, Check } from 'lucide-react';
import { productAPI, reviewAPI } from '../services/api.js';
import { useCart } from '../contexts/CartContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await productAPI.getOne(slug);
        setProduct(data.product);
        setReviews(data.reviews);
        setSelectedColor(data.product.colors?.[0] || null);
      } catch (error) {
        toast.error('المنتج غير موجود');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error('يرجى اختيار لون');
      return;
    }
    addToCart(product, quantity, selectedColor);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('يرجى تسجيل الدخول أولاً');
      return;
    }
    try {
      await reviewAPI.create({ product: product._id, ...reviewForm });
      toast.success('تم إضافة التقييم بنجاح');
      setReviewForm({ rating: 5, comment: '' });
      const { data } = await productAPI.getOne(slug);
      setReviews(data.reviews);
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في إضافة التقييم');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  if (!product) return null;

  const finalPrice = product.discount > 0
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary-600">الرئيسية</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600">المنتجات</Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
              <img
                src={product.images?.[selectedImage] || '/logo.png'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <p className="text-primary-600 font-medium mb-2">{product.category?.name}</p>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating || 0) ? 'text-gold-400 fill-gold-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-gray-500">({product.numReviews || 0} تقييم)</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary-700">{Math.round(finalPrice)} ₪</span>
              {product.discount > 0 && (
                <>
                  <span className="text-xl text-gray-400 line-through">{product.price} ₪</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                    وفر {Math.round(product.price * product.discount / 100)} ₪
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div>
                <h3 className="font-bold mb-3">اللون: <span className="text-primary-600">{selectedColor?.name}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor?.name === color.name ? 'border-primary-600 scale-110 shadow-lg' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-bold mb-3">الكمية</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2 text-lg py-4"
              >
                <ShoppingCart className="w-5 h-5" /> إضافة للسلة
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">توصيل لجميع المناطق</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className="text-sm text-gray-600">جودة مضمونة 100%</span>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl p-6 space-y-3">
              <h3 className="font-bold">تفاصيل المنتج</h3>
              {product.dimensions && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">الأبعاد</span>
                  <span>{product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} سم</span>
                </div>
              )}
              {product.material && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">المادة</span>
                  <span>{product.material}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">المخزون</span>
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `متوفر (${product.stock})` : 'غير متوفر'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="section-title">التقييمات ({reviews.length})</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">لا توجد تقييمات بعد</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="font-bold text-primary-600">{review.user?.name?.[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium">{review.user?.name}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Review */}
            <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
              <h3 className="font-bold text-lg mb-4">أضف تقييمك</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">التقييم</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1"
                      >
                        <Star className={`w-8 h-8 ${star <= reviewForm.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">تعليقك</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    rows={4}
                    className="input-field"
                    placeholder="شاركنا رأيك في المنتج..."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  إرسال التقييم
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
