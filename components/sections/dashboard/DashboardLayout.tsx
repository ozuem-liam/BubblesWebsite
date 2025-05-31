'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'nextjs-toploader/app'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { LogOut, User, Search, Menu } from 'lucide-react'
import { Logo } from '../../global/Logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  CartIcon,
  OrdersIcon,
  ShopIcon,
  WalletIcon,
  DashboardIcon,
  Home03Icon,
  ProfileIcon,
} from '@/components/svgs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserAvatar } from '@/components/global/UserAvatar'
import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'
import { LogoutConfirmation } from './LogoutConfirmation'
import { useOrderFlow } from '@/hooks/useOrderFlow'

const generalItems = [
  {
    title: 'Shops',
    url: 'shops',
    svgicon: ShopIcon,
  },
  {
    title: 'Orders',
    url: 'orders',
    svgicon: OrdersIcon,
  },
  {
    title: 'Wallet',
    url: 'wallet',
    svgicon: WalletIcon,
  },
  {
    title: 'Profile',
    url: 'profile',
    svgicon: ProfileIcon,
  },
]

const SIDEBAR_WIDTH = '230px'

export default function DashboardPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const [showAlert, setShowAlert] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { cart } = useOrderFlow()
  const cartItemCount = cart?.items.length || 0

  const userInitials = user
    ? `${user.first_name[0]?.toUpperCase()}${user.last_name[0]?.toUpperCase()}`
    : ''

  const isActive = (url: string) => {
    if (url === '') {
      return pathname === '/dashboard'
    }
    return pathname === `/dashboard/${url}`
  }

  const handleOpenAlert = () => {
    setShowAlert(true)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/dashboard/browse?search=${encodeURIComponent(searchValue)}`)
    }
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
          '--sidebar-width-mobile': '100%', // Full width on mobile
        } as React.CSSProperties
      }
    >
      <Sidebar className='border-r-2 border-gray-200'>
        <SidebarHeader className='px-4'>
          <Logo style='w-[138px] h-[45px] my-4' />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={`/dashboard`}
                      className='flex items-center gap-3 px-4 py-3'
                      style={{
                        color: isActive('') ? '#002F6C' : 'white',
                        backgroundColor: isActive('') ? '#E4F0FF' : '',
                      }}
                    >
                      <DashboardIcon
                        className={`${
                          isActive('') ? 'text-[#002F6C]' : 'text-white'
                        }`}
                      />
                      <span className='text-md'>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarGroupLabel className='text-gray_400 px-4'>
                  MAIN MENU
                </SidebarGroupLabel>
                {generalItems.map((item) => {
                  const active = isActive(item.url)
                  const Icon = item.svgicon

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={`/dashboard/${item.url}`}
                          className='flex items-center gap-3 px-4 py-3 relative'
                          style={{
                            color: active ? '#002F6C' : 'white',
                            backgroundColor: active ? '#E4F0FF' : '',
                          }}
                        >
                          <Icon
                            className={`${
                              active ? 'text-[#002F6C]' : 'text-white'
                            }`}
                          />
                          <span className='text-md'>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className='px-4'>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div
                onClick={handleOpenAlert}
                className='flex items-center gap-3 mb-12 px-4 py-3'
              >
                <LogOut className='w-6 h-6 text-white' />
                <span className='text-lg text-white'>Sign Out</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>

      <main className='relative w-full'>
        <header className='sticky top-0 z-10 w-full bg-white shadow-sm'>
          <div className='flex h-16 items-center justify-between px-4 w-full'>
            <div className='flex items-center gap-4'>
              <SidebarTrigger className='md:hidden block'>
                <Menu className='w-6 h-6 text-gray-600' />
              </SidebarTrigger>
              <div className='hidden md:flex items-center gap-2 text-sm font-medium text-gray-700'>
                <Home03Icon className='w-5 h-5' />
                <span>Dashboard</span>
              </div>
            </div>

            <div className='flex-1 max-w-md mx-4'>
              <form
                onSubmit={handleSearchSubmit}
                className='flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full'
              >
                <input
                  type='text'
                  placeholder='Search...'
                  className='bg-transparent border-none outline-none text-sm w-full rounded-lg'
                  style={{ borderRadius: '8px' }}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  type='submit'
                  className='text-gray-500 hover:text-blue-500 ml-2 cursor-pointer'
                  aria-label='Search'
                >
                  <Search className='w-4 h-4' />
                </button>
              </form>
            </div>

            <div className='flex items-center gap-2'>
              <div className='hidden sm:block'>
                <Link href='/dashboard/wallet'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='border-gray-300 text-gray-600 hover:bg-gray-50 h-9'
                  >
                    <WalletIcon className='w-5 h-5 mr-2 text-blue-500' />
                    <span className='hidden md:inline'>Wallet</span>
                  </Button>
                </Link>
              </div>

              <Link href='/dashboard/cart' className='relative'>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-gray-300 text-gray-600 hover:bg-gray-50 h-9'
                >
                  <CartIcon className='w-5 h-5' />
                  <span className='hidden md:inline ml-2'>Cart</span>
                  {cartItemCount > 0 && (
                    <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='focus:outline-none'>
                    <UserAvatar
                      fallbackText={userInitials}
                      className='h-9 w-9'
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='w-48 border border-gray-200 shadow-md z-[1000] bg-white'
                >
                  <DropdownMenuItem className='flex items-center gap-2 px-4 py-2'>
                    <User className='w-4 h-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleOpenAlert}
                    className='flex items-center gap-2 px-4 py-2 text-red-600 focus:text-red-600'
                  >
                    <LogOut className='w-4 h-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className='container py-4 px-4 sm:px-6 bg-gray-50 min-h-[calc(100vh-4rem)]'>
          {children}
        </div>
      </main>
      <LogoutConfirmation showAlert={showAlert} setShowAlert={setShowAlert} />
    </SidebarProvider>
  )
}
