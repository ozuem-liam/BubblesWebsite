"use client";
import { Text } from "../global/Text";
import { MaxScreenWrapper } from "../global/MaxScreen";
import { LaunderyCard } from "./LaundryCard";
import bookingImage from "../../public/customer-books-service.png";
import requestImage from "../../public/marketplace-request.png";
import serviceImage from "../../public/customer-receives-service.png";
import { Button } from "../ui/button";
import { RevealAnimation } from "../global/Reveal";
import { customerTab } from "./index";
import { useRouter } from "next/navigation";

interface ILaundrySection {
  activeTab: string;
}

export const LaundrySection: React.FC<ILaundrySection> = ({ activeTab }) => {
  const router = useRouter();
  return (
    <div className="lg:px-[2.5rem] xl:px-[5.5rem]  py-[24px] sm:py-[54px]">
      <MaxScreenWrapper style="flex flex-col gap-[40px]">
        <RevealAnimation style="w-fit px-4 lg:px-0">
          <Text
            as="h1"
            style="font-[700] text-[40px] leading-[160%] md:text-start text-center"
          >
            {activeTab === customerTab
              ? "Book a Professional in 3 Simple Steps"
              : "Getting Started is Easy"}
          </Text>
        </RevealAnimation>
        <div className="flex flex-wrap flex-row justify-center px-4 py-4 md:px-0 md:py-0 lg:gap-[24px] gap-[20px]">
          <LaunderyCard
            img={bookingImage}
            step="Step 1"
            title="Book the service you need"
            desc="Browse available professionals, choose the option that fits, and send your request."
          />
          <LaunderyCard
            img={requestImage}
            step="Step 2"
            title="Confirm your booking"
            desc="Your chosen professional reviews the request and confirms the service details and timing."
          />
          <LaunderyCard
            img={serviceImage}
            step="Step 3"
            title="Receive your service"
            desc="The independent professional completes the service, with Bubbles support available if you need help."
          />
        </div>
        <div className="px-4 lg:px-0 flex flex-col items-center justify-center gap-[16px]">
          <RevealAnimation style="w-fit">
            <Text
              as="h1"
              style="font-[400] text-[24px] leading-[160%] md:text-start text-center"
            >
              {activeTab === customerTab
                ? "Find a service professional for the job you need."
                : "Start getting requests from nearby customers"}
            </Text>
          </RevealAnimation>
          <Button
            onClick={() => router.push("/#service")}
            className="text-black bg-primary100 text-tertiary1100 rounded-[12px] h-[50px] w-[162px] flex flex-col items-center lg:text-[16px] text-[14px] font-[500]"
          >
            Explore Services
          </Button>
        </div>
      </MaxScreenWrapper>
    </div>
  );
};
