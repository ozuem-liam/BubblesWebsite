import { Metadata } from 'next'
import { Text } from '@/components/global/Text'
import BubbleStore from '@/components/sections/store/Store'

export const metadata: Metadata = {
  title: 'Store | Bubbles',
}

export default async function BubbleStorePage() {

  return (
    <section className="h-screen py-4">
      <header className='flex flex-wrap justify-between items-center mb-8 gap-4'>
        <div>
          <Text
            as='h2'
            style='text-gray-900 text-2xl font-bold mb-2'
            children='Featured Shops'
          />
          <Text
            as='p'
            style='text-gray-600'
            children='Discover top-rated shops in your area'
          />
        </div>
      </header>
      <BubbleStore />
    </section>
  )
}