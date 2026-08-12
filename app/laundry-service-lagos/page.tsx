import type { Metadata } from 'next'
import { LocationServicePage } from '@/components/seo/LocationServicePage'

const url = 'https://www.bubblesng.com/laundry-service-lagos'

export const metadata: Metadata = {
  title: 'Find Laundry & Cleaning Professionals in Lagos',
  description: 'Find independent laundry, cleaning, fumigation and everyday service professionals in Lagos through Bubbles. Check availability in your area.',
  alternates: { canonical: url },
  openGraph: { title: 'Find Service Professionals in Lagos | Bubbles', description: 'Find independent laundry, cleaning and everyday service professionals in Lagos through Bubbles.', url, images: [{ url: '/bubbles-og-image.png', width: 1200, height: 630, alt: 'Fresh folded laundry with the Bubbles service app' }] },
}

export default function LagosServicePage() {
  const faq = [
    { question: 'Is Bubbles available across Lagos?', answer: 'Bubbles serves locations across Lagos, with availability depending on the service and provider. Check your address before placing a request.' },
    { question: 'Can I arrange laundry pickup and delivery?', answer: 'Where an independent provider offers it, you can request pickup and delivery. The available options and applicable fees are shown before you confirm.' },
    { question: 'What is Bubbles’ role in my booking?', answer: 'Bubbles operates the marketplace and helps you manage the request. The selected vendor is an independent business responsible for providing the service.' },
    { question: 'How do I get started?', answer: 'Contact Bubbles or use the customer app, share your location and service need, then confirm the available option that works for you.' },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', name: 'Find service professionals in Lagos', url, about: { '@type': 'Thing', name: 'Independent service professionals in Lagos' } },
      { '@type': 'FAQPage', mainEntity: faq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ],
  }

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><LocationServicePage city="Lagos" region="Lagos State" description="Find independent laundry, cleaning, fumigation and everyday service professionals in Lagos through Bubbles. Enter your location to see the options available near you." neighbourhoods={['Yaba', 'Ikeja', 'Lekki', 'Surulere', 'Victoria Island', 'Maryland']} faq={faq} /></>
}
