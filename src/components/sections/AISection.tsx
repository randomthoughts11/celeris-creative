"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AI_CAPABILITIES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Animated SVG "neural circuit" that draws itself on scroll. */
function CircuitGraphic() {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const paths = ref.current?.querySelectorAll("path");
      if (!paths) return;
      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          }
        );
      });
      gsap.fromTo(
        ref.current!.querySelectorAll("circle"),
        { scale: 0, transformOrigin: "center", opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.8,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden
      className="h-auto w-full max-w-md opacity-80"
    >
      <path d="M40 150 H140 M140 150 C170 150 170 80 200 80 H260 M140 150 C170 150 170 220 200 220 H260 M260 80 C300 80 300 150 340 150 M260 220 C300 220 300 150 340 150 M340 150 H380" stroke="url(#circuit-grad)" strokeWidth="1.5" />
      <path d="M40 70 H100 C130 70 140 80 140 150 M40 230 H100 C130 230 140 220 140 150" stroke="url(#circuit-grad)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="150" r="5" fill="#8478ff" />
      <circle cx="40" cy="70" r="4" fill="#8478ff" opacity="0.6" />
      <circle cx="40" cy="230" r="4" fill="#8478ff" opacity="0.6" />
      <circle cx="140" cy="150" r="6" fill="#a89eff" />
      <circle cx="260" cy="80" r="5" fill="#6ee7f9" />
      <circle cx="260" cy="220" r="5" fill="#6ee7f9" />
      <circle cx="340" cy="150" r="6" fill="#a89eff" />
      <circle cx="380" cy="150" r="8" fill="#8478ff" />
      <defs>
        <linearGradient id="circuit-grad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8478ff" />
          <stop offset="1" stopColor="#6ee7f9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AISection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-ai-cap]",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-ai-grid]", start: "top 82%", once: true },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-y border-line bg-ink-3/40 py-28 sm:py-36"
      aria-labelledby="ai-title"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-[-20%] h-[60vh] w-[90vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(110,231,249,0.08),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="AI & Automation"
              title="Your business,"
              accent="on autopilot."
              description="AI isn't a feature we bolt on — it's the engine room of every system we build. While competitors hire more people to do more manual work, our clients ship intelligent workflows that compound."
            />
            <div className="mt-10">
              <MagneticButton href="/contact">
                Automate My Business
              </MagneticButton>
            </div>
          </div>
          <div className="hidden justify-center lg:flex">
            <CircuitGraphic />
          </div>
        </div>

        <div data-ai-grid className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AI_CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              data-ai-cap
              className="group relative overflow-hidden rounded-card border border-line bg-ink-2/80 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-aqua/40"
            >
              <div
                aria-hidden
                className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-aqua/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <h3 className="font-display relative text-lg font-semibold text-snow">
                {cap.title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-fog">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
