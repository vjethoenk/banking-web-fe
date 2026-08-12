import { apiClient } from '../../../services/api/client';
import type { ApiResponse } from '../../../services/api/api.types';
import type { LoginRequest, LoginResponse, RegisterRequest, UserProfile } from '../types/auth.types';

export const loginApi = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', data);
  return response.data;
};

export const registerApi = async (data: RegisterRequest) => {
  const response = await apiClient.post('/users', data);
  return response.data;
};
export const refreshTokenApi = async (refreshToken: string): Promise<ApiResponse<{ accessToken: string }>> => {
  const response = await apiClient.post<ApiResponse<{ accessToken: string }>>('/auth/refresh', { refreshToken });
  return response.data;
};

export const getMyInfoApi = async (): Promise<UserProfile> => {
  const response = await apiClient.get<ApiResponse<UserProfile>>('/users/my-info');
  return response.data.result;
};
