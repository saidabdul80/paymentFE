// src/axios-instance.js
import axios from 'axios';

// Create an instance of axios
const instance = axios.create();

// Request interceptor
instance.interceptors.request.use(config => {
  // Modify the config as needed, for example, setting headers
  config.headers['Content-Type'] = 'application/json';
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

export default instance;
