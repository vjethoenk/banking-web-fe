import { useEffect, useState } from "react";
import { getAccounts, type Account } from "../banking/api/banking.api";
import { useAuthStore } from "../auth";
import { ROUTES } from "@/constants/routes";

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccounts()
      .then(setAccounts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/10">
        <h2 className="text-lg font-medium opacity-80">Xin chào, {user?.username}!</h2>
        <p className="text-3xl font-extrabold mt-2 tracking-tight">
          {loading ? '---' : totalBalance.toLocaleString('vi-VN')} VND
        </p>
        <p className="text-xs opacity-70 mt-1">Tổng tài sản hiện tại trong hệ thống</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4">Hoạt động nhanh</h3>
          <div className="grid grid-cols-2 gap-4">
            <a href={ROUTES.TRANSFER} className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-semibold text-center hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors">
              Chuyển tiền
            </a>
            <a href={ROUTES.ACCOUNTS} className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-semibold text-center hover:bg-indigo-100 dark:hover:bg-indigo-950/40 transition-colors">
              Xem tài khoản
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center items-center text-center">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Quyền hạn</h3>
          <p className="text-lg font-extrabold text-slate-800 dark:text-white">
            {user?.roles.join(', ')}
          </p>
          <p className="text-xs text-slate-500 mt-1">Vai trò của bạn trong hệ thống phân quyền Frontend</p>
        </div>
      </div>
    </div>
  );
};