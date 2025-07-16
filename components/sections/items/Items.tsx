'use client'

import { Skeleton } from '../../../components/ui/skeleton'
import { useSearchParams } from 'next/navigation'
import { useFetchCategoryItems, useOrderFlow } from '@/hooks/useOrderFlow'
import { CategoryItems } from '../order-flow/CategoryItems'
import { BreadCrumb } from '@/components/global/BreadCrumb'
import { useRouter } from 'nextjs-toploader/app'
import { ErrorComponent } from '@/components/global/Error'
import { Pagination } from '@/components/global/Pagination'

export const CategoryItemsPageComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useOrderFlow()
  const query = useSearchParams()
  const {
    items,
    loading,
    error,
    paginationTotal,
    setPaginationPage,
    paginationPage,
  } = useFetchCategoryItems(
    query.get('vendor_id') || '',
    query.get('service_id') || '',
    query.get('category_id') || ''
  )

  const router = useRouter()

  const breadcrumbItems = [
    {
      isHome: true,
      label: 'Home',
      onClick: () => router.push('/dashboard'),
    },
    {
      label: `Shop Items`,
    },
  ]

  if (loading) {
    return (
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className='w-full h-32 bg-gray-200 rounded-lg'
          />
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorComponent error={error} />
  }

  return (
    <div>
      <BreadCrumb breadcrumbItems={breadcrumbItems} />
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {(items || []).map((item, itemIndex) => (
          <CategoryItems
            key={itemIndex}
            items={[item]}
            cart={cart}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateQuantity}
            loading={loading}
          />
        ))}
      </div>
      {paginationTotal !== null && paginationTotal > 1 && (
        <Pagination
          totalPageNumber={paginationTotal || 1}
          activePage={paginationPage?.toString()}
          setPageNumber={setPaginationPage}
        />
      )}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
