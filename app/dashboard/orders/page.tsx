import { OrdersList } from '../../../components/sections/orders/order-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders | Bubbles',
};

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">My Orders</h1>
        <OrdersList />
      </div>
    </div>
  );
}