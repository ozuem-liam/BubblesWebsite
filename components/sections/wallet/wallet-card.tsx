'use client'

import { useWallet } from '../../../hooks/useWallet'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { formatNaira, koboToNaira } from '../../../lib/utils'

export const WalletCard = () => {
  const { wallet, loading, fundWallet } = useWallet()
  const [amount, setAmount] = useState('')
  const [isFunding, setIsFunding] = useState(false)
  const [isCardFlipped, setIsCardFlipped] = useState(false)

  const handleFundWallet = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setIsFunding(true)
    try {
      await fundWallet({
        amount: Number(amount),
        paymentMethod: 'card',
      })
      toast.success('Wallet funded successfully!')
      setAmount('')
    } catch (error) {
      toast.error('Failed to fund wallet')
    } finally {
      setIsFunding(false)
    }
  }

  const quickAmounts = [1000, 5000, 10000, 20000]

  return (
    <div className='space-y-6'>
      {/* Main Wallet Card */}
      <div className='relative group'>
        <div
          className={`relative w-full h-54 transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
            isCardFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setIsCardFlipped(!isCardFlipped)}
        >
          {/* Front of Card */}
          <div className='absolute inset-0 w-full h-full backface-hidden'>
            <div className='h-full bg_linear-gradient rounded-lg p-8 text-white relative overflow-hidden'>
              {/* Animated background pattern */}
              <div className='absolute inset-0 opacity-20'>
                <div className='absolute top-4 right-4 w-32 h-32 border border-white/60 rounded-full animate-pulse'></div>
                <div className='absolute bottom-4 left-4 w-24 h-24 border border-white/50 rounded-full animate-ping'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/40 rounded-full animate-spin-slow'></div>
              </div>

              <div className='relative z-10 h-full flex flex-col justify-between'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-blue-100 text-sm font-medium'>
                      Bubbles Wallet
                    </p>
                    <p className='text-white/90 text-xs mt-1'>Click to flip</p>
                  </div>
                  <div className='w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
                    <svg
                      className='w-6 h-6 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <p className='text-blue-100 text-sm mb-2'>Current Balance</p>
                  {loading.wallet ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin'></div>
                      <div className='h-8 w-32 bg-white/20 rounded-lg animate-pulse'></div>
                    </div>
                  ) : (
                    <p className='text-4xl font-bold text-white tracking-wider'>
                      {formatNaira(koboToNaira(wallet?.balance))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div className='absolute inset-0 w-full h-full backface-hidden rotate-y-180'>
            <div className='h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg p-8 text-white'>
              <div className='h-full flex flex-col justify-center items-center text-center'>
                <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4'>
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                    />
                  </svg>
                </div>
                <h3 className='text-xl font-bold mb-2'>Secure Wallet</h3>
                <p className='text-gray-300 text-sm mb-4'>
                  Your transactions are protected with bank-level security
                </p>
                <div className='flex gap-2'>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100'></div>
                  <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Wallet Section */}
      <div className='bg-white rounded-lg border border-gray-300  p-4'>
        <div className='flex items-center gap-3 mb-6'>
          <div className='p-2 rounded-full bg-gray-300'>
            <svg
              className='w-5 h-5 text-white'
              fill='none'
              stroke='#002F6C'
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
          <h3 className='text-2xl font-bold text-gray-800'>Fund Wallet</h3>
        </div>

        {/* Quick Amount Buttons */}
        <div className='mb-6'>
          <p className='text-gray-600 text-sm mb-3'>Quick amounts</p>
          <div className='grid grid-cols-2 gap-3'>
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount.toString())}
                className='p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-xl text-gray-700 font-medium transition-all duration-200 hover:scale-101'
              >
                ₦{quickAmount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className='space-y-6'>
          <div>
            <label className='block text-gray-700 text-sm font-medium mb-3'>
              Custom Amount
            </label>
            <div className='relative'>
              <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium'>
                ₦
              </div>
              <Input
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='0.00'
                className='pl-8 h-12 text-lg bg-white/90 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-xl transition-all duration-200'
              />
            </div>
          </div>

          <Button
            onClick={handleFundWallet}
            disabled={loading.funding || isFunding || !amount}
            className='w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:scale-100'
          >
            {loading.funding || isFunding ? (
              <span className='flex items-center gap-3'>
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                Processing Payment...
              </span>
            ) : (
              <span className='flex items-center gap-2'>
                <svg
                  className='w-5 h-5'
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
                Fund Wallet
              </span>
            )}
          </Button>
        </div>

        <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100'>
          <div className='flex items-start gap-3'>
            <div className='w-5 h-5 text-blue-600 mt-0.5'>
              <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div>
              <p className='text-blue-800 text-sm font-medium'>
                Secure Payment
              </p>
              <p className='text-blue-600 text-xs mt-1'>
                All transactions are encrypted and processed securely
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}
