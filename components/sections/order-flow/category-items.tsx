'use client';

import { Text } from '../../../components/global/Text';
import { Button } from '../../../components/ui/button';
import { CartData, Item } from '../../../lib/order-flow';
import { formatNaira } from '../../../lib/utils';
import { Skeleton } from '../../../components/ui/skeleton';
import Image from 'next/image';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="w-full h-24 bg-gray-200 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map(item => {
        const cartItem = cart?.items.find(ci => ci.item._id === item._id);
        const quantity = cartItem?.quantity || 0;
        const price = cartItem ? cartItem.price : item.fixed_amount;

        return (
          <div 
            key={item._id} 
            className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
          >
            {item.image && (
              <div className="relative w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-grow">
              <Text as="h3" style="text-gray-800 font-medium">{item.name}</Text>
              <Text as="p" style="text-blue-600 font-semibold mt-1">
                {formatNaira(price)}
              </Text>
              
              <div className="mt-3 flex items-center justify-between">
                {quantity > 0 ? (
                  <div className="flex items-center gap-2">
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
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => onAddToCart(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};