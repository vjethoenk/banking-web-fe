import { Button } from "@/components/ui/button";
import ReceiverCard from "../componets/ReceiverCard";
import TransferAmountCard from "../componets/TransferAmountCard";
import FavoriteBeneficiaries from "../componets/FavoriteBeneficiaries";
import FromAccountCard from "../componets/FromAccountCard";
import { useEffect, useState } from "react";
import { getAccounts, type Account } from "@/features/banking/api/banking.api";
import { useTransferStore } from "../stores/transfer.stores";
import { useTransferInitiate, useVerifyOtpMailMutation } from "../hook/useTransfers";
import ConfirmTransferModal from "../componets/ConfirmTransferModal";
import { toast } from "sonner";
import TransactionSuccessModal from "../componets/TransactionSuccessModal";


export default function TransferPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    useEffect(() => {
        getAccounts()
            .then(setAccounts)
            .catch(console.error);
    }, []);

    const { receiverAccount, amount, description } = useTransferStore();
    const { mutateAsync: transferInitiate } = useTransferInitiate();
    const [transactionId, setTransactionId] = useState<string>("");
    const { mutateAsync: verifyOtpMail } = useVerifyOtpMailMutation();
    const setReceiverAccount = useTransferStore((state) => state.setReceiverAccount);
    const setAmount = useTransferStore((state) => state.setAmount);
    const setDescription = useTransferStore((state) => state.setDescription);
    const [isTransactionSuccessOpen, setIsTransactionSuccessOpen] = useState(false);


    const handleTransferInitiate = async () => {
        const res = await transferInitiate({
            senderAccount: accounts[0].accountNumber,
            receiverAccount: receiverAccount,
            amount: amount,
            description: description,
        });
        if (res) {
            setTransactionId(res.data.result.id);
            setIsConfirmOpen(true)
        }
    }
    const handleConfirmTransfer = async (otp: string) => {
        console.log("OTP:", otp);

        const res = await verifyOtpMail({
            transactionId: transactionId,
            otp: otp,
        })
        if (res) {
            setIsConfirmOpen(false)
            toast.success("Xác thực OTP thành công!")
            setReceiverAccount("");
            setAmount("");
            setDescription("");
            const updatedAccounts = await getAccounts();
            setAccounts(updatedAccounts);
        } else {
            toast.error("Xác thực OTP thất bại!")
        }

    };
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
                            <Button className="h-[35px] w-[100px] rounded-md bg-blue-700 text-[9px] font-semibold shadow-none hover:bg-blue-800" onClick={handleTransferInitiate}>
                                Tiếp tục
                            </Button>
                        </div>
                        <ConfirmTransferModal
                            open={isConfirmOpen}
                            onOpenChange={setIsConfirmOpen}
                            onBack={() => setIsConfirmOpen(false)}
                            onConfirm={handleConfirmTransfer}
                        />
                        <TransactionSuccessModal
                            open={isTransactionSuccessOpen}
                            onOpenChange={setIsTransactionSuccessOpen}
                        />
                    </div>

                    {/* RIGHT */}
                    <FavoriteBeneficiaries />
                </div>
            </div>
        </div>
    );
}