import { apiClient } from "@/services/api/client";
import type { TransferFormData } from "../types/transfer.types";

export const apiTransferInitiate= (data: TransferFormData) =>{
    return apiClient.post(`/transfers/initiate`, data)
}
export const apiVerifyOtpMail = (transactionId: string, otp: any)=>{
 return apiClient.post(`/transfers/verify?transactionId=${transactionId}&otp=${otp}`)
}