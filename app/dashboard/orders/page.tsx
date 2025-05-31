import { OrdersList } from '../../../components/sections/orders/OrderList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Orders | Bubbles',
}

export default function OrdersPage() {
  return <OrdersList />
}
