'use client'

import { usePathname } from 'next/navigation'
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
import { LogOut, User } from 'lucide-react'
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
  AvatarIcon,
} from '@/components/svgs'
import { ProfileIcon } from './Icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserAvatar } from '@/components/global/UserAvatar'
import { useAuth } from '@/contexts/auth-context'

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
    title: 'Cart',
    url: 'orders',
    svgicon: CartIcon,
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
  const { user } = useAuth()

  const userName = user ? `${user.first_name} ${user.last_name}` : ''
  const userInitials = user
    ? `${user.first_name[0]?.toUpperCase()}${user.last_name[0]?.toUpperCase()}`
    : ''

  const isActive = (url: string) => {
    if (url === '') {
      return pathname === '/dashboard'
    }
    return pathname === `/dashboard/${url}`
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
          '--sidebar-width-mobile': SIDEBAR_WIDTH,
        } as React.CSSProperties
      }
    >
      <Sidebar className="border-r-2 border-gray-200">
        <SidebarHeader>
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
                      className='flex items-center gap-3'
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
                <SidebarGroupLabel className='text-gray_400'>
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
                          className='flex items-center gap-3'
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

        <SidebarFooter>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href={`/`} className='flex items-center gap-3 mb-12'>
              <LogOut className='w-8 h-8 text-white' />
                <span className="text-lg text-white">Sign Out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarFooter>
      </Sidebar>

      <main className='relative w-full'>
        <header className='sticky top-0 z-10 w-full bg-white shadow'>
          <div className='flex h-14 items-center justify-between px-4 w-full'>
            <SidebarTrigger className='md:hidden block' />
            <div className='text-black flex gap-3 items-center text-[12xp] font-[500]'>
              <Home03Icon />
              {'Dashboard'}
            </div>
            <div className='flex items-center gap-4'>
              <div className='hidden sm:block'>
                <Link href='/dashboard/wallet'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='border-gray-400 text-gray-600 transition-colors duration-200'
                  >
                    <WalletIcon className='w-5 h-5 mr-2 text-blue-500' />
                    Wallet
                  </Button>
                </Link>
              </div>
              <UserAvatar fallbackText={userInitials} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='flex items-center gap-2 focus:outline-none cursor-pointer'>
                    <AvatarIcon />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-36 border border-gray-400 z-[1000] shadow-none bg-white'>
                  <DropdownMenuItem className='flex items-center gap-2'>
                    <User className='w-4 h-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='flex items-center gap-2 text-red-600 focus:text-red-600'>
                    <LogOut className='w-4 h-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className='container py-3 bg-gray-50'>{children}</div>
      </main>
    </SidebarProvider>
  )
}
