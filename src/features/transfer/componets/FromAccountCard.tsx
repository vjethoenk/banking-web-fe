import { Building2, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Account } from "@/features/banking/api/banking.api";

export default function FromAccountCard({ account }: { account: Account[] }) {
    const primaryAccount = account[0];
    const totalBalance = account.reduce((sum, account) => sum + account.balance, 0);
    return (
        <Card className="rounded-lg border-0 bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
            <p className=" text-[12px] font-medium text-slate-500">
                Từ tài khoản
            </p>

            <button
                type="button"
                className="flex h-[44px] w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 transition hover:bg-slate-50"
            >
                <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                        <Building2 className="h-4 w-4" />
                    </div>

                    <div className="text-left">
                        <p className="text-[11px] font-semibold text-slate-700">
                            {primaryAccount?.accountNumber}
                        </p>

                        <p className="text-[9px] text-blue-600">
                            Số dư: {totalBalance.toLocaleString("vi-VN")} VNĐ
                        </p>
                    </div>
                </div>

                <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
        </Card>
    );
}