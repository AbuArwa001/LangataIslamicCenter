import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import Campaigns from "@/components/home/Campaigns";
import Fundraising from "@/components/home/Fundraising";
import Testimonials from "@/components/home/Testimonials";
import MapSection from "@/components/home/MapSection";
import { Suspense } from "react";
import ProjectCardSkeleton from "@/components/projects/ProjectCardSkeleton";

function CampaignsLoading() {
  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Fundraising />
      <AboutSection />
      <Suspense fallback={<CampaignsLoading />}>
        <Campaigns />
      </Suspense>

      <Testimonials />
      <MapSection />
    </main>
  );
}
