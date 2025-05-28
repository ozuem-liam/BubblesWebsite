'use client'

import { useEffect, useState, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/global/InputField'
import { AuthLayout } from './AuthLayout'
import { toast } from 'sonner'
import { useAuth } from '../../../contexts/auth-context'
import { useRouter, useSearchParams } from 'next/navigation'
import { VerifyOtpFormSchema } from '@/lib/schema/VerifyOtp'
import { authService } from '@/lib/auth'

// Separate component that uses useSearchParams
const VerifyOtpFormContent = () => {
  const [isPending, setIsPending] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [token, setToken] = useState('')
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = decodeURIComponent(searchParams.get('email') || '');

  const form = useForm({
    resolver: zodResolver(VerifyOtpFormSchema),
    defaultValues: {
      otp: '',
    },
  })

  const handleSendOtp = async () => {
    setIsPending(true)
    try {
      const response = await authService.sendOtp(email)
      if (response?.data?.token) {
        setToken(response.data.token)
        setOtpSent(true)
        toast.success('OTP sent successfully')
      } else {
        toast.error(response?.message || 'Failed to send OTP')
      }
    } catch (err) {
      toast.error('An error occurred while sending OTP')
    } finally {
      setIsPending(false)
    }
  }

  const onSubmit = async (values: { otp: string }) => {
    setIsPending(true)
    try {
      const response = await authService.verifyOtp({ 
        email, 
        otp: values.otp, 
        token 
      })

      if (response?.data?.token) {
        toast.success(response.message || 'OTP verification successful')
        
        // Set token in cookies
        document.cookie = `token=${response.data.token}; path=/; secure; samesite=strict`

        // Call auth context login
        login(response.data)

        // Handle redirect
        router.push('/dashboard')
      } else {
        toast.error(response?.message || 'OTP verification failed')
      }
    } catch (err) {
      toast.error('An error occurred during OTP verification')
    } finally {
      setIsPending(false)
    }
  }

  const handleResendOtp = () => {
    setOtpSent(false)
    setToken('')
    handleSendOtp()
  }

  // Automatically send OTP when email is present but not sent yet
  useEffect(() => {
    if (email && !otpSent && !token) {
      handleSendOtp()
    }
  }, [email])

  return (
    <AuthLayout
      title="OTP Verification"
      subTitle={`We've sent a code to your email: ${email}`}
      footerText="Didn't receive the code?"
      footerLink="#"
      footerLinkTitle="Resend OTP"
    >
      {!otpSent ? (
        <div className="w-full flex flex-col gap-4">
          <p className="text-center text-sm text-muted-foreground">
            We'll send an OTP to your registered email address
          </p>
          <Button
            onClick={handleSendOtp}
            disabled={isPending}
            className="h-[50px] rounded-sm flex items-center justify-center bg_linear-gradient text-white text-sm font-medium text-lg w-full"
          >
            {isPending ? (
              <Loader className="w-5 h-5 text-white animate-spin" />
            ) : (
              'Send OTP'
            )}
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <InputField
              control={form.control}
              name="otp"
              placeholder="Enter the 6-digit OTP"
              inputCategory="input"
              inputType="text"
            />
            <Button
              disabled={isPending}
              className="h-[50px] rounded-sm flex items-center justify-center bg_linear-gradient text-white text-sm font-medium text-lg w-full"
            >
              {isPending ? (
                <Loader className="w-5 h-5 text-white animate-spin" />
              ) : (
                'Verify OTP'
              )}
            </Button>
          </form>
        </Form>
      )}
    </AuthLayout>
  )
}

// Loading fallback component
const VerifyOtpFormFallback = () => (
  <AuthLayout
    title="OTP Verification"
    subTitle="Loading..."
    footerText=""
    footerLink="#"
    footerLinkTitle=""
  >
    <div className="w-full flex items-center justify-center py-8">
      <Loader className="w-6 h-6 animate-spin" />
    </div>
  </AuthLayout>
)

// Main component with Suspense wrapper
export const VerifyOtpForm = () => {
  return (
    <Suspense fallback={<VerifyOtpFormFallback />}>
      <VerifyOtpFormContent />
    </Suspense>
  )
}