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
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeData, setActiveData] = useState<DataType>(CUSTOMERDATA)
  const [activeImage, setActiveImage] = useState<StaticImageData[]>(CUSTOMERDATAIMAGES)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<number>(0)
  const [scrollTop, setScrollTop] = useState<number>(0)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const typingInterval = useRef<NodeJS.Timeout | null>(null)
  const cycleTimeout = useRef<NodeJS.Timeout | null>(null)

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

  // Intersection Observer to detect if section is in view
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // Clear timeouts on cleanup
  useEffect(() => {
    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current)
      if (cycleTimeout.current) clearTimeout(cycleTimeout.current)
    }
  }, [])

  // Typing animation effect - improved for mobile
  const typeText = (text: string, speed: number = 80) => {
    // Clear any existing intervals/timeouts
    if (typingInterval.current) clearInterval(typingInterval.current)
    if (cycleTimeout.current) clearTimeout(cycleTimeout.current)
    
    if (!text || typeof text !== 'string') {
      setTypedText('')
      setIsTyping(false)
      return
    }

    setIsTyping(true)
    setTypedText('')
    let index = 0

    typingInterval.current = setInterval(() => {
      if (index >= text.length) {
        // Typing is complete
        if (typingInterval.current) clearInterval(typingInterval.current)
        setIsTyping(false)
        
        // Wait before moving to next item (only on mobile)
        cycleTimeout.current = setTimeout(() => {
          // Check if we're still in view and on mobile before cycling
          if (inView && window.innerWidth < 1024) { // lg breakpoint
            setIsFlipping(true)
            setTimeout(() => {
              setIsFlipping(false)
              setCurrentIndex(prev => {
                const nextIndex = (prev + 1) % activeData.length
                return nextIndex
              })
            }, 600) // flip duration
          }
        }, 2500) // wait 2.5 seconds after typing completes
        return
      }

      setTypedText(text.substring(0, index + 1))
      index++
    }, speed)
  }

  // Start typing animation when in view or currentIndex changes
  useEffect(() => {
    if (inView && activeData[currentIndex]) {
      const desc = activeData[currentIndex]?.desc
      if (typeof desc === 'string' && desc.trim().length > 0) {
        // Small delay before starting typing for better UX
        setTimeout(() => {
          typeText(desc.trim())
        }, 300)
      } else {
        setTypedText('')
        setIsTyping(false)
      }
    } else {
      // Clean up when not in view
      if (typingInterval.current) clearInterval(typingInterval.current)
      if (cycleTimeout.current) clearTimeout(cycleTimeout.current)
      setTypedText('')
      setIsTyping(false)
    }

    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current)
      if (cycleTimeout.current) clearTimeout(cycleTimeout.current)
    }
  }, [inView, currentIndex, activeData])

  return (
    <div
      className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 md:pb-[104px] pb-[54px]"
      ref={sectionRef}
    >
      <MaxScreenWrapper style="flex flex-col">
        <RevealAnimation style="w-fit md:mb-0 mb-6">
          <Text
            id="service"
            as="h1"
            style="font-[700] md:text-[40px] text-[30px] md:leading-[160%] leading-[120%]"
          >
            {activeTab === customerTab
              ? "Several Services To Meet Your Cleaning Needs"
              : "More Loads. More Money. Less Stress"}
          </Text>
        </RevealAnimation>

        <div className="flex md:flex-row flex-col items-center lg:gap-[80px] gap-[25px] sm:gap-[50px] justify-between">
          {/* Image section */}
          <RevealAnimation style="lg:w-[50%] w-full relative">
            <div className="relative w-full lg:h-[576px] h-[310px] sm:h-[380px]">
              {/* Mobile: Only render the active image and overlay */}
              <div
                className={`lg:hidden block h-full w-full ${
                  isFlipping ? "flip-anim" : ""
                }`}
              >
                <CustomImage
                  src={activeImage[currentIndex]}
                  style="w-full h-full"
                  imgStyle="object-contain"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 max-w-sm">
                    <div className="transition-all duration-300">
                      <Text style="text-center text-white text-[24px] font-[700] leading-[120%] drop-shadow-lg mb-4">
                        {activeData[currentIndex]?.title || ""}
                      </Text>
                      <Text style="text-center text-white text-[14px] font-[400] leading-[140%] drop-shadow-lg min-h-[60px] flex items-center justify-center">
                        <span>
                          {typedText}
                          {isTyping && (
                            <span className="animate-pulse ml-1">|</span>
                          )}
                        </span>
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              {/* Desktop: Keep all images for fade transition */}
              <div className="hidden lg:block h-full w-full">
                {activeImage.map((img, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      opacity: currentIndex === index ? 1 : 0,
                    }}
                  >
                    <CustomImage
                      src={img}
                      style="w-full h-full"
                      imgStyle="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </RevealAnimation>

          {/* Content section */}
          <div className="lg:w-[50%] w-full hidden lg:block">
            <div
              ref={scrollRef}
              className="overflow-y-auto custom-scroll scroll-smooth h-[200px] md:h-[400px] lg:h-[450px]"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDragEnd}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <div className="space-y-8 py-4">
                {activeData.map((content, index) => (
                  <div
                    key={index}
                    className={`min-h-[250px] md:min-h-[320px] lg:min-h-[400px] flex flex-col justify-center gap-4 px-2 md:px-4 transition-all duration-300 ${
                      currentIndex === index
                        ? "opacity-100 scale-100"
                        : "opacity-40 scale-95"
                    }`}
                  >
                    <RevealAnimation style="w-fit">
                      <Text style="text-start text-tertiary1100 text-[22px] md:text-[28px] lg:text-[32px] font-[700] leading-[120%] md:leading-[160%]">
                        {content.title}
                      </Text>
                    </RevealAnimation>
                    <RevealAnimation style="w-fit">
                      <Text style="text-start text-[14px] md:text-[18px] lg:text-[20px] font-[400] leading-[140%] text-tertiary1000">
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

      {/* Flip animation style */}
      <style jsx global>{`
        .flip-anim {
          animation: flipY 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
        }
        @keyframes flipY {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(90deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }
      `}</style>
    </div>
  );
}