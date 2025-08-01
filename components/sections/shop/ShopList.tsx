'use client'

import { Text } from '../../../components/global/Text'
import { Store } from 'lucide-react'
import { ErrorComponent } from '@/components/global/Error'
import { LoadingComponent } from '@/components/global/Loading'
import { Service } from '@/lib/shop'
import { CustomImage } from '@/components/global/Image'
import { useRouter } from 'next/navigation'

interface IServiceList {
  services: Service[]
  loading: boolean
  error: string | null
}
export const ShopList: React.FC<IServiceList> = ({ services, loading, error }) => {
  if (loading) {
    return <LoadingComponent fallbackText={'Loading amazing services...'} />
  }

  if (error) {
    return <ErrorComponent error={error} />
  }

  if (!services || services.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center h-64 text-center'>
        <div className='bg-gray-100 p-6 rounded-full mb-4'>
          <Store className='w-12 h-12 text-gray-400' />
        </div>
        <Text as='h3' style='text-gray-900 font-semibold text-lg mb-2'>
          No services available
        </Text>
        <Text as='p' style='text-gray-600'>
          Check back later for new services in your area
        </Text>
      </div>
    )
  }

  // Show only first 8 services on dashboard, rest on "View All" page
  const displayServices = services.slice(0, 8)

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-3'>
      {displayServices.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  )
}

const ServiceCard = ({ service }: { service: Service }) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/dashboard/categories/${service._id}`)
  }
  return (
    <div
      className='group rounded-[10px] overflow-hidden hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer'
      onClick={handleClick}
    >
      {/* Service Image */}
      <div className='bg-white rounded-md relative h-48 from-gray-100 to-gray-200 overflow-hidden'>
        {service.image ? (
          <CustomImage
            src={service.image}
            alt={service.name}
            style='w-full h-full p-1 group-hover:scale-110 transition-transform duration-300'
            imgStyle='object-cover'
          />
        ) : (
          <div className='flex flex-col items-center justify-center h-full text-gray-400 bg-gradient-to-br from-blue-50 to-indigo-100'>
            <Store className='w-12 h-12 mb-2 text-blue-400' />
            <Text as='p' style='text-blue-600 font-medium text-sm'>
              Service Image
            </Text>
          </div>
        )}
      </div>

      {/* Service Information */}
      <div className='py-2 px-2'>
        <div className='mb-2'>
          <Text
            as='h3'
            style='text-gray-900 text-lg font-bold mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors'
          >
            {service.name}
          </Text>
          <Text as='p' style='text-gray-600 text-sm line-clamp-2'>
            {service.meta}
          </Text>
        </div>
      </div>
    </div>
  )
}
