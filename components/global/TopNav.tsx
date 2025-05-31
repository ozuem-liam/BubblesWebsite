'use client'

import { Button } from '../../components/ui/button'
import Link from 'next/link'
import { NavRoutes } from '../../lib/constants/NavRoutes'
import { Logo } from './Logo'
import { MobileNav } from './mobileNav'
import { MaxScreenWrapper } from './MaxScreen'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/auth-context'

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

export const TopNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated } = useAuth()

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
      <MaxScreenWrapper style='lg:px-[2.5rem] xl:px-[5.5rem] px-4 lg:pb-0 pb-[1rem] flex lg:flex-row flex-col justify-between lg:items-center items-start lg:gap-[12px] gap-0'>
        <div>
          <Logo />
        </div>
        <nav>
          <NavLinks />
        </nav>
        <div className='flex justify-between items-center lg:w-auto w-full h-[85%]'>
          <MobileNav />
          {/* Hide on mobile, show on desktop */}
          {!isAuthenticated ? (
            <div className='hidden lg:flex items-center gap-4'>
              <Link href='/auth/sign-in'>
                <Button className='p-4 bg-[#bfdbfe] rounded-md text-[rgba(0, 57, 143, 1)] hover:bg-[#a3c4fd] transition-colors'>
                  Login
                </Button>
              </Link>
              <Link href='/auth/sign-up'>
                <Button className='p-4 bg-[#bfdbfe] rounded-md text-[rgba(0, 57, 143, 1)] hover:bg-[#a3c4fd] transition-colors'>
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className='hidden lg:flex items-center gap-4'>
              <Link href='/dashboard'>
                <Button className='p-4 bg-[#bfdbfe] rounded-md text-[rgba(0, 57, 143, 1)] hover:bg-[#a3c4fd] transition-colors'>
                  Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      </MaxScreenWrapper>
    </header>
  )
}
