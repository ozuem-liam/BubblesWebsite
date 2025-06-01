'use client'

import { ModalWrapper } from '@/components/global/Modal'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'

interface ILogoutConfirmation {
  showAlert: boolean
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>
}

export const LogoutConfirmation: React.FC<ILogoutConfirmation> = ({
  showAlert,
  setShowAlert,
}) => {
const {logout} = useAuth()

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
            className='px-6 text-sm border border-gray-300 bg-gray-300'
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={() => logout()}
            className='px-6 text-sm border border-[red]'
          >
            Confirm Logout
          </Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
