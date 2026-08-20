import { apiClient } from "@/services/api/client";
import type { AccountFormData, ReceiverAccountType } from "../types/account.types";
import type { ApiResponse } from "@/services/api/api.types";


export const apiUpdateUser = (data: AccountFormData, id: string) => {
    const response = apiClient.put(`/users/${id}`, data)
    return response;
}
export const apiCreateAccount = (data: { accountType: string }) => {
    const response = apiClient.post(`/accounts`, data)
    return response;
}
export const apiUpdateDepositAccount = (
    id: string,
    data: { balance: number }
) => {
    return apiClient.put(`/accounts/deposit/${id}`, data);
};

export const apiVerifyReceiverAccount = (accountNumber: string) => {
    return apiClient.get<ApiResponse<ReceiverAccountType>>(`/accounts/verify/${accountNumber}`);
}