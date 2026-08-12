"use client";

import { useState } from "react";
import { ServicesSection } from "./Service";
import { LaundrySection } from "./Laundry";
import { BackByTech } from "./BackByTech";
import { FAQ } from "./Faq";
import { SecondHero } from "./SecondHero";
import { NeedHelp } from "./NeedHelp";
import { useActiveServices } from "@/hooks/useActiveServices";

export const customerTab = "Customer";
const vendorTab = "Vendor";

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(customerTab);
  const { services, loading } = useActiveServices();

  return (
    <div className="sm:pb-[104px] pb-[54px] flex flex-col md:gap-[40px] gap-[20px]">
      <div className="bg-tertiary300 sm:pt-[104px] pt-[54px] flex flex-col gap-[40px]">
        <ServicesSection activeTab={activeTab} services={services} loading={loading} />
      </div>
      <LaundrySection activeTab={activeTab} />
      <BackByTech />
      <FAQ activeTab={activeTab} />
      <SecondHero activeTab={activeTab} />
      <NeedHelp />
    </div>
  );
};
