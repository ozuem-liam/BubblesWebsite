"use client";

import { CustomImage } from "../global/Image";
import { Text } from "../global/Text";
import { TopNav } from "../global/TopNav";
import { AppleStoreSvg, PlayStoreSvg } from "../svgs";
import heroImg from "../../public/hero_img.svg";
import { MaxScreenWrapper } from "../global/MaxScreen";
import { RevealAnimation } from "../global/Reveal";
import Link from "next/link";

export const Hero: React.FC = () => {
  return (
    <div className="lg:px-[2.5rem] px-4 bg_linear-gradient lg:pt-[6rem] pt-[10rem]">
      <TopNav />
      <MaxScreenWrapper style="md:pt-[4rem] pt-0 pb-[6rem] flex lg:flex-row flex-col items-center md:gap-[40px] gap-[20px] justify-between">
        <div className="flex flex-col gap-[24px] lg:w-[40%] w-full lg:items-start items-center">
          <RevealAnimation style="w-fit">
            <Text style="lg:text-start text-center border-l-2 border-primary300 w-fit px-[16px] py-[8px] bg-primary800 rounded-r-[8px] text-tertiary700 text-[14px] font-[400]">
              8hrs+ Saved Weekly
            </Text>
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <Text
              id="home"
              style="lg:text-start text-center md:text-[72px] text-[42px] font-[800] leading-[120%] text-tertiary100"
            >
              Laundry, Spaces & More
            </Text>
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <Text style="lg:text-start text-center text-tertiary700 text-[15px] md:text-[20px] font-[400] leading-[140%]">
              {`No more stress, just spotless clothes, clean spaces, and pest-free environments. Whether you're a busy professional or a business looking to grow, Bubbles makes laundry, cleaning, and fumigation effortless, we’re here to help.`}
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
        <RevealAnimation style="lg:w-[60%] w-full ">
          <CustomImage
            src={heroImg}
            style="w-full lg:h-[776px] h-[400px]"
            imgStyle="object-contain"
            priority={true}
          />
        </RevealAnimation>
      </MaxScreenWrapper>
    </div>
  );
};
