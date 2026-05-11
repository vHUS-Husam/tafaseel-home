import { Category } from '../models/index.js';
import { createLog } from '../middleware/logger.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('parent', 'name slug')
      .sort({ order: 1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ success: false, message: 'الفئة غير موجودة' });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const categoryData = { ...req.body };
    if (req.file) categoryData.image = `/uploads/categories/${req.file.filename}`;
    const category = await Category.create(categoryData);
    await createLog('category_created', `إضافة فئة: ${category.name}`, req, req.user);
    res.status(201).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = `/uploads/categories/${req.file.filename}`;
    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    await createLog('category_updated', `تعديل فئة: ${category.name}`, req, req.user);
    res.status(200).json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, { isActive: false });
    await createLog('category_deleted', `حذف فئة: ${req.params.id}`, req, req.user);
    res.status(200).json({ success: true, message: 'تم حذف الفئة' });
  } catch (error) {
    next(error);
  }
};
