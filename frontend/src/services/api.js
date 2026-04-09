import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const isLocalHost =
  isBrowser &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const BASE_URL =
  process.env.REACT_APP_API_URL ||
  (isLocalHost ? 'http://localhost:3001' : '');

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to extract data from backend response structure
api.interceptors.response.use(
  (response) => {
    // Backend returns data in response.data.data structure
    // Flatten the response to just return the data property
    if (response.data && response.data.data !== undefined) {
      return {
        ...response,
        data: response.data.data,
      };
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User API calls
export const userAPI = {
  getAll: () => api.get('/api/users'),
  getById: (id) => api.get(`/api/users/${id}`),
  create: (data) => api.post('/api/users', data),
  update: (id, data) => api.put(`/api/users/${id}`, data),
  delete: (id) => api.delete(`/api/users/${id}`),
};

// Project API calls
export const projectAPI = {
  getAll: () => api.get('/api/projects'),
  getById: (id) => api.get(`/api/projects/${id}`),
  create: (data) => api.post('/api/projects', data),
  update: (id, data) => api.put(`/api/projects/${id}`, data),
  delete: (id) => api.delete(`/api/projects/${id}`),
};

// Service API calls
export const serviceAPI = {
  getAll: () => api.get('/api/services'),
  getById: (id) => api.get(`/api/services/${id}`),
  create: (data) => api.post('/api/services', data),
  update: (id, data) => api.put(`/api/services/${id}`, data),
  delete: (id) => api.delete(`/api/services/${id}`),
};

// Reference (Contact) API calls
export const referenceAPI = {
  getAll: () => api.get('/api/references'),
  getById: (id) => api.get(`/api/references/${id}`),
  create: (data) => api.post('/api/references', data),
  update: (id, data) => api.put(`/api/references/${id}`, data),
  delete: (id) => api.delete(`/api/references/${id}`),
};

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
};

export default api;
