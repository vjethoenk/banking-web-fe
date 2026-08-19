import { Card } from "@/components/ui/card";
import { Button } from "@base-ui/react/button";
import { Copy, CreditCard } from "lucide-react";

interface IProps {
    totalBalance: number;
}
export const BalanceCard = ({ totalBalance }: IProps) => {
    return (
        <Card className="overflow-hidden rounded-lg border-0 bg-transparent shadow-none p-0">
            <div className="relative min-h-[145px] overflow-hidden rounded-lg bg-gradient-to-br from-[#2454c5] to-[#1946b4] p-4 text-white shadow-sm">
                {/* Decorative */}
                <div className="absolute -right-8 -top-12 h-32 w-32 rounded-full bg-white/5" />
                <div className="absolute -right-20 top-8 h-32 w-32 rounded-full bg-white/5" />

                {/* Header */}
                <div className="relative flex items-start justify-between">
                    <div>
                        <p className="text-[10px] font-medium text-blue-100">
                            Tổng số dư khả dụng
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                            {totalBalance.toLocaleString('vi-VN')}
                            <span className="ml-1 text-sm font-medium">VND</span>
                        </p>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-black/20">
                        <CreditCard className="h-4 w-4 text-white/80" />
                    </div>
                </div>

                {/* Bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                        <p className="text-[12px] text-blue-200">
                            Tài khoản thanh toán
                        </p>

                        <p className="mt-0.5 text-[10px] font-semibold">
                            0987 6543 2109
                        </p>
                    </div>

                    <Button
                        className="h-6 gap-1 rounded-sm bg-white/20 px-2 text-[9px] text-white shadow-none hover:bg-white/30 flex items-center justify-center"
                    >
                        <Copy className="h-2 w-2" />
                        <span>Copy</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
}