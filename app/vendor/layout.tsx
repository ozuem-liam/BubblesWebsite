import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grow Your Cleaning Business",
  description:
    "Join 150+ vendors on Bubbles and grow your cleaning business. Get more customers, manage orders easily, and receive reliable payouts — all from one app.",
  openGraph: {
    title: "Grow Your Cleaning Business with Bubbles",
    description:
      "Join 150+ vendors on Bubbles. Get more customers, manage orders easily, and receive reliable payouts — all from one app. Download now.",
    url: "https://bubblesng.com/vendor",
    images: [{ url: "https://bubblesng.com/bubbles-logo.png", width: 1200, height: 630, alt: "Bubbles Vendor App" }],
  },
  twitter: {
    title: "Grow Your Cleaning Business with Bubbles",
    description:
      "Join 150+ vendors on Bubbles. Manage orders, get customers, and receive payouts — all from one app.",
  },
};

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
