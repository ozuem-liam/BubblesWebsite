'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '../../../lib/auth'
import { AuthLayout } from './AuthLayout'
import { AlertCircle } from 'lucide-react'

// Step type to track the current stage of password reset flow
type ResetStep = 'email' | 'verify-otp' | 'reset-password' | 'success'
const variantStyles = {
  danger: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: 'text-red-500',
    button: 'text-red-400 hover:text-red-600'
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-800',
    icon: 'text-amber-500',
    button: 'text-amber-400 hover:text-amber-600'
  }
}
const styles = variantStyles['danger']

export const PasswordReset = () => {
  const router = useRouter()

  // State management
  const [currentStep, setCurrentStep] = useState<ResetStep>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)

  // Handle sending OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required')
      return
    }

    try {
      setLoading(true)
      const response = await authService.sendOtp(email)

      // Save the token for OTP verification
      setToken(response?.data?.token)

      // Move to the next step
      setCurrentStep('verify-otp')

      // Set countdown for resend button
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to send verification code'
      )
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!otp) {
      setError('OTP is required')
      return
    }

    try {
      setLoading(true)

      const otpData = {
        email,
        otp,
        token,
      }

      await authService.verifyOtp(otpData)

      // Move to password reset step
      setCurrentStep('reset-password')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!password) {
      setError('Password is required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    try {
      setLoading(true)

      // Add the API call for resetting the password
      // Using a placeholder function - you'll need to implement this in your authService
      await authService.resetPassword({
        email,
        password,
        confirmPassword,
        token,
      })

      // Show success message
      setCurrentStep('success')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return

    try {
      setLoading(true)
      const response = await authService.sendOtp(email)
      setToken(response?.data?.token)

      // Reset countdown
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to resend verification code'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title={
        currentStep === 'email'
          ? 'Reset Password'
          : currentStep === 'verify-otp'
          ? 'Verify Code'
          : currentStep === 'reset-password'
          ? 'Set New Password'
          : currentStep === 'success'
          ? 'Success!'
          : 'email'
      }
      subTitle={
        currentStep === 'email'
          ? 'Enter your email to receive a verification code'
          : currentStep === 'verify-otp'
          ? 'Enter the code sent to your email'
          : currentStep === 'reset-password'
          ? 'Create a new password for your account'
          : currentStep === 'success'
          ? 'Your password has been reset successfully'
          : 'Enter your email to receive a verification code'
      }
    >
      {/* Error display */}
      {error && (
        <div
          className={`mb-4 px-4 py-3 border rounded flex items-start gap-3 ${styles.container}`}
        >
          <AlertCircle
            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${styles.icon}`}
          />
          <div className='flex-1 text-sm font-medium leading-relaxed'>
            {error}
          </div>
        </div>
      )}

      {/* Step 1: Enter Email */}
      {currentStep === 'email' && (
        <form onSubmit={handleSendOtp} className='space-y-4 w-full'>
          <div className='w-full'>
            <label
              htmlFor='email'
              className='block text-[14px] font-[500] text-gray-300 mb-1'
            >
              Email Address
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full md:text-md text-md font-[400] border border-grey-400 shadow-none h-[50px] rounded-sm flex items-center px-2'
              placeholder='Enter your email'
              required
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className={`h-[50px] rounded-sm flex items-center justify-center bg_linear-gradient text-white text-sm font-medium text-lg w-full ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Verification Code'}
          </button>
          <div className='text-center mt-4'>
            <a
              href='/auth/sign-in'
              className='text-blue-400 hover:text-blue-300 text-xs'
            >
              Back to Login
            </a>
          </div>
        </form>
      )}

      {/* Step 2: Verify OTP */}
      {currentStep === 'verify-otp' && (
        <form onSubmit={handleVerifyOtp} className='space-y-4 w-full'>
          <div className='w-full'>
            <label
              htmlFor='otp'
              className='block text-[14px] font-[500] text-gray-300 mb-1'
            >
              Verification Code
            </label>
            <input
              id='otp'
              type='text'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className='w-full md:text-md text-md font-[400] border border-grey-400 shadow-none h-[50px] rounded-sm flex items-center px-2'
              placeholder='Enter verification code'
              required
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className={`h-[50px] rounded-sm flex items-center justify-center bg_linear-gradient text-white text-sm font-medium text-lg w-full ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
          <div className='text-center mt-4 w-full'>
            <button
              type='button'
              onClick={handleResendOtp}
              disabled={countdown > 0 || loading}
              className={`h-[50px] rounded-sm flex items-center justify-center bg_linear-gradient text-white text-sm font-medium text-lg w-full ${
                countdown > 0 || loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Reset Password */}
      {currentStep === 'reset-password' && (
        <form onSubmit={handleResetPassword} className='space-y-4 w-full'>
          <div className='w-full'>
            <label
              htmlFor='password'
              className='block text-[14px] font-[500] text-gray-300 mb-1'
            >
              New Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full md:text-md text-md font-[400] border border-grey-400 shadow-none h-[50px] rounded-sm flex items-center px-2'
              placeholder='Enter new password'
              minLength={8}
              required
            />
          </div>
          <div className='w-full'>
            <label
              htmlFor='confirmPassword'
              className='block text-[14px] font-[500] text-gray-300 mb-1'
            >
              Confirm New Password
            </label>
            <input
              id='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full md:text-md text-md font-[400] border border-grey-400 shadow-none h-[50px] rounded-sm flex items-center px-2'
              placeholder='Confirm new password'
              required
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className={`h-[50px] rounded-sm flex items-center justify-center bg_linear-gradient text-white text-sm font-medium text-lg w-full${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      {/* Step 4: Success Message */}
      {currentStep === 'success' && (
        <div className='text-center w-full'>
          <div className='mb-6 flex justify-center'>
            <div className='w-16 h-16 bg-green-600 rounded-full flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-8 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>
          </div>
          <p className='text-gray-300 mb-6'>
            Your password has been reset successfully.
          </p>
          <button
            onClick={() => router.push('/auth/sign-in')}
            className='h-[50px] rounded-sm flex items-center justify-center bg_linear-gradient text-white text-sm font-medium text-lg w-full'
          >
            Return to Login
          </button>
        </div>
      )}
    </AuthLayout>
  )
}
