import { ChevronRight, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


export interface Beneficiary {
    name: string;
    bank: string;
    avatar: string;
}

export const beneficiaries: Beneficiary[] = [
    {
        name: "Me",
        bank: "VietTech - 123456...",
        avatar: "M",
    },
    {
        name: "Công ty Hùng...",
        bank: "ACB - 19453421",
        avatar: "H",
    },
    {
        name: "Lê Thị Hoa",
        bank: "VietBank - 56665...",
        avatar: "L",
    },
];
export default function FavoriteBeneficiaries() {
    return (
        <Card className="h-fit rounded-lg border-0 bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-[11px] font-semibold text-slate-700">
                    Thụ hưởng yêu thích
                </h2>

                <Search className="h-3.5 w-3.5 text-blue-600" />
            </div>

            <div className="mt-2">
                {beneficiaries.map((item, index) => (
                    <button
                        key={item.name}
                        type="button"
                        className="flex w-full items-center gap-2 border-b border-slate-50 py-2 text-left transition hover:bg-slate-50"
                    >
                        <div
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${
                                index === 0
                                    ? "bg-slate-200 text-slate-600"
                                    : "bg-indigo-100 text-indigo-600"
                            }`}
                        >
                            {item.avatar}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[9px] font-semibold text-slate-700">
                                {item.name}
                            </p>

                            <p className="truncate text-[7px] text-slate-400">
                                {item.bank}
                            </p>
                        </div>

                        <ChevronRight className="h-3 w-3 text-slate-400" />
                    </button>
                ))}
            </div>

            <Button
                variant="outline"
                className="mt-3 h-[28px] w-full rounded-md border-slate-200 text-[8px] text-slate-600 shadow-none hover:bg-slate-50"
            >
                <Plus className="mr-1 h-3 w-3" />
                Thêm mới
            </Button>
        </Card>
    );
}