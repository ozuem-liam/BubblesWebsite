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
import Image from 'next/image';
import { ChevronLeft, Calendar, Clock, ShoppingBag, Truck } from 'lucide-react';

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
  checkout: (selectedDelivery: DeliveryOption | null, user: Account, pickupDate: string | null, timeSlot?: string | null) => Promise<boolean>;
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
    <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-600 hover:bg-gray-50"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to cart
        </Button>
        <Text as="h2" style="text-gray-800 text-xl font-bold">
          Checkout
        </Text>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <Text as="h3" style="text-gray-700 text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              Order Summary
            </Text>
            
            <div className="space-y-4">
              {cart?.items.map((item) => (
                <div key={item._id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  {item.item.image && (
                    <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-200">
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
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <Text as="h3" style="text-gray-700 text-lg font-semibold mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              Delivery Method
            </Text>
            
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                {isExpressSelected ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Calendar className="w-4 h-4" />
                )}
              </div>
              <div>
                <Text as="p" style="font-medium">
                  {selectedDelivery?.label}
                </Text>
                <Text as="p" style="text-gray-500 text-sm">
                  {selectedDelivery?.deliveryTime}
                </Text>
                {isExpressSelected && (
                  <Text as="p" style="text-blue-600 text-xs mt-1">
                    Express pricing applied
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Selection Section */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div>
              <Text as="h3" style="text-gray-700 text-lg font-semibold mb-4 flex items-center gap-2">
                {isExpressSelected ? (
                  <>
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Select Delivery Date
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5 text-blue-600" />
                    Available Time Slots
                  </>
                )}
              </Text>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                {isExpressSelected ? (
                  <div className="space-y-4">
                    <DatePicker
                      selected={selectedDeliveryDate ? new Date(selectedDeliveryDate) : null}
                      onChange={(date: Date | null) => setSelectedDeliveryDate(date ? date.toISOString() : null)}
                      minDate={new Date()}
                      inline
                      className="w-full"
                      calendarClassName="border-0 shadow-none"
                      dayClassName={(date) => 
                        date.getDate() === new Date(selectedDeliveryDate || '').getDate() 
                          ? 'bg-blue-600 text-white rounded-full' 
                          : 'hover:bg-gray-100 rounded-full'
                      }
                    />
                    {selectedDeliveryDate && (
                      <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm">
                        Selected: {new Date(selectedDeliveryDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    )}
                  </div>
                ) : loading ? (
                  <Skeleton className="h-10 w-full bg-gray-200 rounded-lg" />
                ) : (
                  <div className="space-y-3">
                    <Select
                      value={selectedTimeSlot || ""}
                      onValueChange={(value: string) => setSelectedTimeSlot(value || null)}
                    >
                      <SelectTrigger className="bg-white text-gray-800 border-gray-300 h-12">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent className="border-gray-200 shadow-lg rounded-lg">
                        {availableTimeSlots.map(slot => (
                          <SelectItem 
                            key={slot._id} 
                            value={slot.startTime}
                            className="hover:bg-gray-50 py-3"
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              {slot.startTime} - {slot.endTime}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedTimeSlot && (
                      <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm">
                        Selected: {selectedTimeSlot}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <Text as="h3" style="text-gray-700 text-lg font-semibold mb-3">
                Order Total
              </Text>
              
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
                    {formatNaira(deliveryFee)}
                  </Text>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <div className="flex justify-between">
                    <Text as="p" style="text-gray-800 font-bold">Total</Text>
                    <Text as="p" style="text-gray-800 text-xl font-bold">
                      {formatNaira(total)}
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading || 
                (isExpressSelected && !selectedDeliveryDate) || 
                (!isExpressSelected && !selectedTimeSlot)}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm mt-4"
              size="lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </span>
              ) : (
                'Complete Payment'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};