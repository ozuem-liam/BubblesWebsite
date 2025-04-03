import { MaxScreenWrapper } from "@/components/global/MaxScreen";
import { Logo } from "./Logo";
import { Text } from "./Text";
import { CopyrightSvg, EnvelopeSvg, LocationSvg } from "../svgs";
import { CustomImage } from "./Image";
import bubbleImg from "../../public/bubbles_footerlogo.png";
import Link from "next/link";

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
          <div className="flex flex-col sm:gap-[20px] gap-[15px]">
            <Logo style="h-[30px]" />
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              No spin, just results!
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] flex gap-[6px] items-center text-tertiary700">
              <EnvelopeSvg />
              support@bubblesng.com
            </Text>
            <Text style="text-[16px] font-[500] leading-[160%] flex gap-[6px] items-center text-tertiary700">
              <LocationSvg />
              yusuf Oyero, Ketu, Lagos
            </Text>
          </div>
          <div className="flex flex-col sm:gap-[20px] gap-[15px]">
            <Text style="text-[16px] font-[700] leading-[150%] text-tertiary100">
              About Us
            </Text>
            <Link href={`#service`} className="text-none">
              <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
                Services
              </Text>
            </Link>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              Terms
            </Text>
            <Link
              href="https://www.isolutionmedia.com/policy"
              target='_blank'
              className="text-none"
            >
              <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
                Privacy policy
              </Text>
            </Link>
          </div>
          <div className="flex flex-col sm:gap-[20px] gap-[15px]">
            <Text style="text-[16px] font-[700] leading-[150%] text-tertiary100">
              Support
            </Text>
            <Link href={`#faq`} className="text-none">
              <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
                FAQ
              </Text>
            </Link>
            <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
              Become a vendor
            </Text>
          </div>
          <div className="flex flex-col sm:gap-[20px] gap-[15px]">
            <Text style="text-[16px] font-[700] leading-[150%] text-tertiary100">
              Socials
            </Text>
            <Link href="https://x.com/getbubblesng" className="text-none" target='_blank'>
              <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
                Twitter
              </Text>
            </Link>
            <Link
              href="https://www.instagram.com/getbubblesng/"
              target='_blank'
              className="text-none"
            >
              <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
                Instagram
              </Text>
            </Link>

            <Link
              href="https://api.whatsapp.com/send?phone=2348105951215"
              target='_blank'
              className="text-none"
            >
              <Text style="text-[16px] font-[500] leading-[160%] text-tertiary700">
                WhatsApp
              </Text>
            </Link>
          </div>
        </div>
        <Text style="items-center md:mt-[204px] mt-[73px] mb-[73px] md:mb-[243px] text-[16px] text-center font-[500] leading-[160%] flex gap-[4px] text-tertiary800">
          <CopyrightSvg />
          2025 Bubbles. All rights reserved
        </Text>
      </MaxScreenWrapper>
    </div>
  );
};
