"use client";

import { RevealAnimation } from "../../../components/global/Reveal";
import { Text } from "../../../components/global/Text";
import { cn } from "../../../lib/utils";
import { ArrowDown2 } from "iconsax-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Toggle accordion open/closed state
  const handleToggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  useEffect(() => {
 
    if (serviceAccordium.current) {
      if (isOpen) {
      
        serviceAccordium.current.classList.add("active");
      } else {
      
        setTimeout(() => {
          if (serviceAccordium.current) {
            serviceAccordium.current.classList.remove("active");
          }
        }, 50); 
      }
    }
  }, [isOpen]);

  const formatAnswerText = (text: string) => {
    if (text.includes("\n")) {
      return text.split("\n").map((paragraph, index) => (
        <p 
          key={index} 
          className={cn(
            "md:text-[20px] text-[14px] font-[400] text-tertiary1000 leading-[160%]",
            index > 0 && "mt-4"
          )}
        >
          {paragraph.trim()}
        </p>
      ));
    }
    
    return (
      <Text style="md:text-[20px] leading-[160%] text-[14px] font-[400] text-tertiary1000">
        {text}
      </Text>
    );
  };

  return (
    <RevealAnimation style="py-5 w-full">
      <div className="w-full">
        <div 
          onClick={handleToggle} 
          className="flex items-center justify-between gap-4 cursor-pointer"
        >
          <Text style="md:text-[28px] leading-[160%] text-[20px] font-[400] text-tertiary1000">
            {title}
          </Text>
          <ArrowDown2
            size="15"
            color="grey"
            className={cn(
              "rotate-0 transform transition-transform duration-700",
              isOpen && "rotate-180"
            )}
          />
        </div>
        
        <div 
          ref={serviceAccordium}
          className="service-accord"
        >
          <div ref={contentRef}>
            {formatAnswerText(info)}
          </div>
        </div>
      </div>
    </RevealAnimation>
  );
};