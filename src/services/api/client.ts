import axios from 'axios';
import { setupInterceptors } from './interceptors';

// Create the single axios instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup global request/response interceptors (token injection, refresh token flow, error wrapping)
setupInterceptors(apiClient);
