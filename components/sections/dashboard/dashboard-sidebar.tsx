"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './MobileSidebar';
import { CartIcon, CloseIcon, DashboardIcon, MenuIcon, OrdersIcon, ProfileIcon, ServicesIcon, ShopIcon, WalletIcon } from './Icons';

type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export const DashboardSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
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
      path: '/dashboard/orders',
      icon: <CartIcon />,
    },
    {
      name: 'Profile',
      path: '/dashboard/profile',
      icon: <ProfileIcon />,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return pathname === path;
    return pathname?.startsWith(path);
  };

  return (
    <>
      <MobileMenuToggle 
        isOpen={isMobileMenuOpen} 
        toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />
      
      <DesktopSidebar menuItems={menuItems} isActive={isActive} />

      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

const DesktopSidebar = ({ menuItems, isActive }: { 
  menuItems: MenuItem[], 
  isActive: (path: string) => boolean 
}) => (
  <aside className="hidden md:flex flex-col w-64 h-screen bg-white shadow-lg border-r border-gray-200 sticky top-0">
    <div className="px-6 py-4 border-b border-gray-200">
      {/* <h2 className="text-xl font-semibold text-gray-800">Navigation</h2> */}
    </div>
    <nav className="flex-1 pt-4 px-4 overflow-y-auto">
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 text-sm font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              <span className={cn(
                "w-5 h-5 flex items-center justify-center",
                isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
              )}>
                {item.icon}
              </span>
              <span className="text-xs text-sm font-medium">{item.name}</span>
              {isActive(item.path) && (
                <span className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className="px-4 py-4 border-t border-gray-200">
      <div className="text-xs text-gray-500">
        © {new Date().getFullYear()} Your Company
      </div>
    </div>
  </aside>
);

const MobileMenuToggle = ({ isOpen, toggle }: { 
  isOpen: boolean, 
  toggle: () => void 
}) => (
  <div className="md:hidden fixed bottom-6 right-6 z-40">
    <button
      onClick={toggle}
      className="p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <CloseIcon />
      ) : (
        <MenuIcon className="w-6 h-6" />
      )}
    </button>
  </div>
);