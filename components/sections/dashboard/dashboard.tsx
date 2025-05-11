"use client";

import Link from "next/link";
import Image from "next/image";
import { Text } from "@/components/global/Text";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { capitalize, formatNaira, koboToNaira } from "@/lib/utils";
import { ShopList } from "../shop/shop-list";
import { useWallet } from "@/hooks/useWallet";

export const Dashboard = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { wallet } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111]">
        <Text as="p" style="text-white" children="Loading..." />
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d] shadow-md">
        <Text
          as="h1"
          style="text-white text-2xl font-bold mb-2"
          children={`Welcome back, ${capitalize(user?.first_name) || "Guest"}`}
        />
        <Text
          as="p"
          style="text-[#CCD0D4] mb-4"
          children="Here's what we have for you today"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#001D48] rounded-md p-4 border border-[#1a3b6d]">
            <Link href="/dashboard/wallet">
              <div className="flex items-center justify-between">
                <div>
                  <Text
                    as="p"
                    style="text-[#CCD0D4] text-sm"
                    children="Wallet Balance"
                  />
                  <Text
                    as="h3"
                    style="text-white text-xl font-bold"
                    children={`${formatNaira(koboToNaira(wallet?.balance))}`}
                  />
                </div>
                <div className="bg-[#bfdbfe]/20 p-2 rounded-full">
                  <svg
                    className="w-6 h-6 text-[#bfdbfe]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Shops section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Text
            as="h2"
            style="text-white text-xl font-bold"
            children="Featured Shops"
          />

          <Link href="/dashboard/shops">
            <span className="text-[#bfdbfe] text-sm hover:underline flex items-center">
              View All
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ShopList />
        </div>
      </div>
    </div>
  );
};
