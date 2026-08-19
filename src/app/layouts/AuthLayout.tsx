import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/stores/auth.store';
import { ROUTES } from '../../constants/routes';

export const AuthLayout: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If already authenticated, skip login and go to dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Decorative background glow circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="w-full flex justify-center z-10">
        <Outlet />
      </div>

      <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-600 z-10">
        &copy; {new Date().getFullYear()} Banking Web. Bảo mật tuyệt đối &bull; Đẳng cấp quốc tế.
      </div>
    </div>
  );
};
              