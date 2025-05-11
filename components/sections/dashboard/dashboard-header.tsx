"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Logo } from '../../../components/global/Logo';
import { useAuth } from '../../../contexts/auth-context';

export const DashboardHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user } = useAuth();
  

  return (
    <header className="bg-[#001D48]/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <Link href="/dashboard">
            <div className="flex items-center">
              <Logo />
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Wallet button - hidden on mobile */}
          <div className="hidden sm:block">
            <Link href="/dashboard/wallet">
              <Button variant="outline" size="sm" className="border-[#bfdbfe] text-[#bfdbfe] hover:bg-[#bfdbfe] hover:text-[#001D48]">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Wallet
              </Button>
            </Link>
          </div>
          
          {/* Cart button - always visible */}
          <Link href="/dashboard/cart">
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#002A6B]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="ml-1 bg-[#bfdbfe] text-[#001D48] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">0</span>
            </Button>
          </Link>
          
          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#bfdbfe] text-[#001D48] flex items-center justify-center font-semibold">
              {user?.first_name[0].toUpperCase() + "" + user?.last_name[0].toUpperCase()}
              </div>
              <span className="hidden md:inline text-white">{user?.first_name + " " + user?.last_name}</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#00112b] rounded-md shadow-lg py-1 z-10 border border-[#1a3b6d]">
                <Link href="/dashboard" className="block px-4 py-2 text-white hover:bg-[#002A6B]">
                  Dashboard
                </Link>
                <Link href="/dashboard/profile" className="block px-4 py-2 text-white hover:bg-[#002A6B]">
                  Profile
                </Link>
                <Link href="/dashboard/orders" className="block px-4 py-2 text-white hover:bg-[#002A6B]">
                  Orders
                </Link>
                <Link href="/dashboard/wallet" className="block px-4 py-2 text-white hover:bg-[#002A6B]">
                  Wallet
                </Link>
                <Link href="/dashboard/settings" className="block px-4 py-2 text-white hover:bg-[#002A6B]">
                  Settings
                </Link>
                <div className="border-t border-[#1a3b6d] my-1"></div>
                <Link href="/" className="block px-4 py-2 text-white hover:bg-[#002A6B]">
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};