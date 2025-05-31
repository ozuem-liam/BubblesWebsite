'use client'

import { useBubbleShop, useShops } from '../../../hooks/useShops'
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

  return <ShopList shops={shop} loading={loading} error={error} />
}

export default BubbleStore
