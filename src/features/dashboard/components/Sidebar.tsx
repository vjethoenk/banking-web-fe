import { LogOut, ShieldCheck } from "lucide-react";

import { menuItems, adminItems } from "@/constants/navigation";
import { NavItem } from "./SidebarMenu";

interface SidebarProps {
  isAdmin: boolean;
  handleLogout: () => void;
}

export default function Sidebar({
  isAdmin,
  handleLogout,
}: SidebarProps) {
  return (
    <aside className="hidden h-screen w-[250px] shrink-0 border-r border-slate-200 bg-[#f8fafc] md:flex md:flex-col">
      {/* Logo */}
      <div className="flex h-12 items-center border-b border-slate-200 px-5">
        <span className="text-lg font-bold text-[#2453c5]">
          VinaBank
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavItem
              key={item.name}
              item={item}
            />
          ))}
        </div>

        {/* Admin */}
        {isAdmin && (
          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
              Quản trị
            </p>

            <div className="space-y-1">
              {adminItems.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                />
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="space-y-2 border-t border-slate-200 p-2">
      

        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-[12px] text-slate-500 transition hover:bg-blue-50 hover:text-[#2453c5]"
        >
          <ShieldCheck className="h-4 w-4" />

          <span>An toàn & Bảo mật</span>
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-2 flex w-full items-center gap-2 rounded-md px-3 py-2 text-[12px] font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-500"
        >
          <LogOut className="h-4 w-4" />

          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}