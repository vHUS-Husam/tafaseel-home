import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'اسم المنتج مطلوب'],
    trim: true,
    maxlength: [100, 'الاسم لا يمكن أن يتجاوز 100 حرف']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'الوصف مطلوب']
  },
  price: {
    type: Number,
    required: [true, 'السعر مطلوب'],
    min: [0, 'السعر يجب أن يكون أكبر من صفر']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'الخصم يجب أن يكون أكبر من صفر'],
    max: [100, 'الخصم لا يمكن أن يتجاوز 100%']
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  colors: [{
    name: { type: String, required: true },
    hex: { type: String, required: true },
    quantity: { type: Number, default: 0 }
  }],
  stock: {
    type: Number,
    default: 0,
    min: [0, 'المخزون يجب أن يكون أكبر من صفر']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'التقييم يجب أن يكون بين 0 و 5'],
    max: [5, 'التقييم يجب أن يكون بين 0 و 5']
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  material: String,
  weight: Number,
  tags: [String]
}, { timestamps: true });

productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, locale: 'ar' });
  }
  next();
});

productSchema.virtual('finalPrice').get(function() {
  return this.price - (this.price * this.discount / 100);
});

productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
