"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Custom cursor: a small dot that tracks instantly plus a trailing ring.
 * The ring morphs when hovering interactive elements, and shows a label
 * over elements with [data-cursor-label].
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || prefersReduced) return;

    document.body.classList.add("cursor-none-enabled");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor], [data-cursor-label]"
      ) as HTMLElement | null;

      const labelText = target?.getAttribute("data-cursor-label") ?? "";

      if (labelText) {
        label.textContent = labelText;
        gsap.to(ring, {
          width: 88,
          height: 88,
          backgroundColor: "rgba(132,120,255,0.92)",
          borderColor: "transparent",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 1, duration: 0.2 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else if (target) {
        gsap.to(ring, {
          width: 56,
          height: 56,
          backgroundColor: "rgba(132,120,255,0.14)",
          borderColor: "rgba(132,120,255,0.6)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      } else {
        gsap.to(ring, {
          width: 32,
          height: 32,
          backgroundColor: "rgba(132,120,255,0)",
          borderColor: "rgba(244,244,248,0.35)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(label, { opacity: 0, duration: 0.15 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      }
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("cursor-none-enabled");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-snow/35"
      >
        <span
          ref={labelRef}
          className="font-mono-label text-[10px] text-ink opacity-0"
        />
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-snow"
      />
    </div>
  );
}
