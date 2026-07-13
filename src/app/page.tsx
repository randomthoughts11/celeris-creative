import { Hero } from "@/components/sections/Hero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { WhyCeleris } from "@/components/sections/WhyCeleris";
import { AISection } from "@/components/sections/AISection";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <Process />
      <FeaturedWork />
      <WhyCeleris />
      <AISection />
      <Industries />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
