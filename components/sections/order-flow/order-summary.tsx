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
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <Text as="h2" style="text-gray-800 text-xl font-semibold mb-4">
        Order Summary
      </Text>

      <div className="space-y-4">
        <div className="space-y-2">
          <Text as="h3" style="text-gray-700 text-sm font-medium">Cart Items</Text>
          {!cart || cart.items.length === 0 ? (
            <Text as="p" style="text-gray-500">Your cart is empty</Text>
          ) : (
            <div className="space-y-2">
              {cart.items.map(item => (
                <div key={item.item._id} className="flex justify-between">
                  <Text as="p" style="text-gray-600">
                    {item.item.name} × {item.quantity}
                  </Text>
                  <Text as="p" style="text-gray-800">
                    {formatNaira(item.price * item.quantity)}
                  </Text>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Text as="h3" style="text-gray-700 text-sm font-medium">Delivery Options</Text>
          <div className="space-y-2">
            {deliveryOptions.map(option => (
              <div
                key={option.type}
                onClick={() => onSelectDelivery(option)}
                className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                  selectedDelivery?.type === option.type
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex justify-between">
                  <Text as="p" style="text-sm font-medium">{option.label}</Text>
                  <Text as="p">{formatNaira(option.fee)}</Text>
                </div>
                <Text as="p" style="text-xs text-gray-500">{option.deliveryTime}</Text>
                {option.type === 'express' && 
                  <Text as="p" style="text-xs italic mt-1 text-gray-500">
                    {isExpressSelected && selectedDelivery?.type === 'express' 
                      ? "Express pricing applied" 
                      : "Will use express pricing"}
                  </Text>
                }
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between">
            <Text as="p" style="text-gray-600">Subtotal:</Text>
            <Text as="p" style="text-gray-800">
              {formatNaira(subtotal)}
            </Text>
          </div>
          <div className="flex justify-between">
            <Text as="p" style="text-gray-600">Delivery Fee:</Text>
            <Text as="p" style="text-gray-800">
              {selectedDelivery ? formatNaira(deliveryFee) : '--'}
            </Text>
          </div>
          <div className="flex justify-between font-bold">
            <Text as="p" style="text-gray-800">Total:</Text>
            <Text as="p" style="text-gray-800 text-lg">
              {formatNaira(total)}
            </Text>
          </div>
        </div>

        <Button
          onClick={onCheckout}
          disabled={!cart || cart.items.length === 0 || !selectedDelivery || loading}
          className="w-full bg_linear-gradient hover:bg-blue-700 text-white mt-4"
        >
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </Button>
      </div>
    </div>
  );
};