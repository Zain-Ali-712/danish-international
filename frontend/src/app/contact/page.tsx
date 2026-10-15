import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Danish International",
  description: "Contact Danish International in Lahore, Pakistan: (+92) 423-5923982, sales@danish-international.com.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <PageHero
          eyebrow="Contact us"
          title="Get in"
          highlight="touch"
          subtitle="Tell us about your requirements and our team in Lahore will get back to you."
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
