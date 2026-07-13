"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
};

/** Animated counter that counts up when scrolled into view. */
export function Counter({ value, suffix = "", decimals = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = obj.n.toFixed(decimals) + suffix;
          }
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals) + suffix}
    </span>
  );
}
