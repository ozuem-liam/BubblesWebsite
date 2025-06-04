import { Footer } from "@/components/global/Footer";
import { Hero } from "../components/hero";
import { Services } from "../components/services";
import { StoreProducts } from "@/components/sections/store/StoreProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <StoreProducts />
      <Services />
      <Footer />
    </>
  );
}
