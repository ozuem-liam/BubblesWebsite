"use client";

import { Text } from "../../../components/global/Text";
import { CartData, Item, ShopServiceCategory } from "../../../lib/order-flow";
import { Skeleton } from "../../../components/ui/skeleton";
import { CategoryItems } from "./category-items";
import Image from "next/image";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-32 bg-gray-200 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => onSelectCategory(category._id)}
            className={`p-4 rounded-xl cursor-pointer transition-all border ${
              selectedCategory === category._id
                ? "bg-blue-50 border-blue-200 ring-2 ring-blue-100"
                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-4">
              {category.image && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <Text 
                  as="h3" 
                  style={`font-medium ${
                    selectedCategory === category._id 
                      ? "text-blue-600" 
                      : "text-gray-800"
                  }`}
                >
                  {category.name}
                </Text>
                <Text as="p" style="text-gray-500 text-sm">
                  {category.meta}
                </Text>
              </div>
            </div>

            {selectedCategory === category._id && (
              <div className="mt-4">
                <Text as="h4" style="text-gray-700 font-medium mb-2">
                  Available Items
                </Text>
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