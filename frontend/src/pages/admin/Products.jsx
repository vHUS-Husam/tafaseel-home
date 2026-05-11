import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Image, Tag } from 'lucide-react';
import { productAPI, categoryAPI } from '../../services/api.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', discount: '', category: '', stock: '',
    colors: [{ name: '', hex: '#000000', quantity: 0 }],
    isFeatured: false, material: '', tags: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productAPI.getAdmin(),
        categoryAPI.getAll(),
      ]);
      setProducts(productsRes.data.products);
      setCategories(categoriesRes.data.categories);
    } catch (error) {
      toast.error('خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editingProduct) {
        await productAPI.update(editingProduct._id, data);
        toast.success('تم تحديث المنتج');
      } else {
        await productAPI.create(data);
        toast.success('تم إضافة المنتج');
      }
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في الحفظ');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
    try {
      await productAPI.delete(id);
      toast.success('تم حذف المنتج');
      fetchData();
    } catch (error) {
      toast.error('خطأ في الحذف');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', description: '', price: '', discount: '', category: '', stock: '',
      colors: [{ name: '', hex: '#000000', quantity: 0 }],
      isFeatured: false, material: '', tags: ''
    });
  };

  const addColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, { name: '', hex: '#000000', quantity: 0 }] });
  };

  const removeColor = (index) => {
    setFormData({ ...formData, colors: formData.colors.filter((_, i) => i !== index) });
  };

  const updateColor = (index, field, value) => {
    const newColors = [...formData.colors];
    newColors[index][field] = field === 'quantity' ? Number(value) : value;
    setFormData({ ...formData, colors: newColors });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">إدارة المنتجات</h1>
          <button
            onClick={() => { setShowForm(true); setEditingProduct(null); resetForm(); }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> إضافة منتج
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent mx-auto" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المنتج</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الفئة</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">السعر</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المخزون</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الحالة</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.images?.[0] || '/logo.png'} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            {product.isFeatured && <span className="text-xs text-gold-500">مميز</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.category?.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="font-bold">{Math.round(product.finalPrice || product.price)} ₪</span>
                        {product.discount > 0 && <span className="text-xs text-gray-400 line-through mr-2">{product.price} ₪</span>}
                      </td>
                      <td className="px-6 py-4 text-sm">{product.stock}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {product.isActive ? 'نشط' : 'معطل'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditingProduct(product); setFormData({ ...product, tags: product.tags?.join(', ') || '' }); setShowForm(true); }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">{editingProduct ? 'تعديل منتج' : 'إضافة منتج'}</h2>
                  <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">الاسم *</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">الفئة *</label>
                      <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required className="input-field">
                        <option value="">اختر الفئة</option>
                        {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الوصف *</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={3} className="input-field" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">السعر *</label>
                      <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">الخصم %</label>
                      <input type="number" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">المخزون *</label>
                      <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الألوان المتاحة</label>
                    {formData.colors.map((color, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input type="text" placeholder="اسم اللون" value={color.name} onChange={(e) => updateColor(i, 'name', e.target.value)} className="input-field flex-1" />
                        <input type="color" value={color.hex} onChange={(e) => updateColor(i, 'hex', e.target.value)} className="w-12 h-10 rounded-lg border" />
                        <input type="number" placeholder="الكمية" value={color.quantity} onChange={(e) => updateColor(i, 'quantity', e.target.value)} className="input-field w-24" />
                        {formData.colors.length > 1 && (
                          <button type="button" onClick={() => removeColor(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addColor} className="text-sm text-primary-600 hover:underline">+ إضافة لون</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">المادة</label>
                      <input type="text" value={formData.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">الوسوم (مفصولة بفاصلة)</label>
                      <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="input-field" />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="rounded text-primary-600" />
                    <span className="text-sm">منتج مميز</span>
                  </label>
                  <div className="flex gap-3 pt-4">
                    <button type="submit" className="btn-primary flex items-center gap-2">
                      <Save className="w-5 h-5" /> حفظ
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">إلغاء</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminProducts;
