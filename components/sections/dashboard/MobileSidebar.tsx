"use client";

import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DashboardIcon, ShopIcon, ServicesIcon, OrdersIcon, WalletIcon, CartIcon, ProfileIcon } from './Icons';
import { useRouter } from 'next/navigation';

type NavLink = {
  name: string;
  path: string;
  icon?: React.ReactNode;
};

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems: NavLink[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'Shops',
    path: '/dashboard/shops',
    icon: <ShopIcon />,
  },
  // {
  //   name: 'Services',
  //   path: '/dashboard/services',
  //   icon: <ServicesIcon />,
  // },
  {
    name: 'Orders',
    path: '/dashboard/orders',
    icon: <OrdersIcon />,
  },
  {
    name: 'Wallet',
    path: '/dashboard/wallet',
    icon: <WalletIcon />,
  },
  {
    name: 'Cart',
    path: '/dashboard/cart',
    icon: <CartIcon />,
  },
  {
    name: 'Profile',
    path: '/dashboard/profile',
    icon: <ProfileIcon />,
  },
];

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
    const router = useRouter();
  const logout = () => {
    localStorage.removeItem('token');
    onClose();
    router.push('/auth/sign-in');
  };
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 transition-all duration-300 ease-in-out md:hidden z-100",
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )}
    >
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        className={cn(
          "absolute inset-y-0 left-0 w-64 max-w-sm bg-[#00112b] shadow-lg border-r border-[#1a3b6d] transform transition-transform duration-300",
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#002A6B] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <nav className="px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors text-white hover:bg-[#002A6B]"
                  onClick={onClose}
                >
                  <span className="text-[#bfdbfe]">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            
            <li className="border-t border-[#1a3b6d] my-1"></li>
            
            <li>
              <span
                className="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors text-white hover:bg-[#002A6B]"
                onClick={logout}
              >
                <span>Sign Out</span>
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};