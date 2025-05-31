'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { useOrderFlow } from '@/hooks/useOrderFlow'
import { DeliveryOption } from '@/lib/order-flow'
import { Account } from '@/lib/auth'
import { ErrorComponent } from '@/components/global/Error'
import { OrderSummary } from '../order-flow/OrderSummary'
import { CheckoutScreen } from '../order-flow/CheckoutScreen'
import { Text } from '@/components/global/Text'
import { PaymentMethod } from '@/lib/order'

export default function CartItemsPageComponent() {
  const { shopId } = useParams()
  const {
    cart,
    clearCart,
    deliveryOptions,
    loading,
    error,
    checkout,
    toggleExpressDelivery,
    isExpressSelected,
    availableTimeSlots,
    selectedDeliveryDate,
    setSelectedDeliveryDate,
    selectedTimeSlot,
    setSelectedTimeSlot,
  } = useOrderFlow(shopId as string)

  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOption | null>(null)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [showCheckoutScreen, setShowCheckoutScreen] = useState(false)

  const handleSelectDelivery = (option: DeliveryOption) => {
    setSelectedDelivery(option)
    toggleExpressDelivery(option.type === 'express')
  }

  const handleProceedToCheckout = () => {
    if (!selectedDelivery || !cart?.items.length) {
      toast.error('Please select delivery option and add items to cart')
      return
    }

    setShowCheckoutScreen(true)
  }

  const handleBackToSummary = () => {
    setShowCheckoutScreen(false)
  }

  const handleCheckout = async (
    selectedDelivery: DeliveryOption | null,
    user: Account,
    pickupDate: string | null,
    payment_method: PaymentMethod,
    timeSlot?: string | null
  ) => {
    if (!selectedDelivery || !cart?.items.length) {
      toast.error('Please select delivery option and add items to cart')
      return false
    }

    setIsCheckingOut(true)
    try {
      if (!user) {
        toast.error('User is not authenticated')
        return false
      }
      const success = await checkout(
        selectedDelivery,
        user,
        pickupDate,
        payment_method,
        timeSlot
      )

      if (success) {
        toast.success('Order created successfully!')
        return true
      } else {
        toast.error('Failed to process your order')
        return false
      }
    } catch (err) {
      console.error('Checkout error:', err)
      toast.error('Failed to process your order')
      return false
    } finally {
      setIsCheckingOut(false)
    }
  }

  // Define breadcrumb item type
  interface BreadcrumbItem {
    label: string
    onClick: (() => void) | null
    isHome?: boolean
  }

  // Build breadcrumb items dynamically
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Cart Items',
      onClick: () => setShowCheckoutScreen(false),
      isHome: true,
    },
  ]

  if (showCheckoutScreen) {
    breadcrumbItems.push({
      label: 'Checkout',
      onClick: null,
    })
  }

  if (error) {
    return <ErrorComponent error={error} />
  }

  return (
    <div className=' py-4'>
      {/* Page Header */}
      <div className='flex items-center mb-6'>
        <Text as='h1' style='text-gray-800 text-3xl font-bold'>
          {showCheckoutScreen ? 'Complete Your Order' : 'Your Cart Items'}
        </Text>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {!showCheckoutScreen ? (
          <div className='lg:col-span-3'>
            <OrderSummary
              cart={cart}
              clearCart={clearCart}
              deliveryOptions={deliveryOptions}
              onSelectDelivery={handleSelectDelivery}
              selectedDelivery={selectedDelivery}
              onCheckout={handleProceedToCheckout}
              loading={isCheckingOut || loading.checkout}
              isExpressSelected={isExpressSelected}
            />
          </div>
        ) : (
          <div className='lg:col-span-3'>
            <CheckoutScreen
              cart={cart}
              selectedDelivery={selectedDelivery}
              isExpressSelected={isExpressSelected}
              onBack={handleBackToSummary}
              checkout={handleCheckout}
              loading={isCheckingOut || loading.checkout}
              availableTimeSlots={availableTimeSlots}
              selectedDeliveryDate={selectedDeliveryDate}
              setSelectedDeliveryDate={setSelectedDeliveryDate}
              selectedTimeSlot={selectedTimeSlot}
              setSelectedTimeSlot={setSelectedTimeSlot}
            />
          </div>
        )}
      </div>
    </div>
  )
}
