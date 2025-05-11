import { api } from "./api";

type TransactionType = 'fund' | 'payment' | 'withdrawal' | 'transfer' | 'refund';
type TransactionStatus = 'success' | 'failed' | 'pending' | 'reversed';
type UserType = 'customer' | 'vendor' | 'admin' | 'system';

export interface Transaction {
  _id: string;
  account: string;
  description: string;
  transaction_id: string;
  transaction_type: TransactionType;
  status: TransactionStatus;
  user_type: UserType;
  amount: number; // Amount in kobo
  balance: number | null; // Current balance in kobo after transaction
  date: string; // ISO 8601 date string
  createdAt: string;
  updatedAt: string;
  __v: number;
  // Optional fields
  order_number?: string;
  reference?: string;
  metadata?: Record<string, unknown>;
}

interface WithdrawalResponse {
  code: number;
  message: string;
  data: Transaction[];
  // Optional pagination fields if applicable
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface FundWalletPayload {
  amount: number;
  paymentMethod: 'card' | 'bank_transfer' | 'wallet';
  reference?: string;
}

export interface Wallet {
  _id: string;
  account: string;
  balance: number;
  user_type: string; // or more specific like 'customer' | 'vendor' | 'admin' if limited options
  status: string; // or more specific like 'active' | 'inactive' | 'suspended' if limited
  createdAt: string; // or Date if you'll convert it
  updatedAt: string; // or Date if you'll convert it
  __v: number;
}

interface WalletResponse {
  code: number;
  message: string;
  data: Wallet;
}

export interface TransactionResponse {
  code: number;
  message: string;
  data: Transaction;
}

export interface WalletBalanceResponse {
  code: number;
  message: string;
  data: {
    balance: number;
    currency: string;
  };
}


export const walletService = {
  async getWallet(token: string): Promise<WalletResponse> {
    return api.get<WalletResponse>('/wallet/customer', token);
  },

  async fundWallet(
    payload: FundWalletPayload,
    token: string
  ): Promise<TransactionResponse> {
    return api.post<TransactionResponse>('/wallet/fund', payload, token);
  },

  async getTransactions(
    token: string,
    page = 1,
    limit = 10
  ): Promise<{ code: number; message: string; data: Transaction[] }> {
    return api.get(`/wallet/customer/transaction?page=${page}&limit=${limit}`, token);
  }
};