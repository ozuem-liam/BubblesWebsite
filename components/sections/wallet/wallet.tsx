'use client'

import { TransactionHistory } from './transaction-history'
import { WalletCard } from './wallet-card'

export const Wallet = () => {
  return (
    <main className='min-h-screen relative overflow-hidden'>
      <div className='relative z-10 container mx-auto px-4 py-6'>
        <div>
          {/* Header Section */}
          <div className='text-start mb-8 animate-fade-in'>
            <p className='text-lg'>
              Fund your wallet, track transactions, and stay in control of your
              money.
            </p>
          </div>

          <div className='grid grid-cols-1 xl:grid-cols-5 gap-8'>
            {/* Wallet Card - Enhanced */}
            <div className='xl:col-span-2 animate-slide-up'>
              <WalletCard />
            </div>

            {/* Transaction History - Enhanced */}
            <div className='xl:col-span-3 animate-slide-up delay-200'>
              <div className='bg-white rounded-lg border border-gray-300 overflow-hidden'>
                <div className='bg-gray-100 p-4'>
                  <h3 className='text-black text-2xl font-bold flex items-center gap-3'>
                    <div className='w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center'>
                      <svg
                        className='w-8 h-8 text-white'
                        fill='none'
                        stroke='#002F6C'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                        />
                      </svg>
                    </div>
                    Transaction History
                  </h3>
                  <p className='text-black mt-2'>
                    Track all your wallet activities
                  </p>
                </div>
                <div className='p-4'>
                  <TransactionHistory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </main>
  )
}
