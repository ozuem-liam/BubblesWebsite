"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/global/Logo";
import { useAuth } from "@/contexts/auth-context";
import { useOrderFlow } from "@/hooks/useOrderFlow";
import { MenuIcon, WalletIcon } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";
import Brand from '../../../public/blue-bubbles-logo.png';

export const DashboardHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { cart } = useOrderFlow();

  const userInitials = user
    ? `${user.first_name[0]?.toUpperCase()}${user.last_name[0]?.toUpperCase()}`
    : "";

  const userName = user ? `${user.first_name} ${user.last_name}` : "";

  const cartItemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 w-full">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-3">
          <div className="flex items-center">
            <Link href="/dashboard" aria-label="Go to dashboard">
              <Logo src={Brand} />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <Link href="/dashboard/wallet">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                >
                  <WalletIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Wallet
                </Button>
              </Link>
            </div>

            <UserDropdown 
              isOpen={isDropdownOpen}
              setIsOpen={setIsDropdownOpen}
              userInitials={userInitials}
              userName={userName}
            />
            
            <button
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </>
  );
};

const UserDropdown = ({
  isOpen,
  setIsOpen,
  userInitials,
  userName,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userInitials: string;
  userName: string;
}) => (
  <div className="relative">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-2 focus:outline-none group"
      aria-label="User menu"
      aria-expanded={isOpen}
    >
      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold transition-transform group-hover:scale-105">
        {userInitials}
      </div>

      <span className="hidden md:inline text-gray-700 text-sm font-medium">{userName}</span>
    </button>
  </div>
);