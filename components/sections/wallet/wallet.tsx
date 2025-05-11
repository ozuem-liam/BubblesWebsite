
"use client";

import { TransactionHistory } from './transaction-history';
import { WalletCard } from './wallet-card';



export const Wallet = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#001D48] mb-8">My Wallet</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Card - Takes full width on mobile, 1/3 on desktop */}
          <div className="lg:col-span-1">
            <WalletCard />
          </div>
          
          {/* Transaction History - Takes full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </main>
  );
}