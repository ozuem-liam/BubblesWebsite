'use client'

import Brand from '../../public/bubbles-logo.svg'
import { CustomImage } from './Image'
import { cn } from '../../lib/utils'
import { useRouter } from 'nextjs-toploader/app'
import { StaticImageData } from 'next/image'

interface ILogoPropType {
  style?: string
  src?: StaticImageData
}

export const Logo: React.FC<ILogoPropType> = ({
  style,
  src,
}: ILogoPropType) => {
  const router = useRouter()

  return (
    <CustomImage
      src={src || Brand}
      style={cn('w-[113px] h-[80px] cursor-pointer', style)}
      imgStyle='object-cover'
      priority={true}
      clickFunc={() => router.push('/')}
    />
  )
}
