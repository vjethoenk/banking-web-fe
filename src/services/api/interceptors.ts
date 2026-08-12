import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import type { ApiError } from './api.types';
import { useAuthStore } from '../../features/auth/stores/auth.store';
import { ROUTES } from '../../constants/routes';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const getDefaultErrorMessage = (status?: number): string => {
  switch (status) {
    case 401:
      return 'Phiên đăng nhập đã hết hạn';
    case 403:
      return 'Bạn không có quyền truy cập';
    case 404:
      return 'Không tìm thấy tài nguyên';
    case 500:
      return 'Hệ thống đang gặp sự cố';
    default:
      return 'Đã xảy ra lỗi hệ thống';
  }
};

export const setupInterceptors = (apiClient: AxiosInstance) => {
  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => {
      const data = response.data;
      // If server returns success code 1000, we proceed normally
      // If code is not 1000, wrap as ApiError and reject
      if (data && typeof data === 'object' && 'code' in data) {
        if (data.code !== 1000) {
          const apiError: ApiError = {
            code: data.code,
            message: data.message || 'Error occurred',
            result: null,
          };
          return Promise.reject(apiError);
        }
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      const status = error.response?.status;
      const responseData = error.response?.data as any;

      // Extract details if it is a structured error
      let apiError: ApiError;
      if (responseData && typeof responseData === 'object' && 'code' in responseData) {
        apiError = {
          code: responseData.code,
          message: responseData.message || getDefaultErrorMessage(status),
          result: null,
        };
      } else {
        apiError = {
          code: status || 500,
          message: getDefaultErrorMessage(status),
          result: null,
        };
      }

      // Handle 401 (Unauthorized / Expired Token)
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

        if (refreshToken) {
          if (isRefreshing) {
            // Queue this request and wait for token refresh
            return new Promise((resolve, reject) => {
              failedQueue.push({
                resolve: (token: string) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  resolve(apiClient(originalRequest));
                },
                reject: (err: any) => {
                  reject(err);
                },
              });
            });
          }

          isRefreshing = true;

          try {
            // Attempt to refresh token using a raw axios post to prevent interceptor loops
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
            const response = await axios.post(
              `${baseUrl}/auth/refresh`,
              { refreshToken },
              { headers: { 'Content-Type': 'application/json' } }
            );

            const result = response.data;
            if (result && result.code === 1000 && result.result?.accessToken) {
              const newAccessToken = result.result.accessToken;
              
              // Update state in Zustand store & localStorage
              useAuthStore.getState().setAccessToken(newAccessToken);
              
              processQueue(null, newAccessToken);
              isRefreshing = false;

              // Retry original request
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return apiClient(originalRequest);
            } else {
              throw new Error('Refresh token invalid or expired');
            }
          } catch (refreshErr) {
            processQueue(refreshErr, null);
            isRefreshing = false;
            
            // Clear auth store and redirect to login
            useAuthStore.getState().clearAuth();
            window.location.href = ROUTES.LOGIN;
            return Promise.reject(apiError);
          }
        } else {
          // No refresh token available, logout and redirect
          useAuthStore.getState().clearAuth();
          window.location.href = ROUTES.LOGIN;
          return Promise.reject(apiError);
        }
      }

      // Handle 403 Forbidden
      if (status === 403) {
        window.location.href = ROUTES.FORBIDDEN;
        return Promise.reject(apiError);
      }

      // For other errors, reject with apiError
      return Promise.reject(apiError);
    }
  );
};
