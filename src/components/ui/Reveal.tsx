"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/** Fade-up reveal on scroll. */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 48,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </Tag>
  );
}

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** split by "words" or "chars" */
  mode?: "words" | "chars";
};

/** Masked line/word reveal, SplitText-style, triggered on scroll. */
export function SplitReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.045,
  mode = "words",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll("[data-split-unit]");
      gsap.fromTo(
        targets,
        { yPercent: 120, rotate: 4, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.05,
          delay,
          stagger,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  const units =
    mode === "words" ? text.split(" ") : Array.from(text.replace(/ /g, "\u00A0"));

  return (
    // NOTE: className is applied to each unit span (not just the wrapper)
    // because background-clip:text does not paint through transformed
    // descendants in Chromium — gradients must live on the leaf spans.
    <Tag ref={ref as React.Ref<HTMLDivElement>} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <span
            data-split-unit
            className={clsx("inline-block will-change-transform", className)}
          >
            {unit}
            {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
