import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface IUserAvatar {
  src?: string
  fallbackText?: string
  className?: string
}
export const UserAvatar: React.FC<IUserAvatar> = ({
  src,
  fallbackText,
  className,
}) => (
  <Avatar className={cn('bg-[#E4F0FF]', className)}>
    <AvatarImage src={src} />
    <AvatarFallback>{fallbackText}</AvatarFallback>
  </Avatar>
)
