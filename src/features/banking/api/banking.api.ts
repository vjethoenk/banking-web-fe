import { apiClient } from '../../../services/api/client';
import type { ApiResponse } from '../../../services/api/api.types';

export interface BankAccount {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  currency: string;
}

// Re-export as Account for backward compatibility
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

/**
 * Lấy danh sách tài khoản ngân hàng của user hiện tại.
 * API /users/my-info trả về UserProfile, accounts nằm trong result.accounts
 */
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
