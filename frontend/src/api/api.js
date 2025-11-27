import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Send token on every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Friendly errors (no crash!)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 400) {
      alert(error.response.data.message || 'Invalid email or password');
    } else if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.message === 'Network Error') {
      alert('Backend offline. Run: npm run dev in backend folder');
    }
    return Promise.reject(error);
  }
);

export default API;