"use client";

import { useState } from "react";
import { MaxScreenWrapper } from "../global/MaxScreen";
import { Text } from "../global/Text";
import { cn } from "../../lib/utils";
import { ServicesSection } from "./sections/Service";
import { LaundrySection } from "./sections/Laundry";
import { BackByTech } from "./sections/BackByTech";
import { FAQ } from "./sections/Faq";
import { SecondHero } from "./sections/SecondHero";
import { NeedHelp } from "./sections/NeedHelp";
import { Stats } from "./sections/Stats";
// import { StoreProducts } from "../sections/store/StoreProducts";

export const customerTab = "Customer";
const vendorTab = "Vendor";

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(customerTab);

  return (
    <div className="sm:pb-[104px] pb-[54px] flex flex-col md:gap-[40px] gap-[20px]">
      <div className="bg-tertiary300 sm:pt-[104px] pt-[54px] flex flex-col gap-[40px]">
        <MaxScreenWrapper style="flex items-start w-full lg:px-[2.5rem] xl:px-[5.5rem] px-4">
          <Text
            clickFunc={() => setActiveTab(customerTab)}
            style={cn(
              "flex items-center justify-center w-[152px] h-[54px] md:h-[64px] text-center px-[16px] py-[8px] bg-tertiary600 rounded-l-[8px] text-tertiary900 text-[20px] font-[400] cursor-pointer transition-all duration-200",
              activeTab === customerTab &&
                "text-tertiary700 bg-primary800 border-l-4 border-primary300"
            )}
          >
            {customerTab}
          </Text>
          <Text
            clickFunc={() => setActiveTab(vendorTab)}
            style={cn(
              "flex items-center justify-center w-[152px] h-[54px] md:h-[64px] text-center px-[16px] py-[8px] bg-tertiary600 rounded-r-[8px] text-tertiary900 text-[20px] font-[400] cursor-pointer transition-all duration-200",
              activeTab === vendorTab &&
                "text-tertiary700 bg-primary800 border-r-4 border-primary300"
            )}
          >
            {vendorTab}
          </Text>
        </MaxScreenWrapper>
        <ServicesSection activeTab={activeTab} />
      </div>
      <Stats />
      <LaundrySection activeTab={activeTab} />
      <BackByTech />
      <FAQ activeTab={activeTab} />
      <SecondHero activeTab={activeTab} />
      {/* <StoreProducts /> */}
      <NeedHelp />
    </div>
  );
};
