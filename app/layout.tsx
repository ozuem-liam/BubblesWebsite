import type { Metadata } from 'next'
import { DM_Sans, Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
// import { AuthProvider } from '../contexts/auth-context'
import { Toaster } from '@/components/ui/sonner'
import CartHydration from '@/stores/CartHydration'
import { Suspense } from 'react'
import ChatWidget from '@/components/ChatWidget'

const DmSans = DM_Sans({
  subsets: ["latin-ext"],
  variable: "--dm-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: 'Bubbles',
  description:
    'Bubbles connects busy professionals to reliable laundry services near them. Easily schedule pickups, track orders, and enjoy hassle-free cleaning. Grow your laundry business with secure payments, seamless order management, and delivery support.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`m-auto min-h-[100vh] flex flex-col ${DmSans.className}`}
      >
        <NextTopLoader color="#001029" showSpinner={false} />
        <main>
          <CartHydration />
          <Suspense fallback={<div></div>}>{children}</Suspense>
        </main>
        <ChatWidget />
        <Toaster richColors />
      </body>
    </html>
  );
}
