'use client'

import { useParams } from 'next/navigation'
import { useOrderFlow } from '../../../../../hooks/useOrderFlow'
import { Text } from '../../../../../components/global/Text'
import { useState } from 'react'
import { toast } from 'sonner'
import { CategoryItems } from '../../../../../components/sections/order-flow/category-items'
import { OrderSummary } from '../../../../../components/sections/order-flow/order-summary'
import { CheckoutScreen } from '../../../../../components/sections/order-flow/checkout-screen'
import { ServiceCategories } from '../../../../../components/sections/order-flow/service-categories'
import { ShopServices } from '../../../../../components/sections/order-flow/shop-services'
import { DeliveryOption } from '../../../../../lib/order-flow'
import { Account } from '../../../../../lib/auth'
import Image from 'next/image'
import { Button } from '../../../../../components/ui/button'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

export default function OrderFlowPage() {
  const { shopId } = useParams()
  const {
    services,
    categories,
    setCategories,
    items,
    cart,
    deliveryOptions,
    loading,
    error,
    selectService,
    selectCategory,
    addToCart,
    removeFromCart,
    updateQuantity,
    checkout,
    selectedService,
    selectedCategory,
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
    label: string;
    onClick: (() => void) | null;
    isHome?: boolean;
  }

  // Build breadcrumb items dynamically
  const breadcrumbItems: BreadcrumbItem[] = [
    { 
      label: 'Services', 
      onClick: () => {
        selectService(null)
        setCategories([])
        selectCategory(null)
        setShowCheckoutScreen(false)
      }, 
      isHome: true 
    }
  ];

  if (selectedService) {
    breadcrumbItems.push({
      label: selectedService.service.name,
      onClick: selectedCategory ? () => {
        selectCategory(null)
        setShowCheckoutScreen(false)
      } : null
    });
  }

  if (selectedCategory) {
    breadcrumbItems.push({
      label: "Categories",
      onClick: showCheckoutScreen ? () => setShowCheckoutScreen(false) : null
    });
  }

  if (showCheckoutScreen) {
    breadcrumbItems.push({
      label: 'Checkout',
      onClick: null
    });
  }

  if (error) {
    return (
      <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm'>
        <Text as='p' style='text-red-500'>
          {error}
        </Text>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {/* Improved Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            )}
            
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className="flex items-center hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-2 py-1"
              >
                {item.isHome && <Home className="h-4 w-4 mr-1" />}
                {item.label}
              </button>
            ) : (
              <span className="flex items-center text-gray-900 font-medium px-2 py-1">
                {item.isHome && <Home className="h-4 w-4 mr-1" />}
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Page Header */}
      <div className='flex items-center mb-6'>
        {(selectedService || selectedCategory || showCheckoutScreen) && (
          <Button
            variant='ghost'
            onClick={() => {
              if (showCheckoutScreen) {
                setShowCheckoutScreen(false)
              } else if (selectedCategory) {
                selectCategory(null)
              } else if (selectedService) {
                selectService(null)
                setCategories([])
                selectCategory(null)
              }
            }}
            className='mr-4 p-2 hover:bg-gray-100'
          >
            <ChevronLeft className='h-5 w-5' />
          </Button>
        )}
        
        <Text as='h1' style='text-gray-800 text-3xl font-bold'>
          {showCheckoutScreen
            ? 'Complete Your Order'
            : selectedCategory
              ? "Categories"
              : selectedService
                ? selectedService.service.name
                : 'Our Services'}
        </Text>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {!showCheckoutScreen ? (
          <>
            <div className='lg:col-span-2 space-y-6'>
              {categories.length === 0 && (
                <div>
                  <ShopServices
                    services={services}
                    setCategories={setCategories}
                    onSelectService={selectService}
                    selectedService={selectedService}
                    loading={loading.services}
                  />
                </div>
              )}

              {selectedService && (
                <div className='bg-white border border-gray-300 rounded-md'>
                  <div className='p-4 border-b border-gray-100'>
                    <Text as='h2' style='text-gray-800 text-lg font-semibold'>
                      Select Category
                    </Text>
                  </div>
                  <div className='p-4'>
                    <ServiceCategories
                      categories={categories}
                      onSelectCategory={selectCategory}
                      selectedCategory={selectedCategory || null}
                      cloading={loading.categories}
                      items={items}
                      cart={cart}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                      loading={loading.items}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className='lg:col-span-1'>
              <OrderSummary
                cart={cart}
                deliveryOptions={deliveryOptions}
                onSelectDelivery={handleSelectDelivery}
                selectedDelivery={selectedDelivery}
                onCheckout={handleProceedToCheckout}
                loading={isCheckingOut || loading.checkout}
                isExpressSelected={isExpressSelected}
              />
            </div>
          </>
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