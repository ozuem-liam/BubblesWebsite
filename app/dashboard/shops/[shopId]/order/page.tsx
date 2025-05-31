'use client'

import { useParams } from 'next/navigation'
import { useOrderFlow } from '../../../../../hooks/useOrderFlow'
import { ServiceCategories } from '../../../../../components/sections/order-flow/ServiceCategories'
import { ShopServices } from '../../../../../components/sections/order-flow/ShopServices'
import { ChevronRight, Home } from 'lucide-react'
import { ErrorComponent } from '@/components/global/Error'

interface BreadcrumbItem {
  label: string
  onClick: (() => void) | null
  isHome?: boolean
}

export default function OrderFlowPage() {
  const { shopId } = useParams()
  const {
    services,
    categories,
    setCategories,
    items,
    cart,
    loading,
    error,
    selectService,
    selectCategory,
    addToCart,
    removeFromCart,
    updateQuantity,
    selectedService,
    selectedCategory,
  } = useOrderFlow(shopId as string)

  // Build breadcrumb items dynamically
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Services',
      onClick: () => {
        selectService(null)
        setCategories([])
        selectCategory(null)
      },
      isHome: true,
    },
  ]

  if (selectedService) {
    breadcrumbItems.push({
      label: selectedService.service.name,
      onClick: selectedCategory
        ? () => {
            selectCategory(null)
          }
        : null,
    })
  }

  if (selectedCategory) {
    breadcrumbItems.push({
      label: 'Categories',
      onClick: null,
    })
  }

  if (error) {
    return <ErrorComponent error={error} />
  }

  return (
    <div className='px-0 py-4'>
      {/* Improved Breadcrumb Navigation */}
      <nav
        aria-label='Breadcrumb'
        className='flex items-center space-x-1 text-sm text-gray-600 mb-4'
      >
        {breadcrumbItems.map((item, index) => (
          <div key={index} className='flex items-center'>
            {index > 0 && (
              <ChevronRight className='h-4 w-4 text-gray-400 mx-2' />
            )}

            {item.onClick ? (
              <button
                onClick={item.onClick}
                className='flex items-center hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-2 py-1'
              >
                {item.isHome && <Home className='h-4 w-4 mr-1' />}
                {item.label}
              </button>
            ) : (
              <span className='flex items-center text-gray-900 font-medium px-2 py-1'>
                {item.isHome && <Home className='h-4 w-4 mr-1' />}
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
      <div>
        {categories.length === 0 && (
          <ShopServices
            services={services}
            setCategories={setCategories}
            onSelectService={selectService}
            selectedService={selectedService}
            loading={loading.services}
          />
        )}

        {selectedService && (
          <ServiceCategories
            selectedService={selectedService}
            categories={categories}
            onSelectCategory={selectCategory}
            selectedCategory={selectedCategory || null}
            cloading={loading.categories}
            items={items}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            loading={loading.items}
          />
        )}
      </div>
    </div>
  )
}
