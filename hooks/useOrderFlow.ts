'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth-context'
import {
  ShopServiceCategory,
  DeliveryOption,
  Item,
  orderFlowService,
  ShopService,
  CartItemDetail,
  CartData,
  ICartItem,
} from '../lib/order-flow'
import { useRouter, useSearchParams } from 'next/navigation'
import { CreateOrderPayload, PaymentMethod, orderService } from '../lib/order'
import { toast } from 'sonner'
import { Account } from '../lib/auth'
import { useCartStore } from '../stores/CartStore'
import { LocalCartItem } from '@/stores/CartStore'

export const useOrderFlow = (shopId?: string) => {
  const query = useSearchParams()
  const bubbleShop = query.get('name')
  const { token } = useAuth()
  const [services, setServices] = useState<ShopService[]>([])
  const [categories, setCategories] = useState<ShopServiceCategory[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [selectedService, setSelectedService] = useState<ShopService | null>(
    null
  )
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([])
  const [loading, setLoading] = useState({
    services: false,
    categories: false,
    items: false,
    cart: false,
    checkout: false,
    scheduler: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<
    { _id: string; startTime: string; endTime: string }[]
  >([])
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<
    string | null
  >(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [isExpressSelected, setIsExpressSelected] = useState(false)
  const [cartInitialized, setCartInitialized] = useState(false)
  const router = useRouter()

  const {
    cart,
    localCart,
    setCart,
    setLocalCart,
    initializeCart,
    addToLocalCart: zustandAddToLocalCart,
    removeFromLocalCart: zustandRemoveFromLocalCart,
    updateLocalCartQuantity: zustandUpdateLocalCartQuantity,
    clearCart,
  } = useCartStore()

  // Load shop services
  useEffect(() => {
    if (!shopId || !token) return

    const loadServices = async () => {
      try {
        setLoading((prev) => ({ ...prev, services: true }))
        const data = await orderFlowService.getShopServices(shopId, token)
        const isBubbleStore = data.length > 0 && bubbleShop
        setServices(data)
        if (isBubbleStore) {
          setSelectedService(data[0])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load services')
      } finally {
        setLoading((prev) => ({ ...prev, services: false }))
      }
    }

    loadServices()
  }, [shopId, token])

  // Load categories when service is selected
  useEffect(() => {
    if (!selectedService) return

    const loadCategories = async () => {
      try {
        setLoading((prev) => ({ ...prev, categories: true }))
        setCategories(selectedService.categories)
        // if (selectedService.categories.length > 0) {
        //   setSelectedCategory(selectedService.categories[0]._id)
        // }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load categories'
        )
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }))
      }
    }

    loadCategories()
  }, [selectedService])

  useEffect(() => {
    if (!selectedService || !shopId || !token) return

    const loadAllItems = async () => {
      try {
        setLoading((prev) => ({ ...prev, items: true }))

        // Load items for all categories
        const allItems: Item[] = []
        for (const category of selectedService.categories) {
          const response = await orderFlowService.getPaginatedItemsByCategory(
            shopId,
            selectedService.service._id,
            category._id
          )
          if (response?.data?.results) {
            // Add category ID to each item for easier filtering
            const itemsWithCategory = response.data.results.map((item) => ({
              ...item,
              filteringCategoryId: category._id,
            }))
            allItems.push(...itemsWithCategory)
          }
        }

        setItems(allItems)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load items')
      } finally {
        setLoading((prev) => ({ ...prev, items: false }))
      }
    }

    loadAllItems()
  }, [selectedService, token, shopId])

  // Initialize cart only once when token is available
  useEffect(() => {
    if (!token || cartInitialized) return

    const loadCart = async () => {
      try {
        setLoading((prev) => ({ ...prev, cart: true }))

        // Check if we already have items in localCart (from persistence)
        if (Object.keys(localCart).length > 0) {
          // We have persisted cart data, just sync the server cart if needed
          try {
            const resp = await orderFlowService.getCart(token)
            if (resp.data && !cart) {
              setCart(resp.data)
            }
          } catch (err) {
            // If server cart fails, continue with local cart
            console.warn('Failed to sync server cart:', err)
          }
        } else {
          // No local cart data, initialize from server
          await initializeCart(token)
        }

        setCartInitialized(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load cart')
        setCartInitialized(true)
      } finally {
        setLoading((prev) => ({ ...prev, cart: false }))
      }
    }

    loadCart()
  }, [token, cartInitialized, localCart, cart, initializeCart, setCart])

  // Load delivery options
  useEffect(() => {
    const options = orderFlowService.getDeliveryOptions()
    setDeliveryOptions(options)
  }, [])

  // Load time slots for standard delivery
  useEffect(() => {
    if (isExpressSelected || !token) return

    const loadTimeSlots = async () => {
      try {
        setLoading((prev) => ({ ...prev, scheduler: true }))
        const response = await orderFlowService.getStandardDeliveryDates(token)
        setAvailableTimeSlots(response.data)

        if (response.data.length > 0 && !selectedTimeSlot) {
          setSelectedTimeSlot(response.data[0].startTime)
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load time slots'
        )
      } finally {
        setLoading((prev) => ({ ...prev, scheduler: false }))
      }
    }

    loadTimeSlots()
  }, [token, isExpressSelected, selectedTimeSlot])

  const addToLocalCart = async (item: Item) => {
    try {
      // 1. Ensure we have a cart on the server
      let currentCart = cart
      if (!currentCart || currentCart.items?.length === 0) {
        // 2. Update server cart
        const resp = await orderFlowService.addToCart(
          {
            item,
            quantity: 1,
            vendor: shopId || '',
          },
          token as string
        )
        currentCart = resp.data
        setCart(currentCart)
      }

      // 3. Update local cart (this will persist automatically)
      zustandAddToLocalCart(item)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to add item to cart'
      )
      console.error('Error adding to cart:', err)
    }
  }

  const removeFromLocalCart = async (itemId: string) => {
    try {
      // 1. Update server cart first if we have a cart
      if (cart && cart._id && token) {
        const updatedCart = await orderFlowService.removeFromCart(itemId, token)
        setCart(updatedCart.data)
      }

      // 2. Update local cart (this will persist automatically)
      zustandRemoveFromLocalCart(itemId)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to remove item from cart'
      )
      console.error('Error removing from cart:', err)
    }
  }

  // Updated clearCart function - you might want to rename this to avoid confusion with Zustand's clearCart
  const clearCartCompletely = async () => {
    try {
      // 1. Clear server cart first if we have a cart
      if (cart && cart._id && token) {
        await orderFlowService.clearCart(cart._id, token)
        setCart(null) // Clear the cart state
      }

      // 2. Clear local cart (this will persist automatically)
      clearCart() // This is the Zustand clearCart function
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart')
      console.error('Error clearing cart:', err)
    }
  }

  // Updated updateLocalCartQuantity function
  const updateLocalCartQuantity = async (
    itemId: string,
    newQuantity: number
  ) => {
    try {
      // 1. Update server cart first if we have a cart
      if (cart && cart._id && token) {
        const updatedCart = await orderFlowService.updateCartItem(
          itemId,
          newQuantity,
          token
        )
        setCart(updatedCart.data)
      }

      // 2. Update local cart (this will persist automatically)
      zustandUpdateLocalCartQuantity(itemId, newQuantity)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update cart quantity'
      )
      console.error('Error updating cart quantity:', err)
    }
  }

  const getDisplayCart = (isExpress: boolean = false): CartData | null => {
    if (!cart && Object.keys(localCart).length === 0) return null

    const cartItems: LocalCartItem[] = Object.values(localCart)

    const displayItems: CartItemDetail[] = cartItems.map(
      ({ item, quantity }): CartItemDetail => {
        // Convert Item to ICartItem format for CartItemDetail
        const cartItem: ICartItem = {
          _id: item._id,
          vendor: item.vendor,
          service: item.service,
          category: item.category,
          name: item.name,
          slug: item.slug,
          fixed_amount: item.fixed_amount,
          express_amount: item.express_amount,
          image: item.image,
          is_active: item.is_active,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          __v: item.__v,
        }

        return {
          _id: item._id,
          item: cartItem,
          quantity: quantity,
          price: isExpress ? item.express_amount : item.fixed_amount,
          vendor: { _id: shopId || '', business_name: '' },
        }
      }
    )

    // Create a display cart even if server cart is not available
    const baseCart: CartData = cart || {
      _id: 'local-cart',
      user: 'local-user',
      items: [],
      checkoutStatus: false,
      is_express: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return {
      ...baseCart,
      items: displayItems,
      is_express: isExpress,
    }
  }

  const toggleExpressDelivery = (isExpress: boolean) => {
    setIsExpressSelected(isExpress)
    setSelectedTimeSlot(null)
    setSelectedDeliveryDate(null)
  }

  const checkout = async (
    selectedDeliveryOption: DeliveryOption,
    user: Account,
    pickupDate: string | null,
    payment_method: PaymentMethod = 'paystack',
    timeSlotId?: string | null
  ) => {
    if (
      !token ||
      Object.keys(localCart).length === 0 ||
      !selectedDeliveryOption
    ) {
      setError('Missing required information for checkout')
      return false
    }

    try {
      setLoading((prev) => ({ ...prev, checkout: true }))

      // Prepare items for the updateMultipleCartItem endpoint
      const itemsToUpdate = Object.values(localCart).map(
        ({ item, quantity }) => ({
          item: item._id,
          quantity,
          price: isExpressSelected ? item.express_amount : item.fixed_amount,
        })
      )

      let updatedCart = null
      let cartId = cart?._id

      // Ensure we have a server cart
      if (!cart) {
        // Create a cart with the first item
        const firstItem = Object.values(localCart)[0]
        if (firstItem) {
          const resp = await orderFlowService.addToCart(
            {
              item: firstItem.item,
              quantity: firstItem.quantity,
              vendor: shopId || '',
            },
            token
          )
          cartId = resp.data._id
          setCart(resp.data)
        }
      }

      // Update cart items and pricing
      if (itemsToUpdate.length > 0 && cartId) {
        updatedCart = await orderFlowService.updateMultipleCartItems(
          cartId,
          {
            items: itemsToUpdate,
            is_express: isExpressSelected,
          },
          token
        )
      }

      // For standard delivery, use the time slot info
      if (!isExpressSelected && timeSlotId) {
        const selectedSlot = availableTimeSlots.find(
          (slot) => slot._id === timeSlotId
        )
        if (selectedSlot) {
          // Format as "startTime - endTime" for the order
          pickupDate = `${selectedSlot.startTime} - ${selectedSlot.endTime}`
        }
      }

      const totalAmount = calculateTotal(
        isExpressSelected,
        selectedDeliveryOption
      )
      const subtotal = calculateSubtotal(isExpressSelected)
      const deliveryFee = selectedDeliveryOption.fee || 0
      const totalItems = Object.values(localCart).reduce(
        (sum, { quantity }) => sum + quantity,
        0
      )
      const finalCartId = updatedCart ? updatedCart.data._id : cartId
      const serviceId = selectedService ? selectedService.service._id : ''
      const shippingAddress = user?.address || ''
      const shippingAddressId =
        Object.values(localCart)[0]?.item?.vendor || shopId || ''
      const selectedDate = isExpressSelected ? pickupDate : null

      // For express delivery, use the selected date
      if (isExpressSelected && pickupDate) {
        // Format the date as needed for the API
        pickupDate = new Date(pickupDate).toISOString()
      }
      const scheduledDate = new Date().toISOString().split('T')[0]

      // Here you would call your order creation API
      const orderPayload: CreateOrderPayload = {
        customer: user?.id || '',
        customer_first_name: user?.first_name || '',
        customer_last_name: user?.last_name || '',
        customer_phone_number: user?.phone || '',
        amount: totalAmount || 0,
        address:
          (typeof shippingAddress === 'object'
            ? `${shippingAddress?.street_address || ''} ${
                shippingAddress?.city || ''
              } ${shippingAddress?.state || ''}`
            : shippingAddress) || '',
        total_quantity: totalItems,
        cart: finalCartId || '',
        service: serviceId,
        delivery_option: 'delivery',
        scheduled_date: scheduledDate,
        scheduled_time: `${timeSlotId || ''}:00`,
        shipping_address: shippingAddressId,
        payment_method: payment_method, // or whatever method selected
        sub_total: subtotal,
        delivery_fee: deliveryFee,
        is_express: isExpressSelected,
      }

      const paymentResponse = await orderService.createOrderAndPay(
        orderPayload,
        payment_method,
        token
      )

      if (paymentResponse?.code === 200 && paymentResponse?.data) {
        toast.success(paymentResponse.message)
        clearCart() // Clear cart state using Zustand
        setCartInitialized(false) // Reset initialization flag
        // Redirect to payment gateway
        window.location.href =
          paymentResponse.data.initializedTrasaction.data.authorization_url
      } else if (paymentResponse?.code === 200 && !paymentResponse?.data) {
        toast.success(paymentResponse.message)
        clearCart()
        setCartInitialized(false)
      } else {
        toast.error('Payment initiation failed')
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to checkout')
      return false
    } finally {
      setLoading((prev) => ({ ...prev, checkout: false }))
    }
  }

  const calculateSubtotal = (isExpress: boolean): number => {
    const cartItems = Object.values(localCart) as LocalCartItem[]
    return cartItems.reduce((sum: number, { item, quantity }) => {
      const price = isExpress ? item.express_amount : item.fixed_amount
      return sum + (price || 0) * quantity
    }, 0)
  }

  const calculateTotal = (
    isExpress: boolean,
    selectedDeliveryOption?: DeliveryOption
  ): number => {
    const subtotal = calculateSubtotal(isExpress)
    const deliveryFee = selectedDeliveryOption?.fee || 0
    return subtotal + deliveryFee
  }

  return {
    services,
    categories,
    setCategories,
    items,
    cart: getDisplayCart(isExpressSelected),
    deliveryOptions,
    loading,
    error,
    selectService: setSelectedService,
    selectCategory: setSelectedCategory,
    addToCart: addToLocalCart,
    removeFromCart: removeFromLocalCart, // Updated function
    updateQuantity: updateLocalCartQuantity, // Updated function
    clearCartCompletely, // New function name to avoid confusion
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
    clearCart, // Keep the Zustand clearCart for internal use
  }
}

export const useFetchCategoryItems = (
  vendorId: string,
  serviceId: string,
  categoryId: string,
  limit?: number
) => {
  const { token } = useAuth()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paginationPage, setPaginationPage] = useState<number>(1)
  const [paginationTotal, setPaginationTotal] = useState<number | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (paginationPage === 1) setLoading(true)
        const response = await orderFlowService.getPaginatedItemsByCategory(
          vendorId,
          serviceId,
          categoryId,
          paginationPage,
          limit
        )
        console.log('this is rbowese', response)

        setItems(response?.data?.results)
        setPaginationTotal(response?.data?.pagination?.total)
        // setMeta(response.data?.pagination || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch shops')
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchItems()
    }
  }, [token, paginationPage])

  return {
    items,
    loading,
    error,
    paginationTotal,
    setPaginationPage,
    paginationPage,
  }
}
