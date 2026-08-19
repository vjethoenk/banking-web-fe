import { useEffect, useState } from "react";
import { getAccounts, type Account } from "../banking/api/banking.api";
import { useAuthStore } from "../auth";
import { ROUTES } from "@/constants/routes";
import { BalanceCard } from "./components/BalanceCard";
import { QuickActions } from "./components/QuickActions";
import { RecentTransactions } from "./components/RecentTransactions";
import { SpendingChart } from "./components/SpendingChart";

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
  console.log("Account: ", accounts)

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <>
      < main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8" >
        <div className="mx-auto max-w-8xl">
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-xl font-semibold text-slate-900">
              Xin chào, {user?.username}!

            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Chào mừng bạn trở lại VinBank. Hôm nay bạn muốn làm gì?
            </p>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
            {/* Left */}
            <div className="space-y-3">
              {/* Balance + quick actions */}
              <div className="grid grid-cols-1 gap-3">
                <BalanceCard
                  totalBalance={totalBalance} />

                <QuickActions />
              </div>

              {/* Mobile quick actions */}
              <div className="md:hidden">
                <QuickActions />
              </div>

              {/* Transactions */}
              <RecentTransactions />
            </div>

            {/* Right */}
            <SpendingChart />
          </div>
        </div>
      </main >
    </>
  );
};