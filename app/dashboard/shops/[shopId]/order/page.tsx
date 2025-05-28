"use client";

import { useParams } from "next/navigation";
import { useOrderFlow } from "../../../../../hooks/useOrderFlow";
import { Text } from "../../../../../components/global/Text";
import { useState } from "react";
import { toast } from "sonner";
import { CategoryItems } from "../../../../../components/sections/order-flow/category-items";
import { OrderSummary } from "../../../../../components/sections/order-flow/order-summary";
import { CheckoutScreen } from "../../../../../components/sections/order-flow/checkout-screen";
import { ServiceCategories } from "../../../../../components/sections/order-flow/service-categories";
import { ShopServices } from "../../../../../components/sections/order-flow/shop-services";
import { DeliveryOption } from "../../../../../lib/order-flow";
import { Account } from "../../../../../lib/auth";

export default function OrderFlowPage() {
  const { shopId } = useParams();
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
  } = useOrderFlow(shopId as string);

  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOption | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckoutScreen, setShowCheckoutScreen] = useState(false);

  const handleSelectDelivery = (option: DeliveryOption) => {
    setSelectedDelivery(option);
    toggleExpressDelivery(option.type === "express");
  };

  const handleProceedToCheckout = () => {
    if (!selectedDelivery || !cart?.items.length) {
      toast.error("Please select delivery option and add items to cart");
      return;
    }

    setShowCheckoutScreen(true);
  };

  const handleBackToSummary = () => {
    setShowCheckoutScreen(false);
  };

  const handleCheckout = async (
    selectedDelivery: DeliveryOption | null,
    user: Account,
    pickupDate: string | null,
    timeSlot?: string | null
  ) => {
    if (!selectedDelivery || !cart?.items.length) {
      toast.error("Please select delivery option and add items to cart");
      return false;
    }

    setIsCheckingOut(true);
    try {
      if (!user) {
        toast.error("User is not authenticated");
        return false;
      }
      const success = await checkout(
        selectedDelivery,
        user,
        pickupDate,
        timeSlot
      );

      if (success) {
        toast.success("Order created successfully!");
        return true;
      } else {
        toast.error("Failed to process your order");
        return false;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to process your order");
      return false;
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <Text as="p" style="text-red-500">
          {error}
        </Text>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Text as="h1" style="text-gray-800 text-xl font-bold mb-6">
        {showCheckoutScreen ? "Complete Your Order" : "Create Your Order"}
      </Text>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {!showCheckoutScreen ? (
          <>
            <div className="lg:col-span-2 space-y-6">
              {categories.length === 0 && (
                <>
                  <ShopServices
                    services={services}
                    setCategories={setCategories}
                    onSelectService={selectService}
                    selectedService={selectedService}
                    loading={loading.services}
                  />
                </>
              )}

              {selectedService && (
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <ServiceCategories
                    categories={categories}
                    onSelectCategory={selectCategory}
                    selectedCategory={selectedCategory}
                    cloading={loading.categories}
                    items={items}
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                    loading={loading.items}
                  />
                </div>
              )}
            </div>
            <div className="lg:col-span-1">
              <>
                <OrderSummary
                  cart={cart}
                  deliveryOptions={deliveryOptions}
                  onSelectDelivery={handleSelectDelivery}
                  selectedDelivery={selectedDelivery}
                  onCheckout={handleProceedToCheckout}
                  loading={isCheckingOut || loading.checkout}
                  isExpressSelected={isExpressSelected}
                />
              </>
            </div>
          </>
        ) : (
          <div className="lg:col-span-3">
            <div className="bg-white shadow-sm">
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
          </div>
        )}
      </div>
    </div>
  );
}
