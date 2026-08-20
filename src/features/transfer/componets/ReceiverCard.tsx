import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useVerifyReceiverAccountMutation } from "@/features/account/hook/useCreateAccount";
import { useTransferStore } from "../stores/transfer.stores";


export default function ReceiverCard() {
    const setReceiverAccount = useTransferStore(s => s.setReceiverAccount);
    const setReceiverUserName = useTransferStore(s => s.setReceiverUserName);
    const { receiverUserName } = useTransferStore();
    const { receiverAccount } = useTransferStore()
    const {
        mutate: verifyReceiverAccount,
        isPending,
    } = useVerifyReceiverAccountMutation();

    const handleVerifyAccount = () => {
        if (!receiverAccount.trim()) {
            return;
        }

        verifyReceiverAccount(receiverAccount, {
            onSuccess: (data) => {
                setReceiverUserName(data.result.username);
            },
        });
    };

    return (
        <Card className="rounded-lg border-0 bg-white p-3 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
            <h2 className="border-b border-slate-100 pb-2 text-[12px] font-semibold text-slate-800">
                Đến người nhận
            </h2>

            <div className=" grid grid-cols-1 ">
                <div>
                    <label className="mb-1 block text-[10px] font-medium text-slate-500">
                        Số tài khoản
                    </label>

                    <Input
                        placeholder="Nhập số tài khoản"
                        name="receiverAccount"
                        onChange={(e) => setReceiverAccount(e.target.value)}
                        value={receiverAccount}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleVerifyAccount();
                            }
                        }}
                        className="h-[35px] rounded-md border-slate-200 text-[10px] shadow-none focus-visible:ring-0"
                    />
                </div>
            </div>

            {isPending && (
                <p className="mt-2 text-[9px] text-slate-400">
                    Đang kiểm tra tài khoản...
                </p>
            )}

            {receiverUserName && !isPending && (
                <div className=" flex h-[52px] items-center justify-between rounded-md bg-slate-50 px-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-600">
                            T
                        </div>

                        <div>
                            <p className="text-[10px] text-slate-400">
                                Tên người nhận
                            </p>

                            <p className="text-[10px] font-semibold text-slate-700">
                                {receiverUserName}
                            </p>
                        </div>
                    </div>

                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                        <Check className="h-2.5 w-2.5" />
                    </div>
                </div>
            )}

        </Card>
    );
}