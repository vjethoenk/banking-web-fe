import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/stores/auth.store';
import { useLogout } from '../../features/auth/hooks/useLogout';
import Sidebar from '@/features/dashboard/components/Sidebar';
import TopHeader from '@/features/dashboard/components/TopHeader';
import { adminItems, menuItems } from '@/constants/navigation';

export const DashboardLayout: React.FC = () => {
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.roles?.includes("ADMIN") ?? false;

  return (
    <div className="flex min-h-screen bg-[#f4f6f9] font-sans text-slate-800">
      {/* Desktop Sidebar */}
      <Sidebar
        isAdmin={isAdmin}
        handleLogout={handleLogout}
      />

      {/* Mobile */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* <MobileHeader
          open={mobileMenuOpen}
          onToggle={() =>
            setMobileMenuOpen((prev) => !prev)
          }
        /> */}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white p-3 md:hidden">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block rounded-md px-3 py-2 text-xs",
                      isActive
                        ? "bg-[#dbe5ff] font-semibold text-[#2453c5]"
                        : "text-slate-500 hover:bg-slate-100",
                    ].join(" ")
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {isAdmin && (
              <div className="mt-3 border-t border-slate-200 pt-3">
                <p className="mb-2 px-3 text-[9px] font-semibold uppercase text-slate-400">
                  Quản trị
                </p>

                {adminItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={({ isActive }) =>
                      [
                        "block rounded-md px-3 py-2 text-xs",
                        isActive
                          ? "bg-[#dbe5ff] font-semibold text-[#2453c5]"
                          : "text-slate-500 hover:bg-slate-100",
                      ].join(" ")
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main */}
        <main className="flex min-w-0 flex-1 flex-col">
          <TopHeader
            handleLogout={handleLogout}
          />

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full ">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
