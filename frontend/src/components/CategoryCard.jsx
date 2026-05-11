import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/products?category=${category._id}`}
        className="block group"
      >
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-primary-100">
          <img
            src={category.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <h3 className="text-white font-bold text-lg">{category.name}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
