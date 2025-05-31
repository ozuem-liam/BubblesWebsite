import { StaticImageData } from 'next/image'
import { api } from './api'
import { ShopListPagination } from './shop'

export interface Category {
  _id: string
  name: string
  image: StaticImageData
  meta: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Item {
  _id: string
  name: string
  slug: string
  description?: string
  images?: StaticImageData[]
  is_featured?: boolean
  is_available?: boolean
  is_approved?: boolean
  is_deleted?: boolean
  image: StaticImageData
  category: string // category ID
  service: string // service ID
  vendor: string // vendor ID
  fixed_amount: number
  express_amount: number
  is_active: boolean
  createdAt: string
  updatedAt: string
  __v: number
  filteringCategoryId?:string
}

export interface CartItem {
  item: Item
  quantity: number
  price: number // in kobo
  vendor: string
}

export interface CartItemResponse {
  item: string // Item ID
  quantity: number
  vendor: string // Vendor ID
  price: number
}

export interface DeliveryOption {
  type: 'standard' | 'express'
  label: string
  fee: number // in kobo
  deliveryTime: string
}

export interface OrderPayload {
  customer: string
  customer_first_name: string
  customer_last_name: string
  customer_phone_number: string
  amount: number
  address: string
  total_quantity: number
  cart: string
  service: string
  delivery_option: string
  scheduled_date: string // YYYY-MM-DD
  scheduled_time: string // HH:mm:ss
  shipping_address: string
  payment_method: string
  delivery_fee: number
  sub_total: number
  is_express: boolean
}

export interface ShopServiceCategory {
  _id: string
  name: string
  image: StaticImageData
  meta: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ShopService {
  _id: string
  service: {
    _id: string
    name: string
    image: StaticImageData
    meta: string
    __v: number
  }
  categories: ShopServiceCategory[]
}

export interface ShopData {
  _id: string
  first_name: string
  last_name: string
  other_name: string
  phone: string
  email: string
  password: string
  salt: string
  action: string
  business_name: string
  business_url: string
  business_address: string
  business_state: string
  business_lga: string
  business_city: string
  addresses: string[]
  business_banner: string
  business_logo: string
  bank_statement: string
  amount_earned: number
  stages: number
  cac_certificate: string
  rean_membership_fee_receipt: string
  tax_clearance_certificate: string
  coren_certificate: string
  project_reference: string
  slug: string
  bank_account_name: string
  bank_account_number: string
  recipient_response: string
  recipient_auth_code: string
  status: 'approved' | 'pending' | 'rejected' // adjust based on app logic
  user_type: 'vendor' | string
  login_count: number
  is_procurement: boolean
  is_verified: boolean
  is_active: boolean
  is_locked: boolean
  is_deleted: boolean
  is_profile_complete: boolean
  two_factor_auth: boolean
  role: 'super_admin' | 'admin' | 'vendor' | string
  subscription_type: 'basic-plan' | 'premium-plan' | string
  has_access: boolean
  services: ShopService[]
  opening_hours: any[] // Define a type if structure is known
  last_login: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ShopResponse {
  code: number
  message: string
  data: ShopData
}

interface CartResponse {
  code: number
  message: string
  data: {
    items: CartItem[] // You can replace `any` with a more specific item type if known
  }
}

export interface CartDataResponse {
  code: number
  message: string
  data: CartData
}

export interface CartData {
  _id: string
  user: string
  items: CartItemDetail[]
  checkoutStatus: boolean
  is_express: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItemDetail {
  _id: string
  item: ICartItem
  quantity: number
  price: number
  vendor: Vendor
}

export interface ICartItem {
  _id: string
  vendor: string
  service: string
  category: string
  name: string
  slug: string
  fixed_amount: number
  express_amount: number
  image: StaticImageData
  is_active: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Vendor {
  _id: string
  business_name: string
}

export interface UpdateMultipleCartItemsPayload {
  items: {
    item: string
    quantity: number
    price: number
  }[]
  is_express: boolean
}

interface TimeSlot {
  _id: string
  type: string
  startTime: string
  endTime: string
  createdAt: string // or Date if you parse it
  updatedAt: string // or Date if you parse it
  __v: number
}

interface TimeSchedulerResponse {
  code: number
  message: string
  data: TimeSlot[]
}

interface ItemListResponse {
  code: number
  message: string
  data: {
    count: number
    pagination: ShopListPagination
    results: Item[]
  }
}

export const orderFlowService = {
  // Shop and Services
  async getShopServices(shopId: string, token: string): Promise<ShopService[]> {
    const response = await api.get<ShopResponse>(
      `/customer/shop/${shopId}`,
      token
    )
    return response.data.services
  },

  // async getItemsByCategory(
  //   vendorId: string,
  //   serviceId: string,
  //   categoryId: string
  // ): Promise<ItemListResponse> {
  //   const response = await api.get<any>(
  //     `/item-request/search?vendor_id=${vendorId}&service_id=${serviceId}&category_id=${categoryId}?page=1&limit=10`
  //   )
  //   return response
  // },

  async getPaginatedItemsByCategory(
    vendorId: string,
    serviceId: string,
    categoryId: string,
    page = 1,
    limit = 10
  ): Promise<ItemListResponse> {
    const response = await api.get<any>(
      `/item-request/search?vendor=${vendorId}&service=${serviceId}&category=${categoryId}&page=${page}&limit=${limit}`
    )
    return response
  },

  // Cart Operations
  async addToCart(
    payload: Omit<CartItem, 'price'>,
    token: string
  ): Promise<CartDataResponse> {
    await api.post<CartItemResponse>(
      '/cart',
      {
        item: payload.item._id,
        quantity: payload.quantity,
        vendor: payload.vendor,
        price: payload.item.fixed_amount,
      },
      token
    )
    return await this.getCart(token)
  },

  async getCart(token: string): Promise<CartDataResponse> {
    const response = await api.get<CartDataResponse>('/cart', token)
    return response
  },

  async removeFromCart(
    itemId: string,
    token: string
  ): Promise<CartDataResponse> {
    const resp = await api.delete(`/cart/item/${itemId}`, token)
    if (resp) {
      return await this.getCart(token)
    }
    throw new Error('Error occured while updating your cart')
  },

  async updateCartItem(
    itemId: string,
    quantity: number,
    token: string
  ): Promise<CartDataResponse> {
    const resp = await api.patch<any>(
      `/cart/item/${itemId}`,
      { quantity },
      token
    )
    if (resp) {
      return await this.getCart(token)
    }
    throw new Error('Error occured while updating your cart')
  },

  // Order Creation
  async createOrder(
    payload: OrderPayload,
    token: string
  ): Promise<{ orderId: string }> {
    const response = await api.post<{ data: { _id: string } }>(
      '/orders',
      payload,
      token
    )
    return { orderId: response.data._id }
  },

  // Delivery Options
  getDeliveryOptions(): DeliveryOption[] {
    return [
      {
        type: 'standard',
        label: 'Standard Delivery',
        fee: 2000, // ₦2000 in kobo
        deliveryTime: '3-5 business days',
      },
      {
        type: 'express',
        label: 'Express Delivery',
        fee: 5000, // ₦5000 in kobo
        deliveryTime: '24 hours',
      },
    ]
  },

  // Add this method to the orderFlowService object
  async updateMultipleCartItems(
    cartId: string,
    payload: UpdateMultipleCartItemsPayload,
    token: string
  ): Promise<CartDataResponse> {
    const response = await api.patch<CartDataResponse>(
      `/cart/${cartId}`,
      payload,
      token
    )
    return response
  },

  // Add this method to the orderFlowService object
  async updateExpressCartItems(
    cartId: string,
    payload: {
      cart: string
      items: { item: string; price: number }[]
      is_express: boolean
    },
    token: string
  ): Promise<CartDataResponse> {
    const response = await api.patch<CartDataResponse>(
      `/cart/express-items`,
      {
        cart: cartId,
        items: payload.items,
        is_express: payload.is_express,
      },
      token
    )
    return response
  },

  // Get available dates for standard delivery
  async getStandardDeliveryDates(
    token: string
  ): Promise<TimeSchedulerResponse> {
    const response = await api.get<TimeSchedulerResponse>(
      '/admin/scheduler',
      token
    )
    return response
  },
}
