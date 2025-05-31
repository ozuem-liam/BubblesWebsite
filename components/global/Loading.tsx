import { Loader } from 'lucide-react'
import { Text } from './Text'

export const LoadingComponent = ({
  fallbackText,
}: {
  fallbackText: string
}) => {
  return (
    <div className='flex justify-center items-center h-64'>
      <div className='flex flex-col items-center gap-4 text-gray-600'>
        <Loader className='w-8 h-8 animate-spin text-blue-500' />
        <Text as='p' style='text-gray-600 font-medium'>
          {fallbackText}
        </Text>
      </div>
    </div>
  )
}
