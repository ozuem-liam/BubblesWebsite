'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputField } from '@/components/global/InputField'
import { PasswordInput } from '@/components/global/PasswordField'
import { AuthLayout } from './AuthLayout'
import { SignInFormSchema } from '@/lib/schema/SignIn'
import Link from 'next/link'
import { toast } from 'sonner'
import { useAuth } from '../../../contexts/auth-context'
import { useRouter } from 'nextjs-toploader/app'
import { authService } from '../../../lib/auth'

export const SignInForm = () => {
  const [isPending, setIsPending] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      pwd: '',
      email: '',
    },
  })

  const onSubmit = async (values) => {
    console.log(values)
    const { email, pwd } = values
    setIsPending(true)
    try {
      const response = await authService.login({ email: email, password: pwd })
  
      if (response.code === 200 && response.data?.token) {
        toast.success(response.message || 'Login successful')

        // Set token in cookies
        document.cookie = `token=${response.data.token}; path=/; secure; samesite=strict`

        // Call auth context login
        login(response.data)

        // Handle redirect
        const searchParams = new URLSearchParams(window.location.search)
        const from = searchParams.get('from') || '/dashboard'
        router.push(from)
      } else {
        toast.error(response.message || 'Login failed')
      }
    } catch (err) {
      toast.error('An error occurred during login')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AuthLayout
      title='Sign In'
      subTitle={`Welcome back, you've been missed!`}
      footerText={`Don't have an account?`}
      footerLink='/auth/sign-up'
      footerLinkTitle='Sign Up'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-4'
        >
          <InputField
            control={form.control}
            name='email'
            placeholder='Enter your email address'
            inputCategory='input'
            inputType='email'
          />
          <PasswordInput
            control={form.control}
            name='pwd'
            placeholder='Create Password'
          />
          <Link
            href={'/auth/reset-password'}
            className='text-sm font-medium text-primary hover:text-primary-500 hover:underline transition-colors'
          >
            Forgot Password ?
          </Link>
          <div className='flex flex-col gap-5'>
            <Button
              disabled={isPending}
              className='mb-4 h-[50px] rounded-sm flex items-center justify-center bg_linear-gradient text-white text-sm font-medium text-lg w-full'
            >
              {isPending ? (
                <Loader className='w-5 h-5 text-white animate-spin' />
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
