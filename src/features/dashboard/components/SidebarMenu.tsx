import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavigationItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

interface NavItemProps {
  item: NavigationItem;
}

export function NavItem({ item }: NavItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        [
          "flex items-center gap-2 rounded-md px-3 py-2",
          "text-[12px] font-medium transition-all duration-200",
          isActive
            ? "bg-[#dbe5ff] text-[#2453c5]"
            : "text-slate-500 hover:bg-slate-100 hover:text-[#2453c5]",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`h-3.5 w-3.5 shrink-0 ${
              isActive ? "text-[#2453c5]" : "text-slate-500"
            }`}
            strokeWidth={1.8}
          />

          <span className="truncate">
            {item.name}
          </span>
        </>
      )}
    </NavLink>
  );
}