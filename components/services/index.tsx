"use client";

import { useState } from "react";
import { MaxScreenWrapper } from "../global/MaxScreen";
import { Text } from "../global/Text";
import { cn } from "@/lib/utils";
import { ServicesSection } from "./sections/Service";
import { LaundrySection } from "./sections/Laundry";
import { BackByTech } from "./sections/BackByTech";
import { FAQ } from "./sections/Faq";
import { SecondHero } from "./sections/SecondHero";
import { NeedHelp } from "./sections/NeedHelp";

export const customerTab = "Customer";
const vendorTab = "Vendor";

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(customerTab);

  return (
    <div className="sm:pb-[104px] pb-[54px] flex flex-col gap-[40px]">
      <div className="bg-tertiary300 sm:pt-[104px] pt-[54px] flex flex-col gap-[40px]">
        <MaxScreenWrapper style="flex items-start w-full md:px-[2.5rem] xl:px-0 px-4 ">
          <Text
            clickFunc={() =>
              setActiveTab((prevState) =>
                prevState !== customerTab ? customerTab : prevState
              )
            }
            style={cn(
              "flex items-center justify-center w-[152px] h-[54px] md:h-[64px] text-center px-[16px] py-[8px] bg-tertiary600 rounded-l-[8px] text-tertiary900 text-[20px] font-[400]",
              activeTab === customerTab &&
                "text-tertiary700 bg-primary800 border-l-4 border-primary300 cursor-pointer"
            )}
          >
            {customerTab}
          </Text>
          <Text
            clickFunc={() =>
              setActiveTab((prevState) =>
                prevState !== vendorTab ? vendorTab : prevState
              )
            }
            style={cn(
              "flex items-center justify-center w-[152px] h-[54px] md:h-[64px] text-center px-[16px] py-[8px] bg-tertiary600 rounded-r-[8px] text-tertiary900 text-[20px] font-[400]",
              activeTab === vendorTab &&
                "text-tertiary700 bg-primary800 border-r-4 border-primary300 cursor-pointer"
            )}
          >
            {vendorTab}
          </Text>
        </MaxScreenWrapper>
        <ServicesSection activeTab={activeTab} />
      </div>
      <LaundrySection activeTab={activeTab} />
      <BackByTech />
      <FAQ activeTab={activeTab} />
      <SecondHero activeTab={activeTab} />
      <NeedHelp />
    </div>
  );
};
