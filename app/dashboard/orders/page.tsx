import { OrdersList } from '../../../components/sections/orders/order-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders | Bubbles',
};

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Orders</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <OrdersList />
        </div>
      </div>
    </div>
  );
}