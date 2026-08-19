import { Card, CardContent } from "@/components/ui/card";
import type { Account } from "@/features/banking/api/banking.api";
import { Landmark } from "lucide-react";

interface IProps {
    accounts: Account[];
}
export default function DepositAccountCard({ accounts }: IProps) {
    const primaryAccount = accounts[0];
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
    return (
        <Card className="rounded-lg border-slate-200 bg-white shadow-none">
            <CardContent className="p-2.5">
                <p className="mb-2 text-[11px] font-semibold text-slate-800">
                    Tài khoản
                </p>

                <div className="flex items-center justify-between rounded-md border border-slate-200 px-2.5 py-2">
                    <div className="flex items-center gap-2.5">
                        {/* Bank icon */}
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2d5ed0]">
                            <Landmark className="h-4 w-4 text-white" />
                        </div>

                        <div>
                            <p className="text-[9px] text-slate-400">
                                Tài khoản Thanh toán
                            </p>

                            <p className="text-xs font-semibold text-slate-900">
                                {primaryAccount?.accountNumber}
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-[10px] text-slate-400">
                            Số dư khả dụng
                        </p>

                        <p className="text-[12px] font-semibold text-blue-600">
                            {totalBalance.toLocaleString("vi-VN")}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}