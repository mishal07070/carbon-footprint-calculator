import axios from 'axios';

// Set base URL for Axios requests
axios.defaults.baseURL = import.meta.env.VITE_URL; // Replace with your base URL

// Add a request interceptor to include JWT token in headers
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
