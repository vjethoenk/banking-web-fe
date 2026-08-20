import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useTransferStore } from "../stores/transfer.stores";

interface ConfirmTransferModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBack: () => void;
    onConfirm: (otp: string) => void;
}

export default function ConfirmTransferModal({
    open,
    onOpenChange,
    onBack,
    onConfirm,
}: ConfirmTransferModalProps) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const {receiverAccount, amount, description, receiverUserName} = useTransferStore();

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        }
    }, [open]);

    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value.slice(-1);

        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleConfirm = () => {
        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            return;
        }

        onConfirm(otpValue);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="min-w-[400px] gap-0 rounded-xl border-0 bg-white p-5 shadow-2xl "
            >
                <DialogHeader>
                    <DialogTitle className="text-center text-[16px] font-semibold text-slate-800">
                        Xác nhận giao dịch
                    </DialogTitle>
                </DialogHeader>

                {/* Transfer information */}
                <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                    {/* Amount */}
                    <div className="border-b border-slate-200 px-4 py-4 text-center">
                        <p className="text-[9px] text-slate-400">
                            Số tiền chuyển
                        </p>

                        <p className="mt-1 text-[22px] font-bold text-blue-700">
                            {amount}
                        </p>
                    </div>

                    {/* Transaction information */}
                    <div>
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                            <span className="text-[9px] text-slate-500">
                                Tài khoản
                            </span>

                            <span className="text-[9px] font-semibold text-slate-700">
                                {receiverAccount}
                            </span>

                        </div>
                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                            <span className="text-[9px] text-slate-500">
                                Tên người nhận
                            </span>

                            <span className="text-[9px] font-semibold text-slate-700">
                                {receiverUserName}
                            </span>

                        </div>

                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                            <span className="text-[9px] text-slate-500">
                                Phí giao dịch
                            </span>

                            <span className="text-[9px] font-semibold text-slate-700">
                                0 VNĐ
                            </span>

                        </div>

                        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                            <span className="text-[9px] text-slate-500">
                                Nội dung
                            </span>

                            <span className="text-[9px] font-semibold text-slate-700">
                               {description}
                            </span>

                        </div>
                    </div>
                </div>

                {/* OTP */}
                <div className="mt-5">
                    <div className="flex items-center justify-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-700" />

                        <p className="text-[9px] font-medium text-blue-700">
                            Vui lòng nhập mã Smart OTP đã được gửi đến thiết bị
                            của bạn.
                        </p>
                    </div>

                    {/* OTP Inputs */}
                    <div className="mt-3 flex justify-center gap-2">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                ref={(element) => {
                                    inputRefs.current[index] = element;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={value}
                                onChange={(e) =>
                                    handleOtpChange(e.target.value, index)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, index)
                                }
                                className="h-9 w-9 rounded-md border border-slate-200 bg-white text-center text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        className="mt-2 w-full text-center text-[9px] font-medium text-blue-600 hover:text-blue-800"
                    >
                        Gửi lại mã ngay
                    </button>
                </div>

                {/* Actions */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onBack}
                        className="h-[38px] border-slate-200 text-[10px] font-medium text-slate-600 shadow-none hover:bg-slate-50"
                    >
                        Quay lại
                    </Button>

                    <Button
                        type="button"
                        onClick={handleConfirm}
                        disabled={otp.join("").length !== 6}
                        className="h-[38px] bg-blue-700 text-[10px] font-semibold shadow-none hover:bg-blue-800"
                    >
                        Xác nhận chuyển tiền
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}