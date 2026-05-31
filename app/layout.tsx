import type { Metadata } from 'next'
import { DM_Sans, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
// import { AuthProvider } from '../contexts/auth-context'
import { Toaster } from '@/components/ui/sonner'
// import CartHydration from '@/stores/CartHydration'
import { Suspense } from 'react'
import ChatWidget from '@/components/ChatWidget'

const DmSans = DM_Sans({
  subsets: ["latin-ext"],
  variable: "--dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const SITE_URL = 'https://bubblesng.com'
const OG_IMAGE = `${SITE_URL}/bubbles-logo.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bubbles — Cleaning & Laundry Services in Lagos',
    template: '%s | Bubbles',
  },
  description:
    'Bubbles connects Lagos residents to reliable cleaning and laundry services. Schedule pickups, track orders, and enjoy hassle-free cleaning — delivered to your door.',
  keywords: [
    'laundry Lagos', 'dry cleaning Lagos', 'laundry pickup Lagos',
    'cleaning services Lagos', 'laundry app Nigeria', 'Bubbles laundry',
  ],
  authors: [{ name: 'Bubbles', url: SITE_URL }],
  creator: 'Bubbles',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_URL,
    siteName: 'Bubbles',
    title: 'Bubbles — Cleaning & Laundry Services in Lagos',
    description:
      'Bubbles connects Lagos residents to reliable cleaning and laundry services. Schedule pickups, track orders, and enjoy hassle-free cleaning — delivered to your door.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Bubbles Laundry & Cleaning' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bubbles — Cleaning & Laundry Services in Lagos',
    description:
      'Schedule laundry pickups and cleaning services across Lagos. Download the Bubbles app today.',
    images: [OG_IMAGE],
    creator: '@getbubblesng',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/bubbles-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
        <body
          className={`m-auto min-h-[100vh] flex flex-col ${grotesk.className}`}
        >
          <NextTopLoader color='#001029' showSpinner={false} />
          <main>
            {/* <CartHydration /> */}
            <Suspense fallback={<div></div>}>{children}</Suspense>
          </main>
          <ChatWidget />
          <Toaster richColors />
        </body>
    </html>
  );
}
