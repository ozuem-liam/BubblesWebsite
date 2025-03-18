"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { HambergerMenu } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
import { NavRoutes } from "@/lib/constants/NavRoutes";

export const MobileNav: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const currentPath = usePathname();
  const router = useRouter();
  const NavLinks: React.FC = () => (
    <ul className="flex gap-[18px] flex-col w-full items-center">
      {NavRoutes.map((links, index) => (
        <SheetClose asChild key={index}>
          <li
            onClick={() => setOpen(false)}
            className={cn(
              "text-[16px] font-[500] text-text_grey py-2",
              index === 0 &&
                currentPath === links.route &&
                "border-b-2 border-lemongreen text-black font-[700]",

              index !== 0 &&
                currentPath.includes(links.route) &&
                "border-b-2 border-lemongreen text-black font-[700]"
            )}
          >
            <Link href={`#${links.route}`} className={"text-none"}>
              {links.title}
            </Link>
          </li>
        </SheetClose>
      ))}
    </ul>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger>
        <HambergerMenu
          size="22"
          color="white"
          className="lg:hidden block cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent className="p-0 h-[100vh] bg-white z-[1100]" side={"top"}>
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col m-auto mt-20 justify-between h-[85%] p-3">
          <NavLinks />
          <SheetClose>
            <div
              onClick={() => router.push("#store")}
              className="bg-primary100 text-tertiary1100 rounded-[12px] lg:h-[48px] h-[50px] lg:w-[185px] w-[162px] flex flex-col items-center justify-center lg:text-[16px] text-[14px] font-[500]"
            >
              Send a Message
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
