import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


const quickAmounts = ["100k", "500k", "1M", "Max"];

export default function TransferAmountCard() {
    return (
        <Card className="rounded-lg border-0 bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
            <label className=" block text-[10px] font-medium text-slate-500">
                Số tiền chuyển (VND)
            </label>

            <div className="flex h-[38px] items-center rounded-md border border-slate-200 px-3">
                <span className="text-[12px] text-slate-600">
                    ₫
                </span>

                <Input
                    className="h-full border-0 px-2 text-right text-[14px] font-semibold text-slate-800 shadow-none focus-visible:ring-0"
                />
            </div>

            <div className="mt-1.5 flex gap-1">
                {quickAmounts.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className="rounded bg-slate-100 px-2 py-0.5 text-[9px] text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="mt-3">
                <label className="mb-1 block text-[10px] font-medium text-slate-500">
                    Nội dung
                </label>

                <Textarea
                    defaultValue="Nguyen Van A chuyen tien"
                    className="min-h-[42px] resize-none rounded-md border-slate-200 text-[9px] shadow-none focus-visible:ring-0"
                />
            </div>
        </Card>
    );
}