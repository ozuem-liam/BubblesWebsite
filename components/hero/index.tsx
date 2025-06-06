"use client";

import { useState} from "react";
import { CustomImage } from "../global/Image";
import { Text } from "../global/Text";
import { TopNav } from "../global/TopNav";
// import { AppleStoreSvg, PlayStoreSvg } from "../svgs";
import { MaxScreenWrapper } from "../global/MaxScreen";
import { RevealAnimation } from "../global/Reveal";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import heroImg from "../../public/hero_img.svg";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    title: "Laundry Made Simple For You",
    subtitle: "8hrs+ Saved Weekly",
    description: "No more laundry stress; just fresh, professionally cleaned clothes. Whether you're a busy professional or a laundry business looking to grow, we're here to help.",
    image: heroImg
  },
  {
    title: "Professional Cleaning Services",
    subtitle: "Quality Guaranteed",
    description: "Experience premium laundry service with our expert cleaners. We ensure your clothes get the care they deserve.",
    image: heroImg
  },
  {
    title: "Fast & Reliable Service",
    subtitle: "24/7 Service",
    description: "Schedule pickups and deliveries at your convenience. We work around your schedule to make laundry day stress-free.",
    image: heroImg
  },
  {
    title: "Premium Car Wash Services",
    subtitle: "Sparkling Clean Cars",
    description: "Get your car spotless with our professional car wash services. We use advanced cleaning techniques and premium products for the perfect shine.",
    image: "/bubble-car.png"
  }
];

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 bg_linear-gradient lg:pt-[3rem] pt-[10rem] relative overflow-hidden">
      {/* Dynamic background overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br transition-all duration-1000 ease-in-out"
      />
      
      <TopNav />
      <MaxScreenWrapper style="pt-0 pb-[1rem] relative z-10">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          loop={true}
          speed={1200}
          className="hero-swiper"
          onSlideChange={(swiper) => {
            setIsTransitioning(true);
            setActiveSlide(swiper.realIndex);
            setTimeout(() => setIsTransitioning(false), 600);
          }}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex lg:flex-row flex-col items-center md:gap-[40px] gap-[20px] justify-between">
                {/* Content Section */}
                <div className="flex flex-col gap-[24px] lg:w-[40%] xl:w-[50%] w-full lg:items-start items-center">
                  <RevealAnimation style="w-fit">
                    <div className={`transform transition-all duration-700 ease-out ${isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                      <Text style="lg:text-start text-center border-l-2 border-primary300 w-fit px-[16px] py-[8px] bg-primary800/90 backdrop-blur-sm rounded-r-[8px] text-tertiary700 text-[14px] font-[400] shadow-lg">
                        {slide.subtitle}
                      </Text>
                    </div>
                  </RevealAnimation>
                  
                  <RevealAnimation style="w-fit">
                    <Text
                      id="home"
                      style="lg:text-start text-center md:text-[72px] text-[42px] font-[800] leading-[120%] text-tertiary100"
                    >
                      {slide.title}
                    </Text>
                  </RevealAnimation>
                  <RevealAnimation style="w-fit">
                    <Text style="lg:text-start text-center text-tertiary700 text-[15px] md:text-[20px] font-[400] leading-[140%]">
                      {slide.description}
                    </Text>
                  </RevealAnimation>
                  <RevealAnimation style="md:w-fit w-full">
                    {/* App store buttons commented out
                    <div className="flex md:gap-[15px] gap-[6px] md:justify-start justify-between">
                      <Link
                        id="store"
                        href={`https://play.google.com/store/apps/details?id=com.bubbles.customer.app&hl=en`}
                        target="_blank"
                        className="text-none"
                      >
                        {slide.title}
                      </Text>
                    </div>
                  </RevealAnimation>
                  
                  <RevealAnimation style="w-fit">
                    <div className={`transform transition-all duration-700 delay-300 ease-out ${isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                      <Text style="lg:text-start text-center text-tertiary700 text-[15px] md:text-[20px] font-[400] leading-[140%] drop-shadow-sm">
                        {slide.description}
                      </Text>
                    </div>
                  </RevealAnimation>
                  
                  <RevealAnimation style="md:w-fit w-full">
                    <div className={`transform transition-all duration-700 delay-450 ease-out ${isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
                      <div className="flex md:gap-[15px] gap-[6px] md:justify-start justify-between">
                        <Link
                          id="store"
                          href={`https://play.google.com/store/apps/details?id=com.bubbles.customer.app&hl=en`}
                          target="_blank"
                          className="text-none transform transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
                        >
                          <PlayStoreSvg />
                        </Link>
                        <div className="transform transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-pointer">
                          <AppleStoreSvg />
                        </div>
                      </div>
                    </div>
                    */}
                    <div className="flex justify-center lg:justify-start w-full">
                      <Link href="/auth/sign-up">
                        <Button className="p-4 bg-[#bfdbfe] rounded-md text-[rgba(0, 57, 143, 1)] hover:bg-[#a3c4fd] transition-colors text-lg">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </RevealAnimation>
                </div>

                {/* Image Section */}
                <RevealAnimation style="lg:w-[60%] xl:w-[50%] w-full">
                  <CustomImage
                    src={slide.image}
                    style="w-full lg:h-[776px] h-[400px]"
                    imgStyle="object-contain"
                    priority={index === 0}
                  />
                </RevealAnimation>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </MaxScreenWrapper>

      {/* Custom Styles */}
      <style jsx global>{`
        .hero-swiper {
          overflow: visible;
        }
        
        .hero-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hero-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hero-pagination-bullet-active {
          background: rgba(255, 255, 255, 0.9);
          border-color: rgba(255, 255, 255, 1);
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        
        .hero-swiper .swiper-pagination {
          bottom: -20px;
          position: relative !important;
          margin-top: 20px;
        }
        
        @media (max-width: 1024px) {
          .hero-swiper .swiper-pagination {
            bottom: -10px;
            margin-top: 10px;
          }
        }
        
        .hero-swiper .swiper-slide {
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hero-swiper .swiper-slide-active {
          opacity: 1;
        }
        
        .hero-swiper .swiper-slide-next,
        .hero-swiper .swiper-slide-prev {
          opacity: 0;
        }
      `}</style>
    </div>
  );
};