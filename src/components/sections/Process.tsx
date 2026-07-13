"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROCESS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Sticky-scroll process timeline: the heading column pins while steps
 * scroll past; a progress line draws as you move through the steps.
 */
export function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Progress line draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-process-steps]",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );

      // Each step lights up as it enters
      gsap.utils.toArray<HTMLElement>("[data-process-step]").forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.25, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 72%",
              once: true,
            },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative border-y border-line bg-ink-2/60 py-28 sm:py-36"
      aria-labelledby="process-title"
    >
      <div
        aria-hidden
        className="absolute right-[-15%] top-0 h-[50vh] w-[50vh] rounded-full bg-iris/8 blur-[100px]"
      />
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-[1fr_1.2fr] lg:px-10">
        {/* Sticky column */}
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionHeading
            eyebrow="How we work"
            title="From constraint"
            accent="to compounding."
            description="No six-month strategy decks. We find the bottleneck, ship the fix, measure the result — then move to the next constraint. Fourteen days to your first live system."
          />
        </div>

        {/* Steps */}
        <div data-process-steps className="relative">
          <div
            aria-hidden
            className="absolute bottom-8 left-[19px] top-8 w-px bg-line"
          />
          <div
            ref={lineRef}
            aria-hidden
            className="absolute bottom-8 left-[19px] top-8 w-px origin-top bg-gradient-to-b from-iris to-aqua"
          />

          <ol className="space-y-20">
            {PROCESS.map((item) => (
              <li
                key={item.step}
                data-process-step
                className="relative grid grid-cols-[40px_1fr] gap-6 sm:gap-10"
              >
                <span
                  aria-hidden
                  className="glass z-10 grid h-10 w-10 place-items-center rounded-full font-mono-label text-[10px] text-iris-soft"
                >
                  {item.step}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-snow sm:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-fog">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
