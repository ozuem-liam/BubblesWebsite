'use client';

import { Text } from '../../../components/global/Text';
import { formatNaira } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { CartData, DeliveryOption } from '../../../lib/order-flow';
import Image from 'next/image';
import { ShoppingBag, Truck, Clock, CheckCircle } from 'lucide-react';

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
    <div className="bg-white p-4 border border-gray-300 rounded-md overflow-hidden">
      <div className=" border-b pb-2 border-gray-100 mb-4">
        <Text as="h2" style="text-gray-800 text-xl font-bold flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          Order Summary
        </Text>
      </div>

      <div className="space-y-6">
        {/* Cart Items */}
        <div>
          <Text as="h3" style="text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2">
            Your Items ({cart?.items.length || 0})
          </Text>
          
          {!cart || cart.items.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Text as="p" style="text-gray-500">Your cart is empty</Text>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map(item => (
                <div key={item.item._id} className="flex items-start gap-4">
                  {item.item.image && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={item.item.image}
                        alt={item.item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <Text as="p" style="text-gray-800 font-medium">
                      {item.item.name}
                    </Text>
                    <Text as="p" style="text-gray-500 text-sm">
                      {item.quantity} × {formatNaira(item.price)}
                    </Text>
                  </div>
                  <Text as="p" style="text-gray-800 font-semibold">
                    {formatNaira(item.price * item.quantity)}
                  </Text>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delivery Options */}
        <div>
          <Text as="h3" style="text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            Delivery Options
          </Text>
          
          <div className="space-y-3">
            {deliveryOptions.map(option => (
              <div
                key={option.type}
                onClick={() => onSelectDelivery(option)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedDelivery?.type === option.type
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    selectedDelivery?.type === option.type 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {option.type === 'express' ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <Text as="p" style="font-medium">
                        {option.label}
                      </Text>
                      <Text as="p" style="font-semibold">
                        {formatNaira(option.fee)}
                      </Text>
                    </div>
                    <Text as="p" style="text-gray-500 text-sm mt-1">
                      {option.deliveryTime}
                    </Text>
                    {option.type === 'express' && (
                      <Text as="p" style={`text-xs mt-2 px-2 py-1 rounded ${
                        isExpressSelected && selectedDelivery?.type === 'express'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isExpressSelected && selectedDelivery?.type === 'express'
                          ? "Express pricing applied"
                          : "Uses express pricing"}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Totals */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Text as="p" style="text-gray-600">Subtotal</Text>
              <Text as="p" style="text-gray-800 font-medium">
                {formatNaira(subtotal)}
              </Text>
            </div>
            
            <div className="flex justify-between">
              <Text as="p" style="text-gray-600">
                {selectedDelivery?.type === 'express' ? 'Express' : 'Standard'} Delivery
              </Text>
              <Text as="p" style="text-gray-800 font-medium">
                {selectedDelivery ? formatNaira(deliveryFee) : '--'}
              </Text>
            </div>
            
            <div className="border-t border-gray-200 pt-3 mt-2">
              <div className="flex justify-between">
                <Text as="p" style="text-gray-800 font-bold">Total</Text>
                <Text as="p" style="text-gray-800 text-lg font-bold">
                  {formatNaira(total)}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={onCheckout}
          disabled={!cart || cart.items.length === 0 || !selectedDelivery || loading}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
          size="lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Proceed to Checkout'
          )}
        </Button>
      </div>
    </div>
  );
};