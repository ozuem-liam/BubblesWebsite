import { Metadata } from 'next'
import { OrderDetails } from '../../../../components/sections/orders/order-details'

export const dynamic = 'force-dynamic' // Add this line

export async function generateMetadata({
  params,
}: {
  params: any
}): Promise<Metadata> {
  return {
    title: `Order #${params.id} | Bubbles`,
  }
}

export default function OrderDetailsPage() {
  return <OrderDetails />
}
