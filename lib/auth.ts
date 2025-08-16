import { api } from './api';

interface LoginData {
  email: string;
  password: string;
}

interface SignupRequestPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  // address: string;
  // country: string;
  // state: string;
  // local_government: string;
  // city: string;
  password: string;
  user_type: string;
}

interface OtpData {
  email: string;
  otp: string;
  token: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data: UserData;
}

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  email: string;
  phone: string;
  profile_image: string;
  user_type: 'customer' | 'vendor' | string; // You can adjust as needed
  address: Address;
  biometric_login: boolean;
  is_profile_complete: boolean;
  token: string;
}

export interface Address {
  street_address: string;
  city: string;
  state: string;
}

interface ResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface CustomerProfileResponse {
  account: Account;
  notification: Notification;
}

export interface Address {
  street_address: string;
  city: string;
  state: string;
}

export interface Account {
  _id: string;
  profile_image: string;
  addresses: any[]; // Change `any[]` to a specific type if you have an address schema
  user_type: string;
  login_count: number;
  is_active: boolean;
  is_locked: boolean;
  is_deleted: boolean;
  blacklisted: boolean;
  recieve_notifications: boolean;
  is_profile_complete: boolean;
  biometric_login: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_verified: boolean;
  customer_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  last_login: string;
  address: Address;
  action: string;
  order_to_pay: string;
  id: string;
}

export interface Notification {
  _id: string;
  account: string;
  subject: string;
  notification_type: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Usage:
type CustomerProfileApiResponse = ApiResponse<CustomerProfileResponse>;


export const authService = {
  async login(credentials: LoginData) {
    return api.post<LoginResponse>('/customer/login', credentials);
  },

  async signup(userData: SignupRequestPayload) {
    return api.post<LoginResponse>('/customer/register', userData);
  },

  async sendOtp(email: string) {
    // return await api.post<LoginResponse>('/customer/send-otp', { email, user_type: 'customer' });
    return await api.post<LoginResponse>('/customer/send-otp', { email });
  },

  async verifyOtp(data: OtpData) {
    return api.post<LoginResponse>('/customer/verify-otp', data);
  },

  async resetPassword(data: ResetPasswordData) {
    return api.patch<{ message: string }>('/customer/reset-password', data);
  },

  async getProfileData(token: string) {
    return await api.get<CustomerProfileApiResponse>('/customer/profile', token);
  },

  async updateAddress(data: Address,customerId:string) {
    return await api.post<{ message: string }>(`/customer/update/${customerId}verify-otp`, data);
  },
};