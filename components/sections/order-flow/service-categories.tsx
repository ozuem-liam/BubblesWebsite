"use client";

import { Text } from "../../../components/global/Text";
import { CartData, Item, ShopServiceCategory } from "../../../lib/order-flow";
import { Skeleton } from "../../../components/ui/skeleton";
import { CategoryItems } from "./category-items";

export const ServiceCategories = ({
  categories,
  onSelectCategory,
  selectedCategory,
  cloading,
  items,
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  loading,
}: {
  categories: ShopServiceCategory[];
  onSelectCategory: (id: string) => void;
  selectedCategory: string | null;
  cloading: boolean;
  items: Item[];
  cart: CartData | null;
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  loading: boolean;
}) => {
  if (cloading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-12 bg-gray-200 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => onSelectCategory(category._id)}
            className={`p-3 rounded-lg cursor-pointer transition-colors border ${
              selectedCategory === category._id
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            <Text as="h3" style="text-sm font-medium">
              {category.name}
            </Text>
            {selectedCategory && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mt-3">
                <CategoryItems
                  items={items}
                  cart={cart}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                  loading={loading}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
