import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (username, password) => 
  api.post('/token/', { username, password });

export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const getHistory = () => api.get('/history/');

export default api;