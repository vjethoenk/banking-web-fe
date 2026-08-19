import { create } from "zustand";

interface AccountState {
    balance: number;
    setBalance: (balance: number) => void;
}

export const useAccountStore = create<AccountState>()((set) => ({
    balance: 0,
    setBalance: (balance) => set({ balance }),
}));