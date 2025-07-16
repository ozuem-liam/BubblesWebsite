'use client'

import { useBubbleShop } from '../../../hooks/useShops'
import { ErrorComponent } from '@/components/global/Error'
import { LoadingComponent } from '@/components/global/Loading'
import { ShopList } from '../shop/ShopList'

export const BubbleStore = () => {
  const { shop, loading, error } = useBubbleShop()

  if (loading) {
    return <LoadingComponent fallbackText={'Loading amazing shops...'} />
  }

  if (error) {
    return <ErrorComponent error={error} />
  }

  // Flatten all services from all shops into a Service[]
  const allServices = shop.flatMap(s =>
    s.services?.map(ssc => ({
      _id: ssc.service._id,
      name: ssc.service.name,
      image: typeof ssc.service.image === 'string' ? ssc.service.image : (ssc.service.image?.src || ''),
      meta: ssc.service.meta,
      is_active: s.is_active,
      __v: ssc.service.__v,
    })) || []
  )

  return <ShopList services={allServices} loading={loading} error={error} />
}

export default BubbleStore
