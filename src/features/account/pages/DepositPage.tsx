import { ArrowRight, } from "lucide-react";
import { Button } from "@/components/ui/button";
import DepositAccountCard from "../components/deposit/DepositAccountCard";
import DepositMethodCard, { DepositLimitNotice } from "../components/deposit/DepositMethodCard";
import DepositAmountCard from "../components/deposit/DepositAmountCard";
import { useEffect, useState } from "react";
import { getAccounts, type Account } from "@/features/banking/api/banking.api";
import { useAccountStore } from "../store/account.store";
import { apiUpdateDepositAccount } from "../api/account.api";

export default function DepositPage() {
    const { balance } = useAccountStore();
    const [accounts, setAccounts] = useState<Account[]>([])
    useEffect(() => {
        getAccounts()
            .then(setAccounts)
            .catch(console.error)
    }, []);



    const handleDeposit = async () => {
        const account = accounts[0];
        if (!account) return;

        await apiUpdateDepositAccount({ balance }, account.id);
        const updatedAccounts = await getAccounts();
        setAccounts(updatedAccounts);
    }

    return (
        <main className="min-h-screen bg-[#f8fafc] px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto ">
                {/* Page title */}
                <h1 className="mb-5 text-xl font-semibold text-slate-900 sm:text-2xl">
                    Nạp tiền vào tài khoản
                </h1>

                <div className="grid grid-cols-[2fr_1fr] gap-3 ">
                    {/* LEFT */}
                    <div className="space-y-3">
                        <DepositAccountCard accounts={accounts} />

                        <DepositAmountCard
                        />
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-3">
                        <DepositMethodCard />

                        <DepositLimitNotice />

                        <div className="flex justify-end pt-1">
                            <Button
                                className="h-8 rounded-lg bg-[#2454c5] px-3 text-xs font-semibold shadow-sm hover:bg-[#1946b4]"
                                onClick={handleDeposit}>
                                Xác nhận nạp tiền
                                <ArrowRight className="ml-1 h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}