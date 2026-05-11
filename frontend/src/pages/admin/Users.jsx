import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Shield, User } from 'lucide-react';
import { userAPI } from '../../services/api.js';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await userAPI.getAll();
      setUsers(data.users);
    } catch (error) {
      toast.error('خطأ في تحميل المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await userAPI.updateRole(id, { role });
      toast.success('تم تحديث الدور');
      fetchUsers();
    } catch (error) {
      toast.error('خطأ في التحديث');
    }
  };

  const toggleStatus = async (id) => {
    try {
      await userAPI.toggleStatus(id);
      toast.success('تم تحديث الحالة');
      fetchUsers();
    } catch (error) {
      toast.error('خطأ في التحديث');
    }
  };

  const roleBadge = (role) => {
    switch (role) {
      case 'admin': return <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">مدير</span>;
      case 'staff': return <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">موظف</span>;
      default: return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">عميل</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">إدارة المستخدمين</h1>

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
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">المستخدم</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">البريد</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الهاتف</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الدور</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الحالة</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-primary-600" />
                            </div>
                          )}
                          <span className="font-medium text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                      <td className="px-6 py-4">{roleBadge(user.role)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {user.isActive ? 'نشط' : 'معطل'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <select
                            value={user.role}
                            onChange={(e) => updateRole(user._id, e.target.value)}
                            className="text-xs px-2 py-1 rounded-lg border border-gray-200 bg-white"
                          >
                            <option value="customer">عميل</option>
                            <option value="staff">موظف</option>
                            <option value="admin">مدير</option>
                          </select>
                          <button
                            onClick={() => toggleStatus(user._id)}
                            className={`p-2 rounded-lg transition-colors ${
                              user.isActive ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'
                            }`}
                            title={user.isActive ? 'تعطيل' : 'تفعيل'}
                          >
                            {user.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
