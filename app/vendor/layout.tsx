import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grow Your Artisan Business",
  description:
    "Grow your artisan or service business with Bubbles. Find more customers, manage jobs, set your prices, and receive reliable payouts from one app.",
  openGraph: {
    title: "Grow Your Artisan Business with Bubbles",
    description:
      "Bubbles helps artisans and service professionals find customers, manage jobs, and receive reliable payouts from one app.",
    url: "https://bubblesng.com/vendor",
    images: [{ url: "https://bubblesng.com/bubbles-logo.png", width: 1200, height: 630, alt: "Bubbles Vendor App" }],
  },
  twitter: {
    title: "Grow Your Artisan Business with Bubbles",
    description:
      "Find customers, manage jobs, and receive payouts with the Bubbles Vendor App.",
  },
};

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
