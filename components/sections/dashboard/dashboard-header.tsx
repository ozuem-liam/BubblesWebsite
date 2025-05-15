"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { Logo } from '../../../components/global/Logo';
import { useAuth } from '../../../contexts/auth-context';
import { useOrderFlow } from '../../../hooks/useOrderFlow'; // Assuming you have a cart hook

export const DashboardHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth();
  const { cart } = useOrderFlow(); // Get cart data

  // User initials for avatar fallback
  const userInitials = user 
    ? `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`
    : '';

  // User full name for display
  const userName = user 
    ? `${user.first_name} ${user.last_name}`
    : '';

  // Calculate total items in cart
  const cartItemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <header className="bg-[#001D48]/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-3">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/dashboard" aria-label="Go to dashboard">
            <div className="flex items-center">
              <Logo />
            </div>
          </Link>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Wallet Button - Hidden on mobile */}
          <div className="hidden sm:block">
            <Link href="/dashboard/wallet">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-[#bfdbfe] text-[#bfdbfe] hover:bg-[#bfdbfe] hover:text-[#001D48]"
                aria-label="Wallet"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                  />
                </svg>
                Wallet
              </Button>
            </Link>
          </div>
          
          {/* Cart Button - Now links to orders summary */}
          <Link href="/dashboard/orders" aria-label="View orders">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-[#002A6B] relative"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="ml-1 bg-[#bfdbfe] text-[#001D48] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold absolute -top-1 -right-1">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>
          
          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none group"
              aria-label="User menu"
              aria-expanded={isDropdownOpen}
            >
              {/* User Avatar */}
              <div 
                className="w-8 h-8 rounded-full bg-[#bfdbfe] text-[#001D48] flex items-center justify-center font-semibold transition-transform group-hover:scale-105"
                aria-hidden="true"
              >
                {userInitials}
              </div>
              
              {/* User Name - Hidden on mobile */}
              <span className="hidden md:inline text-white">
                {userName}
              </span>
              
              {/* Dropdown Chevron */}
              <svg 
                className={`w-4 h-4 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-[#00112b] rounded-md shadow-lg py-1 z-10 border border-[#1a3b6d] animate-in fade-in zoom-in-95"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link 
                  href="/dashboard" 
                  className="block px-4 py-2 text-white hover:bg-[#002A6B] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/dashboard/profile" 
                  className="block px-4 py-2 text-white hover:bg-[#002A6B] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  href="/dashboard/orders" 
                  className="block px-4 py-2 text-white hover:bg-[#002A6B] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Orders
                </Link>
                <Link 
                  href="/dashboard/wallet" 
                  className="block px-4 py-2 text-white hover:bg-[#002A6B] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Wallet
                </Link>
                <Link 
                  href="/dashboard/settings" 
                  className="block px-4 py-2 text-white hover:bg-[#002A6B] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Settings
                </Link>
                
                <div className="border-t border-[#1a3b6d] my-1"></div>
                
                <Link 
                  href="/" 
                  className="block px-4 py-2 text-white hover:bg-[#002A6B] transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
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