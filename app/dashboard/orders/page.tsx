import { OrdersList } from '../../../components/sections/orders/order-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders | Bubbles',
};

export default function OrdersPage() {
  return (
    <OrdersList />
  );
}