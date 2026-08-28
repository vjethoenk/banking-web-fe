import {
    Check,
    Download,
    Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

interface TransactionSuccessModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function TransactionSuccessModal({
    open,
    onOpenChange,
}: TransactionSuccessModalProps) {
    const handleContinue = () => {
        onOpenChange(false);

        // navigate("/dashboard");
    };

    const handleDownload = () => {
        console.log("Download receipt");
    };

    const handleShare = () => {
        console.log("Share transaction");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="max-w-[330px] overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
            >
                <div className="px-4 pb-4 pt-5">
                    {/* Success Icon */}
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-700">
                            <Check className="h-3 w-3 stroke-[3] text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mt-3 text-center">
                        <h2 className="text-[13px] font-bold text-slate-800">
                            Giao dịch thành công
                        </h2>

                        <p className="mt-1 text-[6px] text-slate-400">
                            Lúc 14:30:45 - 24/10/2024
                        </p>
                    </div>

                    {/* Amount */}
                    <div className="mt-3 text-center">
                        <p className="text-[18px] font-bold tracking-wide text-blue-800">
                            -5,000,000 VND
                        </p>
                    </div>

                    {/* Separator */}
                    <div className="relative mt-3 border-t border-dashed border-slate-200">
                        {/* Left cut */}
                        <div
                            className="
                                absolute -left-[22px] -top-[7px] h-3 w-3 rounded-full bg-slate-100 "
                        />

                        {/* Right cut */}
                        <div
                            className="absolute -right-[22px] -top-[7px] h-3 w-3 rounded-full bg-slate-100"
                        />
                    </div>

                    {/* Transaction details */}
                    <div className="mt-2">
                        <div
                            className="flex items-center justify-between border-b border-slate-100 py-2"
                        >
                            <span className="text-[7px] text-slate-500">
                                Mã giao dịch
                            </span>

                            <span className="max-w-[160px] truncate text-right text-[7px] font-semibold text-slate-700">
                                124242342
                            </span>
                        </div>

                    </div>

                    {/* Continue button */}
                    <Button
                        onClick={handleContinue}
                        className="mt-5 h-[28px] w-full rounded-md bg-blue-700 text-[8px] font-semibold shadow-none hover:bg-blue-800"
                    >
                        Thực hiện giao dịch mới
                    </Button>

                    {/* Bottom actions */}
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            onClick={handleDownload}
                            className="h-[28px] rounded-md border-slate-200 text-[7px] text-blue-700 shadow-none hover:bg-slate-50"
                        >
                            <Download className="mr-1 h-2.5 w-2.5" />
                            Tải biên lai
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={handleShare}
                            className="h-[28px] rounded-md bg-slate-100 text-[7px] text-slate-600 shadow-none hover:bg-slate-200"
                        >
                            <Share2 className="mr-1 h-2.5 w-2.5" />
                            Chia sẻ
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}