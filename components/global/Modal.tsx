'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import React, { memo, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Text } from './Text'

interface ModalWrapperProps {
  children: ReactNode
  bigscreenwidth?: string
  title?: string
  trigger?: ReactNode
  description?: string
  scrollable?: boolean
  bg?: string
  open?: boolean
  isAlert?: boolean
  setOpen?: (open: boolean) => void
}

export const ModalWrapper = memo<ModalWrapperProps>(
  ({
    children,
    bigscreenwidth,
    title,
    isAlert = false,
    trigger,
    description,
    scrollable = false,
    bg,
    open,
    setOpen,
  }) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className={cn(
            'bg-white m-auto ',
            bigscreenwidth && bigscreenwidth,
            scrollable && 'overflow-y-scroll max-h-screen',
            bg && bg
          )}
        >
          <DialogHeader className={cn('hidden', title && 'block')}>
            <DialogTitle className={cn('text-start', isAlert && 'text-center')}>
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter className='sm:justify-start hidden'>
            <DialogClose asChild>
              <Button></Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
)

ModalWrapper.displayName = 'ModalWrapper'
