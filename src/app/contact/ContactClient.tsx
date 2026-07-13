"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/data";

const SERVICES_OPTIONS = [
  "AI & Automation",
  "Branding",
  "Web Design",
  "Marketing",
  "Content & Podcast",
  "Lead Generation",
  "Not sure yet",
];

const EXPECT = [
  {
    title: "A diagnosis, not a pitch",
    description:
      "We look at your funnel and find the constraint costing you the most revenue right now.",
  },
  {
    title: "A written plan in 48 hours",
    description:
      "You leave with a concrete, prioritized roadmap — yours to keep, whoever you build with.",
  },
  {
    title: "An honest recommendation",
    description:
      "If we're not confident we can produce a return for you, we'll tell you on the call.",
  },
];

export function ContactClient() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (s: string) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterested in: ${selected.join(", ") || "—"}\n\n${message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Strategy call request — ${name}`
    )}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's find your"
        accent="constraint."
        description="Thirty minutes, no pitch deck. Tell us where you are, and we'll map the one system that would move your revenue most."
      />

      <section className="mx-auto max-w-[1400px] px-6 pb-32 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <Reveal>
            <form
              onSubmit={onSubmit}
              className="glass rounded-card p-8 sm:p-12"
              aria-label="Strategy call request"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-16 text-center"
                  >
                    <p className="font-display text-3xl font-semibold text-snow">
                      Your email client should be open.
                    </p>
                    <p className="mt-4 text-fog">
                      Didn&rsquo;t work? Write to us directly at{" "}
                      <a href={`mailto:${SITE.email}`} className="text-iris-soft underline">
                        {SITE.email}
                      </a>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="font-mono-label mb-3 block text-xs text-fog">
                          Your name
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder="Jane Founder"
                          className="w-full border-b border-line bg-transparent pb-3 text-lg text-snow placeholder:text-mist focus:border-iris focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="font-mono-label mb-3 block text-xs text-fog">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="jane@company.com"
                          className="w-full border-b border-line bg-transparent pb-3 text-lg text-snow placeholder:text-mist focus:border-iris focus:outline-none"
                        />
                      </div>
                    </div>

                    <fieldset className="mt-10">
                      <legend className="font-mono-label mb-4 text-xs text-fog">
                        What do you need? (select any)
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {SERVICES_OPTIONS.map((s) => {
                          const active = selected.includes(s);
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => toggle(s)}
                              aria-pressed={active}
                              className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                                active
                                  ? "border-iris bg-iris/15 text-snow"
                                  : "border-line text-fog hover:border-line-strong hover:text-snow"
                              }`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div className="mt-10">
                      <label htmlFor="message" className="font-mono-label mb-3 block text-xs text-fog">
                        Tell us about your business
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="What are you selling, who's buying, and what's not working?"
                        className="w-full resize-none border-b border-line bg-transparent pb-3 text-lg text-snow placeholder:text-mist focus:border-iris focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group relative mt-12 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-snow px-8 py-5 text-base font-medium text-ink transition-transform duration-300 hover:scale-[1.01] sm:w-auto"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 translate-y-full rounded-full bg-iris transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                      />
                      <span className="relative z-10">Request Strategy Call</span>
                      <span aria-hidden className="relative z-10">→</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          {/* Side rail */}
          <div className="space-y-10">
            <Reveal delay={0.15}>
              <div>
                <p className="font-mono-label mb-6 text-xs text-mist">
                  What to expect
                </p>
                <ul className="space-y-7">
                  {EXPECT.map((item, i) => (
                    <li key={item.title} className="flex gap-5">
                      <span className="font-mono-label mt-1 text-xs text-iris-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-snow">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-fog">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="rounded-card border border-line bg-ink-2 p-8">
                <p className="font-mono-label mb-4 text-xs text-mist">Direct</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-display block text-xl font-semibold text-snow transition-colors hover:text-iris-soft"
                >
                  {SITE.email}
                </a>
                <p className="mt-4 text-sm leading-relaxed text-fog">{SITE.address}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
