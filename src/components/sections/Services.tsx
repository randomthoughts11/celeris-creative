"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ServiceCard({
  service,
  className,
}: {
  service: (typeof SERVICES)[number];
  className?: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(glow, { x: x - 160, y: y - 160, duration: 0.6, ease: "power3.out" });
  };

  return (
    <Link
      ref={cardRef}
      href={`/services#${service.id}`}
      onMouseMove={onMove}
      data-service-card
      data-cursor-label="Explore"
      className={`group relative flex flex-col justify-between overflow-hidden rounded-card border border-line bg-ink-2 p-8 transition-colors duration-500 hover:border-iris/40 sm:p-10 ${className ?? ""}`}
    >
      {/* Cursor-follow glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-iris/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="font-mono-label text-xs text-mist transition-colors duration-500 group-hover:text-iris-soft">
            {service.index}
          </span>
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fog transition-all duration-500 group-hover:rotate-45 group-hover:border-iris group-hover:text-iris"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 13L13 1M13 1H3.4M13 1V10.6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        <h3 className="font-display mt-10 text-2xl font-semibold tracking-tight text-snow sm:text-3xl">
          {service.title}
        </h3>
        <p className="font-serif-accent mt-2 text-lg text-iris-soft">
          {service.hook}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-fog">
          {service.description}
        </p>
      </div>

      <ul className="relative mt-8 flex flex-wrap gap-2" aria-label={`${service.title} deliverables`}>
        {service.deliverables.map((d) => (
          <li
            key={d}
            className="rounded-full border border-line px-3 py-1 text-xs text-fog transition-colors duration-300 group-hover:border-line-strong"
          >
            {d}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-service-card]",
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-service-grid]",
            start: "top 82%",
            once: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative py-28 sm:py-36" aria-labelledby="services-title">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Six disciplines."
            accent="One machine."
            description="Everything we build connects — brand feeds website, website feeds pipeline, pipeline feeds automation. No disconnected deliverables."
          />
          <Link
            href="/services"
            className="group hidden items-center gap-2 whitespace-nowrap text-sm text-fog transition-colors hover:text-snow lg:inline-flex"
          >
            All services
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </div>

        <div data-service-grid className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
