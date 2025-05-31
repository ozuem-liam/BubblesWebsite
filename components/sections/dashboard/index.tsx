'use client'

import Link from 'next/link'
import { Text } from '@/components/global/Text'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { capitalize } from '@/lib/utils'
import { Loader } from 'lucide-react'
import bubblesDesktopStorebanner from '../../../public/bubbles_store_desktop_img.jpeg'
import bubblesMobileStorebanner from '../../../public/bubbles_store_mobile_img.jpeg'
import { CustomImage } from '@/components/global/Image'
import { Button } from '@/components/ui/button'
import { useShops } from '@/hooks/useShops'
import { ShopList } from '../shop/ShopList'

export const Dashboard = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <Loader className='w-12 h-12 text-blue-500 animate-spin mx-auto mb-4' />
          <Text as='p' style='text-gray-600'>
            Loading your dashboard...
          </Text>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='mx-auto py-6 space-y-8'>
        <WelcomeSection user={user} />
        <PromoBannerSection router={router} />
        <ShopsSection />
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
  const bubblesStore =
    '/dashboard/shops/6837466d37f650f4defa3839/order?name=bubbles'

  return (
    <section className='relative'>
      {/* Desktop Banner */}
      <div
        className='md:block hidden relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer'
        onClick={() => router.push(bubblesStore)}
      >
        <CustomImage
          src={bubblesDesktopStorebanner}
          style='w-full h-[22rem]'
          imgStyle='object-cover'
          priority={true}
        />
        <div className='absolute inset-0 bg-black/70 opacity-30 flex items-center justify-center'></div>
      </div>

      {/* Mobile Banner */}
      <div
        className='md:hidden block relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer'
        onClick={() => router.push(bubblesStore)}
      >
        <CustomImage
          src={bubblesMobileStorebanner}
          style='w-full h-[15rem]'
          imgStyle='object-cover '
          priority={true}
        />
        <div className='absolute inset-0 bg-black/70 opacity-30 flex items-center justify-center'></div>
      </div>
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
            children='Featured Shops'
          />
          <Text
            as='p'
            style='text-gray-600'
            children='Discover top-rated shops in your area'
          />
        </div>
        <ViewAllLink href='/dashboard/shops' />
      </header>

      <ShopList shops={shops} loading={loading} error={error} />
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
