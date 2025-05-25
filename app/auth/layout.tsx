import { CustomImage } from '@/components/global/Image'
import authBg from '../../public/auth_bg.png'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='relative flex h-full w-full overflow-auto'>
      {/* Scrollable content area */}
      <div className='flex h-full w-full flex-col items-center justify-center overflow-y-auto lg:w-1/2 m-auto'>
        <div className='w-full max-w-md px-4 py-8'>{children}</div>
      </div>
    </div>
  )
}
