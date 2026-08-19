import { apiClient } from "@/services/api/client";
import type { AccountFormData } from "../types/account.types";


export const apiUpdateUser = (data: AccountFormData, id: string) => {
    const response = apiClient.put(`/users/${id}`, data)
    return response;
}
export const apiCreateAccount = (data: { accountType: string }) => {
    const response = apiClient.post(`/accounts`, data)
    return response;
}
export const apiUpdateDepositAccount = (data: { balance: number }, id: string) => {
    const response = apiClient.put(`/accounts/deposit/${id}`, data)
    return response;
}