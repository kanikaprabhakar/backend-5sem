import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      Cookies.remove('user');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error.response?.data || error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  getMy: () => api.get('/products/my/products'),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const biddingAPI = {
  place: (productId, bidPrice) => api.post('/biddings', { productId, bidPrice }),
  getMy: () => api.get('/biddings/my'),
  getByProduct: (productId) => api.get(`/biddings/product/${productId}`),
  delete: (id) => api.delete(`/biddings/${id}`),
};

export default api;