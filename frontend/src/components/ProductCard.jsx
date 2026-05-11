import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext.jsx';
import toast from 'react-hot-toast';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const finalPrice = product.discount > 0
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const color = product.colors?.[0] || null;
    addToCart(product, 1, color);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="card group"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.images?.[0] || '/logo.png'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {product.discount > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              خصم {product.discount}%
            </span>
          )}
          {product.isFeatured && (
            <span className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              مميز
            </span>
          )}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-600 hover:text-white"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs text-primary-600 font-medium mb-1">{product.category?.name}</p>
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(product.rating || 0) ? 'text-gold-400 fill-gold-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-500 mr-1">({product.numReviews || 0})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-700">{Math.round(finalPrice)} ₪</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through">{product.price} ₪</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
