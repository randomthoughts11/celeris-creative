"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitReveal, Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FinalCTA() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Background gradient intensifies as section fills the viewport
      gsap.fromTo(
        "[data-cta-glow]",
        { scale: 0.7, opacity: 0.35 },
        {
          scale: 1.15,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 0.8,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[90svh] items-center overflow-hidden py-28"
      aria-labelledby="cta-title"
    >
      {/* Layered animated background */}
      <div aria-hidden className="absolute inset-0">
        <div
          data-cta-glow
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(132,120,255,0.28),rgba(110,231,249,0.08)_45%,transparent_70%)]"
        />
        <div className="animate-float-slow absolute left-[10%] top-[15%] h-40 w-40 rounded-full bg-iris/15 blur-3xl" />
        <div
          className="animate-float-slow absolute bottom-[15%] right-[12%] h-52 w-52 rounded-full bg-aqua/10 blur-3xl"
          style={{ animationDelay: "-5s" }}
        />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(244,244,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(244,244,248,0.02)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 text-center lg:px-10">
        <Reveal>
          <p className="font-mono-label mb-8 text-xs text-iris-soft">
            Limited partner slots each quarter
          </p>
        </Reveal>

        <h2
          id="cta-title"
          className="font-display mx-auto max-w-5xl text-[clamp(2.6rem,7.5vw,6.5rem)] font-semibold leading-[1.02] tracking-tight text-snow"
        >
          <SplitReveal text="Your competitors are" />
          <br />
          <SplitReveal
            text="already automating."
            className="font-serif-accent text-gradient"
            delay={0.25}
          />
        </h2>

        <Reveal delay={0.4}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
            Book a free 30-minute strategy call. We&rsquo;ll map the one system
            that would move your revenue most — and give you the plan whether
            you hire us or not.
          </p>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/contact">Book Strategy Call</MagneticButton>
            <MagneticButton href="/work" variant="ghost">
              View Our Work
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <p className="mt-10 text-xs text-mist">
            No pitch deck. No obligation. A written plan in your inbox within 48 hours.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
