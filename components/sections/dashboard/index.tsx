'use client'

import Link from 'next/link'
import { Text } from '@/components/global/Text'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { capitalize } from '@/lib/utils'
import bubblesDesktopStorebanner from '../../../public/bubbles_store_desktop_img.jpeg'
import bubblesMobileStorebanner from '../../../public/bubbles_store_mobile_img.jpeg'
import { CustomImage } from '@/components/global/Image'
import { Button } from '@/components/ui/button'
import { useBubbleShopItems, useShops } from '@/hooks/useShops'
import { ShopList } from '../shop/ShopList'
import { LoadingComponent } from '@/components/global/Loading'
import { bubblesStoreRoute } from '@/lib/constants/BubbleStore'
import { CategoryItems } from '../order-flow/CategoryItems'
import { useOrderFlow } from '@/hooks/useOrderFlow'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

export const Dashboard = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return <LoadingComponent fallbackText={'Loading your dashboard...'} />
  }

  return (
    <div>
      <div className='mx-auto py-6 space-y-8'>
        <WelcomeSection user={user} />
        <ShopsSection />
        <PromoBannerSection router={router} />
      </div>
    </div>
  )
}

const WelcomeSection = ({ user }: { user: any }) => (
  <section>
    <Text
      as='h1'
      style='text-gray-900 text-2xl font-bold mb-2'
      children={`Welcome back, ${capitalize(user?.first_name) || 'Guest'}! 👋`}
    />
    <Text
      as='p'
      style='text-gray-600 text-md'
      children='Discover amazing shops and exclusive deals today'
    />
  </section>
)

const PromoBannerSection = ({ router }: { router: any }) => {
  const { items, loading, error } = useBubbleShopItems('')
  const { cart, addToCart, removeFromCart, updateQuantity } = useOrderFlow()

  // Handlers for cart actions
  const handleAddToCart = (item: any) => addToCart(item)
  const handleRemoveFromCart = (itemId: string) => removeFromCart(itemId)
  const handleUpdateQuantity = (itemId: string, quantity: number) => updateQuantity(itemId, quantity)

  return (
    <section className='relative'>
      {/* Desktop Banner */}
      <div
        className='md:block hidden relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer mb-6'
        onClick={() => router.push(bubblesStoreRoute)}
      >
        <CustomImage
          src={bubblesDesktopStorebanner}
          style='w-full h-[22rem]'
          imgStyle='object-cover'
          priority={true}
        />
        <div className='absolute inset-0 bg-black/70 opacity-30 flex items-center justify-center'></div>
      </div>

      <header className='mb-4 mt-2 flex flex-col items-start'>
        <Text as='h2' style='text-gray-900 text-xl font-bold mb-1'>Shop Our Latest Products</Text>
        <Text as='p' style='text-gray-600'>Browse and shop the newest arrivals from Bubbles Store</Text>
      </header>

      {loading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className='h-40 bg-gray-100 rounded-lg animate-pulse' />
          ))}
        </div>
      ) : error ? (
        <div className='text-red-500 text-center py-8'>{error}</div>
      ) : (
        <div className='relative'>
          <div className='flex justify-end mb-2'>
            <Button
              onClick={() => router.push(bubblesStoreRoute)}
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2'
            >
              View More Products
            </Button>
          </div>
          <Swiper
            spaceBetween={16}
            slidesPerView='auto'
            loop={items.length > 4}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: `.dashboard-swiper-button-next`,
              prevEl: `.dashboard-swiper-button-prev`,
            }}
            className='product-swiper pb-6'
          >
            {items.slice(0, 10).map((item, idx) => (
              <SwiperSlide key={item._id} style={{ width: 240, maxWidth: '90vw' }}>
                <CategoryItems
                  items={[item]}
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  loading={loading}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {items.length > 4 && (
            <>
              <button
                className='dashboard-swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors'
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
                className='dashboard-swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors'
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
        </div>
      )}
    </section>
  )
}

const ShopsSection = () => {
  const { shops, loading, error } = useShops()
  return (
    <section>
      <header className='flex flex-wrap justify-between items-center mb-8 gap-4'>
        <div>
          <Text
            as='h2'
            style='text-gray-900 text-2xl font-bold mb-2'
            children='Featured Services'
          />
          <Text
            as='p'
            style='text-gray-600'
            children='Discover top-rated services in your area'
          />
        </div>
      </header>

      <ShopList services={shops} loading={loading} error={error} />
    </section>
  )
}

const ViewAllLink = ({ href }: { href: string }) => (
  <Link href={href} className='ms-auto'>
    <Button
      variant='outline'
      className='border border-gray-400 text-[#002F6C] hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200'
    >
      View All Shops
      <ChevronRightIcon className='w-4 h-4 ml-2' />
    </Button>
  </Link>
)

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 5l7 7-7 7'
    />
  </svg>
)
