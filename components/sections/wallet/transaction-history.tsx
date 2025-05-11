// components/wallet/TransactionHistory.tsx
'use client';

import { useWallet } from '../../../hooks/useWallet';
import { Text } from '../../../components/global/Text';
import { format } from 'date-fns';
import { formatNaira, koboToNaira } from '../../../lib/utils';

export const TransactionHistory = () => {
  const { transactions, loading } = useWallet();

  return (
    <div className="bg-[#00112b] rounded-lg p-4 sm:p-6 border border-[#1a3b6d] mt-6">
      <Text as="h3" style="text-white text-lg sm:text-xl font-bold mb-4">
        Transaction History
      </Text>

      {loading.transactions ? (
        <div className="flex justify-center py-4">
          <Text as="p" style="text-white">Loading transactions...</Text>
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex justify-center py-4">
          <Text as="p" style="text-[#CCD0D4]">No transactions yet</Text>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div 
              key={transaction._id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#001D48] rounded gap-2 sm:gap-4"
            >
              <div className="flex-1 min-w-0">
                <div title={transaction.description}>
                  <Text 
                    as="p" 
                    style="text-white font-medium truncate"
                  >
                    {transaction.description}
                  </Text>
                </div>
                <Text as="p" style="text-[#CCD0D4] text-xs sm:text-sm">
                  {format(new Date(transaction.createdAt), 'MMM dd, yyyy hh:mm a')}
                </Text>
              </div>
              <div className="flex-shrink-0">
                <Text 
                  as="p" 
                  style={`text-base sm:text-lg font-bold ${
                    transaction.transaction_type === 'fund' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {transaction.transaction_type === 'fund' ? '+' : '-'}{formatNaira(koboToNaira(transaction.amount))}
                </Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};