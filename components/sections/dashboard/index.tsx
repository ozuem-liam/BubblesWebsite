'use client'

import { Text } from "@/components/global/Text"

export const DashboardHome = () => {
  return (
    <div className='space-y-6 py-6 md:px-4 px-3'>
      <div className='flex flex-col gap-2'>
        <Text style='font-[600] text-[18px] leading-[24px]'>
          Hi Nazeer, what would you like to do today?
        </Text>
        <Text style='text-[12px] font-[500] leading-[100%]'>
          Last login:
          <span className='font-[400] ms-2'>26/11/2024 14:39:58</span>
        </Text>
      </div>
    </div>
  )
}
