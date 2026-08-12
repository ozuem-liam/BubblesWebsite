import type { Metadata } from 'next'
import { MarketplaceInfoPage } from '@/components/marketplace/MarketplaceInfoPage'

export const metadata: Metadata = {
  title: 'Trust & Safety',
  description: 'Learn about Bubbles’ vendor review process, marketplace support, and approach to handling service issues.',
  alternates: { canonical: '/trust-safety' },
}

export default function TrustSafetyPage() {
  return <MarketplaceInfoPage eyebrow="Trust & safety" title="More confidence when you book an independent professional." introduction="Bubbles does not perform the services listed on the marketplace. Our role is to review vendor applications, operate the booking platform, and provide support when customers and vendors need help." sections={[
    { title: 'Vendor applications are reviewed', body: 'Service professionals apply to join Bubbles. We review the information required for onboarding before approving a vendor to operate on the platform.' },
    { title: 'Independent vendors remain responsible', body: 'Each vendor is an independent business responsible for their service, pricing, availability, staff, and fulfilment. Bubbles does not guarantee a vendor’s work.' },
    { title: 'Clearer booking information', body: 'Bubbles is designed to make service requests easier to understand and manage, including the selected provider, service details, and applicable options.' },
    { title: 'Support and resolution', body: 'Customers and vendors can contact Bubbles when there is a problem with a request. We review the information available and help both parties follow the relevant platform policies.' },
  ]} />
}
