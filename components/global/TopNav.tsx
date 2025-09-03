'use client'

import { Button } from '../../components/ui/button'
import Link from 'next/link'
import { NavRoutes } from '../../lib/constants/NavRoutes'
import { Logo } from './Logo'
import { MobileNav } from './mobileNav'
import { MaxScreenWrapper } from './MaxScreen'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { CartIcon } from '../svgs'
import { useOrderFlow } from '@/hooks/useOrderFlow'

const NavLinks: React.FC = () => (
  <ul className='lg:flex hidden lg:flex-row gap-[24px] flex-col w-full items-center justify-between'>
    {NavRoutes.map((links, index) => (
      <li
        key={index}
        className='text-[16px] font-[400] text-tertiary600 py-1 px-1 hover:text-primary600 transition-colors duration-500'
      >
        <Link href={`/#${links.route}`} className='text-none text-tertiary600'>
          {links.title}
        </Link>
      </li>
    ))}
  </ul>
)

const CartButton: React.FC<{ cartItemCount: number }> = ({ cartItemCount }) => (
  <Link href='/dashboard/cart' className='relative group'>
    <Button
      variant='outline'
      size='sm'
      className='border-gray-300 text-gray-600 hover:bg-gray-50 h-10 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 group-hover:border-primary300'
    >
      <CartIcon className='w-5 h-5 group-hover:text-primary600 transition-colors duration-300' />
      <span className='hidden md:inline ml-2 font-medium group-hover:text-primary600 transition-colors duration-300'>Cart</span>
      {cartItemCount > 0 && (
        <span className='absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg border-2 border-white animate-bounce'>
          {cartItemCount > 99 ? '99+' : cartItemCount}
        </span>
      )}
    </Button>
  </Link>
)

export const TopNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated } = useAuth()
  const { cart } = useOrderFlow()
  const cartItemCount = cart?.items.length || 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50) // Change background after 50px scroll
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isScrolled ? 'bg-primary800 shadow-md' : 'bg-transparent'
      }`}
    >
      <MaxScreenWrapper style='lg:px-[2.5rem] px-4 lg:pb-0 pb-[1rem] flex lg:flex-row flex-col justify-between lg:items-center items-start lg:gap-[12px] gap-0'>
        <div>
          <Logo />
        </div>
        <nav>
          <NavLinks />
        </nav>

      </MaxScreenWrapper>
    </header>
  )
}