'use client';

import { useShops } from '@/hooks/useShops';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/global/Text';
import Link from 'next/link';

export const ShopList = () => {
  const { shops, loading, error } = useShops();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text as="p" style="text-white">Loading shops...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text as="p" style="text-red-500">{error}</Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map((shop) => (
        <div key={shop._id} className="bg-[#00112b] rounded-lg overflow-hidden border border-[#1a3b6d]">
          <div className="h-48 bg-[#001D48] flex items-center justify-center">
            {shop.business_banner ? (
              <img 
                src={shop.business_banner} 
                alt={shop.business_name} 
                className="h-32 w-32 object-contain"
              />
            ) : (
              <Text as="p" style="text-[#CCD0D4]">No logo</Text>
            )}
          </div>
          <div className="p-4">
            <Text as="h3" style="text-white text-xl font-bold mb-2">{shop.business_name}</Text>
            <Text as="p" style="text-[#CCD0D4] mb-4 line-clamp-2">{shop.business_address}</Text>
            <div className="flex justify-between items-center">
              <Text as="p" style="text-[#bfdbfe]">{shop.business_city}, {shop.business_state}</Text>
              <Link href={`/dashboard/shops/${shop._id}/order`}>
              <Button 
                variant="outline" 
                className="border-[#bfdbfe] text-[#bfdbfe] hover:bg-[#bfdbfe] hover:text-[#001D48]"
              >
                View Shop
              </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};