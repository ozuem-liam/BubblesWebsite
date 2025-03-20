import { MaxScreenWrapper } from "@/components/global/MaxScreen";
import { Logo } from "./Logo";
import { Text } from "./Text";
import { CopyrightSvg, EnvelopeSvg, LocationSvg } from "../svgs";
import { CustomImage } from "./Image";
import bubbleImg from "../../public/bubbles_footerlogo.png";

export const Footer: React.FC = () => {
  return (
    <div className="bg-primary800 flex flex-col justify-center items-center lg:px-[2.5rem] px-4  sm:pt-[104px] pt-[54px]">
      <MaxScreenWrapper style="w-full relative flex justify-center items-center flex-col">
        <CustomImage
          src={bubbleImg}
          style="w-full md:h-[600px] h-[150px] absolute bottom-[0px] left-[0px] right-[0px]"
          imgStyle="object-cover"
        />
        <div className="w-full relative flex flex-wrap justify-between gap-[80px]">
          <div className="flex flex-col gap-[20px]">
            <Logo style="h-[30px]" />
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              No spin, just results!
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] flex gap-[6px] items-center text-tertiary700">
              <EnvelopeSvg />
              hello@bubble.com
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] flex gap-[6px] items-center text-tertiary700">
              <LocationSvg/>
              1, address street, Lagos, Nigeria.
            </Text>
          </div>
          <div className="flex flex-col gap-[20px]">
            <Text style="text-[16px] font-[700] leading-[150%] text-tertiary100">
              About Us
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              Services
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              Terms
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              Privacy policy
            </Text>
          </div>
          <div className="flex flex-col gap-[20px]">
            <Text style="text-[16px] font-[700] leading-[150%] text-tertiary100">
              Support
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              FAQ
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              Become a vendor
            </Text>
          </div>
          <div className="flex flex-col gap-[20px]">
            <Text style="text-[16px] font-[700] leading-[150%] text-tertiary100">
              Socials
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              Facebook
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              Instagram
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              WhatsApp
            </Text>
          </div>
        </div>
        <Text style="items-center md:mt-[204px] mt-[73px] mb-[73px] md:mb-[243px] text-[16px] text-center font-[500] leading-[160%] flex gap-[4px] text-tertiary700">
          <CopyrightSvg />
          2025 Bubbles. All rights reserved
        </Text>
      </MaxScreenWrapper>
    </div>
  );
};
