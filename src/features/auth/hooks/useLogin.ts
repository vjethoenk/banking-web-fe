import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/auth.api';
import { useAuthStore } from '../stores/auth.store';
import type { LoginRequest } from '../types/auth.types';
import { ROUTES } from '../../../constants/routes';
import type { ApiError } from '../../../services/api/api.types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginApi(data);
      const { accessToken, refreshToken, user } = response.result;
      login(accessToken, refreshToken, user);
      navigate(ROUTES.HOME, { replace: true });
      return { success: true };
    } catch (err) {
      setError(err as ApiError);
      return { success: false, error: err as ApiError };
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};
