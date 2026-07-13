import { TRUSTED_BY } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

/** Infinite marquee of client wordmarks. Duplicated list = seamless loop. */
export function TrustedBy() {
  const row = [...TRUSTED_BY, ...TRUSTED_BY];

  return (
    <section aria-label="Trusted by" className="relative py-16 sm:py-20">
      <Reveal>
        <p className="font-mono-label mb-10 text-center text-xs text-mist">
          Trusted by ambitious brands
        </p>
      </Reveal>
      <div className="marquee-mask overflow-hidden">
        <div
          className="animate-marquee flex w-max items-center gap-16 pr-16 hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": "42s" } as React.CSSProperties}
        >
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              aria-hidden={i >= TRUSTED_BY.length}
              className="font-display whitespace-nowrap text-xl font-semibold tracking-tight text-snow/30 transition-colors duration-300 hover:text-snow sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
