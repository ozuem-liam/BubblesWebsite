'use client';

import { Text } from '../../../components/global/Text';
import { Button } from '../../../components/ui/button';
import { CartData, Item } from '../../../lib/order-flow';
import { formatNaira } from '../../../lib/utils';
import { Skeleton } from '../../../components/ui/skeleton';

export const CategoryItems = ({
  items,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  loading
}: {
  items: Item[];
  cart: CartData | null;
  onAddToCart: (item: Item) => void;
  onRemoveFromCart: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="w-full h-16 bg-gray-200 p-3 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* <Text as="h2" style="text-gray-800 text-xl font-semibold">
        Available Items
      </Text> */}
      <div className="space-y-3">
        {items.map(item => {
          const cartItem = cart?.items.find(ci => ci.item._id === item._id);
          const quantity = cartItem?.quantity || 0;

          return (
            <div 
              key={item._id} 
              className="flex justify-between items-center p-3 bg-white rounded-lg transition-colors"
            >
              <div>
                <Text as="h3" style="text-gray-800 text-sm font-medium">{item?.name}</Text>
                <Text as="p" style="text-gray-600 text-xs">
                  {cartItem ? formatNaira(cartItem.price) : formatNaira(item.fixed_amount)}
                </Text>
              </div>
              <div className="flex items-center gap-2">
                {quantity > 0 ? (
                  <>
                    <Button 
                      variant="outline"
                      size="sm" 
                      onClick={() => onUpdateQuantity(item._id, quantity - 1)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      -
                    </Button>
                    <Text as="p" style="text-gray-800 w-8 text-center">
                      {quantity}
                    </Text>
                    <Button 
                      variant="outline"
                      size="sm" 
                      onClick={() => onUpdateQuantity(item._id, quantity + 1)}
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      +
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => onAddToCart(item)}
                    className="bg_linear-gradient hover:bg-blue-700 text-white"
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};