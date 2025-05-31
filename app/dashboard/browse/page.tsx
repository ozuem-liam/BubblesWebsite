import { Metadata } from 'next'
import { Text } from '@/components/global/Text'
import BrowsedItem from '@/components/sections/browse/Browse'

export const metadata: Metadata = {
  title: 'Items | Bubbles',
}

export default async function BubbleStorePage() {

  return (
    <section className="h-screen py-4">
      <BrowsedItem/>
    </section>
  )
}