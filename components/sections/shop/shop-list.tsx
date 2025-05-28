'use client';

import { useShops } from '../../../hooks/useShops';
import { Button } from '../../../components/ui/button';
import { Text } from '../../../components/global/Text';
import Link from 'next/link';
import { Loader } from 'lucide-react';

export const ShopList = () => {
  const { shops, loading, error } = useShops();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader className="w-5 h-5 animate-spin" />
          <Text as="p">Loading shops...</Text>
        </div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {shops.map((shop) => (
        <div 
          key={shop._id} 
          className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="h-48 bg-gray-100 flex items-center justify-center">
            {shop.business_banner ? (
              <img 
                src={shop.business_banner} 
                alt={shop.business_name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <svg 
                  className="w-12 h-12 mb-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <Text as="p">No banner available</Text>
              </div>
            )}
          </div>
          <div className="p-4">
            <Text 
              as="h3" 
              style="text-gray-800 text-lg font-semibold mb-2 truncate"
            >
              {shop.business_name}
            </Text>
            <Text 
              as="p" 
              style="text-gray-600 text-xs mb-4 line-clamp-2"
              data-title={shop.business_address}
            >
              {shop.business_address}
            </Text>
            <div className="flex justify-between items-center">
              <Text 
                as="p" 
                style="text-blue-600 text-xs text-sm font-medium"
              >
                {shop.business_city}, {shop.business_state}
              </Text>
              <Link href={`/dashboard/shops/${shop._id}/order`}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
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