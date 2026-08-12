import type { Metadata } from 'next'
import { MarketplaceInfoPage } from '@/components/marketplace/MarketplaceInfoPage'

export const metadata: Metadata = {
  title: 'How Bubbles Works',
  description: 'Learn how Bubbles helps customers discover independent service professionals, manage bookings, and get support when needed.',
  alternates: { canonical: '/how-it-works' },
}

export default function HowItWorksPage() {
  return <MarketplaceInfoPage eyebrow="How Bubbles works" title="A clearer way to find and manage everyday services." introduction="Bubbles is a marketplace. Independent professionals offer their services; Bubbles helps customers discover options, manage requests, and access support." sections={[
    { title: '1. Explore available services', body: 'Browse the service categories and professionals available in your area. Each professional manages their own offerings, prices, availability, and fulfilment details.' },
    { title: '2. Choose a professional', body: 'Review the available information and select the provider that best fits your need. Availability and any pickup, delivery, or on-site options are confirmed with the chosen provider.' },
    { title: '3. Manage your request', body: 'Use Bubbles to keep your service request organised—from the details you provide to communication and order updates.' },
    { title: '4. Get help when needed', body: 'If a booking needs attention, Bubbles support can help customers and vendors work toward a fair resolution under the platform’s policies.' },
  ]} />
}
