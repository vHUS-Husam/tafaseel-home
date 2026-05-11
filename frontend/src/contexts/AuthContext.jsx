import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api.js';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const { data } = await authAPI.getMe();
      setUser(data.user);
    } catch {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await authAPI.login(credentials);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast.success('تم تسجيل الدخول بنجاح');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في تسجيل الدخول');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await authAPI.register(userData);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast.success('تم إنشاء الحساب بنجاح! يرجى تأكيد بريدك الإلكتروني');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في إنشاء الحساب');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      toast.success('تم تسجيل الخروج');
    }
  };

  const updateProfile = async (data) => {
    try {
      const { data: res } = await authAPI.updateProfile(data);
      setUser(res.user);
      toast.success('تم تحديث الملف الشخصي');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'خطأ في التحديث');
      return { success: false };
    }
  };

  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff' || isAdmin;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAdmin, isStaff, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};
