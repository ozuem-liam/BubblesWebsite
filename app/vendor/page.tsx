"use client";

import Link from "next/link";
import { TrendingUp, LayoutDashboard, Wallet, CheckCircle2 } from "lucide-react";
import { TopNav } from "@/components/global/TopNav";
import { Footer } from "@/components/global/Footer";
import { Stats } from "@/components/static/Stats";
import { FAQ } from "@/components/static/Faq";
import { RevealAnimation } from "@/components/global/Reveal";
import { Text } from "@/components/global/Text";
import { MaxScreenWrapper } from "@/components/global/MaxScreen";
import { CustomImage } from "@/components/global/Image";
import { AppleStoreSvg, PlayStoreSvg } from "@/components/svgs";
import heroImg from "@/public/iPhone 11 Pro.svg";
import step4 from "@/public/step 4 (1).svg";
import step5 from "@/public/step 5 (1).svg";
import step6 from "@/public/step 6 (1).svg";

const VENDOR_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.bubbles.bubbles_vendor&pcampaignid=web_share";
const VENDOR_APP_STORE_URL =
  "https://apps.apple.com/ng/app/bubbles-vendor-app/id6774730854";

// ─── Value Props ───────────────────────────────────────────────────────────────

const valueProps = [
  {
    Icon: TrendingUp,
    title: "More Customers",
    desc: "Connect with customers actively searching for cleaning services in your area — no ads, no cold calls required.",
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
  { label: "Laundry Wash", desc: "Everyday clothes to delicate fabrics" },
  { label: "Dry Cleaning", desc: "Premium garment care" },
  { label: "Ironing & Pressing", desc: "Sharp, wrinkle-free finishes" },
  { label: "Essentials", desc: "Shoes, bags, rugs, duvets" },
  { label: "Fumigation", desc: "Home and office pest control" },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function VendorPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 bg_linear-gradient lg:pt-[3rem] pt-[10rem] relative overflow-hidden">
        <TopNav />
        <MaxScreenWrapper style="pt-0 pb-[3rem] relative z-10">
          <div className="flex lg:flex-row flex-col items-center md:gap-[40px] gap-[30px] justify-between">
            {/* Copy */}
            <div className="flex flex-col gap-[24px] lg:w-[50%] w-full lg:items-start items-center">
              <RevealAnimation style="w-fit">
                <Text style="lg:text-start text-center border-l-2 border-primary300 w-fit px-[16px] py-[8px] bg-primary800/90 backdrop-blur-sm rounded-r-[8px] text-tertiary700 text-[14px] font-[400]">
                  Join 150+ Active Vendors
                </Text>
              </RevealAnimation>

              <RevealAnimation style="w-fit">
                <Text
                  as="h1"
                  style="lg:text-start text-center md:text-[64px] text-[40px] font-[800] leading-[120%] text-tertiary100"
                >
                  Grow Your Cleaning Business With Bubbles
                </Text>
              </RevealAnimation>

              <RevealAnimation style="w-fit">
                <Text style="lg:text-start text-center text-tertiary700 text-[16px] md:text-[18px] font-[400] leading-[160%]">
                  Stop chasing customers. Let Bubbles bring them to you. Join
                  hundreds of vendors across Lagos earning more with streamlined
                  order management, secure payments, and your own delivery pricing.
                </Text>
              </RevealAnimation>

              <RevealAnimation style="w-fit">
                <div className="flex md:gap-[15px] gap-[6px] md:justify-start justify-between">
                  <Link href={VENDOR_PLAY_URL} target="_blank" className="text-none p-0 m-0">
                    <PlayStoreSvg />
                  </Link>
                  <Link href={VENDOR_APP_STORE_URL} target="_blank" className="text-none p-0 m-0">
                    <AppleStoreSvg />
                  </Link>
                </div>
              </RevealAnimation>
            </div>

            {/* Phone mockup */}
            <RevealAnimation style="lg:w-[50%] w-full">
              <CustomImage
                src={heroImg}
                style="w-full lg:h-[700px] h-[420px]"
                imgStyle="object-contain"
                alt="Bubbles Vendor App"
              />
            </RevealAnimation>
          </div>
        </MaxScreenWrapper>
      </div>

      {/* ── Value Props ── */}
      <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-[54px] sm:py-[104px] bg-tertiary300">
        <MaxScreenWrapper style="flex flex-col gap-[48px]">
          <RevealAnimation style="w-full">
            <Text
              as="h2"
              style="font-[700] md:text-[40px] text-[30px] leading-[120%] text-center"
            >
              Why Vendors Choose Bubbles
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
