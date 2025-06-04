"use client";

import { CustomImage } from "../global/Image";
import { Text } from "../global/Text";
import { TopNav } from "../global/TopNav";
import { AppleStoreSvg, PlayStoreSvg } from "../svgs";
import { MaxScreenWrapper } from "../global/MaxScreen";
import { RevealAnimation } from "../global/Reveal";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import heroImg from "../../public/hero_img.svg";

const heroSlides = [
  {
    title: "Laundry Made Simple For You",
    subtitle: "8hrs+ Saved Weekly",
    description: "No more laundry stress; just fresh, professionally cleaned clothes. Whether you're a busy professional or a laundry business looking to grow, we're here to help."
  },
  {
    title: "Professional Cleaning Services",
    subtitle: "Quality Guaranteed",
    description: "Experience premium laundry service with our expert cleaners. We ensure your clothes get the care they deserve."
  },
  {
    title: "Fast & Reliable Service",
    subtitle: "24/7 Service",
    description: "Schedule pickups and deliveries at your convenience. We work around your schedule to make laundry day stress-free."
  }
];

export const Hero: React.FC = () => {
  return (
    <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 bg_linear-gradient lg:pt-[3rem] pt-[10rem]">
      <TopNav />
      <MaxScreenWrapper style="pt-0 pb-[3rem]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          loop={true}
          className="hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex lg:flex-row flex-col items-center md:gap-[40px] gap-[20px] justify-between">
                <div className="flex flex-col gap-[24px] lg:w-[40%] xl:w-[50%] w-full lg:items-start items-center">
                  <RevealAnimation style="w-fit">
                    <Text style="lg:text-start text-center border-l-2 border-primary300 w-fit px-[16px] py-[8px] bg-primary800 rounded-r-[8px] text-tertiary700 text-[14px] font-[400]">
                      {slide.subtitle}
                    </Text>
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
                    <div className="flex md:gap-[15px] gap-[6px] md:justify-start justify-between">
                      <Link
                        id="store"
                        href={`https://play.google.com/store/apps/details?id=com.bubbles.customer.app&hl=en`}
                        target="_blank"
                        className="text-none"
                      >
                        <PlayStoreSvg />
                      </Link>
                      <AppleStoreSvg />
                    </div>
                  </RevealAnimation>
                </div>
                <RevealAnimation style="lg:w-[60%] xl:w-[50%] w-full">
                  <CustomImage
                    src={heroImg}
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
    </div>
  );
};
