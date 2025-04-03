"use client";

import { RevealAnimation } from "@/components/global/Reveal";
import { Text } from "@/components/global/Text";
import { cn } from "@/lib/utils";
import { ArrowDown2 } from "iconsax-react";
import { useCallback, useRef, useState } from "react";

interface IAccordium {
  title: string;
  info: string;
}

export const Accordium: React.FC<IAccordium> = ({
  title,
  info,
}: IAccordium) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const serviceAccordium = useRef<HTMLDivElement | null>(null);

  const handleToggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
    if (serviceAccordium.current !== null) {
      serviceAccordium.current.classList.toggle("active");
    }
  }, []);

  return (
    <RevealAnimation style="py-5 w-full">
      <div onClick={handleToggle} className="w-full">
        <div className="flex items-center justify-between gap-4 cursor-pointer">
          <Text style="md:text-[28px] leading-[160%] text-[20px] font-[400] text-tertiary1000">
            {title}
          </Text>
          <ArrowDown2
            size="15"
            color="grey"
            className={cn(
              "rotate-0 transform transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </div>
        <div ref={serviceAccordium} className="service-accord">
          <Text style="md:text-[20px] leading-[160%] text-[14px] font-[400] text-tertiary1000">
            {info}
          </Text>
        </div>
      </div>
    </RevealAnimation>
  );
};
