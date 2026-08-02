"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  TrendingUp,
  LayoutDashboard,
  Wallet,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TopNav } from "@/components/global/TopNav";
import { Footer } from "@/components/global/Footer";
import { Stats } from "@/components/static/Stats";
import { FAQ } from "@/components/static/Faq";
import { RevealAnimation } from "@/components/global/Reveal";
import { Text } from "@/components/global/Text";
import { MaxScreenWrapper } from "@/components/global/MaxScreen";
import { CustomImage } from "@/components/global/Image";
import { AppleStoreSvg, PlayStoreSvg } from "@/components/svgs";
import step4 from "@/public/step 4 (1).svg";
import step5 from "@/public/step 5 (1).svg";
import step6 from "@/public/step 6 (1).svg";

const VENDOR_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.bubbles.bubbles_vendor&pcampaignid=web_share";
const VENDOR_APP_STORE_URL =
  "https://apps.apple.com/ng/app/bubbles-vendor-app/id6774730854";

const artisanSlides = [
  {
    type: "Laundry professionals",
    title: "Grow your laundry business with more orders.",
    description:
      "Connect with customers who need washing, dry cleaning, garment care, and dependable delivery.",
    image: "/artisans/laundry.png",
    imagePosition: "object-center",
    accent: "#a9c7ff",
  },
  {
    type: "Ironing professionals",
    title: "Turn your ironing skill into steady income.",
    description:
      "Showcase your service, set your prices, manage requests, and serve more customers through Bubbles.",
    image: "/artisans/ironing.png",
    imagePosition: "object-center",
    accent: "#f6d88d",
  },
  {
    type: "Cleaning professionals",
    title: "Find more homes and businesses to clean.",
    description:
      "Receive cleaning requests, organize your jobs, communicate with customers, and track your earnings.",
    image: "/artisans/cleaning.png",
    imagePosition: "object-top",
    accent: "#a9e7ce",
  },
  {
    type: "Electrical professionals",
    title: "Put your electrical expertise in front of more customers.",
    description:
      "Get discovered for installations, repairs, maintenance, and other skilled electrical work in your area.",
    image: "/artisans/electrician.jpg",
    imagePosition: "object-center",
    accent: "#f6c85f",
  },
  {
    type: "Painting professionals",
    title: "Build a steady pipeline for your painting business.",
    description:
      "Reach people looking for trusted professionals for home, office, renovation, and finishing work.",
    image: "/artisans/painter.jpg",
    imagePosition: "object-center",
    accent: "#d6b4ff",
  },
];

// ─── Value Props ───────────────────────────────────────────────────────────────

const valueProps = [
  {
    Icon: TrendingUp,
    title: "More Customers",
    desc: "Connect with customers actively searching for trusted services in your area — no ads or cold calls required.",
  },
  {
    Icon: LayoutDashboard,
    title: "Easy Order Management",
    desc: "Accept orders, manage pickups, itemize jobs, and communicate with customers — all from one simple app.",
  },
  {
    Icon: Wallet,
    title: "Reliable Payouts",
    desc: "Every completed order lands in your Bubbles wallet. Withdraw to your bank account in seconds, any time.",
  },
];

// ─── Onboarding Steps ──────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Download & Register",
    desc: "Get the Bubbles Vendor app from the Play Store and create your account in minutes.",
  },
  {
    number: "02",
    title: "Set Up Your Shop",
    desc: "Add your services, set your prices, upload your logo, and enter your bank details.",
  },
  {
    number: "03",
    title: "Verify Your Identity",
    desc: "Complete a quick identity check so customers know they can trust your business.",
  },
  {
    number: "04",
    title: "Start Receiving Orders",
    desc: "Go live and start getting order requests from customers near you — immediately.",
  },
];

// ─── What You Can Offer ────────────────────────────────────────────────────────

const services = [
  { label: "Laundry & Garment Care", desc: "Washing, dry cleaning, ironing, and specialist care" },
  { label: "Home & Office Cleaning", desc: "Regular, deep, move-in, and commercial cleaning" },
  { label: "Electrical Services", desc: "Installations, maintenance, and electrical repairs" },
  { label: "Plumbing", desc: "Leaks, fittings, installations, and everyday repairs" },
  { label: "Painting", desc: "Interior, exterior, renovation, and finishing work" },
  { label: "Handyman & Repairs", desc: "Practical help for homes, offices, and businesses" },
  { label: "Fumigation", desc: "Home and office pest control" },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function VendorPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const reduceMotion = useReducedMotion();

  const selectSlide = (index: number) => {
    setActiveSlide(index);
    setAnnouncement(
      `Slide ${index + 1} of ${artisanSlides.length}: ${artisanSlides[index].type}`
    );
  };

  const showPreviousSlide = () => {
    const previous =
      (activeSlide - 1 + artisanSlides.length) % artisanSlides.length;
    selectSlide(previous);
  };

  const showNextSlide = () => {
    selectSlide((activeSlide + 1) % artisanSlides.length);
  };

  const slide = artisanSlides[activeSlide];

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden bg-[#001330] px-4 pt-[9.5rem] text-white sm:pt-[10rem] lg:px-[2.5rem] lg:pt-[7rem] xl:px-[5.5rem]"
        aria-roledescription="carousel"
        aria-label="Artisans who can grow with Bubbles"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#001330_0%,#00265f_58%,#001029_100%)]" />
        <div
          className="absolute -right-32 top-28 h-[420px] w-[420px] rounded-full opacity-[0.12] blur-3xl transition-colors duration-500"
          style={{ backgroundColor: slide.accent }}
        />
        <TopNav />
        <MaxScreenWrapper style="relative z-10">
          <div className="grid min-h-[calc(100vh-7rem)] items-center gap-10 pb-12 lg:grid-cols-[0.54fr_0.46fr] lg:gap-16 lg:pb-16">
            <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
              <Text style="mb-5 w-fit rounded-full border border-white/[0.2] bg-white/[0.08] px-4 py-2 text-[15px] font-[700] leading-[1.5] text-white">
                The app for artisans and service professionals
              </Text>

              <div className="relative grid min-h-[280px] w-full place-items-center lg:min-h-[310px] lg:place-items-start">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={slide.type}
                    className="col-start-1 row-start-1 flex flex-col items-center lg:items-start"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <Text style="mb-3 text-[16px] font-[700] leading-[1.5] text-[#c8dcff]">
                      {slide.type}
                    </Text>
                    <Text
                      as="h1"
                      style="max-w-[760px] text-[40px] font-[800] leading-[1.12] text-white sm:text-[50px] lg:text-[58px]"
                    >
                      {slide.title}
                    </Text>
                    <Text style="mt-5 max-w-[650px] text-[18px] font-[400] leading-[1.7] text-white/[0.9]">
                      {slide.description}
                    </Text>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex flex-col items-center gap-3 lg:items-start">
                <Text style="text-[16px] font-[700] leading-[1.5] text-white/[0.9]">
                  Get the Bubbles Vendor App
                </Text>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href={VENDOR_PLAY_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Download the Bubbles Vendor App on Google Play"
                    className="transition-transform duration-300 hover:-translate-y-1"
                  >
                    <PlayStoreSvg />
                  </Link>
                  <Link
                    href={VENDOR_APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Download the Bubbles Vendor App on the App Store"
                    className="transition-transform duration-300 hover:-translate-y-1"
                  >
                    <AppleStoreSvg />
                  </Link>
                </div>
              </div>

              <div
                className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
                aria-label="Choose an artisan story"
              >
                <button
                  type="button"
                  onClick={showPreviousSlide}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.32] bg-white/[0.08] text-white transition-colors hover:bg-white/[0.16]"
                  aria-label="Show previous artisan"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-0.5">
                  {artisanSlides.map((item, index) => (
                    <button
                      type="button"
                      key={item.type}
                      onClick={() => selectSlide(index)}
                      className="flex h-11 w-11 items-center justify-center rounded-full"
                      aria-label={`Show slide ${index + 1} of ${artisanSlides.length}: ${item.type}`}
                      aria-current={activeSlide === index ? "true" : undefined}
                    >
                      <span
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeSlide === index
                            ? "w-7 bg-white"
                            : "w-2.5 border border-white/70 bg-transparent"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={showNextSlide}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.32] bg-white/[0.08] text-white transition-colors hover:bg-white/[0.16]"
                  aria-label="Show next artisan"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {announcement}
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="relative h-[440px] overflow-hidden rounded-[26px] sm:h-[570px] lg:h-[650px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={slide.image}
                    className="absolute inset-0"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <CustomImage
                      src={slide.image}
                      style="h-full w-full"
                      imgStyle={`object-cover ${slide.imagePosition}`}
                      alt={`${slide.type} using Bubbles to grow their business`}
                      priority={activeSlide === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </MaxScreenWrapper>
      </section>

      {/* ── Value Props ── */}
      <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-[54px] sm:py-[104px] bg-tertiary300">
        <MaxScreenWrapper style="flex flex-col gap-[48px]">
          <RevealAnimation style="w-full">
            <Text
              as="h2"
              style="font-[700] md:text-[40px] text-[30px] leading-[120%] text-center"
            >
              Why Artisans Choose Bubbles
            </Text>
          </RevealAnimation>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[24px]">
            {valueProps.map(({ Icon, title, desc }, i) => (
              <RevealAnimation key={i} style="w-full h-full">
                <div className="bg-white rounded-[16px] p-[32px] flex flex-col gap-[16px] h-full border border-tertiary600 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-[52px] h-[52px] rounded-[12px] bg-primary800 flex items-center justify-center shrink-0">
                    <Icon size={24} color="white" />
                  </div>
                  <Text
                    as="h3"
                    style="font-[700] text-[22px] leading-[130%] text-tertiary1100"
                  >
                    {title}
                  </Text>
                  <Text style="font-[400] text-[16px] leading-[160%] text-tertiary1000">
                    {desc}
                  </Text>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </MaxScreenWrapper>
      </div>

      {/* ── Stats ── */}
      <Stats />

      {/* ── What You Can Offer ── */}
      <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-[54px] sm:py-[104px]">
        <MaxScreenWrapper style="flex flex-col gap-[48px]">
          <div className="flex lg:flex-row flex-col lg:items-end items-center justify-between gap-[24px]">
            <RevealAnimation>
              <Text
                as="h2"
                style="font-[700] md:text-[40px] text-[30px] leading-[120%] lg:text-start text-center"
              >
                Services You Can Offer on Bubbles
              </Text>
            </RevealAnimation>
            <RevealAnimation style="w-fit shrink-0">
              <Text style="text-[16px] font-[400] text-tertiary1000 leading-[160%] lg:text-start text-center max-w-[360px]">
                List any combination of services. You control your pricing and
                availability at all times.
              </Text>
            </RevealAnimation>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-[16px]">
            {services.map(({ label, desc }, i) => (
              <RevealAnimation key={i} style="w-full">
                <div className="flex items-start gap-[14px] bg-primaryBubbly rounded-[12px] px-[24px] py-[20px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm">
                  <CheckCircle2
                    size={22}
                    className="text-primary800 mt-[2px] shrink-0"
                  />
                  <div className="flex flex-col gap-[4px]">
                    <Text style="font-[600] text-[17px] text-tertiary1100 leading-[130%]">
                      {label}
                    </Text>
                    <Text style="font-[400] text-[14px] text-tertiary1000 leading-[150%]">
                      {desc}
                    </Text>
                  </div>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </MaxScreenWrapper>
      </div>

      {/* ── How It Works ── */}
      <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-[54px] sm:py-[104px] bg-tertiary300">
        <MaxScreenWrapper style="flex flex-col gap-[48px]">
          <RevealAnimation style="w-full">
            <Text
              as="h2"
              style="font-[700] md:text-[40px] text-[30px] leading-[120%] text-center"
            >
              Getting Started Takes Minutes
            </Text>
          </RevealAnimation>

          {/* Step images */}
          <div className="grid md:grid-cols-3 grid-cols-1 laundry_bg_linear-gradient rounded-[12px] md:px-[40px] px-0 lg:gap-[24px] gap-[10px]">
            {[step4, step5, step6].map((img, i) => (
              <RevealAnimation key={i} style="w-full">
                <CustomImage
                  src={img}
                  style="w-full h-[420px] lg:h-[560px]"
                  imgStyle="object-contain"
                  alt={`Step ${i + 1}`}
                />
              </RevealAnimation>
            ))}
          </div>

          {/* Numbered steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-[24px]">
            {steps.map(({ number, title, desc }, i) => (
              <RevealAnimation key={i} style="w-full">
                <div className="flex flex-col gap-[12px]">
                  <span className="text-[3rem] font-[800] text-primary800/20 leading-none tabular-nums">
                    {number}
                  </span>
                  <Text style="font-[700] text-[18px] text-tertiary1100 leading-[130%]">
                    {title}
                  </Text>
                  <Text style="font-[400] text-[15px] text-tertiary1000 leading-[160%]">
                    {desc}
                  </Text>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </MaxScreenWrapper>
      </div>

      {/* ── FAQ ── */}
      <FAQ activeTab="Vendor" />

      {/* ── Final CTA ── */}
      <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-[54px] sm:py-[80px] bg_linear-gradient">
        <MaxScreenWrapper style="flex flex-col items-center gap-[28px] text-center">
          <RevealAnimation>
            <Text style="text-[14px] font-[400] border-l-2 border-primary300 px-[16px] py-[8px] bg-primary800/80 rounded-r-[8px] text-tertiary700 w-fit">
              Free to join. No listing fees.
            </Text>
          </RevealAnimation>
          <RevealAnimation>
            <Text
              as="h2"
              style="md:text-[52px] text-[36px] font-[700] leading-[120%] text-tertiary100 max-w-[680px]"
            >
              Ready to grow your business with every order?
            </Text>
          </RevealAnimation>
          <RevealAnimation>
            <Text style="text-[17px] font-[400] text-tertiary700 leading-[160%] max-w-[500px]">
              Join 150+ vendors across Lagos already using Bubbles to reach more
              customers and earn more.
            </Text>
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <div className="flex md:gap-[15px] gap-[6px]">
              <Link href={VENDOR_PLAY_URL} target="_blank" className="text-none p-0 m-0">
                <PlayStoreSvg />
              </Link>
              <Link href={VENDOR_APP_STORE_URL} target="_blank" className="text-none p-0 m-0">
                <AppleStoreSvg />
              </Link>
            </div>
          </RevealAnimation>
        </MaxScreenWrapper>
      </div>

      <Footer />
    </>
  );
}
