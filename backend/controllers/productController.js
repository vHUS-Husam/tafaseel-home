import { Product, Category, Review } from '../models/index.js';
import { createLog } from '../middleware/logger.js';

export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, category, search, minPrice, maxPrice, sort, featured } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (featured === 'true') query.isFeatured = true;

    let sortOption = {};
    if (sort === 'price-asc') sortOption.price = 1;
    else if (sort === 'price-desc') sortOption.price = -1;
    else if (sort === 'rating') sortOption.rating = -1;
    else if (sort === 'newest') sortOption.createdAt = -1;
    else sortOption.createdAt = -1;

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
      .populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ success: false, message: 'المنتج غير موجود' });
    }

    const reviews = await Review.find({ product: product._id, isApproved: true })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, product, reviews });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };
    if (req.files?.length > 0) {
      productData.images = req.files.map(f => `/uploads/products/${f.filename}`);
    }

    const product = await Product.create(productData);
    await createLog('product_created', `إضافة منتج: ${product.name}`, req, req.user, { productId: product._id });
    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.files?.length > 0) {
      updateData.images = req.files.map(f => `/uploads/products/${f.filename}`);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    await createLog('product_updated', `تعديل منتج: ${product.name}`, req, req.user, { productId: product._id });
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    await createLog('product_deleted', `حذف منتج: ${product.name}`, req, req.user, { productId: product._id });
    res.status(200).json({ success: true, message: 'تم حذف المنتج' });
  } catch (error) {
    next(error);
  }
};

export const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category', 'name').sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};
