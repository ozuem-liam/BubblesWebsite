'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useOrders } from '../../../hooks/useOrders'
import { formatNaira } from '../../../lib/utils'
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Package,
  Truck,
  CreditCard,
  Search,
  Calendar,
  MapPin,
  ChevronDown,
  Star,
  AlertCircle,
  Filter,
  DollarSign,
  FileText,
  Zap,
  Grid3X3,
  Receipt
} from 'lucide-react'
import { Skeleton } from '../../../components/ui/skeleton'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'nextjs-toploader/app'

// Define types for the order data
type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned'

type PaymentStatus =
  | 'paid'
  | 'pending'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'

type PaymentMethod =
  | 'paystack'
  | 'bank_transfer'
  | 'wallet'
  | 'cash_on_delivery'

type DeliveryOption = 'delivery' | 'pickup' | 'normal'

interface OrderItem {
  _id: string
  itemrequest: {
    name: string
  }
  quantity: number
  unit_price: number
  total_price: number
}

interface Order {
  _id: string
  order_number: string
  status: OrderStatus
  payment_status: PaymentStatus
  payment_method: PaymentMethod
  delivery_option: DeliveryOption
  is_express: boolean
  createdAt: string
  updatedAt: string
  customer_first_name: string
  customer_last_name: string
  customer_phone_number: string
  total_quantity: number
  amount: number
  sub_total: number
  delivery_fee: number
  processing_fee: number
  shipping_address: string
  address: string
  scheduled_date?: string
  scheduled_time?: string
  service: string
  cart: string
  customer: string
  itemrequests: OrderItem[]
}

const OrderCard = ({
  order,
  expanded,
  onToggleExpand,
  formatDate,
  formatKoboToNaira,
  getStatusIcon,
  getStatusColor,
  getPaymentStatusColor,
  getPaymentMethodIcon,
  getDeliveryOptionIcon,
}: {
  order: Order
  expanded: boolean
  onToggleExpand: () => void
  formatDate: (dateString: string) => string
  formatKoboToNaira: (kobo: number) => string
  getStatusIcon: (status: OrderStatus) => React.ReactNode
  getStatusColor: (status: OrderStatus) => string
  getPaymentStatusColor: (status: PaymentStatus) => string
  getPaymentMethodIcon: (method: PaymentMethod) => React.ReactNode
  getDeliveryOptionIcon: (option: DeliveryOption) => React.ReactNode
}) => {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='rounded-md border border-gray-200 transition-all duration-200 overflow-hidden'
    >
      <div className='p-4'>
        <div className='flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4'>
          <div className='flex md:flex-row flex-col items-start gap-3 md:gap-4'>
            <div className='p-2 rounded-full bg-gray-300'>
              <ShoppingBag className='w-6 h-6 text-[#002F6C]' />
            </div>
            <div className='flex-1'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-2 flex-wrap'>
                <h3 className='text-base md:text-lg font-semibold text-gray-800'>
                  Order #{order.order_number}
                </h3>
                <div className='flex flex-wrap gap-2'>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1).replace(/_/g, ' ')}
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium border ${getPaymentStatusColor(
                      order.payment_status
                    )}`}
                  >
                    <CreditCard className='w-3 h-3' />
                    {order.payment_status.charAt(0).toUpperCase() +
                      order.payment_status.slice(1).replace(/_/g, ' ')}
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs md:text-sm text-gray-600'>
                <div className='flex items-center gap-1'>
                  <Calendar className='w-3 h-3 md:w-4 md:h-4' />
                  <span className='truncate'>
                    {formatDate(order.createdAt)}
                  </span>
                </div>
                <div className='flex items-center gap-1'>
                  <Grid3X3 className='w-3 h-3 md:w-4 md:h-4' />
                  {order.total_quantity} item
                  {order.total_quantity > 1 ? 's' : ''}
                </div>
                <div className='flex items-center gap-1'>
                  {getDeliveryOptionIcon(order.delivery_option)}
                  {order.delivery_option.charAt(0).toUpperCase() +
                    order.delivery_option.slice(1)}
                  {order.is_express && (
                    <Zap className='w-3 h-3 text-yellow-500 ml-1' />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col lg:items-end gap-2 md:gap-3'>
            <div className='text-right'>
              <p className='text-xl md:text-2xl font-bold text-gray-800 mb-1'>
                {formatKoboToNaira(order.amount)}
              </p>
              <div className='flex items-center gap-1 text-xs md:text-sm text-gray-600 justify-end'>
                {getPaymentMethodIcon(order.payment_method)}
                {order.payment_method.charAt(0).toUpperCase() +
                  order.payment_method.slice(1).replace(/_/g, ' ')}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <button
                onClick={() => router.push(`/dashboard/orders/${order._id}`)}
                className='md:w-[12rem] w-full border border-gray-400 text-gray-600 font-semibold py-2.5 rounded-lg transition-all duration-200 transform group-hover:scale-105'
              >
                See Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const OrdersList = () => {
  const { orders, loading, error } = useOrders()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
    return date.toLocaleDateString('en-US', options)
  }

  const formatKoboToNaira = (kobo: number): string => {
    return formatNaira(kobo / 100)
  }

  const getStatusIcon = (status: OrderStatus): React.ReactNode => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className='w-3 h-3 md:w-4 md:h-4 text-green-600' />
      case 'shipped':
        return <Truck className='w-3 h-3 md:w-4 md:h-4 text-blue-600' />
      case 'processing':
        return <RefreshCw className='w-3 h-3 md:w-4 md:h-4 text-blue-500' />
      case 'pending':
        return <Clock className='w-3 h-3 md:w-4 md:h-4 text-yellow-600' />
      case 'cancelled':
        return <XCircle className='w-3 h-3 md:w-4 md:h-4 text-red-600' />
      case 'returned':
        return <Package className='w-3 h-3 md:w-4 md:h-4 text-orange-600' />
      default:
        return <Package className='w-3 h-3 md:w-4 md:h-4 text-gray-600' />
    }
  }

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'returned':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status: PaymentStatus): string => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'refunded':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'partially_refunded':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentMethodIcon = (method: PaymentMethod): React.ReactNode => {
    switch (method) {
      case 'paystack':
        return <CreditCard className='w-3 h-3 md:w-4 md:h-4' />
      case 'bank_transfer':
        return <Receipt className='w-3 h-3 md:w-4 md:h-4' />
      case 'wallet':
        return <DollarSign className='w-3 h-3 md:w-4 md:h-4' />
      case 'cash_on_delivery':
        return <FileText className='w-3 h-3 md:w-4 md:h-4' />
      default:
        return <CreditCard className='w-3 h-3 md:w-4 md:h-4' />
    }
  }

  const getDeliveryOptionIcon = (option: DeliveryOption): React.ReactNode => {
    switch (option) {
      case 'delivery':
        return <Truck className='w-3 h-3 md:w-4 md:h-4' />
      case 'pickup':
        return <MapPin className='w-3 h-3 md:w-4 md:h-4' />
      case 'normal':
        return <Package className='w-3 h-3 md:w-4 md:h-4' />
      default:
        return <Package className='w-3 h-3 md:w-4 md:h-4' />
    }
  }

  const filteredOrders = orders.filter((order: Order) => {
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_first_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.customer_last_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.customer_phone_number.includes(searchTerm)

    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter
    const matchesPaymentStatus =
      paymentStatusFilter === 'all' ||
      order.payment_status === paymentStatusFilter

    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  if (loading) {
    return (
      <div className='space-y-4 md:space-y-6 px-4'>
        <div className='rounded-xl p-4 md:p-6 border border-gray-200'>
          <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6'>
            <div>
              <Skeleton className='h-6 md:h-8 w-32 md:w-48 bg-gray-200 rounded mb-1 md:mb-2' />
              <Skeleton className='h-3 md:h-4 w-48 md:w-64 bg-gray-200 rounded' />
            </div>
            <div className='flex items-center gap-2 md:gap-3'>
              <Skeleton className='h-5 md:h-6 w-12 md:w-16 bg-gray-200 rounded' />
              <Skeleton className='h-5 md:h-6 w-12 md:w-16 bg-gray-200 rounded' />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-2 md:gap-4'>
            <Skeleton className='flex-1 h-9 md:h-10 bg-gray-200 rounded-lg' />
            <Skeleton className='w-full sm:w-32 md:w-48 h-9 md:h-10 bg-gray-200 rounded-lg' />
            <Skeleton className='w-full sm:w-32 md:w-48 h-9 md:h-10 bg-gray-200 rounded-lg' />
          </div>
        </div>

        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className='bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-sm'
          >
            <div className='flex justify-between items-start mb-3 md:mb-4'>
              <div className='space-y-2 md:space-y-3 flex-1'>
                <Skeleton className='h-5 md:h-6 bg-gray-200 rounded w-32 md:w-48' />
                <Skeleton className='h-3 md:h-4 bg-gray-200 rounded w-24 md:w-32' />
              </div>
              <div className='space-y-1 md:space-y-2'>
                <Skeleton className='h-5 md:h-6 bg-gray-200 rounded w-20 md:w-24' />
                <Skeleton className='h-5 md:h-6 bg-gray-200 rounded w-16 md:w-20' />
              </div>
            </div>
            <div className='bg-gray-50 rounded-lg p-3 md:p-4'>
              <Skeleton className='h-3 md:h-4 bg-gray-200 rounded w-full mb-1 md:mb-2' />
              <Skeleton className='h-3 md:h-4 bg-gray-200 rounded w-3/4' />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className='flex flex-col items-center justify-center p-6 md:p-12 border-2 border-red-200 bg-red-50 rounded-xl'
      >
        <div className='p-3 md:p-4 bg-red-100 rounded-full mb-3 md:mb-4'>
          <AlertCircle className='w-6 h-6 md:w-8 md:h-8 text-red-600' />
        </div>
        <h3 className='text-base md:text-lg font-semibold text-red-800 mb-1 md:mb-2'>
          Unable to Load Orders
        </h3>
        <p className='text-red-600 mb-4 md:mb-6 text-center max-w-md text-sm md:text-base'>
          We encountered an issue while fetching your orders. This could be due
          to a temporary network issue or server maintenance.
        </p>
        <p className='text-xs md:text-sm text-red-500 mb-4 md:mb-6 font-mono bg-red-100 px-2 py-1 md:px-3 md:py-1 rounded'>
          Error: {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className='flex items-center gap-1 md:gap-2 bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm md:text-base'
        >
          <RefreshCw className='w-3 h-3 md:w-4 md:h-4' />
          Retry Loading Orders
        </button>
      </motion.div>
    )
  }

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex flex-col items-center justify-center p-8 md:p-16 text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200'
      >
        <div className='p-4 md:p-6 bg-blue-100 rounded-full mb-4 md:mb-6'>
          <Package className='w-8 h-8 md:w-12 md:h-12 text-blue-600' />
        </div>
        <h3 className='text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3'>
          No Orders Found
        </h3>
        <p className='text-gray-600 mb-6 md:mb-8 max-w-md md:max-w-lg leading-relaxed text-sm md:text-base'>
          You haven't placed any orders yet. Start exploring our amazing
          products and services to place your first order today.
        </p>
        <div className='flex flex-col sm:flex-row gap-2 md:gap-3'>
          <Link
            href='/shops'
            className='flex items-center gap-1 md:gap-2 bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl text-sm md:text-base'
          >
            <ShoppingBag className='w-4 h-4 md:w-5 md:h-5' />
            Browse Shops
          </Link>
          <Link
            href='/shops'
            className='flex items-center gap-1 md:gap-2 bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-blue-50 transition-colors font-medium border border-blue-200 text-sm md:text-base'
          >
            <Star className='w-4 h-4 md:w-5 md:h-5' />
            View Services
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className='h-screen space-y-4 md:space-y-6 py-6 px-4'>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6'>
          <div>
            <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2'>
              Your Orders
            </h2>
            <p className='text-gray-600 text-sm md:text-base'>
              Track and manage all your orders in one place. Total orders:{' '}
              <span className='font-semibold'>{orders.length}</span>
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className='flex flex-col lg:flex-row gap-2 md:gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4' />
            <input
              type='text'
              placeholder='Search orders...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base'
            />
          </div>
          <div className='flex gap-2 md:gap-3'>
            <div className='relative'>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='appearance-none bg-white border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-3 pr-8 md:pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer min-w-[120px] md:min-w-[140px] text-sm md:text-base'
              >
                <option value='all'>All Status</option>
                <option value='pending'>Pending</option>
                <option value='processing'>Processing</option>
                <option value='shipped'>Shipped</option>
                <option value='delivered'>Delivered</option>
                <option value='cancelled'>Cancelled</option>
                <option value='returned'>Returned</option>
              </select>
              <ChevronDown className='absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4 pointer-events-none' />
            </div>
            <div className='relative'>
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className='appearance-none bg-white border border-gray-300 rounded-lg px-3 md:px-4 py-2 md:py-3 pr-8 md:pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer min-w-[120px] md:min-w-[150px] text-sm md:text-base'
              >
                <option value='all'>All Payments</option>
                <option value='paid'>Paid</option>
                <option value='pending'>Pending</option>
                <option value='failed'>Failed</option>
                <option value='refunded'>Refunded</option>
                <option value='partially_refunded'>Partially Refunded</option>
              </select>
              <ChevronDown className='absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4 pointer-events-none' />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Orders List */}
      <div className='space-y-3 md:space-y-4'>
        <AnimatePresence>
          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              expanded={expandedOrder === order._id}
              onToggleExpand={() =>
                setExpandedOrder(expandedOrder === order._id ? null : order._id)
              }
              formatDate={formatDate}
              formatKoboToNaira={formatKoboToNaira}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              getPaymentStatusColor={getPaymentStatusColor}
              getPaymentMethodIcon={getPaymentMethodIcon}
              getDeliveryOptionIcon={getDeliveryOptionIcon}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredOrders.length === 0 && orders.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center py-8 md:py-12 bg-white rounded-xl border border-gray-200'
        >
          <Filter className='w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-3 md:mb-4' />
          <h3 className='text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2'>
            No Orders Match Your Filters
          </h3>
          <p className='text-gray-600 mb-3 md:mb-4 text-sm md:text-base'>
            Try adjusting your search criteria or filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setStatusFilter('all')
              setPaymentStatusFilter('all')
            }}
            className='text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base'
          >
            Clear All Filters
          </button>
        </motion.div>
      )}
    </div>
  )
}
