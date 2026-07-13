"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FEATURED_WORK } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** CSS-built browser mockup with an abstract, animated "site" inside. */
function DeviceMockup({
  project,
}: {
  project: (typeof FEATURED_WORK)[number];
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-ink shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-ink-3 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-snow/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-snow/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-snow/15" />
        <span className="ml-3 hidden rounded-md bg-ink px-3 py-1 font-mono text-[10px] text-mist sm:block">
          {project.client.toLowerCase().replace(/[^a-z]/g, "")}.com
        </span>
      </div>
      {/* Abstract site content */}
      <div className="relative aspect-[16/10] p-6 sm:p-8">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse at 20% 0%, ${project.theme}33, transparent 60%)`,
          }}
        />
        <div className="relative flex h-full flex-col justify-between">
          <div className="space-y-3">
            <div
              className="h-4 w-2/3 rounded-full sm:h-6"
              style={{ background: `linear-gradient(90deg, ${project.theme}, transparent)` }}
            />
            <div className="h-4 w-1/2 rounded-full bg-snow/15 sm:h-6" />
            <div className="mt-4 h-2 w-1/3 rounded-full bg-snow/8" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-14 rounded-lg border border-line bg-ink-2 sm:h-20"
                style={i === 0 ? { borderColor: `${project.theme}55` } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkCard({
  project,
  index,
}: {
  project: (typeof FEATURED_WORK)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);

  // Mouse-follow tilt on the mockup
  const onMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    const mock = mockRef.current;
    if (!card || !mock) return;
    const rect = card.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(mock, {
      rotateY: nx * 7,
      rotateX: ny * -7,
      y: ny * -8,
      duration: 0.7,
      ease: "power3.out",
      transformPerspective: 900,
    });
  };

  const onLeave = () => {
    gsap.to(mockRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={cardRef}
      data-work-card
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="sticky top-24 mb-8 overflow-hidden rounded-card border border-line bg-ink-2 sm:top-28"
      style={{ zIndex: index + 1 }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse at 85% 20%, ${project.theme}1f, transparent 55%)`,
        }}
      />
      <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="font-mono-label text-xs" style={{ color: project.theme }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono-label text-xs text-mist">{project.sector}</span>
          </div>

          <h3 className="font-display mt-6 text-3xl font-semibold leading-tight tracking-tight text-snow sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 font-serif-accent text-lg text-fog">{project.client}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-fog sm:text-base">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.services.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-3 py-1 text-xs text-fog"
              >
                {s}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="font-display text-3xl font-semibold text-snow sm:text-4xl">
                  {m.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-mist">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div ref={mockRef} className="will-change-transform">
          <DeviceMockup project={project} />
        </div>
      </div>
    </div>
  );
}

export function FeaturedWork() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-work-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative py-28 sm:py-36" aria-labelledby="work-title">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="Systems that"
            accent="shipped & scaled."
            description="A snapshot of growth systems in production — from wellness brands to media companies."
          />
          <Link
            href="/work"
            className="group hidden items-center gap-2 whitespace-nowrap text-sm text-fog transition-colors hover:text-snow lg:inline-flex"
          >
            All case studies
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-16">
          {FEATURED_WORK.map((project, i) => (
            <WorkCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
