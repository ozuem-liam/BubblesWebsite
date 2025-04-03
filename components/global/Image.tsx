'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { StaticImageData } from 'next/image'

interface ICustomImagePropType {
  src: StaticImageData
  alt?: string
  imgStyle?: string
  priority?: boolean
  clickFunc?: () => void
  style: string
}

export const CustomImage: React.FC<ICustomImagePropType> = ({
  src,
  alt = 'object not found',
  style,
  imgStyle,
  priority = false,
  clickFunc,
}) => {
  return (
    <div className={cn('relative', style)} onClick={clickFunc}>
      <Image
        src={src}
        alt={alt}
        className={cn('w-full', imgStyle)}
        fill={true}
        priority={priority}
      />
    </div>
  )
}
