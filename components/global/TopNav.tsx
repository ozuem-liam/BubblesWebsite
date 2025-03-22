"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavRoutes } from "@/lib/constants/NavRoutes";
import { Logo } from "./Logo";
import { MobileNav } from "./mobileNav";
import { MaxScreenWrapper } from "./MaxScreen";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NavLinks: React.FC = () => (
  <ul className="lg:flex hidden lg:flex-row gap-[24px] flex-col w-full items-center justify-between">
    {NavRoutes.map((links, index) => (
      <li
        key={index}
        className="text-[16px] font-[400] text-tertiary600 py-1 px-1 hover:text-primary600 transition-colors duration-500"
      >
        <Link href={`#${links.route}`} className="text-none text-tertiary600">
          {links.title}
        </Link>
      </li>
    ))}
  </ul>
);

export const TopNav: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change background after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isScrolled ? "bg-primary800 shadow-md" : "bg-transparent"
      }`}
    >
      <MaxScreenWrapper style="px-[1rem] lg:pb-0 pb-[1rem] flex lg:flex-row flex-col justify-between lg:items-center items-start lg:gap-[12px] gap-0">
        <div>
          <Logo />
        </div>
        <nav>
          <NavLinks />
        </nav>
        <div className="flex justify-between items-center lg:w-auto w-full  h-[85%]">
          <MobileNav />
          <Button
            onClick={() => router.push("#store")}
            className="bg-primary100 text-tertiary1100 rounded-[12px] lg:h-[48px] h-[50px] lg:w-[185px] w-[162px] flex flex-col items-center lg:text-[16px] text-[14px] font-[500]"
          >
            Get Started
          </Button>
        </div>
      </MaxScreenWrapper>
    </header>
  );
};
