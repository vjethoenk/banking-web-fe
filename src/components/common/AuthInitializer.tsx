import { useEffect, useState } from 'react';
import { useAuthStore } from '../../features/auth/stores/auth.store';
import { getMyInfoApi } from '../../features/auth/api/auth.api';

interface AuthInitializerProps {
  children: React.ReactNode;
}

/**
 * AuthInitializer: Khi F5 (page reload), nếu có accessToken trong localStorage,
 * gọi /users/my-info để đồng bộ lại thông tin user vào store.
 * Hiển thị loading spinner cho đến khi xong.
 */
export const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const { accessToken, setUser, clearAuth } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      setIsInitializing(false);
      return;
    }

    // Có token → gọi API để lấy thông tin user mới nhất
    getMyInfoApi()
      .then((profile) => {
        // Chuyển UserProfile → User (flatten roles/permissions)
        setUser({
          id: profile.id,
          username: profile.username,
          email: profile.email,
          roles: profile.roles.map((r) => r.name),
          permissions: profile.roles.flatMap((r) => r.permissions.map((p) => p.name)),
        });
      })
      .catch(() => {
        // Token không hợp lệ → xóa auth, để interceptor redirect về login
        clearAuth();
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }, []); // Chỉ chạy 1 lần khi app mount

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg animate-pulse">
            B
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <svg className="animate-spin h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Đang xác thực...
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
