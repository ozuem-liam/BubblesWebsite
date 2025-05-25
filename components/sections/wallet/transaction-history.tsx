'use client';

import { useWallet } from '../../../hooks/useWallet';
import { Text } from '../../../components/global/Text';
import { format } from 'date-fns';
import { formatNaira, koboToNaira } from '../../../lib/utils';
import { Skeleton } from '../../../components/ui/skeleton';

export const TransactionHistory = () => {
  const { transactions, loading } = useWallet();

  return (
    <div className="bg-white rounded-lg">
      {loading.transactions ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <div className="space-y-2">
                <Skeleton className="h-4 w-48 bg-gray-200" />
                <Skeleton className="h-3 w-32 bg-gray-200" />
              </div>
              <Skeleton className="h-5 w-20 bg-gray-200" />
            </div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 border border-gray-200 rounded-lg">
          <svg 
            className="w-12 h-12 text-gray-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <Text as="p" style="text-gray-500">No transactions yet</Text>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div 
              key={transaction._id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors gap-2 sm:gap-4"
            >
              <div className="flex-1 min-w-0">
                <Text 
                  as="p" 
                  style="text-gray-800 text-sm font-medium truncate"
                  data-title={transaction.description}
                >
                  {transaction.description}
                </Text>
                <Text as="p" style="text-gray-500 text-xs">
                  {format(new Date(transaction.createdAt), 'MMM dd, yyyy hh:mm a')}
                </Text>
              </div>
              <div className="flex-shrink-0">
                <Text 
                  as="p" 
                  style={`text-base font-bold ${
                    transaction.transaction_type === 'fund' ? 'text-green-600' : 'text-red-600'
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