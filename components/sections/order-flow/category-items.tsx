'use client';

import { Text } from '../../../components/global/Text';
import { Button } from '../../../components/ui/button';
import { CartData, Item } from '../../../lib/order-flow';
import { formatNaira } from '../../../lib/utils';

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
    return <Text as="p" style="text-white">Loading items...</Text>;
  }

  return (
    <div className="space-y-4 mt-6">
      <Text as="h2" style="text-white text-xl font-semibold mb-4">
        Available Items
      </Text>
      <div className="space-y-3">
        {items.map(item => {
          const cartItem = cart?.items.find(ci => ci.item._id === item._id);
          const quantity = cartItem?.quantity || 0;

          return (
            <div key={item._id} className="flex justify-between items-center p-3 bg-[#001D48] rounded">
              <div>
                <Text as="h3" style="text-white font-medium">{item?.name}</Text>
                <Text as="p" style="text-[#CCD0D4] text-sm">
                  {cartItem ? formatNaira(cartItem.price) : formatNaira(item.fixed_amount)}
                </Text>
              </div>
              <div className="flex items-center gap-2">
                {quantity > 0 ? (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => onUpdateQuantity(item._id, quantity - 1)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      -
                    </Button>
                    <Text as="p" style="text-white w-8 text-center">
                      {quantity}
                    </Text>
                    <Button 
                      size="sm" 
                      onClick={() => onUpdateQuantity(item._id, quantity + 1)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      +
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => onAddToCart(item)}
                    className="bg-[#bfdbfe] text-[#001D48] hover:bg-[#a3c4fd]"
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