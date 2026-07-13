"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import clsx from "clsx";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/** Button with magnetic pull toward the cursor and a fill-sweep hover. */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const rect = wrap.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    gsap.to(wrap, { x: relX * 0.28, y: relY * 0.28, duration: 0.5, ease: "power3.out" });
    gsap.to(inner, { x: relX * 0.12, y: relY * 0.12, duration: 0.5, ease: "power3.out" });
  };

  const onLeave = () => {
    gsap.to([wrapRef.current, innerRef.current], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.35)",
    });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx("inline-block", className)}
    >
      <Link
        href={href}
        className={clsx(
          "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm font-medium transition-colors duration-300",
          variant === "primary"
            ? "bg-snow text-ink"
            : "border border-line-strong text-snow hover:border-iris/60"
        )}
      >
        {variant === "primary" && (
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full rounded-full bg-iris transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
          />
        )}
        <span ref={innerRef} className="relative z-10 inline-flex items-center gap-3">
          {children}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path
              d="M1 13L13 1M13 1H3.4M13 1V10.6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}
