import axios from 'axios';
import { getSession } from 'next-auth/react';

const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
const trimmedBaseUrl = rawBaseUrl.replace(/\/+$/, '');
const baseURL = trimmedBaseUrl.endsWith('/api/v1')
  ? trimmedBaseUrl.slice(0, -'/api/v1'.length)
  : trimmedBaseUrl;

const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.error('[v0] Error getting session:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
