import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiTransferInitiate, apiVerifyOtpMail } from "../api/transfer.api"
import { toast } from "sonner";

export const useTransferInitiate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: apiTransferInitiate,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["transfer"] })
            toast.success("Tạo giao dịch thành công!")
        },
        onError: () => {
            toast.error("Tạo giao dịch thất bại!")
        }
    })

}

export const useVerifyOtpMailMutation = () => {
    return useMutation({
        mutationFn: async ({
            transactionId,
            otp,
        }: {
            transactionId: string;
            otp: string;
        }) => {
            const res = await apiVerifyOtpMail(transactionId, otp);

            return res.data;
        },
    });
};