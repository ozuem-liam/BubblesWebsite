import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grow Your Service Business",
  description:
    "Join Bubbles as a service professional. Reach customers, manage requests, and grow your independent business from one app.",
  openGraph: {
    title: "Grow Your Service Business with Bubbles",
    description:
      "Join Bubbles as an independent service professional. Reach more customers and manage requests from one app.",
    url: "https://www.bubblesng.com/vendor",
    images: [{ url: "https://www.bubblesng.com/bubbles-og-image.png", width: 1200, height: 630, alt: "Bubbles Vendor App" }],
  },
  twitter: {
    title: "Grow Your Service Business with Bubbles",
    description:
      "Join 150+ vendors on Bubbles. Manage orders, get customers, and receive payouts — all from one app.",
  },
};

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
