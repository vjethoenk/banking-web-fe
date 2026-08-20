import { Button } from "@/components/ui/button";
import ReceiverCard from "../componets/ReceiverCard";
import TransferAmountCard from "../componets/TransferAmountCard";
import FavoriteBeneficiaries from "../componets/FavoriteBeneficiaries";
import FromAccountCard from "../componets/FromAccountCard";
import { useEffect, useState } from "react";
import { getAccounts, type Account } from "@/features/banking/api/banking.api";

export default function TransferPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    useEffect(() => {
        getAccounts()
            .then(setAccounts)
            .catch(console.error);
    }, []);
    return (
        <div className="min-h-screen bg-[#f5f7fa] px-5 py-5">
            <div className="mx-auto ">
                {/* Header */}
                <div className="mb-4">
                    <h1 className="text-[20px] font-semibold tracking-tight text-slate-900">
                        Chuyển tiền
                    </h1>

                    <p className="mt-1 text-[11px] text-blue-600">
                        Nhập thông tin người nhận và số tiền.
                    </p>
                </div>

                <div className="grid grid-cols-[2fr_1fr] gap-3">
                    {/* LEFT */}
                    <div className="space-y-4">
                        <FromAccountCard account={accounts} />

                        <ReceiverCard />

                        <TransferAmountCard />

                        <div className="flex justify-end pt-0">
                            <Button className="h-[35px] w-[100px] rounded-md bg-blue-700 text-[9px] font-semibold shadow-none hover:bg-blue-800">
                                Tiếp tục
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <FavoriteBeneficiaries />
                </div>
            </div>
        </div>
    );
}