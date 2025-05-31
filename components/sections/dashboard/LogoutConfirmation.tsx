'use client'

import { useRouter } from 'nextjs-toploader/app'
import Cookies from 'js-cookie'
import { ModalWrapper } from '@/components/global/Modal'
import { Button } from '@/components/ui/button'

interface ILogoutConfirmation {
  showAlert: boolean
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>
}

export const LogoutConfirmation: React.FC<ILogoutConfirmation> = ({
  showAlert,
  setShowAlert,
}) => {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('token', { path: '/' })
    router.push('/')
    setShowAlert(false)
    router.refresh()
  }

  return (
    <ModalWrapper
      title='Logout Confirmation'
      open={showAlert}
      isAlert
      setOpen={setShowAlert}
    >
      <div className='flex flex-col space-y-4'>
        <p className='text-gray-400 text-center'>
          You'll need to log in again to access your account.
        </p>

        <div className='flex justify-between space-x-3 pt-4 w-full'>
          <Button
            variant='outline'
            onClick={() => setShowAlert(false)}
            className='px-6 text-sm'
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={() => handleLogout()}
            className='px-6 text-sm'
          >
            Confirm Logout
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
