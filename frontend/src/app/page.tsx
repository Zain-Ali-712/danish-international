import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Services from "@/components/sections/Services";
import GlobalReach from "@/components/sections/GlobalReach";
import CTABand from "@/components/layout/CTABand";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <Marquee />
        <About />
        <Products />
        <Services />
        <GlobalReach />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
