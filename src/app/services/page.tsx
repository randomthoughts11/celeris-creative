import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { SERVICES } from "@/lib/data";
import { Reveal, SplitReveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation, branding, web design, performance marketing, content systems, and lead generation — engineered as one growth system by Celeris Creative.",
};

const PLANS = [
  {
    name: "Silver",
    price: "$350",
    blurb: "For local brands getting serious about digital.",
    features: [
      "1-page conversion site",
      "8 posts + 2 reels monthly",
      "Foundational SEO & Google Maps",
      "Meta ads setup",
      "Monthly newsletter & reporting",
    ],
  },
  {
    name: "Gold",
    price: "$700",
    blurb: "For growing businesses ready to automate follow-up.",
    features: [
      "Multi-page responsive site",
      "12 posts + 4 reels monthly",
      "Keyword targeting + analytics",
      "Meta + Google ads with reporting",
      "Automated follow-ups & basic AI workflows",
    ],
  },
  {
    name: "Diamond",
    price: "$1,000",
    blurb: "For brands building a real acquisition engine.",
    featured: true,
    features: [
      "Custom SEO-ready website",
      "16 posts + 6 reels monthly",
      "Local SEO + Google, Meta & YouTube campaigns",
      "Drip automation + CRM integration",
      "Qualified-leads reporting & dedicated manager",
    ],
  },
  {
    name: "Platinum",
    price: "$1,500",
    blurb: "The full growth system, AI in the engine room.",
    features: [
      "Full web suite + landing pages",
      "20 posts + 8 reels monthly",
      "Advanced SEO + multi-platform ads with ROI tracking",
      "AI CRM, smart lead scoring & AI-qualified leads",
      "24/7 priority support",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Capabilities built"
        accent="to compound."
        description="Hire us for one discipline or the whole system. Either way, everything we ship is designed to connect — because growth breaks at the seams between vendors."
      />

      {/* Service detail sections */}
      <section className="mx-auto max-w-[1400px] px-6 pb-28 lg:px-10">
        <div className="space-y-6">
          {SERVICES.map((service, i) => (
            <article
              key={service.id}
              id={service.id}
              className="group scroll-mt-32 rounded-card border border-line bg-ink-2 p-8 transition-colors duration-500 hover:border-iris/30 sm:p-12"
            >
              <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="font-mono-label text-xs text-iris-soft">
                    {service.index} — {service.hook}
                  </p>
                  <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-snow sm:text-5xl">
                    <SplitReveal text={service.title} />
                  </h2>
                  <Reveal delay={0.15}>
                    <p className="mt-6 max-w-lg text-base leading-relaxed text-fog">
                      {service.description}
                    </p>
                  </Reveal>
                </div>
                <Reveal delay={0.2}>
                  <div className="flex h-full flex-col justify-between gap-8">
                    <ul className="grid gap-3">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-center gap-3 border-b border-line pb-3 text-sm text-snow/85"
                        >
                          <span aria-hidden className="h-1 w-1 rounded-full bg-iris" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-mist">
                      Typical first system live in 14 days
                    </p>
                  </div>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section
        className="border-y border-line bg-ink-2/60 py-28"
        aria-labelledby="pricing-title"
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeading
            eyebrow="Partnership plans"
            title="Simple pricing,"
            accent="serious outcomes."
            description="Monthly partnerships with fixed scope and no hourly billing. Every plan starts with a strategy call and a written growth plan."
            align="center"
          />
          <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-card border p-8 transition-transform duration-500 hover:-translate-y-1.5 ${
                    plan.featured
                      ? "border-iris/50 bg-ink-3 glow-iris"
                      : "border-line bg-ink-2"
                  }`}
                >
                  {plan.featured && (
                    <span className="font-mono-label absolute -top-3 left-8 rounded-full bg-iris px-3 py-1 text-[10px] text-ink">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold text-snow">
                    {plan.name}
                  </h3>
                  <p className="mt-3 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-semibold text-snow">
                      {plan.price}
                    </span>
                    <span className="text-sm text-mist">/month</span>
                  </p>
                  <p className="mt-3 text-sm text-fog">{plan.blurb}</p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm text-snow/80">
                        <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-aqua" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <MagneticButton
                      href="/contact"
                      variant={plan.featured ? "primary" : "ghost"}
                      className="w-full [&>a]:w-full [&>a]:justify-center"
                    >
                      Start with {plan.name}
                    </MagneticButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-10 text-center text-xs text-mist">
              Need something custom? Every engagement can be scoped as a one-time build. Terms & conditions apply.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
