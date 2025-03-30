"use client";

import { CustomImage } from "../../global/Image";
import { Text } from "../../global/Text";
import { BlackAppleStoreSvg, BlackPlayStoreSvg } from "../../svgs";
import heroImg from "../../../public/iPhone 11 Pro2.svg";
import heroImg2 from "../../../public/iPhone 11 Pro.svg";
import { MaxScreenWrapper } from "../../global/MaxScreen";
import bubble2 from "../../../public/bubble2.png";
import { RevealAnimation } from "@/components/global/Reveal";
import { customerTab } from "../index";
import Link from "next/link";

interface ISecondHero {
  activeTab: string;
}

export const SecondHero: React.FC<ISecondHero> = ({ activeTab }) => {
  return (
    <div className="sm:px-[2.5rem] px-4 bg-primaryBubbly md:pt-[64px] pt-[20px]">
      <MaxScreenWrapper style="relative pt-[4rem] flex lg:flex-row flex-col items-center md:gap-[60px] gap-[40px] justify-center">
        <CustomImage
          src={bubble2}
          style="md:w-[370px] w-[300px] h-[330px] absolute bottom-[10px] right-[10px]"
          imgStyle="object-cover"
        />
        <div className="py-0 md:py-[2rem] lg:py-0 flex flex-col gap-[24px] lg:w-[30%] w-full lg:items-start items-center">
          <RevealAnimation style="w-fit">
            <Text style="lg:text-start text-center border-l-2 border-primary300 w-fit px-[16px] py-[8px] bg-primary100 rounded-r-[8px] text-black text-[14px] font-[400]">
              Free Laundry Basket
            </Text>
          </RevealAnimation>
          <RevealAnimation style="md:w-[90%] w-full">
            <Text style="w-full lg:text-start text-center text-[46px] md:text-[56px] font-[500] leading-[140%] text-black">
              {activeTab === customerTab
                ? `Don’t Get Left in the Basket. Join Us Today!`
                : "Start growing your business with every spin."}
            </Text>
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <div className="flex md:gap-[20px] gap-[6px] md:justify-start justify-center">
              <Link
                href={
                  activeTab === customerTab
                    ? `https://play.google.com/store/apps/details?id=com.bubbles.customer.app&hl=en`
                    : "Shttps://play.google.com/store/apps/details?id=com.bubbles.bubbles_vendor&hl=en"
                }
                target="_blank"
                className="text-none"
              >
                <BlackPlayStoreSvg />
              </Link>
              <BlackAppleStoreSvg />
            </div>
          </RevealAnimation>
        </div>
        <RevealAnimation style="lg:w-[497] w-full">
          <CustomImage
            src={activeTab === customerTab ? heroImg : heroImg2}
            style="w-full lg:h-[700px] h-[500px]"
            imgStyle="object-contain"
          />
        </RevealAnimation>
      </MaxScreenWrapper>
    </div>
  );
};
