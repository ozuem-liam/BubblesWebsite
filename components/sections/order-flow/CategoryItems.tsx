'use client'

import { Text } from '../../global/Text'
import { Button } from '../../ui/button'
import { CartData, Item } from '../../../lib/order-flow'
import { formatNaira } from '../../../lib/utils'
import { Skeleton } from '../../ui/skeleton'
import { CustomImage } from '@/components/global/Image'

export const CategoryItems = ({
  items,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  loading,
}: {
  items: Item[]
  cart: CartData | null
  onAddToCart: (item: Item) => void
  onRemoveFromCart: (itemId: string) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  loading?: boolean
}) => {
  if (loading) {
    return (
      <div className='w-full h-40'>
        <Skeleton className='w-full h-full bg-gray-200 rounded-lg' />
      </div>
    )
  }

  const item = items[0]

  if (!item) {
    return (
      <div className='w-full h-40 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200'>
        <Text as='p' style='text-gray-500 text-sm'>
          No item available
        </Text>
      </div>
    )
  }

  const cartItem = cart?.items.find((ci) => ci.item._id === item._id)
  const quantity = cartItem?.quantity || 0
  const price = cartItem ? cartItem.price : item.fixed_amount

  return (
    <div className='flex flex-col gap-4 items-center w-full transition-all duration-200 overflow-hidden'>
      {/* Item Image */}
      {item.image && (
        <div className='relative w-[172px] h-32 rounded-lg'>
          <CustomImage
            src={item.image}
            alt={item.name}
            style='h-full w-full rounded-lg bg-white'
            imgStyle='object-contain rounded-lg bg-white p-4'
          />
        </div>
      )}

      {/* Item Content */}
      <div className='space-y-3 w-full flex flex-col items-center'>
        {/* Item Name and Price */}
        <div className='space-y-1 w-full'>
          <Text
            as='h4'
            style='text-lg text-center text-gray-800 font-medium text-sm leading-tight line-clamp-3'
          >
            {item.name}
          </Text>
          <Text as='p' style='text-blue-600 text-center font-semibold text-lg'>
            {formatNaira(price)}
          </Text>
        </div>

        {/* Cart Controls */}
        <div className='flex items-center justify-center pt-2'>
          {quantity > 0 ? (
            <div className='flex items-center gap-3 w-full'>
              <Button
                variant='outline'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation()
                  onUpdateQuantity(item._id, quantity - 1)
                }}
                className='h-8 w-8 p-0 border-red-300 text-red-600 hover:bg-red-50 flex-shrink-0'
              >
                -
              </Button>
              <div className='flex-1 text-center'>
                <Text style='text-gray-800 font-medium'>{quantity}</Text>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={(e) => {
                  e.stopPropagation()
                  onUpdateQuantity(item._id, quantity + 1)
                }}
                className='h-8 w-8 p-0 border-green-300 text-green-600 hover:bg-green-50 flex-shrink-0'
              >
                +
              </Button>
            </div>
          ) : (
            <div className='flex gap-3 items-center'>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart(item)
                }}
                className='w-full h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium'
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
