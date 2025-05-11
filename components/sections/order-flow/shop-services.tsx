'use client';

import { Text } from '../../../components/global/Text';
import { ShopService, ShopServiceCategory } from '../../../lib/order-flow';
import Image from 'next/image';

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

  if (loading) {
    return <Text as="p" style="text-white">Loading services...</Text>;
  }

  const handleServiceSelect = (service: ShopService) => {
    // Pass both the service ID and its categories to the parent component
    onSelectService(service);
    setCategories(service.categories);
  };

  return (
    <div className="space-y-4">
      <Text as="h2" style="text-white text-xl font-semibold mb-4">
        Available Services
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(service => (
          <div
            key={service._id}
            onClick={() => handleServiceSelect(service)}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedService?._id === service._id 
                ? 'bg-[#bfdbfe] text-[#001D48]' 
                : 'bg-[#001D48] text-white hover:bg-[#00338D]'
            }`}
          >
            <div className="flex flex-col items-center">
              {service.service.image ? (
                <div className="relative w-24 h-24 mb-3 rounded-md overflow-hidden">
                  <Image 
                    src={service.service.image} 
                    alt={service.service.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 mb-3 bg-gray-700 rounded-md flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No image</span>
                </div>
              )}
              <div className="text-center w-full">
                <Text as="h3" style="font-medium">{service.service.name}</Text>
                <Text as="p" style="text-sm mt-2">{service.service.meta}</Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};