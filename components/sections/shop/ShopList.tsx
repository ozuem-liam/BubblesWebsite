'use client'

import { useShops } from '../../../hooks/useShops'
import { Button } from '../../../components/ui/button'
import { Text } from '../../../components/global/Text'
import Link from 'next/link'
import { MapPin, Star, Store } from 'lucide-react'
import { ErrorComponent } from '@/components/global/Error'
import { LoadingComponent } from '@/components/global/Loading'
import { Shop } from '@/lib/shop'

interface IShopList {
  shops: Shop[]
  loading: boolean
  error: string | null
}
export const ShopList:React.FC<IShopList> = ({ shops, loading, error }) => {
  if (loading) {
    return <LoadingComponent fallbackText={'Loading amazing shops...'} />
  }

  if (error) {
    return <ErrorComponent error={error} />
  }

  if (!shops || shops.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center h-64 text-center'>
        <div className='bg-gray-100 p-6 rounded-full mb-4'>
          <Store className='w-12 h-12 text-gray-400' />
        </div>
        <Text as='h3' style='text-gray-900 font-semibold text-lg mb-2'>
          No shops available
        </Text>
        <Text as='p' style='text-gray-600'>
          Check back later for new shops in your area
        </Text>
      </div>
    )
  }

  // Show only first 8 shops on dashboard, rest on "View All" page
  const displayShops = shops.slice(0, 8)

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-3'>
      {displayShops.map((shop) => (
        <ShopCard key={shop._id} shop={shop} />
      ))}
    </div>
  )
}

const ShopCard = ({ shop }: { shop: any }) => (
  <div className='group rounded-[10px] overflow-hidden border border-gray-200 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1'>
    {/* Shop Banner/Image */}
    <div className='bg-white m-1 border border-gray-200 rounded-md p-3 relative h-48 from-gray-100 to-gray-200 overflow-hidden'>
      {shop.business_banner ? (
        <img
          src={shop.business_banner}
          alt={shop.business_name}
          className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-300'
        />
      ) : (
        <div className='flex flex-col items-center justify-center h-full text-gray-400 bg-gradient-to-br from-blue-50 to-indigo-100'>
          <Store className='w-12 h-12 mb-2 text-blue-400' />
          <Text as='p' style='text-blue-600 font-medium text-sm'>
            Shop Image
          </Text>
        </div>
      )}

      {/* Rating Badge (placeholder - you can connect to actual rating data) */}
      <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1'>
        <Star className='w-3 h-3 text-yellow-500 fill-current' />
        <Text style='text-xs font-medium text-gray-700'>4.5</Text>
      </div>
    </div>

    {/* Shop Information */}
    <div className='py-2 px-2'>
      <div className='mb-2'>
        <Text
          as='h3'
          style='text-gray-900 text-lg font-bold mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors'
        >
          {shop.business_name}
        </Text>

        {/* Location */}
        <div className='flex items-center gap-1 mb-2'>
          <MapPin className='w-4 h-4 text-gray-400 flex-shrink-0' />
          <Text as='p' style='text-gray-600 text-sm line-clamp-1'>
            {shop.business_address}
          </Text>
        </div>

        {/* City and State */}
        <div className='flex items-center justify-between mb-4'>
          <Text as='p' style='text-blue-600 text-sm font-semibold'>
            {shop.business_city}, {shop.business_state}
          </Text>
          <div className='flex items-center gap-1 text-green-600'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            <Text style='text-xs font-medium'>Open</Text>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Link href={`/dashboard/shops/${shop._id}/order`} className='block'>
        <Button className='w-full bg_linear-gradient text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform group-hover:scale-105'>
          Visit Shop
        </Button>
      </Link>
    </div>
  </div>
)

export const FeaturedShop = () => {
  const { shops, loading, error } = useShops()
  return <ShopList shops={shops} loading={loading} error={error} />
}
