import { z } from 'zod'

export const SignUpFormSchema = z
  .object({
    first_name: z
      .string({
        required_error: 'First Name field is required.',
      })
      .min(3, { message: 'First Name must be at least 2 characters.' }),
    country: z
      .string({
        required_error: 'Country field is required.',
      })
      .min(3, { message: 'Please select a country from the option.' }),
    state: z
      .string({
        required_error: 'State field is required.',
      })
      .min(3, { message: 'Please select a state  from the option' }),
    localGovernment: z
      .string({
        required_error: 'Local Government field is required.',
      })
      .min(3, { message: 'Please select a Local government from the option' }),
    city: z
      .string({
        required_error: 'City field is required.',
      })
      .min(3, { message: 'Please select a city from the option' }),
    address: z
      .string({
        required_error: 'Address field is required.',
      })
      .min(3, { message: 'Address must be at least 3 characters.' }),
    userType: z
      .string({
        required_error: 'User Type field is required.',
      })
      .min(3, { message: 'User Type must be at least 3 characters.' }),
    phone: z
      .string({
        required_error: 'Phone number is required.',
      })
      .min(11, { message: 'Phone number must be at least 11 characters.' }),
    last_name: z
      .string({
        required_error: 'Last Name field is required.',
      })
      .min(3, { message: 'Last Name must be at least 2 characters.' }),
    email: z
      .string()
      .email({ message: 'Please enter a valid email address.' })
      .min(8, { message: 'Email must be at least 8 characters.' }),
    pwd: z
      .string({
        required_error: 'Password field is required.',
      })
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
      // .regex(/[\W_]/, {
      //   message: 'Password must contain at least one special character',
      // }),
    cpwd: z
      .string({
        required_error: 'Please confirm password.',
      })
      .min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.pwd === data.cpwd, {
    path: ['cpwd'],
    message: 'Passwords does not match',
  })
