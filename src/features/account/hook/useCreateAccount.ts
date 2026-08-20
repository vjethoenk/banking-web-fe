import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCreateAccount, apiUpdateDepositAccount, apiUpdateUser } from "../api/account.api";
import type { AccountFormData } from "../types/account.types";
import { useAuthStore } from "@/features/auth";
import { toast } from "sonner";

export const useCreateAccountMutation = (accountType: string) => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => apiCreateAccount({ accountType }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
    })
}

export const useUpdateUserMutation = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: AccountFormData) => apiUpdateUser(data, useAuthStore.getState().user?.id || ""),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
    })
}

export const useUpdateDepositAccountMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            balance,
        }: {
            id: string;
            balance: number;
        }) => apiUpdateDepositAccount(id, { balance }),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["accounts"],
            });

            toast.success("Nạp tiền thành công");
        },
    });
};