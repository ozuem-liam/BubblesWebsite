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
import {
  LogOut,
  User,
  Search,
  Menu,
  Store,
  ShoppingBag,
  Wallet,
  UserCircle,
  LayoutDashboard,
  Home,
} from 'lucide-react'
import { Logo } from '../../global/Logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CartIcon, WalletIcon } from '@/components/svgs'
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
    url: '/shops/6837466d37f650f4defa3839/order?name=bubbles',
    icon: Store,
  },
  {
    title: 'Orders',
    url: 'orders',
    icon: ShoppingBag,
  },
  {
    title: 'Wallet',
    url: 'wallet',
    icon: Wallet,
  },
  {
    title: 'Profile',
    url: 'profile',
    icon: UserCircle,
  },
]

const SIDEBAR_WIDTH = '220px' // Increased width for better spacing

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
          '--sidebar-width-mobile': '100%',
        } as React.CSSProperties
      }
    >
      <Sidebar className='border-r-2 border-gray-200'>
        <SidebarHeader className='px-6 py-6'>
          <Logo style='w-[138px] h-[45px]' />
        </SidebarHeader>

        <SidebarContent className='px-3'>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className='space-y-2'>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href={`/dashboard`}
                      className='flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-200 hover:bg-gray-100'
                      style={{
                        color: isActive('') ? '#002F6C' : '#6B7280',
                        backgroundColor: isActive('')
                          ? '#E4F0FF'
                          : 'transparent',
                        fontWeight: isActive('') ? '600' : '500',
                      }}
                    >
                      <LayoutDashboard
                        size={22}
                        className={`${
                          isActive('') ? 'text-[#002F6C]' : 'text-gray-500'
                        }`}
                      />
                      <span className='text-base'>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <div className='py-3'>
                  <SidebarGroupLabel className='text-gray-400 px-4 text-xs font-semibold uppercase tracking-wider mb-3'>
                    MAIN MENU
                  </SidebarGroupLabel>
                </div>

                {generalItems.map((item) => {
                  const active = isActive(item.url)
                  const Icon = item.icon

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={`/dashboard/${item.url}`}
                          className='flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-200 hover:bg-gray-100'
                          style={{
                            color: active ? '#002F6C' : '#6B7280',
                            backgroundColor: active ? '#E4F0FF' : 'transparent',
                            fontWeight: active ? '600' : '500',
                          }}
                        >
                          <Icon
                            size={22}
                            className={`${
                              active ? 'text-[#002F6C]' : 'text-gray-500'
                            }`}
                          />
                          <span className='text-base'>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className='px-7 py-6'>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={handleOpenAlert}
                className='flex items-center gap-4 px-4 py-4 w-full text-left rounded-lg transition-all duration-200 hover:bg-red-50'
              >
                <LogOut size={22} className='text-red-500' />
                <span className='text-base font-medium text-red-600'>
                  Sign Out
                </span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>

      <main className='relative w-full'>
        <header className='sticky top-0 z-10 w-full bg-white shadow-sm border-b border-gray-200'>
          <div className='flex h-16 items-center justify-between px-4 w-full'>
            <div className='flex items-center gap-4'>
              <SidebarTrigger className='md:hidden block p-2 hover:bg-gray-100 rounded-lg'>
                <Menu className='w-6 h-6 text-gray-600' />
              </SidebarTrigger>
              <div className='hidden md:flex items-center gap-3 text-sm font-medium text-gray-700'>
                <Home className='w-5 h-5 text-blue-500' />
                <span>Dashboard</span>
              </div>
            </div>

            <div className='flex-1 max-w-md mx-4'>
              <form
                onSubmit={handleSearchSubmit}
                className='flex items-center bg-gray-100 rounded-lg px-4 py-2.5 w-full border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all'
              >
                <input
                  type='text'
                  placeholder='Search products...'
                  className='bg-transparent border-none outline-none text-sm w-full'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  type='submit'
                  className='text-gray-500 hover:text-blue-500 ml-2 p-1 rounded transition-colors'
                  aria-label='Search'
                >
                  <Search className='w-4 h-4' />
                </button>
              </form>
            </div>

            <div className='flex items-center gap-3'>
              <div className='hidden sm:block'>
                <Link href='/dashboard/wallet'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='border-gray-300 text-gray-600 hover:bg-gray-50 h-10 px-4'
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
                  className='border-gray-300 text-gray-600 hover:bg-gray-50 h-10 px-4'
                >
                  <CartIcon className='w-5 h-5' />
                  <span className='hidden md:inline ml-2'>Cart</span>
                  {cartItemCount > 0 && (
                    <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg'>
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full'>
                    <UserAvatar
                      fallbackText={userInitials}
                      className='h-10 w-10 border-2 border-gray-200 hover:border-blue-300 transition-colors'
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='w-48 border border-gray-200 shadow-lg z-[1000] bg-white rounded-lg'
                >
                  <DropdownMenuItem className='flex items-center gap-3 px-4 py-3 hover:bg-gray-50'>
                    <User className='w-5 h-5 text-gray-500' />
                    <span className='font-medium'>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleOpenAlert}
                    className='flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 focus:text-red-600'
                  >
                    <LogOut className='w-5 h-5' />
                    <span className='font-medium'>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className='container py-6 px-4 sm:px-6 bg-gray-50 min-h-[calc(100vh-4rem)]'>
          {children}
        </div>
      </main>
      <LogoutConfirmation showAlert={showAlert} setShowAlert={setShowAlert} />
    </SidebarProvider>
  )
}
