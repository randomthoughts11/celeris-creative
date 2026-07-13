"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WHY_CELERIS, STATS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Why Celeris + Statistics, combined in an asymmetric editorial layout:
 * a staggered two-column reason list offset against an oversized stat rail.
 */
export function WhyCeleris() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-why-item]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: (i % 2) * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      gsap.fromTo(
        "[data-stat-item]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-stat-rail]", start: "top 85%", once: true },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative py-28 sm:py-36" aria-labelledby="why-title">
      <div
        aria-hidden
        className="absolute left-[-20%] top-[30%] h-[45vh] w-[45vh] rounded-full bg-aqua/6 blur-[110px]"
      />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow="Why Celeris"
          title="Most agencies sell hours."
          accent="We sell outcomes."
        />

        {/* Asymmetric reasons grid — right column offset down */}
        <div className="mt-20 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {WHY_CELERIS.map((reason, i) => (
            <article
              key={reason.title}
              data-why-item
              className={i % 2 === 1 ? "md:translate-y-16" : ""}
            >
              <div className="hairline mb-7" aria-hidden />
              <div className="flex items-baseline gap-5">
                <span className="font-mono-label text-xs text-iris-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-snow sm:text-3xl">
                    {reason.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-fog sm:text-base">
                    {reason.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stat rail */}
        <div
          data-stat-rail
          className="mt-32 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4 md:mt-40"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              data-stat-item
              className="group bg-ink-2 p-8 transition-colors duration-500 hover:bg-ink-3 sm:p-10"
            >
              <p className="font-display text-5xl font-semibold tracking-tight text-snow transition-colors duration-500 group-hover:text-iris-soft sm:text-6xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="mt-4 text-sm leading-snug text-fog">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
