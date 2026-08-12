import { apiClient } from '../../../services/api/client';
import type { ApiResponse } from '../../../services/api/api.types';

export interface BankAccount {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
}

export type Account = BankAccount;

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  status: 'SUCCESS' | 'FAILED';
}

export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  description: string;
}

export const getAccounts = async (): Promise<BankAccount[]> => {
  const response = await apiClient.get<ApiResponse<{ accounts: BankAccount[] }>>('/users/my-info');
  return response.data.result.accounts;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await apiClient.get<ApiResponse<Transaction[]>>('/transactions');
  return response.data.result;
};

export const transferApi = async (data: TransferRequest): Promise<Transaction> => {
  const response = await apiClient.post<ApiResponse<Transaction>>('/transfer', data);
  return response.data.result;
};
