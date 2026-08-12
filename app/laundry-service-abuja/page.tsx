import type { Metadata } from 'next'
import { LocationServicePage } from '@/components/seo/LocationServicePage'

const url = 'https://www.bubblesng.com/laundry-service-abuja'

export const metadata: Metadata = {
  title: 'Find Laundry & Cleaning Professionals in Abuja',
  description: 'Discover independent laundry, cleaning, fumigation and everyday service professionals in Abuja through Bubbles. Check availability in your area.',
  alternates: { canonical: url },
  openGraph: { title: 'Find Service Professionals in Abuja | Bubbles', description: 'Discover independent laundry, cleaning and everyday service professionals in Abuja through Bubbles.', url, images: [{ url: '/bubbles-og-image.png', width: 1200, height: 630, alt: 'Fresh folded laundry with the Bubbles service app' }] },
}

export default function AbujaServicePage() {
  const faq = [
    { question: 'Does Bubbles serve Abuja?', answer: 'Bubbles is expanding its service network in Abuja. Check your location to confirm the services and providers currently available near you.' },
    { question: 'Can I request laundry pickup in Abuja?', answer: 'Pickup and delivery are available only where an independent provider offers them. Bubbles will show the available options for your location.' },
    { question: 'What is Bubbles’ role in my booking?', answer: 'Bubbles operates the marketplace and helps you manage the request. The selected vendor is an independent business responsible for providing the service.' },
    { question: 'How can I check coverage?', answer: 'Contact Bubbles or use the customer app, provide your Abuja location, and select from the available options.' },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: 'Find service professionals in Abuja', url, about: { '@type': 'Thing', name: 'Independent service professionals in Abuja' } },
      { '@type': 'FAQPage', mainEntity: faq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ],
  }

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><LocationServicePage city="Abuja" region="Federal Capital Territory" description="Bubbles is building a trusted marketplace for independent laundry, cleaning, fumigation and everyday service professionals in Abuja. Check your location to discover the options currently available near you." neighbourhoods={['Wuse', 'Garki', 'Maitama', 'Asokoro', 'Jabi', 'Gwarinpa']} faq={faq} /></>
}
