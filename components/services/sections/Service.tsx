'use client'

import { useEffect, useRef, useState } from 'react'
import { CustomImage } from '../../../components/global/Image'
import { Text } from '../../../components/global/Text'
import { MaxScreenWrapper } from '../../../components/global/MaxScreen'
import { RevealAnimation } from '../../../components/global/Reveal'
import { customerTab } from '../index'
import {
  CUSTOMERDATA,
  CUSTOMERDATAIMAGES,
  VENDORDATA,
  VENDORDATAIMAGES,
} from '../../../lib/constants/Service'
import { StaticImageData } from 'next/legacy/image'

interface IServicesSection {
  activeTab: string
}

type DataType = {
  title: string
  desc: string
}[]

export const ServicesSection: React.FC<IServicesSection> = ({ activeTab }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeData, setActiveData] = useState<DataType>(CUSTOMERDATA)
  const [activeImage, setActiveImage] = useState<StaticImageData[]>(CUSTOMERDATAIMAGES)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<number>(0)
  const [scrollTop, setScrollTop] = useState<number>(0)

  useEffect(() => {
    setActiveData(() => (activeTab === customerTab ? CUSTOMERDATA : VENDORDATA))
    setActiveImage(() =>
      activeTab === customerTab ? CUSTOMERDATAIMAGES : VENDORDATAIMAGES
    )
    setCurrentIndex(0) // Reset to first item when tab changes
  }, [activeTab])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
        const itemHeight = clientHeight * 0.8 // Each item takes 80% of container height
        const maxScroll = scrollHeight - clientHeight
        
        if (maxScroll <= 0) {
          setCurrentIndex(0)
          return
        }

        // Simple index calculation based on scroll position
        const index = Math.min(
          Math.floor(scrollTop / itemHeight),
          activeData.length - 1
        )
        
        setCurrentIndex(index)
        setScrollTop(scrollTop)
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [activeData.length])

  // Handle mouse/touch events for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartPosition(e.clientY)
    e.preventDefault()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartPosition(e.touches[0].clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    const deltaY = e.clientY - startPosition
    scrollRef.current.scrollTop = scrollTop - deltaY
    setStartPosition(e.clientY)
    e.preventDefault()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return
    const deltaY = e.touches[0].clientY - startPosition
    scrollRef.current.scrollTop = scrollTop - deltaY
    setStartPosition(e.touches[0].clientY)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className='lg:px-[2.5rem] xl:px-[5.5rem] px-4 md:pb-[104px] pb-[54px]'>
      <MaxScreenWrapper style='flex flex-col'>
        <RevealAnimation style='w-fit md:mb-0 mb-6'>
          <Text
            id='service'
            as='h1'
            style='font-[700] md:text-[40px] text-[30px] md:leading-[160%] leading-[120%]'
          >
            {activeTab === customerTab
              ? 'Several Services To Meet Your Laundry Needs'
              : 'More Loads. More Money. Less Stress'}
          </Text>
        </RevealAnimation>

        <div className='flex md:flex-row flex-col items-center lg:gap-[80px] gap-[25px] sm:gap-[50px] justify-between'>
          {/* Image section */}
          <RevealAnimation style='lg:w-[50%] w-full relative'>
            <div className='relative w-full lg:h-[576px] h-[310px] sm:h-[380px]'>
              {activeImage.map((img, index) => (
                <div
                  key={index}
                  className='absolute inset-0 transition-opacity duration-300'
                  style={{
                    opacity: currentIndex === index ? 1 : 0,
                  }}
                >
                  <CustomImage
                    src={img}
                    style='w-full h-full'
                    imgStyle='object-contain'
                  />
                </div>
              ))}
            </div>
          </RevealAnimation>

          {/* Content section */}
          <div className='lg:w-[50%] w-full'>
            <div
              ref={scrollRef}
              className='overflow-y-auto scroll-smooth h-[200px] md:h-[400px] lg:h-[450px]'
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDragEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div className='space-y-8 py-4'>
                {activeData.map((content, index) => (
                  <div
                    key={index}
                    className={`min-h-[250px] md:min-h-[320px] lg:min-h-[400px] flex flex-col justify-center gap-4 px-2 md:px-4 transition-all duration-300 ${
                      currentIndex === index 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-40 scale-95'
                    }`}
                  >
                    <RevealAnimation style='w-fit'>
                      <Text style='text-start text-tertiary1100 text-[22px] md:text-[28px] lg:text-[32px] font-[700] leading-[120%] md:leading-[160%]'>
                        {content.title}
                      </Text>
                    </RevealAnimation>
                    <RevealAnimation style='w-fit'>
                      <Text style='text-start text-[14px] md:text-[18px] lg:text-[20px] font-[400] leading-[140%] text-tertiary1000'>
                        {content.desc}
                      </Text>
                    </RevealAnimation>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MaxScreenWrapper>
    </div>
  )
}