import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Process } from "@/components/sections/Process";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Celeris Creative is an AI-powered growth agency in Plano, TX. Designers, strategists, and automation engineers building growth systems for ambitious brands.",
};

const VALUES = [
  {
    title: "Creativity with purpose",
    description:
      "Beautiful work that doesn't convert is decoration. Every creative decision we make traces back to a business outcome.",
  },
  {
    title: "Human-centered, machine-powered",
    description:
      "AI runs our engine room, but empathy steers the ship. We design for the human on the other side of the screen.",
  },
  {
    title: "Radical transparency",
    description:
      "You see the numbers we see — the wins and the misses. Trust is built on dashboards, not decks.",
  },
  {
    title: "Speed as respect",
    description:
      "Celeris is Latin for swift. Momentum is a feature of every engagement: weekly ships, visible progress, no black boxes.",
  },
  {
    title: "Growth through iteration",
    description:
      "We don't bet everything on a big reveal. We ship, measure, learn, and compound — the way real growth actually happens.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built for the brands"
        accent="moving fastest."
        description="Celeris Creative is a team of designers, strategists, and automation engineers with one obsession: turning ambitious businesses into systematic growers."
      />

      {/* Story */}
      <section className="mx-auto max-w-[1400px] px-6 pb-28 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading
            eyebrow="Our story"
            title="From bold design"
            accent="to full systems."
          />
          <Reveal delay={0.2}>
            <div className="space-y-6 text-base leading-relaxed text-fog sm:text-lg">
              <p>
                Celeris Creative was founded to help brands create meaningful
                connections through bold, human-centered design. That mission
                hasn&rsquo;t changed — but the way we deliver it has evolved.
              </p>
              <p>
                We watched too many businesses buy beautiful brands, capable
                websites, and competent campaigns from three different vendors —
                and still fail to grow, because nothing was connected. So we
                became the team that builds the whole machine.
              </p>
              <p>
                Today we combine strategy, creativity, and AI automation into
                single, connected growth systems. Our deepest playbooks come
                from wellness and Ayurveda brands, where trust decides every
                sale — and those trust-first systems now power clients across
                healthcare, professional services, e-commerce, and media.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-ink-2/60 py-28" aria-labelledby="values-title">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeading
            eyebrow="Values"
            title="What we"
            accent="won't compromise."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.07}>
                <div className="group h-full rounded-card border border-line bg-ink-2 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-iris/40">
                  <span className="font-mono-label text-xs text-iris-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-4 text-xl font-semibold text-snow">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </>
  );
}
