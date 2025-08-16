import { Text } from '@/components/global/Text'
import { CategoryItemsPageComponent } from '@/components/sections/items/Items'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Items | Bubbles',
}

export default async function BubbleStorePage() {

  return (
    <section className="h-screen py-6">
      {/* <header className='flex flex-wrap justify-between items-center mb-8 gap-4'>
        <div>
          <Text
            as='h2'
            style='text-gray-900 text-2xl font-bold mb-2'
            children='Category Items'
          />
        </div>
      </header> */}
      <CategoryItemsPageComponent/>
    </section>
  )
}