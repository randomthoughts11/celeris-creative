"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/data";
import { SMS_CONSENT_BODY } from "@/lib/legal";

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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [smsConsent, setSmsConsent] = useState(false);

  const toggle = (s: string) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          interests: selected,
          phone,
          smsConsent,
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
      };

      if (!res.ok) {
        throw new Error(
          payload.detail ||
            payload.error ||
            `Couldn't send. Email ${SITE.formEmail} directly.`
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Couldn't send. Email ${SITE.formEmail} directly.`
      );
    } finally {
      setSending(false);
    }
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
                      Request sent.
                    </p>
                    <p className="mt-4 text-fog">
                      We&rsquo;ll get back to you shortly. Prefer email?{" "}
                      <a
                        href={`mailto:${SITE.formEmail}`}
                        className="text-iris-soft underline"
                      >
                        {SITE.formEmail}
                      </a>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="font-mono-label mb-3 block text-xs text-fog"
                        >
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
                        <label
                          htmlFor="email"
                          className="font-mono-label mb-3 block text-xs text-fog"
                        >
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
                      <label
                        htmlFor="message"
                        className="font-mono-label mb-3 block text-xs text-fog"
                      >
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

                    <div className="mt-10">
                      <label
                        htmlFor="phone"
                        className="font-mono-label mb-3 block text-xs text-fog"
                      >
                        Mobile number {smsConsent ? "" : "(optional)"}
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required={smsConsent}
                        autoComplete="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full border-b border-line bg-transparent pb-3 text-lg text-snow placeholder:text-mist focus:border-iris focus:outline-none"
                      />
                    </div>

                    <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-fog">
                      <input
                        type="checkbox"
                        name="smsConsent"
                        checked={smsConsent}
                        onChange={(e) => setSmsConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-iris"
                      />
                      <span>
                        {SMS_CONSENT_BODY} View our{" "}
                        <Link href="/privacy" className="text-snow underline underline-offset-2">
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/terms-and-conditions"
                          className="text-snow underline underline-offset-2"
                        >
                          SMS Terms &amp; Conditions
                        </Link>
                        .
                      </span>
                    </label>

                    {error && (
                      <p className="mt-6 text-sm text-red-300" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative mt-12 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-snow px-8 py-5 text-base font-medium text-ink transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 translate-y-full rounded-full bg-iris transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
                      />
                      <span className="relative z-10">
                        {sending ? "Sending…" : "Request Strategy Call"}
                      </span>
                      {!sending && (
                        <span aria-hidden className="relative z-10">
                          →
                        </span>
                      )}
                    </button>
                    <p className="mt-4 text-xs leading-relaxed text-mist">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy" className="text-fog underline-offset-2 hover:text-snow hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="text-fog underline-offset-2 hover:text-snow hover:underline">
                        Terms of Service
                      </Link>
                      .
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={0.15}>
              <div>
                <h2 className="font-mono-label mb-6 text-xs text-mist">
                  What to expect
                </h2>
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
                  href={`mailto:${SITE.formEmail}`}
                  className="font-display block text-xl font-semibold text-snow transition-colors hover:text-iris-soft"
                >
                  {SITE.formEmail}
                </a>
                <p className="mt-4 text-sm leading-relaxed text-fog">
                  {SITE.address}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
