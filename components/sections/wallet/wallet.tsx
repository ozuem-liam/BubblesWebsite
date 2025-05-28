"use client";

import { TransactionHistory } from "./transaction-history";
import { WalletCard } from "./wallet-card";

export const Wallet = () => {
  return (
    <main className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Card */}
          <div className="lg:col-span-1">
            <WalletCard />
          </div>

          {/* Transaction History */}
          <h3 className="text-gray-800 text-xl font-bold">
            Transaction History
          </h3>
          <div className="lg:col-span-2">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </main>
  );
};
