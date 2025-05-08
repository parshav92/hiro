import { Banner } from "@/components/home/Banner";
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { LogoTicker } from "@/components/home/LogoTicker";
import { Features } from "@/components/home/Features";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { FAQs } from "@/components/home/FAQs";
import { CallToAction } from "@/components/home/CallToAction";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Banner />
      <Navbar />
      <Hero />
      {/* <LogoTicker /> */}
      <Features />
      <ProductShowcase />
      <FAQs />
      <CallToAction />
      <Footer />
    </>
  );
}