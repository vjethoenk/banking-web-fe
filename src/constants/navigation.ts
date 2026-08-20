import {
  ArrowLeftRight,
  CircleDollarSign,
  CreditCard,
  History,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  //   Smartphone,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";

export const menuItems = [
  {
    name: "Trang chủ",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Tài khoản",
    path: "/accounts",
    icon: WalletCards,
  },
  {
    name: "Chuyển tiền",
    path: "/transfer",
    icon: ArrowLeftRight,
  },
  {
    name: "Thanh toán",
    path: "/payments",
    icon: CreditCard,
  },
  {
    name: "Người thụ hưởng",
    path: "/beneficiaries",
    icon: UserRound,
  },
  {
    name: "Lịch sử",
    path: "/transactions",
    icon: History,
  },
  {
    name: "Cài đặt",
    path: "/settings",
    icon: Settings,
  },
];

export const adminItems = [
  {
    name: "Quản lý người dùng",
    path: "/admin/users",
    icon: UsersRound,
  },
  {
    name: "Quản lý tài khoản",
    path: "/admin/accounts",
    icon: WalletCards,
  },
  {
    name: "Giao dịch",
    path: "/admin/transactions",
    icon: CircleDollarSign,
  },
  {
    name: "Bảo mật",
    path: "/admin/security",
    icon: ShieldCheck,
  },
];