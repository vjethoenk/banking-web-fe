import {
  Bell,
  Globe2,
  UserCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface TopHeaderProps {
  username?: string;
  handleLogout: () => void;
}

export default function TopHeader({
  username,
  handleLogout,
}: TopHeaderProps) {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5">
      {/* Left */}
      <div className="flex items-center gap-7">
        <a
          href="#"
          className="text-[12px] font-medium text-slate-500 transition hover:text-[#2453c5]"
        >
          Hỗ trợ
        </a>

        <a
          href="#"
          className="text-[12px] font-medium text-slate-500 transition hover:text-[#2453c5]"
        >
          Tin tức
        </a>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="text-slate-500 transition hover:text-[#2453c5]"
        >
          <Bell className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          className="text-slate-500 transition hover:text-[#2453c5]"
        >
          <Globe2 className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          className="text-slate-500 transition hover:text-[#2453c5]"
        >
          <UserCircle className="h-3.5 w-3.5" />
        </button>

        <Button
          type="button"
          onClick={handleLogout}
          className="h-6 rounded-md bg-[#2453c5] px-3 text-[9px] font-semibold hover:bg-[#1945aa]"
        >
          Đăng xuất
        </Button>
      </div>
    </header>
  );
}