import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

function TestimonialCard({
  testimonial,
  ariaHidden,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  ariaHidden?: boolean;
}) {
  return (
    <figure
      aria-hidden={ariaHidden}
      className="glass flex w-[85vw] max-w-md shrink-0 flex-col justify-between rounded-card p-8 transition-colors duration-500 hover:border-iris/40 sm:w-[420px]"
    >
      <div aria-hidden className="font-serif-accent text-5xl leading-none text-iris/60">
        &ldquo;
      </div>
      <blockquote className="mt-3 text-base leading-relaxed text-snow/90">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <span
          aria-hidden
          className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-iris/60 to-aqua/40 font-display text-sm font-semibold text-snow"
        >
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div>
          <p className="text-sm font-medium text-snow">{testimonial.name}</p>
          <p className="text-xs text-mist">{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/** Infinite dual-direction testimonial carousel. Pauses on hover. */
export function Testimonials() {
  return (
    <section
      className="relative overflow-hidden border-y border-line bg-ink-2/60 py-28 sm:py-36"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeading
          eyebrow="Client stories"
          title="Don't take"
          accent="our word for it."
          align="center"
        />
      </div>

      <div className="marquee-mask mt-16 space-y-6 overflow-hidden">
        <div
          className="animate-marquee flex w-max gap-6 pr-6 hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": "58s" } as React.CSSProperties}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard
              key={`a-${i}`}
              testimonial={t}
              ariaHidden={i >= TESTIMONIALS.length}
            />
          ))}
        </div>
        <div
          className="animate-marquee flex w-max gap-6 pr-6 hover:[animation-play-state:paused] [animation-direction:reverse]"
          style={{ "--marquee-duration": "64s" } as React.CSSProperties}
        >
          {[...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()].map(
            (t, i) => (
              <TestimonialCard key={`b-${i}`} testimonial={t} ariaHidden />
            )
          )}
        </div>
      </div>
    </section>
  );
}
