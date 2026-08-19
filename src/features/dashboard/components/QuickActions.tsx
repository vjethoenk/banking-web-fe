import { ArrowUpRight, Phone, QrCode, Receipt } from "lucide-react";
import { Link } from "react-router-dom";

export const QuickActions = () => {
    const quickActions = [
        {
            label: "Chuyển tiền",
            icon: ArrowUpRight,
            path: "/chuyentien"
        },
        {
            label: "Thanh toán",
            icon: Receipt,
            path: ""
        },
        {
            label: "Nạp tiền",
            icon: Phone,
            path: "/deposit"
        },
        {
            label: "Quét QR",
            icon: QrCode,
            path: ""
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                    <button
                        key={action.label}
                        className="flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-2 text-center transition hover:border-blue-300 hover:bg-blue-50"
                    >
                        <Link to={action.path}>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                                <Icon className="h-3.5 w-3.5 text-blue-600" />
                            </div>

                            <span className="whitespace-pre-line text-[9px] font-medium leading-3 text-slate-700">
                                {action.label}
                            </span></Link>
                    </button>
                );
            })}
        </div>
    );
}