import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/stores/auth.store';
import { useLogout } from '../../features/auth/hooks/useLogout';
import { ROUTES } from '../../constants/routes';

export const DashboardLayout: React.FC = () => {
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const menuItems = [
    { name: 'Tổng quan', path: ROUTES.DASHBOARD, icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' },
    { name: 'Tài khoản', path: ROUTES.ACCOUNTS, icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { name: 'Chuyển tiền', path: ROUTES.TRANSFER, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  const adminItems = [
    { name: 'Quản lý Users', path: ROUTES.ADMIN_USERS },
    { name: 'Quản lý Roles', path: ROUTES.ADMIN_ROLES },
    { name: 'Quản lý Quyền', path: ROUTES.ADMIN_PERMISSIONS },
  ];

  const isAdmin = user?.roles.includes('ADMIN');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans transition-colors duration-300">
      
      {/* SIDEBAR FOR DESKTOP */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            B
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Banking System</h1>
            <span className="text-xs text-slate-500 font-medium">Enterprise portal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                    : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.name}
            </NavLink>
          ))}

          {/* ADMIN SIDEBAR SECTIONS */}
          {isAdmin && (
            <div className="pt-6 mt-6 border-t border-slate-800">
              <span className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-3">
                Hệ thống Admin
              </span>
              {adminItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                        : 'hover:bg-slate-800 hover:text-white text-slate-400'
                    }`
                  }
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}
        </nav>

        {/* LOGOUT BUTTON AND USER PROFILE */}
        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 p-2 bg-slate-800/40 rounded-xl">
            <div className="w-9 h-9 rounded-lg bg-slate-700 text-white flex items-center justify-center font-bold text-sm">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white truncate">{user?.username}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-800 hover:bg-rose-950/20 hover:text-rose-400 rounded-xl text-xs font-semibold text-slate-400 border border-slate-800 hover:border-rose-900/30 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <header className="md:hidden bg-slate-900 text-white flex items-center justify-between p-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            B
          </div>
          <span className="font-bold text-sm tracking-wider">BANKING WEB</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-850"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </header>

      {/* MOBILE NAV OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-850 p-4 space-y-3 z-50">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {isAdmin && (
            <div className="pt-2 border-t border-slate-800">
              <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Admin Pages</p>
              {adminItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold ${
                      isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-900'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-950/20 rounded-xl"
          >
            Đăng xuất
          </button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER BAR */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-end items-center shrink-0 shadow-sm z-10 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <span>Vai trò:</span>
            {user?.roles.map((role) => (
              <span
                key={role}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  role === 'ADMIN'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-400'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-400'
                }`}
              >
                {role}
              </span>
            ))}
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
