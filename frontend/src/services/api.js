import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tafasel-home-ps.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  verifyEmail: (token) => api.get(`/auth/verify-email?token=${token}`),
};

export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (slug) => api.get(`/products/${slug}`),
  getAdmin: () => api.get('/products/admin/all'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getOne: (slug) => api.get(`/categories/${slug}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getAll: () => api.get('/orders/all'),
  getOne: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
};

export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  getProductReviews: (productId) => api.get(`/reviews/product/${productId}`),
  delete: (id) => api.delete(`/reviews/${id}`),
};

export const messageAPI = {
  create: (data) => api.post('/messages', data),
  getAll: () => api.get('/messages'),
  getOne: (id) => api.get(`/messages/${id}`),
  delete: (id) => api.delete(`/messages/${id}`),
};

export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

export const userAPI = {
  getAll: () => api.get('/users'),
  updateRole: (id, data) => api.put(`/users/${id}/role`, data),
  toggleStatus: (id) => api.put(`/users/${id}/toggle-status`),
  addToWishlist: (productId) => api.put(`/users/wishlist/${productId}`),
};


export const logAPI = {
  getLogs: (params) => api.get('/logs', { params }),
  getLogStats: () => api.get('/logs/stats'),
};
