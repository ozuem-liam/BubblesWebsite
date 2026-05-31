import { Footer } from '@/components/global/Footer'
import { Hero } from '../components/hero'
import { Services } from '../components/services'
import { AdBanner } from '@/components/advert'

// Swap imageUrl for a real campaign asset whenever a promotion is running.
// Set to null (and remove the <AdBanner> block) when no promotion is active.
const PROMO: { imageUrl: string; clickUrl: string; alt: string } | null = {
  imageUrl: '/service_img2.png',
  clickUrl:
    'https://play.google.com/store/apps/details?id=com.bubbles.customer.app&hl=en',
  alt: 'Download Bubbles — get your first order delivered fresh',
}

export default function Home() {
  return (
    <>
      <Hero />
      {PROMO && (
        <AdBanner
          imageUrl={PROMO.imageUrl}
          altText={PROMO.alt}
          clickUrl={PROMO.clickUrl}
          fullWidth
          aspectRatio="6/1"
          isDismissible
          trackingId="home-promo-banner"
        />
      )}
      <Services />
      <Footer />
    </>
  )
}
