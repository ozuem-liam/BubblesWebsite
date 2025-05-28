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
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <Skeleton className="w-full h-40 rounded-md mb-3 bg-gray-200" />
              <Skeleton className="w-3/4 h-5 mb-2 bg-gray-200" />
              <Skeleton className="w-full h-4 bg-gray-200" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* <div className=""> */}
          {services.map(service => (
            <div
              key={service._id}
              onClick={() => handleServiceSelect(service)}
              className={`group p-5 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedService?._id === service._id 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className={`relative w-full h-40 mb-4 rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] ${
                  selectedService?._id === service._id ? 'ring-2 ring-blue-200' : ''
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
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image available</span>
                    </div>
                  )}
                </div>

                <div className="text-center w-full space-y-2">
                  <Text 
                    as="h3" 
                    style={`font-semibold ${
                      selectedService?._id === service._id 
                        ? 'text-blue-600' 
                        : 'text-gray-800 group-hover:text-blue-600'
                    }`}
                  >
                    {service.service.name}
                  </Text>
                  <Text 
                    as="p" 
                    style={`text-xs ${
                      selectedService?._id === service._id 
                        ? 'text-blue-500' 
                        : 'text-gray-600 group-hover:text-blue-500'
                    }`}
                  >
                    {service.service.meta}
                  </Text>
                </div>

                <div className={`mt-3 w-4 h-4 rounded-full border-2 transition-colors ${
                  selectedService?._id === service._id 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-gray-300 group-hover:border-blue-300'
                }`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};