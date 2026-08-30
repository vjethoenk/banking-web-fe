import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, isLoading, error } = useLogin();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    await handleLogin({ username, password });
  };

  const fillCredentials = (user: 'admin' | 'customer') => {
    if (user === 'admin') {
      setUsername('admin');
      setPassword('admin');
    } else {
      setUsername('VietHoang2');
      setPassword('123456789');
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl transition-all duration-300">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl shadow-lg shadow-blue-500/20 mb-4 animate-pulse">
          B
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          Chào mừng quay trở lại!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          Đăng nhập vào tài khoản Banking Web của bạn
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Tên đăng nhập
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            placeholder="Nhập tên đăng nhập..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Mật khẩu
            </label>
            <a
              href="/forgot-password"
              className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors"
            >
              Quên mật khẩu?
            </a>
          </div>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-xl flex items-start gap-3">
            <svg
              className="w-5 h-5 text-rose-500 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="text-sm font-medium text-rose-800 dark:text-rose-400 leading-normal">
              {error.message}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          disabled={isLoading || !username.trim() || !password}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Đang xác thực...
            </>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>

      <div className="flex justify-center mt-4">
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
          Bạn mới biết đến chúng tôi? <a href="/register" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors">Đăng ký tài khoản mới</a>
        </p>
      </div>
      <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-6">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center mb-3">
          Tài khoản Demo nhanh
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            onClick={() => fillCredentials('customer')}
          >
            Vai: CUSTOMER
          </button>
          <button
            type="button"
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            onClick={() => fillCredentials('admin')}
          >
            Vai: ADMIN
          </button>
        </div>
      </div>
    </div>
  );
};
