'use client';

import { Text } from '../../../components/global/Text';
import { formatNaira } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';
import { CartData, DeliveryOption } from '../../../lib/order-flow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Account } from '../../../lib/auth';
import { useAuth } from '../../../contexts/auth-context';
import { Skeleton } from '../../../components/ui/skeleton';

export const CheckoutScreen = ({
  cart,
  selectedDelivery,
  isExpressSelected,
  onBack,
  loading,
  availableTimeSlots,
  selectedDeliveryDate,
  setSelectedDeliveryDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
  checkout
}: {
  cart: CartData | null;
  selectedDelivery: DeliveryOption | null;
  isExpressSelected: boolean;
  onBack: () => void;
  loading: boolean;
  availableTimeSlots: {_id: string, startTime: string, endTime: string}[];
  selectedDeliveryDate: string | null;
  setSelectedDeliveryDate: (date: string | null) => void;
  selectedTimeSlot: string | null;
  setSelectedTimeSlot: (slot: string | null) => void;
  checkout: (cart: any, selectedDelivery: DeliveryOption | null, user: Account, pickupDate: string | null, timeSlot?: string | null) => Promise<boolean>;
}) => {
  const subtotal = cart?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const deliveryFee = selectedDelivery?.fee || 0;
  const total = subtotal + deliveryFee;
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!selectedDelivery || !cart?.items.length) {
      toast.error("Please select delivery option and add items to cart");
      return false;
    }

    if (isExpressSelected && !selectedDeliveryDate) {
      toast.error("Please select a delivery date");
      return;
    }
    
    if (!isExpressSelected && !selectedTimeSlot) {
      toast.error("Please select a time slot");
      return;
    }

    if (!user) {
      toast.error("User is not authenticated. Please log in.");
      return;
    }
    const success = await checkout(
      cart,
      selectedDelivery, 
      user,
      isExpressSelected ? selectedDeliveryDate : null,
      selectedDeliveryDate ? null : selectedTimeSlot
    );
    
    if (!success) {
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <Text as="h2" style="text-gray-800 text-xl font-bold">
          Checkout Details
        </Text>
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Back
        </Button>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <Text as="h3" style="text-gray-700 text-sm font-medium mb-3">
          Order Summary
        </Text>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-3">
            {cart?.items.map((item) => (
              <div key={item._id} className="flex justify-between">
                <Text as="p" style="text-gray-600 text-sm">
                  {item.quantity}x {item.item.name}
                </Text>
                <Text as="p" style="text-gray-800 text-sm font-medium">
                  {formatNaira(item.price * item.quantity)}
                </Text>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 my-3"></div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Text as="p" style="text-gray-600 text-sm">Subtotal</Text>
              <Text as="p" style="text-gray-800 text-sm font-medium">{formatNaira(subtotal)}</Text>
            </div>
            <div className="flex justify-between">
              <Text as="p" style="text-gray-600 text-sm">
                {isExpressSelected ? "Express" : "Standard"} Delivery
              </Text>
              <Text as="p" style="text-gray-800 text-sm font-medium">{formatNaira(deliveryFee)}</Text>
            </div>
            <div className="flex justify-between mt-2">
              <Text as="p" style="text-gray-800 font-medium">Total</Text>
              <Text as="p" style="text-gray-800 font-medium">{formatNaira(total)}</Text>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Text as="h3" style="text-gray-700 text-sm font-medium">
          {isExpressSelected ? 'Select Delivery Date' : 'Available Time Slots'}
        </Text>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          {isExpressSelected ? (
            <DatePicker
              selected={selectedDeliveryDate ? new Date(selectedDeliveryDate) : null}
              onChange={(date: Date | null) => setSelectedDeliveryDate(date ? date.toISOString() : null)}
              minDate={new Date()}
              inline
              className="w-full"
              calendarClassName="border border-gray-200 shadow-sm rounded-lg"
              dayClassName={(date) => 
                date.getDate() === new Date(selectedDeliveryDate || '').getDate() 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'hover:bg-gray-100'
              }
            />
          ) : loading ? (
            <Skeleton className="h-10 w-full bg-gray-200" />
          ) : (
            <Select
              value={selectedTimeSlot || ""}
              onValueChange={(value: string) => setSelectedTimeSlot(value || null)}
            >
              <SelectTrigger className="bg-white text-gray-800 border-gray-300">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent className="border-gray-200 shadow-sm">
                {availableTimeSlots.map(slot => (
                  <SelectItem 
                    key={slot._id} 
                    value={slot.startTime}
                    className="hover:bg-gray-50"
                  >
                    {slot.startTime} - {slot.endTime}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Button 
          onClick={handleSubmit}
          disabled={loading || 
            (isExpressSelected && !selectedDeliveryDate) || 
            (!isExpressSelected && !selectedTimeSlot)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : 'Pay Now'}
        </Button>
      </div>
    </div>
  );
};