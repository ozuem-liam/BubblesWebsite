import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
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

const SITE_URL = 'https://www.bubblesng.com'
const OG_IMAGE = `${SITE_URL}/bubbles-og-image.png`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bubbles — Trusted Service Professionals in Nigeria',
    template: '%s | Bubbles',
  },
  description:
    'Bubbles is a Nigerian marketplace that connects customers with independent, reviewed service professionals. Discover services, manage bookings, and get support when needed.',
  keywords: [
    'artisan marketplace Nigeria', 'service professionals Nigeria', 'find local artisans Nigeria',
    'book service professionals Nigeria', 'vendor marketplace Nigeria', 'Bubbles Nigeria',
  ],
  authors: [{ name: 'Bubbles', url: SITE_URL }],
  creator: 'Bubbles',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_URL,
    siteName: 'Bubbles',
    title: 'Bubbles — Trusted Service Professionals in Nigeria',
    description:
      'Find and book independent service professionals through Bubbles. Availability varies by category and location across Nigeria.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Bubbles Laundry & Cleaning' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bubbles — Trusted Service Professionals in Nigeria',
    description:
      'Find independent service professionals through Bubbles. Check availability in your Nigerian city.',
    images: [OG_IMAGE],
    creator: '@getbubblesng',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: '/',
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
          className={`m-auto min-h-[100vh] flex flex-col ${DmSans.className}`}
        >
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              { '@type': 'Organization', name: 'Bubbles', url: SITE_URL, logo: `${SITE_URL}/bubbles-logo.png`, contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'williams@bubblesng.com', telephone: '+2348105951215', areaServed: 'NG' } },
              { '@type': 'WebSite', name: 'Bubbles', url: SITE_URL, potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/blog?search={search_term_string}`, 'query-input': 'required name=search_term_string' } },
            ],
          }) }} />
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
