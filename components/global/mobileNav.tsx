"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { useState } from "react";
import { HambergerMenu } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { useRouter } from "nextjs-toploader/app";
import { NavRoutes } from "../../lib/constants/NavRoutes";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/auth-context";
import { RevealAnimation } from "./Reveal";
import { AppleStoreSvg, PlayStoreSvg } from "../svgs";

export const MobileNav: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const currentPath = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const NavLinks: React.FC = () => (
    <div className="flex flex-col h-full justify-between">
      <ul className="flex gap-6 flex-col w-full items-start mt-10">
        {NavRoutes.map((links, index) => (
          <SheetClose asChild key={index}>
            <li
              onClick={() => setOpen(false)}
              className={cn(
                "text-[16px] font-[500] text-[#CCD0D4] py-2 transition-colors duration-300",
                (index === 0 && currentPath === links.route) ||
                  (index !== 0 && currentPath.includes(links.route))
                  ? "text-white font-[700] border-l-4 border-[#bfdbfe] pl-4"
                  : "hover:text-white"
              )}
            >
              <Link href={`/#${links.route}`} className="text-none">
                {links.title}
              </Link>
            </li>
          </SheetClose>
        ))}
      </ul>

      <div className="flex flex-col gap-4 mb-30 w-full">
        <div className="flex flex-col gap-4 w-full">
          <RevealAnimation style="md:w-fit w-full">
            <div className="flex flex-row gap-[6px] justify-between">
              <Link
                id="store"
                href={`https://play.google.com/store/apps/details?id=com.bubbles.customer.app&hl=en`}
                target="_blank"
                className="text-none p-0 m-0"
              >
                <PlayStoreSvg />
              </Link>
              <Link
                id="store"
                href={`https://apps.apple.com/ng/app/bubblesng/id6751163998?platform=iphone`}
                target="_blank"
                className="text-none p-0 m-0"
              >
                <AppleStoreSvg />
              </Link>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger>
        <HambergerMenu
          size="22"
          color="#CCD0D4"
          className="lg:hidden block cursor-pointer hover:text-white transition-colors"
        />
      </SheetTrigger>
      <SheetContent className="p-0 h-[100vh] bg-[#111] z-[1100]" side={"top"}>
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="h-full px-6">
          <NavLinks />
        </div>
      </SheetContent>
    </Sheet>
  );
};
