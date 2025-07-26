"use client";

import { Logo } from "@/components/global/Logo";
import { Text } from "@/components/global/Text";
import Link from "next/link";
import { JSX, ReactNode } from "react";
import Brand from "../../../public/blue-bubbles-logo.png";
// import { GoogleSvg } from '../svg'
// import { Button } from '../ui/button'

const OrSeparator = (): JSX.Element => (
  <div className="flex items-center w-full ">
    <div className="flex-grow h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
    <span className="mx-4 text-xs text-sm font-medium text-gray-500">OR</span>
    <div className="flex-grow h-px bg-gradient-to-l from-gray-300 to-transparent"></div>
  </div>
);

interface FooterTextProps {
  footerText: string;
  footerLink: string;
  footerLinkTitle: string;
  hasAction?: boolean;
  action?: () => void;
}

const FooterText = ({
  footerText,
  footerLink,
  footerLinkTitle,
  hasAction = false,
  action = () => {},
}: FooterTextProps): JSX.Element => (
  <div className="text-center text-lg text-gray-600 ">
    {footerText}
    {hasAction ? (
      <button
        onClick={action}
        className="ms-2 text-sm font-medium text-primary hover:text-primary-500 hover:underline transition-colors"
      >
        {footerLinkTitle}
      </button>
    ) : (
      <Link
        href={footerLink}
        className=" ms-2 text-sm font-medium text-primary hover:text-primary-500 hover:underline transition-colors"
      >
        {footerLinkTitle}
      </Link>
    )}
  </div>
);

// const GoogleSignIn = (): JSX.Element => (
//   <Button className='h-[50px] rounded-sm w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-grey-400 shadow-none bg-white text-gray-700 hover:bg-none'>
//     <GoogleSvg />
//     <span className='text-sm font-medium text-[19px] text-[#8f8f8f]'>
//       Sign in with Google
//     </span>
//   </Button>
// )

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subTitle: string;
  footerText?: string;
  footerLink?: string;
  footerLinkTitle?: string;
  showOAuth?: boolean;
  hasAction?: boolean;
  action?: () => void;
}

export const AuthLayout = ({
  children,
  title,
  subTitle,
  footerText,
  footerLink,
  footerLinkTitle,
  showOAuth = false,
  hasAction = false,
  action = () => {},
}: AuthLayoutProps): JSX.Element => {
  return (
    <div className=" gap-4 w-full flex flex-col justify-center items-center my-auto">
      <Logo src={Brand} />
      <Text
        as="h1"
        style="md:text-[35px] text-[34px] font-[400] leading-[100%]"
      >
        {title}
      </Text>
      <Text as="h1" style="text-lg text-[#8f8f8f] text-center">
        {subTitle}
      </Text>
      {showOAuth && (
        <div className="gap-4 w-full flex flex-col justify-center items-center my-auto">
          {/* <GoogleSignIn /> */}
          <OrSeparator />
        </div>
      )}
      {children}
      {footerText && footerLink && footerLinkTitle && (
        <div className="flex justify-center">
          <FooterText
            footerText={footerText}
            footerLink={footerLink}
            footerLinkTitle={footerLinkTitle}
            hasAction={hasAction}
            action={action}
          />
        </div>
      )}
    </div>
  );
};
