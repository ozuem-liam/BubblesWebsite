import { Wallet } from '../../../components/sections/wallet';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wallet | Bubbles',
  description: 'View and manage your wallet balance and transactions',
};

export default async function WalletPage() {
  return (
    <main>
      <Wallet />
    </main>
  );
}
