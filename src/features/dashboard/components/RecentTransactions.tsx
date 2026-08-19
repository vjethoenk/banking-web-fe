import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, MoreHorizontal, Receipt, Utensils } from "lucide-react";

export const RecentTransactions = () => {
    const transactions = [
  {
    name: "Rút tiền ATM",
    date: "08:30 08/10/2024",
    amount: "-5,000,000 ₫",
    type: "Chi tiêu",
    icon: ArrowDownLeft,
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Chuyển khoản lương",
    date: "17:00 05/10/2024",
    amount: "+20,000,000 ₫",
    type: "Thu nhập",
    icon: ArrowUpRight,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Ăn uống",
    date: "19:30 04/10/2024",
    amount: "-1,250,000 ₫",
    type: "Ăn uống",
    icon: Utensils,
    color: "bg-slate-100 text-slate-500",
  },
  {
    name: "Thanh toán điện",
    date: "11:00 03/10/2024",
    amount: "-550,000 ₫",
    type: "Hóa đơn",
    icon: Receipt,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Chuyển khoản online",
    date: "09:15 02/10/2024",
    amount: "-8,000,000 ₫",
    type: "Chuyển khoản",
    icon: ArrowLeftRight,
    color: "bg-slate-100 text-slate-500",
  },
];

  return (
    <Card className="overflow-hidden rounded-lg border-slate-200 bg-white shadow-none">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-4 py-3">
        <CardTitle className="text-xs font-semibold text-slate-800">
          Giao dịch gần đây
        </CardTitle>

        <button className="text-[9px] font-medium text-blue-600 hover:underline">
          Xem tất cả
        </button>
      </CardHeader>

      {/* List */}
      <CardContent className="p-0">
        {transactions.map((transaction, index) => {
          const Icon = transaction.icon;
          const isIncome = transaction.amount.startsWith("+");

          return (
            <div
              key={transaction.name}
              className={`flex items-center justify-between px-4 py-2.5 ${
                index !== transactions.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              {/* Left */}
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${transaction.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[9px] font-medium text-slate-700">
                    {transaction.name}
                  </p>

                  <p className="mt-0.5 text-[7px] text-slate-400">
                    {transaction.date}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="ml-3 shrink-0 text-right">
                <p
                  className={`text-[9px] font-medium ${
                    isIncome
                      ? "text-blue-600"
                      : "text-slate-700"
                  }`}
                >
                  {transaction.amount}
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-1.5 py-0.5 text-[6px] ${
                    isIncome
                      ? "bg-green-50 text-green-600"
                      : transaction.type === "Ăn uống"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-green-50 text-green-600"
                  }`}
                >
                  {transaction.type}
                </span>
              </div>
            </div>
          );
        })}

        {/* More */}
        <div className="flex justify-center border-t border-slate-100 py-2">
          <button className="flex items-center gap-1 text-[8px] text-slate-400 hover:text-blue-600">
            <MoreHorizontal className="h-3 w-3" />
            Xem thêm
          </button>
        </div>
      </CardContent>
    </Card>
  );
}