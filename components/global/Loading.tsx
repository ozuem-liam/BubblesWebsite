import { Loader } from 'lucide-react'
import { Text } from './Text'

export const LoadingComponent = ({
  fallbackText,
}: {
  fallbackText: string
}) => {
  return (
    <div className=' flex flex-col items-center justify-center backdrop-blur-lg transition-opacity'>
      <div className='flex flex-col items-center p-8 rounded-xl'>
        <div className='relative w-10 h-10 mb-4'>
          <div className='absolute w-10 h-10 border-4 border-white rounded-full' />
          <div className='absolute w-10 h-10 border-4 border-transparent border-t-[#001029] rounded-full animate-spin' />
        </div>
        <Text as='p' style='text-gray-600 font-medium'>
          {fallbackText}
        </Text>
      </div>
    </div>
  )
}
