import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Eye, Trash2, X, Clock, User, CheckCircle } from 'lucide-react';
import { messageAPI } from '../../services/api.js';
import toast from 'react-hot-toast';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await messageAPI.getAll();
      setMessages(data.messages);
    } catch (error) {
      toast.error('خطأ في تحميل الرسائل');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    try {
      await messageAPI.delete(id);
      toast.success('تم حذف الرسالة');
      fetchMessages();
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch (error) {
      toast.error('خطأ في الحذف');
    }
  };

  const handleView = async (msg) => {
    if (!msg.isRead) {
      try {
        await messageAPI.getOne(msg._id);
        fetchMessages();
      } catch (error) {
        console.error(error);
      }
    }
    setSelectedMessage(msg);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">الرسائل</h1>
          <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
            {messages.filter(m => !m.isRead).length} رسائل جديدة
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-600 border-t-transparent mx-auto" />
                </div>
              ) : messages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">لا توجد رسائل</div>
              ) : (
                messages.map((msg) => (
                  <button
                    key={msg._id}
                    onClick={() => handleView(msg)}
                    className={`w-full text-right p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      selectedMessage?._id === msg._id ? 'bg-primary-50 border-r-4 border-r-primary-600' : ''
                    } ${!msg.isRead ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!msg.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
                          <p className={`text-sm truncate ${!msg.isRead ? 'font-bold' : 'font-medium'}`}>{msg.subject}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{msg.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-bold">{selectedMessage.name}</h3>
                        <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedMessage.isRead && (
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" /> مقروءة
                        </span>
                      )}
                      <button onClick={() => handleDelete(selectedMessage._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-gray-500">الموضوع:</span>
                      <p className="font-medium mt-1">{selectedMessage.subject}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">الرسالة:</span>
                      <p className="mt-2 p-4 bg-gray-50 rounded-lg text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                    </div>
                    {selectedMessage.phone && (
                      <div>
                        <span className="text-sm text-gray-500">رقم الهاتف:</span>
                        <p className="font-medium mt-1">{selectedMessage.phone}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-400 pt-4 border-t border-gray-100">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(selectedMessage.createdAt).toLocaleString('ar-SA')}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">اختر رسالة لعرض التفاصيل</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
