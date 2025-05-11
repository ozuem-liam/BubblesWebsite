'use client';

import { Text } from '@/components/global/Text';
import { ShopServiceCategory } from '@/lib/order-flow';
import { useEffect } from 'react';

export const ServiceCategories = ({
  categories,
  onSelectCategory,
  selectedCategory,
  loading
}: {
  categories: ShopServiceCategory[];
  onSelectCategory: (id: string) => void;
  selectedCategory: string | null;
  loading: boolean;
}) => {
  if (loading) {
    return <Text as="p" style="text-white">Loading categories...</Text>;
  }

  return (
    <div className="space-y-4 mt-6">
      <Text as="h2" style="text-white text-xl font-semibold mb-4">
        Categories
      </Text>
      <div className="space-y-2">
        {categories.map(category => (
          <div
            key={category._id}
            onClick={() => onSelectCategory(category._id)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCategory === category._id 
                ? 'bg-[#bfdbfe] text-[#001D48]' 
                : 'bg-[#001D48] text-white hover:bg-[#00338D]'
            }`}
          >
            <Text as="h3" style="font-medium">{category.name}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};