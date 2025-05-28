"use client";

import Link from "next/link";
import { Text } from "@/components/global/Text";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { capitalize, formatNaira, koboToNaira } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";
import { Loader } from "lucide-react";
import { ShopList } from "../shop/shop-list";

export const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const { wallet } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/sign-in");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WelcomeSection user={user} wallet={wallet} />
      <ShopsSection />
    </div>
  );
};

const WelcomeSection = ({ user, wallet }: { user: any, wallet: any }) => (
  <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm transition-all hover:shadow-md">
    <header className="mb-6">
      <Text
        as="h1"
        style="text-gray-800 text-xl font-bold mb-2"
        children={`Welcome back, ${capitalize(user?.first_name) || "Guest"}`}
      />
      <Text
        as="p"
        style="text-gray-600 mb-4"
        children="Here's what we have for you today"
      />
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <WalletCard balance={wallet?.balance} />
    </div>
  </section>
);

const WalletCard = ({ balance }: { balance: number }) => (
  <Link 
    href="/dashboard/wallet"
    className="bg-blue-50 rounded-md p-4 border border-blue-100 hover:border-blue-200 transition-colors group"
  >
    <div className="flex items-center justify-between">
      <div>
        <Text
          as="p"
          style="text-gray-600 text-xs"
          children="Wallet Balance"
        />
        <Text
          as="h3"
          style="text-gray-800 text-xl font-bold group-hover:text-blue-600 transition-colors"
          children={`${formatNaira(koboToNaira(balance))}`}
        />
      </div>
      <div className="bg-blue-100/50 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
        <WalletIcon className="w-6 h-6 text-blue-500" />
      </div>
    </div>
  </Link>
);

const ShopsSection = () => (
  <section>
    <header className="flex justify-between items-center mb-6">
      <Text
        as="h2"
        style="text-gray-800 text-xl font-bold"
        children="Featured Shops"
      />

      <ViewAllLink href="/dashboard/shops" />
    </header>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <ShopList />
    </div>
  </section>
);

const ViewAllLink = ({ href }: { href: string }) => (
  <Link 
    href={href}
    className="text-blue-600 text-xs hover:underline flex items-center group transition-colors"
  >
    View All
    <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
  </Link>
);

const WalletIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);