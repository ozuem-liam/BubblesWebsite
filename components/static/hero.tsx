"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CustomImage } from "../global/Image";
import { MaxScreenWrapper } from "../global/MaxScreen";
import { Text } from "../global/Text";
import { TopNav } from "../global/TopNav";
import { AppleStoreSvg, PlayStoreSvg } from "../svgs";
import heroImg from "../../public/hero_img.svg";

const CUSTOMER_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.bubbles.customer.app&hl=en";
const CUSTOMER_APP_STORE_URL =
  "https://apps.apple.com/ng/app/bubblesng/id6751163998?platform=iphone";

export const Hero: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#001330] px-4 pt-[9.5rem] text-white sm:pt-[10rem] lg:px-[2.5rem] lg:pt-[7rem] xl:px-[5.5rem]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#001330_0%,#00265f_58%,#001029_100%)]" />
      <div className="absolute -right-32 top-28 h-[420px] w-[420px] rounded-full bg-[#a9c7ff] opacity-[0.12] blur-3xl" />
      <TopNav />

      <MaxScreenWrapper style="relative z-10">
        <div className="grid min-h-[calc(100vh-7rem)] items-center gap-10 pb-12 lg:grid-cols-[0.54fr_0.46fr] lg:gap-16 lg:pb-16">
          <motion.div
            className="flex w-full flex-col items-center text-center lg:items-start lg:text-left"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Text style="mb-5 w-fit rounded-full border border-white/[0.2] bg-white/[0.08] px-4 py-2 text-[15px] font-[700] leading-[1.5] text-white">
              Trusted everyday services
            </Text>

            <Text
              as="h1"
              style="max-w-[760px] text-[40px] font-[800] leading-[1.12] text-white sm:text-[50px] lg:text-[58px]"
            >
              Get trusted help for the jobs around your day.
            </Text>

            <Text style="mt-5 max-w-[650px] text-[18px] font-[400] leading-[1.7] text-white/[0.9]">
              Book laundry, cleaning, electrical work, plumbing, fumigation,
              and everyday repairs from trusted service professionals on
              Bubbles.
            </Text>

            <div className="mt-7 flex flex-col items-center gap-3 lg:items-start">
              <Text style="text-[16px] font-[700] leading-[1.5] text-white/[0.9]">
                Get the Bubbles Customer App
              </Text>
              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href={CUSTOMER_PLAY_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download the Bubbles Customer App on Google Play"
                  className="transition-transform duration-300 hover:-translate-y-1"
                >
                  <PlayStoreSvg />
                </Link>
                <Link
                  href={CUSTOMER_APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download the Bubbles Customer App on the App Store"
                  className="transition-transform duration-300 hover:-translate-y-1"
                >
                  <AppleStoreSvg />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[560px]"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CustomImage
              src={heroImg}
              style="h-[400px] w-full lg:h-[776px]"
              imgStyle="object-contain"
              alt="Bubbles customer app"
              priority
              loading="eager"
            />
          </motion.div>
        </div>
      </MaxScreenWrapper>
    </section>
  );
};
