"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
import {
  ShopServiceCategory,
  DeliveryOption,
  Item,
  orderFlowService,
  ShopService,
  CartItemDetail,
  CartData,
} from "../lib/order-flow";
import { useRouter } from "next/navigation";
import { CreateOrderPayload, orderService } from "../lib/order";
import { toast } from "sonner";
import { Account, UserData } from "../lib/auth";

export const useOrderFlow = (shopId?: string) => {
  const { token } = useAuth();
  const [services, setServices] = useState<ShopService[]>([]);
  const [categories, setCategories] = useState<ShopServiceCategory[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<CartData | null>(null);
  const [localCart, setLocalCart] = useState<{
    [itemId: string]: { item: Item; quantity: number };
  }>({});
  const [selectedService, setSelectedService] = useState<ShopService | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [loading, setLoading] = useState({
    services: false,
    categories: false,
    items: false,
    cart: false,
    checkout: false,
    scheduler: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<
    { _id: string; startTime: string; endTime: string }[]
  >([]);
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<
    string | null
  >(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isExpressSelected, setIsExpressSelected] = useState(false);
  const router = useRouter();

  // Load shop services
  useEffect(() => {
    if (!shopId || !token) return;

    const loadServices = async () => {
      try {
        setLoading((prev) => ({ ...prev, services: true }));
        const data = await orderFlowService.getShopServices(shopId, token);
        setServices(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load services"
        );
      } finally {
        setLoading((prev) => ({ ...prev, services: false }));
      }
    };

    loadServices();
  }, [shopId, token]);

  // Load categories when service is selected
  useEffect(() => {
    if (!selectedService) return;

    const loadCategories = async () => {
      try {
        setLoading((prev) => ({ ...prev, categories: true }));
        setCategories(selectedService.categories);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load categories"
        );
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }));
      }
    };

    loadCategories();
  }, [selectedService]);

  // Load items when category is selected
  useEffect(() => {
    if (!selectedCategory || !selectedService || !shopId || !token) return;

    const loadItems = async () => {
      try {
        setLoading((prev) => ({ ...prev, items: true }));
        const data = await orderFlowService.getItemsByCategory(
          shopId,
          selectedService.service._id,
          selectedCategory
        );
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load items");
      } finally {
        setLoading((prev) => ({ ...prev, items: false }));
      }
    };

    loadItems();
  }, [selectedCategory, token, shopId, selectedService]);

  // Load cart
  useEffect(() => {
    if (!token) return;

    const loadCart = async () => {
      try {
        setLoading((prev) => ({ ...prev, cart: true }));
        const resp = await orderFlowService.getCart(token);
        setCart(resp.data);

        const initialLocalCart: {
          [itemId: string]: { item: Item; quantity: number };
        } = {};
        resp.data.items.forEach((cartItem: CartItemDetail) => {
          initialLocalCart[cartItem.item._id] = {
            item: cartItem.item,
            quantity: cartItem.quantity,
          };
        });
        setLocalCart(initialLocalCart);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load cart");
      } finally {
        setLoading((prev) => ({ ...prev, cart: false }));
      }
    };

    loadCart();
  }, [token]);

  // Load delivery options
  useEffect(() => {
    const options = orderFlowService.getDeliveryOptions();
    setDeliveryOptions(options);
  }, []);

  // Load time slots for standard delivery
  useEffect(() => {
    if (isExpressSelected || !token) return;

    const loadTimeSlots = async () => {
      try {
        setLoading((prev) => ({ ...prev, scheduler: true }));
        const response = await orderFlowService.getStandardDeliveryDates(token);
        setAvailableTimeSlots(response.data);

        if (response.data.length > 0 && !selectedTimeSlot) {
          setSelectedTimeSlot(response.data[0].startTime);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load time slots"
        );
      } finally {
        setLoading((prev) => ({ ...prev, scheduler: false }));
      }
    };

    loadTimeSlots();
  }, [token, isExpressSelected]);

  // Local cart operations
  const addToLocalCart = async (item: Item) => {
    // 1. Ensure we have a cart
    let currentCart = cart;
    if (currentCart?.items?.length == 0) {
      // 2. Update server cart
      const resp = await orderFlowService.addToCart(
        {
          item,
          quantity: 1,
          vendor: shopId || "",
        },
        token as string
      );
      currentCart = resp.data;
      setCart(currentCart);
    }
    console.log({currentCartn: currentCart})


    setLocalCart((prev) => ({
      ...prev,
      [item._id]: {
        item,
        quantity: (prev[item._id]?.quantity || 0) + 1,
      },
    }));
  };

  const removeFromLocalCart = (itemId: string) => {
    setLocalCart((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
  };

  const updateLocalCartQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromLocalCart(itemId);
      return;
    }

    setLocalCart((prev) => {
      if (!prev[itemId]) return prev;
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          quantity: newQuantity,
        },
      };
    });
  };

  const getDisplayCart = (isExpress: boolean = false): CartData | null => {
    if (!cart) return null;

    const displayItems: CartItemDetail[] = Object.values(localCart).map(
      ({ item, quantity }) => {
        return {
          _id: item._id,
          item: item,
          quantity: quantity,
          price: isExpress ? item.express_amount : item.fixed_amount,
          vendor: { _id: shopId || "", business_name: "" },
        };
      }
    );

    return {
      ...cart,
      items: displayItems,
      is_express: isExpress,
    };
  };

  const toggleExpressDelivery = (isExpress: boolean) => {
    setIsExpressSelected(isExpress);
    setSelectedTimeSlot(null);
    setSelectedDeliveryDate(null);
  };

  const checkout = async (
    selectedDeliveryOption: DeliveryOption,
    user: Account,
    pickupDate: string | null,
    timeSlotId?: string | null
  ) => {
    if (!token || !cart || !selectedDeliveryOption) {
      setError("Missing required information for checkout");
      return false;
    }

    try {
      setLoading((prev) => ({ ...prev, checkout: true }));

      // Prepare items for the updateMultipleCartItem endpoint
      const itemsToUpdate = Object.values(localCart).map(
        ({ item, quantity }) => ({
          item: item._id,
          quantity,
          price: isExpressSelected ? item.express_amount : item.fixed_amount,
        })
      );

      let updatedCart = null;
      // Update cart items and pricing
      if (itemsToUpdate.length > 0) {
        console.log({ init: cart, localCart, itemsToUpdate });
        updatedCart = await orderFlowService.updateMultipleCartItems(
          cart._id,
          {
            items: itemsToUpdate,
            is_express: isExpressSelected,
          },
          token
        );
      }

      // For standard delivery, use the time slot info
      if (!isExpressSelected && timeSlotId) {
        const selectedSlot = availableTimeSlots.find(
          (slot) => slot._id === timeSlotId
        );
        if (selectedSlot) {
          // Format as "startTime - endTime" for the order
          pickupDate = `${selectedSlot.startTime} - ${selectedSlot.endTime}`;
        }
      }

      const totalAmount = calculateTotal(
        isExpressSelected,
        selectedDeliveryOption
      );
      const subtotal = calculateSubtotal(isExpressSelected);
      const deliveryFee = selectedDeliveryOption.fee || 0;
      const totalItems = Object.values(localCart).reduce(
        (sum, { quantity }) => sum + quantity,
        0
      );
      console.log({ cart, updatedCart });
      const cartId = updatedCart ? updatedCart.data._id : cart._id;
      const serviceId = selectedService ? selectedService.service._id : "";
      const shippingAddress = user?.address || "";
      const shippingAddressId = cart.items[0].vendor?._id || "";
      const selectedDate = isExpressSelected ? pickupDate : null;

      // For express delivery, use the selected date
      if (isExpressSelected && pickupDate) {
        // Format the date as needed for the API
        pickupDate = new Date(pickupDate).toISOString();
      }
      const scheduledDate = new Date().toISOString().split("T")[0];

      // Here you would call your order creation API
      const orderPayload: CreateOrderPayload = {
        customer: user?.id || "",
        customer_first_name: user?.first_name || "",
        customer_last_name: user?.last_name || "",
        customer_phone_number: user?.phone || "",
        amount: totalAmount || 0,
        address:
          shippingAddress?.street_address + " " + shippingAddress?.city + " " ||
          shippingAddress?.state ||
          "",
        total_quantity: totalItems,
        cart: cartId,
        service: serviceId,
        delivery_option: "delivery",
        scheduled_date: scheduledDate,
        scheduled_time: `${timeSlotId}:00` || "",
        shipping_address: shippingAddressId,
        payment_method: "paystack", // or whatever method selected
        sub_total: subtotal,
        delivery_fee: deliveryFee,
        is_express: isExpressSelected,
      };

      const paymentResponse = await orderService.createOrderAndPay(
        orderPayload,
        "paystack",
        token
      );

      if (paymentResponse?.code === 200 && paymentResponse?.data) {
        toast.success(paymentResponse.message);
        // Redirect to payment gateway
        window.location.href =
          paymentResponse.data.initializedTrasaction.data.authorization_url;
      } else if (paymentResponse?.code === 200 && !paymentResponse?.data) {
        toast.success(paymentResponse.message);
      } else {
        toast.error("Payment initiation failed");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to checkout");
      return false;
    } finally {
      setLoading((prev) => ({ ...prev, checkout: false }));
      setLocalCart({}); // Clear local cart after successful checkout
      setCart(null); // Clear cart state
    }
  };

  const calculateSubtotal = (isExpress: boolean) => {
    return Object.values(localCart).reduce((sum, { item, quantity }) => {
      return (
        sum + (isExpress ? item.express_amount : item.fixed_amount) * quantity
      );
    }, 0);
  };

  const calculateTotal = (
    isExpress: boolean,
    selectedDeliveryOption?: DeliveryOption
  ) => {
    const subtotal = calculateSubtotal(isExpress);
    const deliveryFee = selectedDeliveryOption?.fee || 0;
    return subtotal + deliveryFee;
  };

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
    removeFromCart: removeFromLocalCart,
    updateQuantity: updateLocalCartQuantity,
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
  };
};
