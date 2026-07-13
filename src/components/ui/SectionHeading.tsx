import { SplitReveal, Reveal } from "@/components/ui/Reveal";
import clsx from "clsx";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/** Consistent section header: mono eyebrow, display title with serif accent, optional description. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <p className="font-mono-label mb-5 flex items-center gap-3 text-xs text-iris-soft">
          {align === "left" && <span className="h-px w-8 bg-iris/50" aria-hidden />}
          {eyebrow}
          {align === "center" && <span className="sr-only">.</span>}
        </p>
      </Reveal>
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-snow sm:text-5xl lg:text-6xl">
        <SplitReveal text={title} />
        {accent && (
          <>
            {" "}
            <SplitReveal
              text={accent}
              className="font-serif-accent text-gradient-iris"
              delay={0.2}
            />
          </>
        )}
      </h2>
      {description && (
        <Reveal delay={0.25}>
          <p className="mt-6 text-base leading-relaxed text-fog sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
