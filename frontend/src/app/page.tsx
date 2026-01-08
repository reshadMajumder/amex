
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { TrackingBar } from "@/components/TrackingBar";
import { FloatingActions } from "@/components/FloatingActions";
import { ServicesSection } from "@/components/ServicesSection";
import { SupplyChainSection } from "@/components/SupplyChainSection";
import { Footer } from "@/components/Footer";
import { BusinessStrength } from "@/components/BusinessStrength";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";

export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <Hero />
      <div className="relative z-20">
        <TrackingBar />
        <ServicesSection />
        <SupplyChainSection />
        <BusinessStrength />
        <WhyChooseUsSection />
      </div>
      <FloatingActions />
      <Footer />
    </main>
  );
}
