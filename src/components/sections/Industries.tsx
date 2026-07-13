"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { INDUSTRIES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Industries as an interactive index list: hovering a row expands it and
 * reveals the note; a preview chip follows the active row.
 */
export function Industries() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-industry-row]",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-industry-list]", start: "top 85%", once: true },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative py-28 sm:py-36" aria-labelledby="industries-title">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow="Industries"
          title="Deep playbooks,"
          accent="not guesswork."
          description="We go deep in industries where trust decides the sale — and bring battle-tested systems, not experiments."
        />

        <ul data-industry-list className="mt-16" role="list">
          {INDUSTRIES.map((industry, i) => (
            <li key={industry.title} data-industry-row>
              <Link
                href="/contact"
                data-cursor-label="Let's talk"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group relative block border-t border-line py-6 transition-colors duration-300 last:border-b sm:py-7"
              >
                <div
                  aria-hidden
                  className={`absolute inset-0 origin-bottom bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active === i ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <div className="relative flex items-center justify-between gap-6 px-1 sm:px-4">
                  <div className="flex items-baseline gap-5 sm:gap-8">
                    <span className="font-mono-label text-xs text-mist">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-display text-2xl font-semibold tracking-tight transition-all duration-500 sm:text-4xl ${
                        active === i ? "translate-x-2 text-snow" : "text-snow/70"
                      }`}
                    >
                      {industry.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <AnimatePresence>
                      {active === i && (
                        <motion.p
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 24 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="hidden max-w-xs text-right text-sm text-fog lg:block"
                        >
                          {industry.note}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span
                      aria-hidden
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        active === i
                          ? "rotate-45 border-iris text-iris"
                          : "border-line text-mist"
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 13L13 1M13 1H3.4M13 1V10.6"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <p className="relative mt-2 pl-10 pr-1 text-sm text-fog sm:pl-16 lg:hidden">
                  {industry.note}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
