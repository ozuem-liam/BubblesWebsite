'use client';

import { Text } from '../../../components/global/Text';
import { ShopService, ShopServiceCategory } from '../../../lib/order-flow';
import Image from 'next/image';
import { Skeleton } from '../../../components/ui/skeleton';

export const ShopServices = ({
  services,
  setCategories,
  onSelectService,
  selectedService,
  loading
}: {
  services: ShopService[];
  setCategories: (shopServiceCategory: ShopServiceCategory[]) => void;
  onSelectService: (shopService: ShopService) => void;
  selectedService: ShopService | null;
  loading: boolean;
}) => {

  const handleServiceSelect = (service: ShopService) => {
    onSelectService(service);
    setCategories(service.categories);
  };

  return (
    <div className="space-y-6">
      <Text as="h2" style="text-white text-2xl font-bold mb-6">
        Available Services
      </Text>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 rounded-xl bg-[#001D48]">
              <Skeleton className="w-full h-40 rounded-lg mb-3 bg-[#002A6B]" />
              <Skeleton className="w-3/4 h-5 mb-2 bg-[#002A6B]" />
              <Skeleton className="w-full h-4 bg-[#002A6B]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div
              key={service._id}
              onClick={() => handleServiceSelect(service)}
              className={`group p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedService?._id === service._id 
                  ? 'border-[#bfdbfe] bg-[#bfdbfe]/10 shadow-md' 
                  : 'border-[#1a3b6d] bg-[#001D48] hover:border-[#bfdbfe]/50'
              }`}
              aria-selected={selectedService?._id === service._id}
            >
              <div className="flex flex-col items-center">
                {/* Image Container */}
                <div className={`relative w-full h-40 mb-4 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] ${
                  selectedService?._id === service._id ? 'ring-2 ring-[#bfdbfe]' : ''
                }`}>
                  {service.service.image ? (
                    <Image 
                      src={service.service.image} 
                      alt={service.service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#002A6B] to-[#00112b] flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image available</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="text-center w-full space-y-2">
                  <Text 
                    as="h3" 
                    style={`text-lg font-semibold ${
                      selectedService?._id === service._id 
                        ? 'text-[#bfdbfe]' 
                        : 'text-white group-hover:text-[#bfdbfe]'
                    }`}
                  >
                    {service.service.name}
                  </Text>
                  <Text 
                    as="p" 
                    style={`text-sm ${
                      selectedService?._id === service._id 
                        ? 'text-[#bfdbfe]/80' 
                        : 'text-[#CCD0D4] group-hover:text-[#bfdbfe]/80'
                    }`}
                  >
                    {service.service.meta}
                  </Text>
                </div>

                {/* Selection Indicator */}
                <div className={`mt-3 w-4 h-4 rounded-full border-2 transition-colors ${
                  selectedService?._id === service._id 
                    ? 'bg-[#bfdbfe] border-[#bfdbfe]' 
                    : 'border-[#1a3b6d] group-hover:border-[#bfdbfe]'
                }`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};