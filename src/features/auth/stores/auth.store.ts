import { create } from 'zustand';
import type { User } from '../types/auth.types';
import { STORAGE_KEYS } from '../../../constants/storageKeys';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string | undefined, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  clearAuth: () => void;
}

// Helper functions to safely fetch stored variables on store initialization
const getStoredToken = () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
const getStoredRefreshToken = () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
const getStoredUser = (): User | null => {
  try {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: getStoredToken(),
  refreshToken: getStoredRefreshToken(),
  user: getStoredUser(),
  isAuthenticated: !!getStoredToken(),

  login: (accessToken, refreshToken, user) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    } else {
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

    set({
      accessToken,
      refreshToken: refreshToken || null,
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
    set({ user });
  },

  setAccessToken: (accessToken) => {
    if (accessToken) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      set({ accessToken, isAuthenticated: true });
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      set({ accessToken: null, isAuthenticated: false });
    }
  },

  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    set({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
  }
}));
