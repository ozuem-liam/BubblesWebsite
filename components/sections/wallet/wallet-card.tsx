// components/wallet/WalletCard.tsx
'use client';

import { useWallet } from '../../../hooks/useWallet';
import { Button } from '../../../components/ui/button';
import { Text } from '../../../components/global/Text';
import { Input } from '../../../components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { formatNaira, koboToNaira } from '../../../lib/utils';

export const WalletCard = () => {
  const { wallet, loading, fundWallet } = useWallet();
  const [amount, setAmount] = useState('');
  const [isFunding, setIsFunding] = useState(false);

  const handleFundWallet = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsFunding(true);
    try {
      await fundWallet({
        amount: Number(amount),
        paymentMethod: 'card'
      });
      toast.success('Wallet funded successfully!');
      setAmount('');
    } catch (error) {
      toast.error('Failed to fund wallet');
    } finally {
      setIsFunding(false);
    }
  };

  return (
    <div className="bg-[#00112b] rounded-lg p-6 border border-[#1a3b6d]">
      <Text as="h3" style="text-white text-xl font-bold mb-4">
        Your Wallet
      </Text>
      
      <div className="flex items-center justify-between mb-6">
        <Text as="p" style="text-[#CCD0D4]">Current Balance:</Text>
        <Text as="p" style="text-white text-2xl font-bold">
          {loading.wallet ? 'Loading...' : `${formatNaira(koboToNaira(wallet?.balance))}`}
        </Text>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[#CCD0D4] mb-2">
            Amount to Fund
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="bg-[#001D48] text-white border-[#1a3b6d]"
          />
        </div>

        <Button
          onClick={handleFundWallet}
          disabled={loading.funding || isFunding}
          className="w-full bg-[#bfdbfe] text-[#001D48] hover:bg-[#9cc2fe]"
        >
          {loading.funding || isFunding ? 'Processing...' : 'Fund Wallet'}
        </Button>
      </div>
    </div>
  );
};