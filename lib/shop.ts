// lib/shop.ts
import { StaticImageData } from 'next/legacy/image'
import { api } from './api'
import { Item } from './order-flow'

// types/shop.ts
const bubbleStoreId = '683685a5d84b9ffcbab7bde3'
export interface ShopService {
  _id: string
  name: string
  image: StaticImageData
  meta: string
  __v: number
}

export interface ShopCategory {
  _id: string
  name: string
  image: StaticImageData
  meta: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ShopServiceWithCategories {
  service: ShopService
  categories: ShopCategory[]
  _id: string
}

export interface OpeningHour {
  day: string
  value: boolean
  opening_time: string
  closing_time: string
  _id: string
}

export interface Shop {
  _id: string
  first_name: string
  last_name: string
  other_name: string
  phone: string
  email: string
  action: string
  business_name: string
  business_url: string
  business_address: string
  business_state: string
  business_lga: string
  business_city: string
  addresses: any[] // Can be more specific if needed
  business_banner: string
  business_logo: string
  bank_statement: string
  amount_earned: number
  stages: number
  cac_certificate: string
  rean_membership_fee_receipt?: string // Optional based on response
  tax_clearance_certificate: string
  coren_certificate: string
  project_reference: string
  slug: string
  bank_account_name: string
  bank_account_number: string
  recipient_response: string | any // Can be parsed to specific type if needed
  recipient_auth_code: string
  status: 'approved' | 'pending' | 'rejected' // Adjust based on possible values
  user_type: 'vendor' | string // Adjust based on possible values
  login_count: number
  is_procurement: boolean
  is_verified: boolean
  is_active: boolean
  is_locked: boolean
  is_deleted: boolean
  is_profile_complete: boolean
  two_factor_auth: boolean
  role: string
  subscription_type: string
  has_access: boolean
  services: ShopServiceWithCategories[]
  opening_hours: OpeningHour[]
  last_login: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ShopListPagination {
  total: number
  // Add other pagination fields if they exist in other responses
  // per_page?: number;
  // current_page?: number;
  // last_page?: number;
}

export interface ShopListResponse {
  code: number
  message: string
  data: {
    count: number
    pagination: ShopListPagination
    results: Shop[]
  }
}

export interface ItemListResponse {
  code: number
  message: string
  data: {
    count: number
    pagination: ShopListPagination
    results: Item[]
  }
}

export interface ShopRequest {
  _id: string
  userId: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

export interface ShopRequestResponse {
  code: number
  message: string
  data: ShopRequest
}

export const shopService = {
  async getShops(
    token: string,
    page = 1,
    limit = 10
  ): Promise<ShopListResponse> {
    return api.get<ShopListResponse>(
      `/customer/shops?page=${page}&limit=${limit}`,
      token
    )
  },

  async getShopById(
    id: string,
    token?: string
  ): Promise<{ code: number; message: string; data: Shop }> {
    return api.get<{ code: number; message: string; data: Shop }>(
      `/customer/shops/${id}`,
      token
    )
  },

  async searchShops(query: string, token?: string): Promise<ShopListResponse> {
    return api.get<ShopListResponse>(`/customer/shops/search?q=${query}`, token)
  },

  async searchForBubblesShops(token?: string): Promise<ShopListResponse> {
    return api.get<ShopListResponse>(
      `/shop/search?search=store&searchBy=business_type`,
      token
    )
  },

  async searchForBubblesShopItem(
    q: string,
    token?: string
  ): Promise<ItemListResponse> {
    const response = await api.get<any>(
      `/shop/items/search?search=${q}&searchBy=name&service=${bubbleStoreId}`,
      token
    )
    return response
  },
}
