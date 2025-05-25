'use client';

import { Text } from '../../../components/global/Text';
import { formatNaira } from '../../../lib/utils';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { CartData, DeliveryOption } from '../../../lib/order-flow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Account } from '../../../lib/auth';
import { useAuth } from '../../../contexts/auth-context';

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
  selectedDelivery: DeliveryOption;
  isExpressSelected: boolean;
  onBack: () => void;
  loading: boolean;
  availableTimeSlots: {_id: string, startTime: string, endTime: string}[];
  selectedDeliveryDate: string | null;
  setSelectedDeliveryDate: (date: string | null) => void;
  selectedTimeSlot: string | null;
  setSelectedTimeSlot: (slot: string | null) => void;
  checkout: (selectedDelivery: DeliveryOption, user: Account, pickupDate: string | null, timeSlot?: string | null) => Promise<boolean>;
}) => {
  const subtotal = cart?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
  const deliveryFee = selectedDelivery?.fee || 0;
  const total = subtotal + deliveryFee;
  const { user } = useAuth();

  const handleSubmit = async () => {
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
    <div className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d] mt-6">
      <div className="flex justify-between items-center mb-6">
        <Text as="h2" style="text-white text-xl font-bold">
          Checkout Details
        </Text>
        <Button variant="outline" onClick={onBack} className="text-white border-white hover:bg-[#1a3b6d]">
          Back
        </Button>
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <Text as="h3" style="text-white font-medium mb-2">
          Order Summary
        </Text>
        <div className="bg-[#001D48] p-4 rounded-lg">
          <div className="space-y-2">
            {cart?.items.map((item) => (
              <div key={item._id} className="flex justify-between text-[#CCD0D4]">
                <Text as="p" style="text-sm">
                  {item.quantity}x {item.item.name}
                </Text>
                <Text as="p" style="text-sm font-medium">
                  {formatNaira(item.price * item.quantity)}
                </Text>
              </div>
            ))}
          </div>
          
          <div className="border-t border-[#1a3b6d] my-3"></div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[#CCD0D4]">
              <Text as="p" style="text-sm">Subtotal</Text>
              <Text as="p" style="text-sm font-medium">{formatNaira(subtotal)}</Text>
            </div>
            <div className="flex justify-between text-[#CCD0D4]">
              <Text as="p" style="text-sm">
                {isExpressSelected ? "Express" : "Standard"} Delivery
              </Text>
              <Text as="p" style="text-sm font-medium">{formatNaira(deliveryFee)}</Text>
            </div>
            <div className="flex justify-between text-white mt-2">
              <Text as="p" style="font-medium">Total</Text>
              <Text as="p" style="font-medium">{formatNaira(total)}</Text>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Text as="h3" style="text-white font-medium">
          {isExpressSelected ? 'Select Delivery Date' : 'Available Time Slots'}
        </Text>
        
        <div className="bg-[#001D48] p-4 rounded-lg">
          {isExpressSelected ? (
            <DatePicker
              selected={selectedDeliveryDate ? new Date(selectedDeliveryDate) : null}
              onChange={(date: Date | null) => setSelectedDeliveryDate(date ? date.toISOString() : null)}
              minDate={new Date()}
              inline
              className="bg-[#00112b] text-white border-[#1a3b6d] w-full"
            />
          ) : (
            <Select
              value={selectedTimeSlot || ""}
              onValueChange={(value: string) => setSelectedTimeSlot(value || null)}
            >
              <SelectTrigger className="bg-[#00112b] text-white border-[#1a3b6d]">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {availableTimeSlots.map(slot => (
                  <SelectItem key={slot._id} value={slot.startTime}>
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
          {loading ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </div>
  );
};