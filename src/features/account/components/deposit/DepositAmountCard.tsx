import { Card, CardContent } from "@/components/ui/card";
import { useAccountStore } from "../../store/account.store";

export default function DepositAmountCard() {
    const amounts = [
        "100.000",
        "200.000",
        "500.000",
        "1.000.000",
        "2.000.000",
        "5.000.000",
    ];
    const setBalance = useAccountStore((state) => state.setBalance)
    const balance = useAccountStore((state) => state.balance)
    return (
        <Card className="rounded-lg border-slate-200 bg-white shadow-none">
            <CardContent className="p-2.5">
                <p className="mb-2 text-[11px] font-semibold text-slate-800">
                    Số tiền nạp
                </p>

                {/* Amount input */}
                <div className="flex h-[54px] items-center rounded-md border border-slate-200 px-3">
                    <span className="mr-3 text-sm font-semibold text-slate-700">
                        VND
                    </span>

                    <input
                        type="text"
                        name="balance"
                        value={balance}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setBalance(Number(value));
                        }}
                        className="w-full border-0 bg-transparent text-xl font-semibold text-slate-900 outline-none placeholder:text-slate-300"
                    />
                </div>

                {/* Presets */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {amounts.map((amount) => {
                        // const selected = amount === "500.000";

                        return (
                            <button
                                key={amount}
                                type="button"
                                onClick={() => setBalance(Number(amount))}
                                className={`rounded-full border px-2.5 py-1 text-[8px] font-medium transition border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600`}
                            >
                                {amount}
                            </button>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}