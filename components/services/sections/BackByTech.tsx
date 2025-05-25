"use client";

import { CustomImage } from "../../../components/global/Image";
import heroImg1 from "../../../public/place_img1.svg";
import { MaxScreenWrapper } from "../../../components/global/MaxScreen";
import heroImg2 from "../../../public/place_img2.svg";
import heroImg3 from "../../../public/place_img3.svg";
import heroImg4 from "../../../public/place_img4.svg";
import heroImg5 from "../../../public/place_img5.svg";
import heroImg6 from "../../../public/place_img6.svg";
import { Text } from "../../../components/global/Text";
import {
  EcoFriendlySvg,
  SecurePaymentSvg,
  VerifiedVendorSvg,
} from "../../../components/svgs";
import { RevealAnimation } from "../../../components/global/Reveal";

export const BackByTech: React.FC = () => {
  return (
    <div className="bg-tertiary300 lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-[54px] sm:py-[104px]">
      <MaxScreenWrapper style="flex flex-col gap-[18px]">
        <div className="flex flex-wrap gap-[12px] justify-center">
          <RevealAnimation style="w-fit">
            <CustomImage
              src={heroImg1}
              style="md:w-[330px] w-[300px] h-[240px] md:h-[260px]"
              imgStyle="object-cover"
            />
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <CustomImage
              src={heroImg2}
              style="w-[200px] h-[230px]"
              imgStyle="object-cover"
            />
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <CustomImage
              src={heroImg3}
              style="md:w-[290px] md:h-[245px] w-[300px] h-[250px]"
              imgStyle="object-cover"
            />
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <CustomImage
              src={heroImg4}
              style="md:w-[300px] md:h-[310px] w-[300px] h-[310px]"
              imgStyle="object-cover"
            />
          </RevealAnimation>
        </div>
        <div className="flex lg:flex-row flex-col gap-[12px] justify-center md:items-auto items-center">
          <RevealAnimation style="w-fit">
            <CustomImage
              src={heroImg5}
              style="lg:w-[270px] lg:h-[270px] w-[300px] h-[300px]"
              imgStyle="object-cover"
            />
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <CustomImage
              src={heroImg6}
              style="lg:w-[250px] lg:h-[290px] w-[300px] h-[340px] lg:hidden block"
              imgStyle="object-cover"
            />
          </RevealAnimation>

          <div className="flex gap-[10px] flex-col items-center justify-center lg:w-[50%] w-full">
            <RevealAnimation style="w-fit">
              <Text
                as="h3"
                style="font-[700] text-[34px] leading-[160%] text-center"
              >
                Cleaning Service Backed by Tech That Delivers
              </Text>
            </RevealAnimation>
            <RevealAnimation style="w-fit">
              <Text
                as="h4"
                style="font-[400] text-[22px] leading-[140%] text-tertiary1000 text-center"
              >
                We started with one goal: To make cleaning feel less like a chore
                and more like a breeze.
              </Text>
            </RevealAnimation>

            <div className="flex gap-[10px] flex-wrap items-center justify-center">
              <SecurePaymentSvg />
              <VerifiedVendorSvg />
            </div>
            <div className="md:w-auto w-fit m-auto">
              <EcoFriendlySvg />
            </div>
          </div>
          <RevealAnimation style="w-fit">
            <CustomImage
              src={heroImg6}
              style="w-[290px] h-[330px] lg:block hidden"
              imgStyle="object-cover"
            />
          </RevealAnimation>
        </div>
      </MaxScreenWrapper>
    </div>
  );
};
