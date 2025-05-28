'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { SignUpFormSchema } from '@/lib/schema/SignUp'
import { AuthLayout } from './AuthLayout'
import { InputField } from '@/components/global/InputField'
import { PasswordInput } from '@/components/global/PasswordField'
import { authService } from '@/lib/auth'
import { toast } from 'sonner'
import { useRouter } from 'nextjs-toploader/app'
import { z } from 'zod'

const LAGOS_LOCAL_GOVERNMENTS = [
  'Agege',
  'Ajeromi-Ifelodun',
  'Alimosho',
  'Amuwo-Odofin',
  'Apapa',
  'Badagry',
  'Epe',
  'Eti-Osa',
  'Ibeju-Lekki',
  'Ifako-Ijaiye',
  'Ikeja',
  'Ikorodu',
  'Kosofe',
  'Lagos Island',
  'Lagos Mainland',
  'Mushin',
  'Ojo',
  'Oshodi-Isolo',
  'Shomolu',
  'Surulere',
]

export const SignUpForm = () => {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      pwd: '',
      cpwd: '',
      phone: '',
      address: '',
      country: 'Nigeria',
      state: '',
      localGovernment: '',
      city: '',
      userType: 'customer',
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    const emailEntered = values.email
    setIsPending(true)
    try {
      // First register the user
      const registerResponse = await authService.signup({
        first_name: values.first_name,
        last_name: values.last_name,
        email: emailEntered,
        phone: values.phone,
        address: values.address,
        country: values.country,
        state: values.state,
        local_government: values.localGovernment,
        city: values.city,
        password: values.pwd,
        user_type: values.userType,
      })

      if (registerResponse?.data?.token) {
        // Then send OTP
        const otpResponse = await authService.sendOtp(emailEntered)

        if (otpResponse.code === 200) {
          toast.success(
            'Registration successful! Please check your email for OTP.'
          )
          // Redirect to OTP verification with email and token
          const queryParams = new URLSearchParams({
            email: encodeURIComponent(emailEntered),
            // Optionally add a short-lived token for additional security
            // token: registerResponse.data?.tempToken
          }).toString();
          
          router.push(`/auth/verify-otp?${queryParams}`);
        } else {
          toast.error(otpResponse?.message || 'Failed to send OTP. Please try again.')
        }
      } else {
        toast.error(registerResponse.message || 'Registration failed')
      }
    } catch (err) {
      toast.error('An error occurred during registration')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AuthLayout
      title='Sign Up'
      subTitle='Create an account to discover all our services.'
      footerText={`Already have an account?`}
      footerLink='/auth/sign-in'
      footerLinkTitle='Sign In'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-4'
        >
          <div className='grid grid-cols-2 gap-6'>
            <InputField
              control={form.control}
              name='first_name'
              placeholder='Enter your first name'
              inputCategory='input'
              inputType='text'
            />
            <InputField
              control={form.control}
              name='last_name'
              placeholder='Enter your last name'
              inputCategory='input'
              inputType='text'
            />
          </div>
           <div className='grid grid-cols-2 gap-6'>
          <InputField
            control={form.control}
            name='email'
            placeholder='Enter your email address'
            inputCategory='input'
            inputType='email'
          />
          <InputField
            control={form.control}
            name='phone'
            placeholder='08012345678'
            inputCategory='input'
            inputType='text'
          />
          </div>
          <InputField
            control={form.control}
            name='address'
            placeholder='Street address'
            inputCategory='input'
            inputType='text'
          />
          <InputField
            control={form.control}
            name='country'
            placeholder='Country'
            inputCategory='input'
            inputType='text'
          />
          <InputField
            control={form.control}
            name='state'
            placeholder='Select State'
            inputCategory='select'
            selectList={[{ title: 'Lagos', value: 'Lagos' }]}
          />
          <InputField
            control={form.control}
            name='city'
            placeholder='Your city'
            inputCategory='input'
            inputType='text'
          />
          <InputField
            control={form.control}
            name='localGovernment'
            placeholder='Select Local Government'
            inputCategory='select'
            selectList={LAGOS_LOCAL_GOVERNMENTS.map((lga) => ({
              title: lga,
              value: lga,
            }))}
          />
          <PasswordInput
            control={form.control}
            name='pwd'
            placeholder='Create Password'
          />
          <PasswordInput
            control={form.control}
            name='cpwd'
            placeholder='Confirm Password'
          />

          <div className='flex flex-col gap-5'>
            <Button
              disabled={isPending}
              className='mb-4 h-[50px] rounded-sm flex items-center justify-center bg_linear-gradient text-white text-sm font-medium text-lg w-full'
            >
              {isPending ? (
                <Loader className='w-5 h-5 text-white animate-spin' />
              ) : (
                'Create Account'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
