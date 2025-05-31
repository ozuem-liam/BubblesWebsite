import CartItemsPageComponent from '@/components/sections/cart'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cart | Bubbles',
}

export default async function CartPage() {
  return <CartItemsPageComponent />
}
