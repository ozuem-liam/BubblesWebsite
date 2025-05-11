import { Wallet } from '../../../components/sections/wallet/wallet';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Wallet | Bubbles',
  description: 'View and manage your wallet balance and transactions',
};

export default async function WalletPage() {
  // Server-side protection
  const cookiesData = await cookies();
  const token = cookiesData.get("token")?.value;
  if (!token) {
    redirect("/login?from=/dashboard");
  }
  return (
    <main>
      <Wallet />
    </main>
  );
}
