"use client";
import { Text } from "@/components/global/Text";
import { MaxScreenWrapper } from "@/components/global/MaxScreen";
import { LaunderyCard } from "./LaundryCard";
import step1 from "../../../public/step 1.png";
import step2 from "../../../public/step 2.png";
import step3 from "../../../public/step 3.png";
import step4 from "../../../public/step 4.png";
import step5 from "../../../public/step5.png";
import step6 from "../../../public/step 6.png";
import { Button } from "@/components/ui/button";
import { RevealAnimation } from "@/components/global/Reveal";
import { customerTab } from "../index";

interface ILaundrySection {
  activeTab: string;
}

export const LaundrySection: React.FC<ILaundrySection> = ({ activeTab }) => {
  return (
    <div className="lg:px-[2.5rem] px-4  py-[104px]">
      <MaxScreenWrapper style="flex flex-col gap-[40px]">
        <RevealAnimation style="w-fit">
          <Text
            as="h1"
            style="font-[700] text-[40px] leading-[160%] md:text-start text-center"
          >
            {activeTab === customerTab
              ? "Do Your Laundry in 3 Easy Steps"
              : "Getting Started is Easy"}
          </Text>
        </RevealAnimation>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 bg_linear-gradient rounded-[12px] md:p-[40px] p-[20px] gap-[24px] justify-between">
          <RevealAnimation style="w-full">
            <LaunderyCard
              img={activeTab === customerTab ? step1 : step4}
              // title={"Place laundry order"}
              // desc={"Pick a nearby shop, add items and pay."}
            />
          </RevealAnimation>
          <RevealAnimation style="w-full">
            <LaunderyCard
              img={activeTab === customerTab ? step2 : step5}
              // title={"Schedule Pickup"}
              // desc={"Click delivery, and we come running."}
            />
          </RevealAnimation>
          <RevealAnimation style="w-full">
            <LaunderyCard
              img={activeTab === customerTab ? step3 : step6}
              // title={"We Wash & Deliver"}
              // desc={"Fresh, folded, and ready to wear."}
            />
          </RevealAnimation>
        </div>
        <div className="flex flex-col items-center justify-center gap-[16px]">
          <RevealAnimation style="w-fit">
            <Text
              as="h1"
              style="font-[400] text-[24px] leading-[160%] md:text-start text-center"
            >
              {activeTab === customerTab
                ? "Place a laundry order now and let us serve you."
                : "Start getting requests from nearby customers"}
            </Text>
          </RevealAnimation>
          <Button className="text-black bg-primary100 text-tertiary1100 rounded-[12px] h-[50px] w-[162px] flex flex-col items-center lg:text-[16px] text-[14px] font-[500]">
            Get Started
          </Button>
        </div>
      </MaxScreenWrapper>
    </div>
  );
};
