import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children, adminOnly, staffOnly }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    toast.error('يرجى تسجيل الدخول أولاً');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    toast.error('غير مصرح بالوصول');
    return <Navigate to="/" replace />;
  }

  if (staffOnly && user.role === 'customer') {
    toast.error('غير مصرح بالوصول');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
