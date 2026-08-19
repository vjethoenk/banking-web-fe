import { Card, CardContent } from "@/components/ui/card";
import { Check, CircleAlert, CreditCard, QrCode, Wallet } from "lucide-react";

export default function DepositMethodCard() {
    return (
        <Card className="rounded-lg border-slate-200 bg-white shadow-none">
            <CardContent className="p-2">
                <p className="mb-2 px-0.5 text-[11px] font-semibold text-slate-800">
                    Phương thức nạp
                </p>

                {/* QR / Bank transfer */}
                <button
                    type="button"
                    className="w-full rounded-md border border-blue-500 bg-blue-50 px-2 py-2 text-left"
                >
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600">
                            <Check className="h-2.5 w-2.5 text-white" />
                        </div>

                        <QrCode className="h-3.5 w-3.5 text-blue-700" />

                        <div className="flex-1">
                            <p className="text-[9px] font-semibold text-slate-800">
                                Chuyển khoản / QR
                            </p>

                            <p className="mt-0.5 text-[7px] text-slate-500">
                                Miễn phí giao dịch
                            </p>
                        </div>

                        <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600">
                            <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                    </div>
                </button>

                {/* QR */}
                <div className="mt-1 rounded-md border border-slate-200 bg-slate-50 p-2">
                    <div className="mx-auto flex h-[75px] w-[75px] items-center justify-center rounded-md border border-slate-200 bg-white">
                        <QrCode className="h-12 w-12 text-slate-700" />
                    </div>

                    <p className="mt-1.5 text-center text-[7px] text-slate-500">
                        Hoặc chuyển khoản đến:
                    </p>

                    <p className="text-center text-[8px] font-medium text-slate-700">
                        Ngân hàng TMCP ABC
                    </p>

                    <div className="flex items-center justify-center gap-1">
                        <p className="text-[9px] font-bold text-blue-700">
                            190345678910
                        </p>

                        <button type="button">
                            <CreditCard className="h-2.5 w-2.5 text-blue-600" />
                        </button>
                    </div>
                </div>

                {/* ATM */}
                <DepositMethodOption
                    icon={<CreditCard className="h-3 w-3" />}
                    title={
                        <>
                            Thẻ ATM / Visa /
                            <br />
                            Mastercard
                        </>
                    }
                />

                {/* Wallet */}
                <DepositMethodOption
                    icon={<Wallet className="h-3 w-3" />}
                    title="Ví điện tử liên kết"
                />
            </CardContent>
        </Card>
    );
}

export function DepositMethodOption({
    icon,
    title,
}: {
    icon: React.ReactNode;
    title: React.ReactNode;
}) {
    return (
        <button
            type="button"
            className="mt-1 flex min-h-[38px] w-full items-center gap-2 rounded-md border border-slate-200 px-2 text-left transition hover:border-blue-300 hover:bg-blue-50"
        >
            <div className="h-3 w-3 rounded-full border border-slate-300" />

            <span className="text-blue-700">{icon}</span>

            <span className="text-[8px] font-medium leading-3 text-slate-700">
                {title}
            </span>
        </button>
    );
}

/* =========================================================
 * LIMIT NOTICE
 * ========================================================= */

export function DepositLimitNotice() {
    return (
        <div className="rounded-md bg-slate-100 px-2.5 py-2.5">
            <div className="flex gap-1.5">
                <CircleAlert className="mt-0.5 h-3 w-3 shrink-0 text-slate-500" />

                <div className="text-[7px] leading-3 text-slate-500">
                    <p>
                        Hạn mức tối đa/ngày:
                    </p>

                    <p className="font-medium text-slate-600">
                        500,000,000 VND
                    </p>

                    <p className="mt-0.5">
                        • Giao dịch thường được xử lý ngay lập
                        tức. Nếu sau 15 phút chưa được tiền,
                        vui lòng liên hệ CSKH.
                    </p>
                </div>
            </div>
        </div>
    );
}