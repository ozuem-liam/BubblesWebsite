'use client'

import { Text } from '../../global/Text'
import {
  CartData,
  Item,
  ShopService,
  ShopServiceCategory,
} from '../../../lib/order-flow'
import { Skeleton } from '../../ui/skeleton'
import { CategoryItems } from './CategoryItems'
import { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { useRouter } from 'nextjs-toploader/app'
import { useParams } from 'next/navigation'

export const ServiceCategories = ({
  categories,
  selectedService,
  onSelectCategory,
  selectedCategory,
  cloading,
  items,
  categoryItemsMap,
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  loading,
}: {
  categories: ShopServiceCategory[]
  selectedService: ShopService | null
  onSelectCategory: (id: string) => void
  selectedCategory: string | null
  cloading: boolean
  items: Item[]
  categoryItemsMap: Record<string, Item[]>
  cart: CartData | null
  addToCart: (item: Item) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  loading: boolean
}) => {
  const { shopId } = useParams()
  const [isContentVisible, setIsContentVisible] = useState(false)
  const swiperRefs = useRef<{ [key: string]: SwiperRef }>({})
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsContentVisible(true)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setIsContentVisible(false)
    }
  }, [loading])

  // Use the map instead of filtering the flat array
  const getItemsByCategory = (categoryId: string) => {
    return categoryItemsMap[categoryId] || []
  }

  // Clean up Swiper instances on unmount
  useEffect(() => {
    return () => {
      Object.values(swiperRefs.current).forEach((swiperRef) => {
        if (swiperRef && swiperRef.swiper && swiperRef.swiper.destroy) {
          swiperRef.swiper.destroy()
        }
      })
    }
  }, [])

  if (loading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className='w-full h-32 bg-gray-200 rounded-lg'
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`space-y-6 transition-all duration-700 ease-out ${
        isContentVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      <div className='grid grid-cols-1 gap-6'>
        {categories.map((category, index) => {
          const categoryItems = getItemsByCategory(category._id)
          const hasItems = categoryItems.length > 0

          if (!hasItems) return null

          return (
            <div
              key={category._id}
              onClick={() => onSelectCategory(category._id)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-500 ease-out border ${
                selectedCategory === category._id
                  ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-100'
                  : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300 ring-2 ring-blue-100'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isContentVisible
                  ? `fadeInUp 0.6s ease-out ${index * 100}ms both`
                  : 'none',
              }}
            >
              <div
                className={`mt-4 transition-all duration-500 ease-out ${
                  isContentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2'
                }`}
                style={{
                  transitionDelay: `${index * 100 + 200}ms`,
                }}
              >
                <div className='ms-auto md:w-[50%] w-full flex items-center justify-between mb-3'>
                  <Text as='h4' style='text-gray-800 font-medium text-xl'>
                    {category.name}
                  </Text>
                  <Text
                    clickFunc={() =>
                      router.push(
                        `/dashboard/items?vendor_id=${encodeURIComponent(
                          `${shopId}`
                        )}&service_id=${encodeURIComponent(
                          selectedService?.service?._id || ''
                        )}&category_id=${encodeURIComponent(category._id)}`
                      )
                    }
                    as='h4'
                    style='text-gray-500 font-medium text-sm cursor-pointer'
                  >
                    See all
                  </Text>
                </div>

                <div className='relative' onClick={(e) => e.stopPropagation()}>
                  {categoryItems.length === 0 ? (
                    <div className='flex space-x-4'>
                      {[...Array(3)].map((_, idx) => (
                        <Skeleton
                          key={idx}
                          className='w-50 h-32 bg-gray-200 rounded-lg'
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      <Swiper
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                          640: { slidesPerView: 2 },
                        }}
                        loop={categoryItems.length > 3}
                        autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                          pauseOnMouseEnter: true,
                        }}
                        modules={[Navigation, Autoplay]}
                        navigation={{
                          nextEl: `.swiper-button-next-${category._id}`,
                          prevEl: `.swiper-button-prev-${category._id}`,
                        }}
                        ref={(swiper) => {
                          if (swiper) {
                            swiperRefs.current[category._id] = swiper
                          }
                        }}
                        className='items-swiper'
                      >
                        {categoryItems.map((item, itemIndex) => (
                          <SwiperSlide
                            key={`${category._id}-${item._id}-${itemIndex}`}
                            style={{ width: '100%' }}
                          >
                            <div
                              className={`w-full bg-none transition-all duration-500 ease-out ${
                                isContentVisible
                                  ? 'opacity-100 translate-x-0'
                                  : 'opacity-0 translate-x-4'
                              }`}
                              style={{
                                transitionDelay: `${
                                  index * 100 + itemIndex * 50 + 300
                                }ms`,
                              }}
                            >
                              <CategoryItems
                                items={[item]}
                                cart={cart}
                                onAddToCart={addToCart}
                                onRemoveFromCart={removeFromCart}
                                onUpdateQuantity={updateQuantity}
                                loading={loading}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {categoryItems.length > 3 && (
                        <>
                          <button
                            className={`swiper-button-prev-${category._id} absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors`}
                            aria-label='Previous slide'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='currentColor'
                              className='w-5 h-5 text-gray-600'
                            >
                              <path
                                fillRule='evenodd'
                                d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                          <button
                            className={`swiper-button-next-${category._id} absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors`}
                            aria-label='Next slide'
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='currentColor'
                              className='w-5 h-5 text-gray-600'
                            >
                              <path
                                fillRule='evenodd'
                                d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

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
