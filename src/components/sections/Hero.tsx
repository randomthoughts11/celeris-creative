"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Floating particle field rendered on canvas — lightweight, GPU-friendly. */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    let particles: P[] = [];

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.22 - 0.04,
        a: Math.random() * 0.5 + 0.1,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 158, 255, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      // ---- Entrance timeline ----
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-hero-line] > span",
        { yPercent: 115, rotate: 3 },
        { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.09, delay: 0.35 }
      )
        .fromTo(
          "[data-hero-eyebrow]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=1.0"
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          "[data-hero-cta]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.75"
        )
        .fromTo(
          "[data-hero-card]",
          { opacity: 0, y: 60, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4, stagger: 0.15 },
          "-=1.1"
        )
        .fromTo(
          "[data-hero-scroll]",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.5"
        );

      // ---- Scroll-out parallax: content drifts up, bg scales ----
      gsap.to("[data-hero-content]", {
        yPercent: -18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(auroraRef.current, {
        yPercent: 14,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ---- Mouse parallax on floating cards + aurora ----
      const fine = window.matchMedia("(pointer: fine)").matches;
      if (fine) {
        const xL = gsap.quickTo(cardLeftRef.current, "x", { duration: 0.9, ease: "power3.out" });
        const yL = gsap.quickTo(cardLeftRef.current, "y", { duration: 0.9, ease: "power3.out" });
        const xR = gsap.quickTo(cardRightRef.current, "x", { duration: 1.2, ease: "power3.out" });
        const yR = gsap.quickTo(cardRightRef.current, "y", { duration: 1.2, ease: "power3.out" });
        const xA = gsap.quickTo(auroraRef.current, "x", { duration: 2, ease: "power2.out" });

        const onMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          xL(nx * -34);
          yL(ny * -22);
          xR(nx * 26);
          yR(ny * 18);
          xA(nx * 40);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
      }
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ---- Layered background ---- */}
      <div ref={auroraRef} aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-[-30%] h-[80vh] w-[110vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(132,120,255,0.22),transparent_65%)]" />
        <div className="animate-float-slow absolute right-[-10%] top-[15%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(110,231,249,0.13),transparent_70%)] blur-2xl" />
        <div
          className="animate-float-slow absolute bottom-[-20%] left-[-8%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(132,120,255,0.16),transparent_70%)] blur-2xl"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      {/* Fine grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgba(244,244,248,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(244,244,248,0.025)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      />

      <ParticleField />

      {/* ---- Floating glass cards ---- */}
      <div
        ref={cardLeftRef}
        data-hero-card
        aria-hidden
        className="glass absolute right-[16%] top-[14%] hidden w-52 rounded-2xl p-4 opacity-0 lg:block"
      >
        <p className="font-mono-label text-[10px] text-aqua">Automation live</p>
        <p className="mt-2 font-display text-2xl font-semibold text-snow">
          + 47 leads
        </p>
        <p className="mt-1 text-xs text-fog">routed & qualified this week</p>
        <div className="mt-3 flex h-8 items-end gap-1" aria-hidden>
          {[38, 55, 42, 70, 62, 88, 100].map((h, i) => (
            <span
              key={i}
              className="w-full rounded-sm bg-gradient-to-t from-iris/40 to-iris"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      <div
        ref={cardRightRef}
        data-hero-card
        aria-hidden
        className="glass absolute bottom-[24%] right-[6%] hidden w-56 rounded-2xl p-4 opacity-0 lg:block"
      >
        <p className="font-mono-label text-[10px] text-gold">ROAS — 90 days</p>
        <p className="mt-2 font-display text-2xl font-semibold text-snow">3.2x</p>
        <p className="mt-1 text-xs text-fog">blended return across channels</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-snow/10">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-iris to-aqua" />
        </div>
      </div>

      {/* ---- Content ---- */}
      <div
        data-hero-content
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-28 lg:px-10"
      >
        <p
          data-hero-eyebrow
          className="font-mono-label mb-8 flex items-center gap-3 text-xs text-iris-soft opacity-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-iris opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-iris" />
          </span>
          AI-powered growth agency — Plano, TX
        </p>

        <h1 className="font-display max-w-5xl text-[clamp(2.9rem,8.2vw,7rem)] font-semibold leading-[0.98] tracking-tight text-snow">
          <span data-hero-line className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span className="inline-block will-change-transform">Growth isn&rsquo;t</span>
          </span>
          <span data-hero-line className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span className="inline-block will-change-transform">
              luck. It&rsquo;s a{" "}
              <em className="font-serif-accent text-gradient">system</em>
              <span className="text-iris">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p
            data-hero-sub
            className="max-w-md text-base leading-relaxed text-fog opacity-0 sm:text-lg"
          >
            We design brands, build cinematic websites, and engineer AI
            automation that turns attention into revenue — one connected
            growth system.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div data-hero-cta className="opacity-0">
              <MagneticButton href="/contact">Book Strategy Call</MagneticButton>
            </div>
            <div data-hero-cta className="opacity-0">
              <MagneticButton href="/work" variant="ghost">
                View Our Work
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Scroll indicator ---- */}
      <div
        data-hero-scroll
        aria-hidden
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
      >
        <span className="font-mono-label text-[10px] text-mist">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-snow/15">
          <span className="absolute inset-x-0 top-0 h-4 animate-[scroll-hint_1.8s_ease-in-out_infinite] bg-iris" />
        </span>
        <style>{`@keyframes scroll-hint { 0% { transform: translateY(-100%);} 100% { transform: translateY(300%);} }`}</style>
      </div>
    </section>
  );
}
