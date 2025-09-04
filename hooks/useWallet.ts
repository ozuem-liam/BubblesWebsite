// // hooks/useWallet.ts
// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/auth-context';
// import { Wallet, Transaction, walletService, FundWalletPayload } from '../lib/wallet';

// export const useWallet = () => {
//   const { token } = useAuth();
//   const [wallet, setWallet] = useState<Wallet | null>(null);
//   const [balance, setBalance] = useState<number>(0);
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState({
//     wallet: false,
//     transactions: false,
//     funding: false
//   });
//   const [error, setError] = useState<string | null>(null);

//   const getWallet = async () => {
//     if (!token) return;
    
//     try {
//       setLoading(prev => ({ ...prev, wallet: true }));
//       const response = await walletService.getWallet(token);
//       setWallet(response.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch wallet');
//     } finally {
//       setLoading(prev => ({ ...prev, wallet: false }));
//     }
//   };

//   const getTransactions = async (page = 1, limit = 10) => {
//     if (!token) return;
    
//     try {
//       setLoading(prev => ({ ...prev, transactions: true }));
//       const response = await walletService.getTransactions(token, page, limit);
//       setTransactions(response.data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
//     } finally {
//       setLoading(prev => ({ ...prev, transactions: false }));
//     }
//   };

//   const fundWallet = async (payload: FundWalletPayload) => {
//     if (!token) return;
    
//     try {
//       setLoading(prev => ({ ...prev, funding: true }));
//       const response = await walletService.fundWallet(payload, token);
//       await getWallet(); // Refresh balance after funding
//       return response;
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fund wallet');
//       throw err;
//     } finally {
//       setLoading(prev => ({ ...prev, funding: false }));
//     }
//   };

//   useEffect(() => {
//     getWallet();
//     getTransactions();
//   }, [token]);

//   return {
//     wallet,
//     balance,
//     transactions,
//     loading,
//     error,
//     getWallet,
//     getTransactions,
//     fundWallet,
//     refresh: () => {
//       getWallet();
//       getTransactions();
//     }
//   };
// };