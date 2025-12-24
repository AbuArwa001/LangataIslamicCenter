import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import Campaigns from "@/components/home/Campaigns";
import Fundraising from "@/components/home/Fundraising";
import Testimonials from "@/components/home/Testimonials";
import MapSection from "@/components/home/MapSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Fundraising />
      <AboutSection />
      <Campaigns />
      <Testimonials />
      <MapSection />
    </main>
  );
}