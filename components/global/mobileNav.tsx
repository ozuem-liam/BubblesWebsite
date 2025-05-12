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

export const MobileNav: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const currentPath = usePathname();
  const router = useRouter();

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
              <Link href={`#${links.route}`} className="text-none">
                {links.title}
              </Link>
            </li>
          </SheetClose>
        ))}
      </ul>

      <div className="flex flex-col gap-4 mb-10 w-full">
        <SheetClose asChild>
          <Link href="/login" className="w-full">
            <Button
              className="w-full p-4 bg-[#bfdbfe] rounded-md text-[rgba(0, 57, 143, 1)] hover:bg-[#a3c4fd] transition-colors"
              onClick={() => setOpen(false)}
            >
              Login
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/signup" className="w-full">
            <Button
              className="w-full p-4 bg-[#bfdbfe] rounded-md text-[rgba(0, 57, 143, 1)] hover:bg-[#a3c4fd] transition-colors"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSf8ar0Decnr26f16zz7ck1MjcYbwQwrnva7JOQGYyZ6JA0oAQ/viewform?usp=header">
            <Button
              onClick={() => {
                router.push("#store");
                setOpen(false);
              }}
              className="w-full p-4 bg-[#001D48] text-white rounded-md hover:bg-[#00338D] transition-colors"
            >
              Request a Vendor
            </Button>
          </Link>
        </SheetClose>
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
