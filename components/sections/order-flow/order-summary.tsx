'use client';

import { Text } from '../../../components/global/Text';
import { formatNaira } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { CartData, DeliveryOption } from '../../../lib/order-flow';

export const OrderSummary = ({
  cart,
  deliveryOptions,
  onSelectDelivery,
  selectedDelivery,
  onCheckout,
  loading,
  isExpressSelected
}: {
  cart: CartData | null;
  deliveryOptions: DeliveryOption[];
  onSelectDelivery: (option: DeliveryOption) => void;
  selectedDelivery: DeliveryOption | null;
  onCheckout: () => void;
  loading: boolean;
  isExpressSelected: boolean;
}) => {
  const subtotal = cart?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const deliveryFee = selectedDelivery?.fee || 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d] mt-6">
      <Text as="h2" style="text-white text-xl font-semibold mb-4">
        Order Summary
      </Text>

      <div className="space-y-4">
        <div className="space-y-2">
          <Text as="h3" style="text-white font-medium">Cart Items</Text>
          {!cart || cart.items.length === 0 ? (
            <Text as="p" style="text-[#CCD0D4]">Your cart is empty</Text>
          ) : (
            <div className="space-y-2">
              {cart.items.map(item => (
                <div key={item.item._id} className="flex justify-between">
                  <Text as="p" style="text-[#CCD0D4]">
                    {item.item.name} × {item.quantity}
                  </Text>
                  <Text as="p" style="text-white">
                    {formatNaira(item.price * item.quantity)}
                  </Text>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Text as="h3" style="text-white font-medium">Delivery Options</Text>
          <div className="space-y-2">
            {deliveryOptions.map(option => (
              <div
                key={option.type}
                onClick={() => onSelectDelivery(option)}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedDelivery?.type === option.type
                    ? 'bg-[#bfdbfe] text-[#001D48]'
                    : 'bg-[#001D48] text-white hover:bg-[#00338D]'
                }`}
              >
                <div className="flex justify-between">
                  <Text as="p" style="font-medium">{option.label}</Text>
                  <Text as="p">{formatNaira(option.fee)}</Text>
                </div>
                <Text as="p" style="text-sm">{option.deliveryTime}</Text>
                {option.type === 'express' && 
                  <Text as="p" style="text-sm italic mt-1">
                    {isExpressSelected && selectedDelivery?.type === 'express' 
                      ? "Express pricing applied" 
                      : "Will use express pricing"}
                  </Text>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#1a3b6d] pt-4 space-y-2">
          <div className="flex justify-between">
            <Text as="p" style="text-[#CCD0D4]">Subtotal:</Text>
            <Text as="p" style="text-white">
              {formatNaira(subtotal)}
            </Text>
          </div>
          <div className="flex justify-between">
            <Text as="p" style="text-[#CCD0D4]">Delivery Fee:</Text>
            <Text as="p" style="text-white">
              {selectedDelivery ? formatNaira(deliveryFee) : '--'}
            </Text>
          </div>
          <div className="flex justify-between font-bold">
            <Text as="p" style="text-white">Total:</Text>
            <Text as="p" style="text-white text-lg">
              {formatNaira(total)}
            </Text>
          </div>
        </div>

        <Button
          onClick={onCheckout}
          disabled={!cart || cart.items.length === 0 || !selectedDelivery || loading}
          className="w-full bg-[#bfdbfe] text-[#001D48] hover:bg-[#a3c4fd] mt-4"
        >
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </Button>
      </div>
    </div>
  );
};