'use client'

import { Text } from '../../../components/global/Text'
import { ShopService, ShopServiceCategory } from '../../../lib/order-flow'
import { Skeleton } from '../../../components/ui/skeleton'
import { truncateEnd } from '../../../lib/helpers/TruncateText'
import { CustomImage } from '@/components/global/Image'
import { Button } from '@/components/ui/button'

export const ShopServices = ({
  services,
  setCategories,
  onSelectService,
  selectedService,
  loading,
}: {
  services: ShopService[]
  setCategories: (shopServiceCategory: ShopServiceCategory[]) => void
  onSelectService: (shopService: ShopService) => void
  selectedService: ShopService | null
  loading: boolean
}) => {
  const handleServiceSelect = (service: ShopService) => {
    onSelectService(service)
    setCategories(service.categories)
  }

  return (
    <div>
      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className='p-4 rounded-lg bg-gray-50 border border-gray-200'
            >
              <Skeleton className='w-full h-40 rounded-md mb-3 bg-gray-200' />
              <Skeleton className='w-3/4 h-5 mb-2 bg-gray-200' />
              <Skeleton className='w-full h-4 bg-gray-200' />
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {services.map((service) => (
            <div
              key={service._id}
              onClick={() => handleServiceSelect(service)}
              className={`border group relative rounded-xl border-gray-300 cursor-pointer transition-all duration-300 overflow-hidden ${
                selectedService?._id === service._id ? 'bg-blue-50' : 'bg-white'
              }`}
            >
              <div className='flex flex-col h-full'>
                <div
                  className={`relative w-full mb-4 rounded-md overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] ${
                    selectedService?._id === service._id
                      ? 'ring-2 ring-blue-200'
                      : ''
                  }`}
                >
                  {service.service.image ? (
                    <CustomImage
                      alt={service.service.name}
                      src={service.service.image}
                      style='w-full h-[9.5rem]'
                      imgStyle='object-cover'
                    />
                  ) : (
                    <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'>
                      <span className='text-gray-400 text-sm'>
                        No image available
                      </span>
                    </div>
                  )}
                </div>

                <div className='p-4 min-h-[5rem]'>
                  <Text
                    as='h3'
                    style={`font-semibold text-lg mb-1 ${
                      selectedService?._id === service._id
                        ? 'text-blue-600'
                        : 'text-gray-800 group-hover:text-blue-600'
                    }`}
                  >
                    {service.service.name}
                  </Text>
                  <Text
                    as='p'
                    style={`text-sm ${
                      selectedService?._id === service._id
                        ? 'text-blue-500'
                        : 'text-gray-600 group-hover:text-blue-500'
                    }`}
                  >
                    {truncateEnd(service.service.meta, 45)}
                  </Text>
                  <Button className='w-full rounded-lg border border-gray-300 bg-none mt-2'>
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
