import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://medmon-api.nusarithm.id';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/api/auth/login', credentials),
  register: (userData: { email: string; password: string; full_name: string; role?: string; organization?: string }) =>
    api.post('/api/auth/register', userData),
};

export const analyticsAPI = {
  getSentiment: (filters?: { start_date?: string; end_date?: string; keyword?: string }) =>
    api.get('/api/analytics/sentiment', { params: filters }),
  getTrend: (filters?: { start_date?: string; end_date?: string; keyword?: string }) =>
    api.get('/api/analytics/trend', { params: filters }),
  getMedia: (filters?: { start_date?: string; end_date?: string; keyword?: string; limit?: number }) =>
    api.get('/api/analytics/media', { params: filters }),
  getTrending: (filters?: { start_date?: string; end_date?: string; keyword?: string; limit?: number }) =>
    api.get('/api/analytics/trending', { params: filters }),
};

export const searchAPI = {
  search: (params: {
    query?: string;
    start_date?: string;
    end_date?: string;
    sentiment?: 'positif' | 'negatif' | 'netral';
    sources?: string;
    page?: number;
    page_size?: number;
  }) => api.get('/api/search', { params }),
};

export const usersAPI = {
  getAll: () => api.get('/api/users'),
  getById: (id: string) => api.get(`/api/users/${id}`),
  update: (id: string, data: { full_name?: string; organization?: string }) =>
    api.put(`/api/users/${id}`, data),
  delete: (id: string) => api.delete(`/api/users/${id}`),
};

export const clientsAPI = {
  getAll: () => api.get('/api/clients'),
  getById: (id: string) => api.get(`/api/clients/${id}`),
  create: (data: { name: string; contact_email?: string }) =>
    api.post('/api/clients', data),
  update: (id: string, data: { name: string; contact_email?: string }) =>
    api.put(`/api/clients/${id}`, data),
  delete: (id: string) => api.delete(`/api/clients/${id}`),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};
