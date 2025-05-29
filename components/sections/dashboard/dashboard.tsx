'use client'

import Link from 'next/link'
import { Text } from '@/components/global/Text'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { capitalize, formatNaira, koboToNaira } from '@/lib/utils'
import { useWallet } from '@/hooks/useWallet'
import { Loader, Store, TrendingUp, Users, ShoppingBag } from 'lucide-react'
import { ShopList } from '../shop/ShopList'
import bubblesDesktopStorebanner from '../../../public/bubbles_store_desktop_img.jpeg'
import bubblesMobileStorebanner from '../../../public/bubbles_store_mobile_img.jpeg'
import { CustomImage } from '@/components/global/Image'
import { Button } from '@/components/ui/button'
import { Wallet } from '@/lib/wallet'

export const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth()
  const { wallet } = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/sign-in')
    }
  }, [isAuthenticated, loading, router])

  if (loading || !isAuthenticated) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
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
      <div className='mx-auto px-4 py-8 space-y-8'>
        <WelcomeSection user={user} />
        <StatsSection wallet={wallet} />
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

const StatsSection = ({ wallet }: { wallet: Wallet | null }) => (
  <section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
    <StatCard
      icon={<Store className='w-6 h-6 text-[#002F6C]' />}
      title='Shops available for you'
      value='150+'
    />
    <StatCard
      icon={<TrendingUp className='w-6 h-6 text-[#002F6C]' />}
      title='Orders placed today'
      value='2.4k'
    />
    <StatCard
      icon={<Users className='w-6 h-6 text-[#002F6C]' />}
      title='Wallet balance'
      value={`${formatNaira(koboToNaira(wallet?.balance))}`}
    />
  </section>
)

const StatCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: string
}) => (
  <div
    className={`flex gap-3 items-center rounded-md p-4 border border-gray-300 transition-all duration-200`}
  >
    <div className='flex items-center justify-between mb-4'>
      <div className='p-2 rounded-full bg-gray-300'>{icon}</div>
    </div>
    <div>
      <Text as='p' style='text-gray-900 font-medium mb-1' children={title} />
      <Text
        as='h3'
        style='text-gray-900 text-2xl font-bold mb-1'
        children={value}
      />
    </div>
  </div>
)

const PromoBannerSection = ({ router }: { router: any }) => (
  <section className='relative'>
    {/* Desktop Banner */}
    <div
      className='md:block hidden relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer'
      onClick={() => router.push('/')}
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
      onClick={() => router.push('/')}
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

const ShopsSection = () => (
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

    <ShopList />
  </section>
)

const ViewAllLink = ({ href }: { href: string }) => (
  <Link href={href} className='ms-auto'>
    <Button
      variant='outline'
      className='border-[#002F6C] text-[#002F6C] hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200'
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
