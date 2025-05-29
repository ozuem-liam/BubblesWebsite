'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '../../../contexts/auth-context'
import { Text } from '../../../components/global/Text'
import { Button } from '../../../components/ui/button'
import { formatNaira } from '../../../lib/utils'
import { format } from 'date-fns'
import Link from 'next/link'
import { OrderDetailsData, orderService } from '../../../lib/order'
import { Skeleton } from '../../../components/ui/skeleton'

export const OrderDetails = () => {
  const { id } = useParams()
  const { token } = useAuth()
  const [order, setOrder] = useState<OrderDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token || !id) return

      try {
        setLoading(true)
        const response = await orderService.getOrderById(id as string, token)
        setOrder(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch order')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [token, id])

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='space-y-8'>
          <div className='flex flex-col md:flex-row justify-between gap-4'>
            <div className='space-y-3'>
              <Skeleton className='h-8 w-48 bg-gray-100 rounded' />
              <Skeleton className='h-4 w-64 bg-gray-100 rounded' />
            </div>
            <Skeleton className='h-6 w-24 bg-gray-100 rounded-full' />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-6'>
              <Skeleton className='h-6 w-32 bg-gray-100 rounded' />
              <div className='space-y-4'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className='flex gap-4 p-4 bg-white rounded-xl shadow-sm'
                  >
                    <Skeleton className='w-20 h-20 bg-gray-100 rounded-lg' />
                    <div className='flex-1 space-y-3'>
                      <Skeleton className='h-4 w-3/4 bg-gray-100 rounded' />
                      <div className='flex justify-between'>
                        <Skeleton className='h-4 w-16 bg-gray-100 rounded' />
                        <Skeleton className='h-4 w-20 bg-gray-100 rounded' />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='space-y-6'>
              <div>
                <Skeleton className='h-6 w-32 bg-gray-100 rounded mb-4' />
                <div className='space-y-4 p-5 bg-white rounded-xl shadow-sm'>
                  <Skeleton className='h-4 w-full bg-gray-100 rounded' />
                  <Skeleton className='h-4 w-full bg-gray-100 rounded' />
                  <Skeleton className='h-px w-full bg-gray-100 my-2' />
                  <Skeleton className='h-6 w-full bg-gray-100 rounded' />
                </div>
              </div>

              <div>
                <Skeleton className='h-6 w-32 bg-gray-100 rounded mb-4' />
                <Skeleton className='h-24 w-full bg-white rounded-xl shadow-sm' />
              </div>

              <div>
                <Skeleton className='h-6 w-32 bg-gray-100 rounded mb-4' />
                <Skeleton className='h-4 w-24 bg-gray-100 rounded' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm border border-red-100'>
          <div className='w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4'>
            <svg
              className='w-8 h-8 text-red-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <Text as='h3' style='text-lg font-medium text-gray-800 mb-2'>
            Error Loading Order
          </Text>
          <Text as='p' style='text-red-500 mb-6 text-center max-w-md'>
            {error}
          </Text>
          <button
            onClick={() => window.location.reload()}
            className='px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm'
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl shadow-sm'>
          <div className='w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6'>
            <svg
              className='w-10 h-10 text-blue-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
          </div>
          <Text as='h3' style='text-xl font-semibold text-gray-800 mb-3'>
            Order Not Found
          </Text>
          <Text as='p' style='text-gray-500 mb-6 max-w-md'>
            We couldn't find the order you're looking for. It may have been
            cancelled or removed.
          </Text>
          <Link
            href='/dashboard/orders'
            className='px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm'
          >
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
  }

  const paymentStatusColors = {
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    default: 'bg-gray-100 text-gray-800',
  }

  const getStatusClass = (status: string) => {
    return (
      statusColors[status as keyof typeof statusColors] || statusColors.default
    )
  }

  const getPaymentStatusClass = (status: string) => {
    return (
      paymentStatusColors[status as keyof typeof paymentStatusColors] ||
      paymentStatusColors.default
    )
  }

  return (
    <div className='w-full py-6 px-4'>
      <div className='overflow-hidden'>
        {/* Order Header */}
        <div>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
            <div>
              <Text as='h1' style='text-gray-900 text-2xl font-bold'>
                Order #{order.order_number}
              </Text>
              <Text as='p' style='text-gray-500'>
                Placed on{' '}
                {format(new Date(order.createdAt), "MMMM dd, yyyy 'at' h:mm a")}
              </Text>
            </div>

            <span
              className={`ms-auto text-center flex items-center justify-center  w-[6rem] px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                order.status
              )}`}
            >
              {order.status.replace(/-/g, ' ')}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {/* Order Items */}
          <div className='lg:col-span-2 my-3 border-r border-gray-100'>
            <Text as='h2' style='text-gray-800 text-lg font-semibold mb-6'>
              Order Items ({order.itemrequests.length})
            </Text>

            <div className='space-y-4 '>
              {order.itemrequests.map((item: any) => (
                <div
                  key={item._id}
                  className='flex gap-4 p-4 hover:bg-gray-50 bg-white border border-gray-300 rounded-md transition-colors'
                >
                  {item.itemrequest.image && (
                    <div className='flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center'>
                      <img
                        src={item.itemrequest.image}
                        alt={item.itemrequest.name}
                        className='w-full h-full object-contain p-1'
                      />
                    </div>
                  )}
                  <div className='flex-1 min-w-0'>
                    <Text as='h3' style='text-gray-800 font-medium truncate'>
                      {item.itemrequest.name}
                    </Text>
                    <div className='flex justify-between mt-3'>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm text-gray-500'>Qty:</span>
                        <span className='text-sm font-medium'>
                          {item.quantity}
                        </span>
                      </div>
                      <Text as='p' style='text-gray-800 font-semibold'>
                        {formatNaira(item.total_price)}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className='p-4 border-gray-300 rounded-md border'>
            <div className='space-y-6'>
              <div>
                <Text as='h2' style='text-gray-800 text-lg font-semibold mb-4'>
                  Order Summary
                </Text>

                <div className='space-y-4 bg-white rounded-md p-4'>
                  <div className='flex justify-between'>
                    <Text as='p' style='text-gray-600'>
                      Subtotal
                    </Text>
                    <Text as='p' style='text-gray-800'>
                      {formatNaira(order.sub_total)}
                    </Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text as='p' style='text-gray-600'>
                      Delivery Fee
                    </Text>
                    <Text as='p' style='text-gray-800'>
                      {formatNaira(order.delivery_fee)}
                    </Text>
                  </div>
                  <div className='border-t border-gray-200 pt-3'>
                    <div className='flex justify-between'>
                      <Text as='p' style='text-gray-800 font-semibold'>
                        Total
                      </Text>
                      <Text as='p' style='text-gray-900 font-bold text-lg'>
                        {formatNaira(order.amount)}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <Text as='h2' style='text-gray-800 text-lg font-semibold mb-4'>
                  Delivery Address
                </Text>

                <div className='bg-white rounded-lg p-5'>
                  <Text as='p' style='text-gray-800'>
                    {order.address}
                  </Text>
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <Text as='h2' style='text-gray-800 text-lg font-semibold mb-4'>
                  Payment Status
                </Text>

                <div className='flex items-center gap-3'>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusClass(
                      order.payment_status
                    )}`}
                  >
                    {order.payment_status.replace(/-/g, ' ')}
                  </span>
                </div>
              </div>
            </div>

            <div className='mt-8 pt-6 border-t border-gray-100'>
              <Link href='/dashboard/orders'>
                <Button
                  variant='outline'
                  className='w-full bg_linear-gradient border-gray-300 text-white hover:bg-gray-50 shadow-sm'
                >
                  Back to Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
