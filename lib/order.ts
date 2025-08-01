import { api } from "./api";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded";

export type PaymentMethod =
  | "paystack"
  | "bank_transfer"
  | "wallet"
  | "cash_on_delivery";

type DeliveryOption = "delivery" | "pickup" | "normal";

export interface CreateOrderPayload {
  customer: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone_number: string;
  amount: number;
  address: string;
  total_quantity: number;
  cart: string;
  service: string;
  delivery_option: DeliveryOption;
  scheduled_date: string; // ISO date string
  scheduled_time: string; // HH:mm:ss format
  // shipping_address: string;
  payment_method: PaymentMethod;
  sub_total: number;
  delivery_fee?: number;
  is_express?: boolean;
  voucher_discount?: number;
  voucher?: string;
  request_note?: string;
}

export interface ItemRequest {
  _id: string;
  order: string;
  order_number: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  itemrequest: {
    _id: string;
    name: string;
    slug: string;
  };
  quantity: number;
  unit_price: number; // in kobo
  total_price: number; // in kobo
  vendor: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  _id: string;
  customer: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone_number: string;
  order_number: string;
  address: string;
  amount: number; // in kobo
  processing_fee: number; // in kobo
  status: OrderStatus;
  payment_status: PaymentStatus;
  total_quantity: number;
  cart: string;
  service: string;
  delivery_option: DeliveryOption;
  scheduled_date: string; // ISO date string
  scheduled_time: string; // HH:mm:ss format
  shipping_address?: string;
  delivery_fee: number; // in kobo
  payment_method: PaymentMethod;
  sub_total: number; // in kobo
  is_express: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  itemrequests: ItemRequest[];
  id: string; // duplicate of _id?
}

export interface OrderPagination {
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface OrderListResponse {
  code: number;
  message: string;
  data: {
    count: number;
    pagination: OrderPagination;
    results: Order[];
  };
  // Optional error field if your API returns errors differently
  error?: string;
}

export interface ItemRequestDetails {
  _id: string;
  name: string;
  slug: string;
}

export interface OrderItemRequest {
  _id: string;
  order: string;
  order_number: string;
  status: string;
  payment_status: string;
  itemrequest: ItemRequestDetails;
  quantity: number;
  unit_price: number;
  total_price: number;
  vendor: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetailsData {
  _id: string;
  customer: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_phone_number: string;
  order_number: string;
  address: string;
  amount: number;
  processing_fee: number;
  status: string;
  payment_status: string;
  total_quantity: number;
  cart: string;
  service: string;
  delivery_option: string;
  scheduled_date: string;
  scheduled_time: string;
  shipping_address: string;
  delivery_fee: number;
  payment_method: string;
  sub_total: number;
  is_express: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  itemrequests: OrderItemRequest[];
  id: string;
}

export interface OrderDetailsResponse {
  code: number;
  message: string;
  data: OrderDetailsData;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface InitializedTransactionResponse {
  initializedTrasaction: InitializedTransaction;
}

export interface InitializedTransaction {
  status: boolean;
  message: string;
  data: TransactionData;
}

export interface TransactionData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

// Usage:
type InitTransactionApiResponse = ApiResponse<InitializedTransactionResponse>;


export const orderService = {
  async getOrders(
    token: string,
    page = 1,
    limit = 10
  ): Promise<OrderListResponse> {
    return api.get<OrderListResponse>(
      `/order?page=${page}&limit=${limit}`,
      token
    );
  },

  async getOrderById(
    orderId: string,
    token: string
  ): Promise<OrderDetailsResponse> {
    return api.get<OrderDetailsResponse>(
      `/order/order-details/${orderId}`,
      token
    );
  },

  async createOrder(
    payload: CreateOrderPayload,
    token: string
  ): Promise<InitTransactionApiResponse> {
    return api.post<InitTransactionApiResponse>("/order", payload, token);
  },

  async makePayment(
    orderId: string,
    paymentMethod: PaymentMethod,
    token: string
  ): Promise<InitTransactionApiResponse> {
    return await api.post<InitTransactionApiResponse>(
      `/make-payment/${orderId}`,
      { payment_method: paymentMethod },
      token
    );
  },

  async createOrderAndPay(
    orderPayload: CreateOrderPayload,
    paymentMethod: PaymentMethod,
    token: string
  ): Promise<InitTransactionApiResponse> {
    try {
      // First create the order
      return await this.createOrder(orderPayload, token);
    } catch (error) {
      console.error("Order and payment failed:", error);
      throw error;
    }
  },
};
