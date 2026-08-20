import { create } from "zustand";


interface TransferState {
    receiverUserName: string;
    receiverAccount: string;
    amount: string;
    description: string;
    setReceiverUserName: (userName: string) => void;
    setReceiverAccount: (account: string) => void;
    setAmount: (amount: string) => void;
    setDescription: (description: string) => void;
}

export const useTransferStore = create<TransferState>((set) => ({
    receiverUserName: "",
    receiverAccount: "",
    amount: "",
    description: "",
    setReceiverUserName: (receiverUserName: string) => set({ receiverUserName }),
    setReceiverAccount: (account: string) => set({ receiverAccount: account }),
    setAmount: (amount: string) => set({ amount }),
    setDescription: (description: string) => set({ description }),
}))