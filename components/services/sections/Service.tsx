'use client'

import { useEffect, useRef, useState } from 'react'
import { CustomImage } from '@/components/global/Image'
import { Text } from '@/components/global/Text'
import { MaxScreenWrapper } from '@/components/global/MaxScreen'
import { RevealAnimation } from '@/components/global/Reveal'
import { customerTab } from '../index'
import {
  CUSTOMERDATA,
  CUSTOMERDATAIMAGES,
  VENDORDATA,
  VENDORDATAIMAGES,
} from '@/lib/constants/Service'
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
  const [activeImage, setActiveImage] =
    useState<StaticImageData[]>(CUSTOMERDATAIMAGES)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<number>(0)
  const [scrollTop, setScrollTop] = useState<number>(0)
  const [contentOpacity, setContentOpacity] = useState<number[]>(
    Array(activeData.length).fill(0)
  )

  useEffect(() => {
    // Initialize the first content item with full opacity
    const initialOpacity = [...contentOpacity]
    initialOpacity[0] = 1
    setContentOpacity(initialOpacity)
  }, [])

  useEffect(() => {
    //Change data based on teh active tab
    setActiveData(() => (activeTab === customerTab ? CUSTOMERDATA : VENDORDATA))
    setActiveImage(() =>
      activeTab === customerTab ? CUSTOMERDATAIMAGES : VENDORDATAIMAGES
    )
  }, [activeTab])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, clientHeight } = scrollRef.current
        const sectionHeight = clientHeight // Height of one content section

        // Calculate index based on scroll position
        const index = Math.min(
          Math.floor(scrollTop / sectionHeight),
          activeData.length - 1
        )

        // Calculate the progress within the current section (0 to 1)
        const progress = (scrollTop % sectionHeight) / sectionHeight
        setScrollTop(scrollTop)

        // Update opacity for each content item
        const newOpacity = Array(activeData.length).fill(0)

        // Current section gets opacity based on how far into it we've scrolled
        newOpacity[index] = 1 - progress

        // Next section (if exists) gets opacity based on progress
        if (index < activeData.length - 1) {
          newOpacity[index + 1] = progress
        }

        setContentOpacity(newOpacity)
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
    <div className='md:px-[2.5rem] px-4 md:pb-[104px] pb-[54px]'>
      <MaxScreenWrapper style='flex flex-col gap-[40px]'>
        <RevealAnimation style='w-fit'>
          <Text
            id='service'
            as='h1'
            style='font-[700] md:text-[40px] text-[30px] leading-[160%]'
          >
            {activeTab === customerTab
              ? 'Several Services To Meet Your Laundry Needs'
              : 'More Loads. More Money. Less Stress'}
          </Text>
        </RevealAnimation>

        <div className='flex md:flex-row flex-col items-center lg:gap-[80px] gap-[25px] sm:gap-[50px] justify-between'>
          {/* Image with opacity animation */}
          <RevealAnimation style='lg:w-[50%] w-full'>
            {activeImage.map((img, index) => (
              <div
                key={index}
                className='absolute w-full transition-opacity duration-300'
                style={{
                  opacity: contentOpacity[index] || 0,
                  display: contentOpacity[index] > 0 ? 'block' : 'none',
                }}
              >
                <CustomImage
                  src={img}
                  style='w-full lg:h-[576px] lg:g-[504px] h-[300px] sm:h-[400px]'
                  imgStyle='object-contain'
                />
              </div>
            ))}
            {/* Fallback image (always displayed if none of the above are visible) */}
            <div
              className='transition-opacity duration-300'
              style={{
                opacity: contentOpacity.every((op) => op === 0) ? 1 : 0,
              }}
            >
              <CustomImage
                src={activeImage[0]}
                style='w-full lg:h-[576px] lg:g-[504px] h-[300px] sm:h-[400px]'
                imgStyle='object-contain'
              />
            </div>
          </RevealAnimation>

          {/* Scrollable Content with draggable functionality */}
          <div
            ref={scrollRef}
            className='block lg:w-[50%] w-full lg:items-start items-center md:h-[400px] h-[250px] overflow-y-auto snap-y snap-mandatory scroll-smooth'
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {activeData.map((content, index) => (
              <div
                key={index}
                className='snap-start flex flex-col items-start md:justify-center justify-start md:h-[400px] h-[250px] w-full px-4 transition-opacity duration-300'
                style={{ opacity: contentOpacity[index] || 0 }}
              >
                <RevealAnimation style='w-fit'>
                  <Text style='text-start text-tertiary1100 text-[32px] font-[700] sm:leading-[160%] leading-[120%]'>
                    {content.title}
                  </Text>
                </RevealAnimation>
                <RevealAnimation style='w-fit'>
                  <Text style='text-start text-[24px] font-[400] leading-[140%] text-tertiary1000 whitespace-normal'>
                    {content.desc}
                  </Text>
                </RevealAnimation>
              </div>
            ))}
          </div>
        </div>
      </MaxScreenWrapper>
    </div>
  )
}
