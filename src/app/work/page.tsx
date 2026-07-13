import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";
import { STATS } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Celeris Creative — growth systems, rebrands, and AI automation shipped for wellness, healthcare, media, and e-commerce brands.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Proof over"
        accent="promises."
        description="Every engagement below started with a constraint and ended with a system. The numbers are the story."
      />

      <section aria-label="Results at a glance" className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-ink-2 p-8">
                <p className="font-display text-4xl font-semibold text-snow sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="mt-3 text-sm text-fog">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <FeaturedWork />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
