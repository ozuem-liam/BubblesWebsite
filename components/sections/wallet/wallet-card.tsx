'use client';

import { useWallet } from '../../../hooks/useWallet';
import { Button } from '../../../components/ui/button';
import { Text } from '../../../components/global/Text';
import { Input } from '../../../components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { formatNaira, koboToNaira } from '../../../lib/utils';
import { Skeleton } from '../../../components/ui/skeleton';

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
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <Text as="h3" style="text-gray-800 text-xl font-bold mb-4">
        Your Wallet
      </Text>
      
      <div className="flex items-center justify-between mb-6">
        <Text as="p" style="text-gray-600">Current Balance:</Text>
        {loading.wallet ? (
          <Skeleton className="h-7 w-32 bg-gray-200" />
        ) : (
          <Text as="p" style="text-gray-800 text-xl font-bold">
            {formatNaira(koboToNaira(wallet?.balance))}
          </Text>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 text-sm mb-2">
            Amount to Fund
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="bg-white text-gray-800 border-gray-300 focus:border-blue-500"
          />
        </div>

        <Button
          onClick={handleFundWallet}
          disabled={loading.funding || isFunding}
          className="w-full bg_linear-gradient hover:bg-blue-700 text-white"
        >
          {loading.funding || isFunding ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </span>
          ) : (
            'Fund Wallet'
          )}
        </Button>
      </div>
    </div>
  );
};