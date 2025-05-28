import { Footer } from "@/components/global/Footer";
import { Hero } from "../components/hero";
import { Services } from "../components/services";
import { AdBanner } from "@/components/advert";

export default function Home() {
  return (
    <>
      <Hero />
      <AdBanner
        imageUrl="https://res.cloudinary.com/dhjptk5wf/image/upload/v1748330961/cpadxy8shwo89beeiapp.png"
        altText="Bubbles Store Ad"
        clickUrl="https://res.cloudinary.com/dhjptk5wf/image/upload/v1748330961/cpadxy8shwo89beeiapp.png"
        fullWidth={true}
        aspectRatio="4/1"
        className="max-w-7xl mx-auto px-4"
        trackingId="desktop-banner-001"
      />
      <Services />
      <Footer />
    </>
  );
}
