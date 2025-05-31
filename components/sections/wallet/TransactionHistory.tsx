'use client'

import { useWallet } from '../../../hooks/useWallet'
import { format } from 'date-fns'
import { formatNaira, koboToNaira } from '../../../lib/utils'
import { Skeleton } from '../../ui/skeleton'
import { useState } from 'react'

export const TransactionHistory = () => {
  const { transactions, loading } = useWallet()
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === 'all' || transaction.transaction_type === filter
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'fund':
        return (
          <div className='w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          </div>
        )
      default:
        return (
          <div className='w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M20 12H4'
              />
            </svg>
          </div>
        )
    }
  }

  if (loading.transactions) {
    return (
      <div className='space-y-4'>
        {/* Loading skeleton for filters */}
        <div className='flex flex-col sm:flex-row gap-4 mb-6'>
          <Skeleton className='h-12 w-full sm:w-64 bg-gray-200 rounded-xl' />
          <div className='flex gap-2'>
            <Skeleton className='h-12 w-20 bg-gray-200 rounded-xl' />
            <Skeleton className='h-12 w-20 bg-gray-200 rounded-xl' />
            <Skeleton className='h-12 w-20 bg-gray-200 rounded-xl' />
          </div>
        </div>

        {/* Loading skeleton for transactions */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className='bg-white/60 rounded-2xl p-4 border border-gray-100'
          >
            <div className='flex items-center gap-4'>
              <Skeleton className='w-10 h-10 bg-gray-200 rounded-xl' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-48 bg-gray-200' />
                <Skeleton className='h-3 w-32 bg-gray-200' />
              </div>
              <Skeleton className='h-6 w-20 bg-gray-200 rounded-lg' />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {filteredTransactions.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 bg-white/60 rounded-3xl border border-gray-100'>
          <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6'>
            <svg
              className='w-12 h-12 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
          </div>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>
            {searchTerm || filter !== 'all'
              ? 'No matching transactions'
              : 'No transactions yet'}
          </h3>
          <p className='text-gray-500 text-center max-w-md'>
            {searchTerm || filter !== 'all'
              ? "Try adjusting your search or filter to find what you're looking for."
              : 'Your transaction history will appear here once you start using your wallet.'}
          </p>
          {!searchTerm && filter === 'all' && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className='mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105'
            >
              Fund Your Wallet
            </button>
          )}
        </div>
      ) : (
        <div className='space-y-3'>
          {filteredTransactions.map((transaction, index) => (
            <div
              key={transaction._id}
              className='group p-4 border border-gray-200 bg-gray-100 rounded-md transition-all duration-300 hover:scale-[1.02] animate-fade-in-up'
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className='flex items-center gap-4'>
                {/* Transaction Details */}
                <div className='flex-1 min-w-0'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='min-w-0 flex-1'>
                      <h4 className='text-gray-800 font-semibold text-lg truncate group-hover:text-blue-600 transition-colors duration-200'>
                        {transaction.description}
                      </h4>
                      <div className='flex items-center gap-4 mt-1'>
                        <p className='text-gray-500 text-sm'>
                          {format(
                            new Date(transaction.createdAt),
                            'MMM dd, yyyy'
                          )}
                        </p>
                        <span className='text-gray-400'>•</span>
                        <p className='text-gray-500 text-sm'>
                          {format(new Date(transaction.createdAt), 'hh:mm a')}
                        </p>
                      </div>
                    </div>

                    {/* Transaction Amount */}
                    <div className='flex flex-col items-end'>
                      <p
                        className={`text-xl font-bold ${
                          transaction.transaction_type === 'fund'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.transaction_type === 'fund' ? '+' : '-'}
                        {formatNaira(koboToNaira(transaction.amount))}
                      </p>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                          transaction.transaction_type === 'fund'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {transaction.transaction_type === 'fund'
                          ? 'Credit'
                          : 'Debit'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
