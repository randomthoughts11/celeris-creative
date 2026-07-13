import { SplitReveal, Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
};

/** Shared inner-page hero with aurora backdrop and split-text entrance. */
export function PageHero({ eyebrow, title, accent, description }: Props) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 sm:pb-24 sm:pt-48">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-[-40%] h-[70vh] w-[110vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(132,120,255,0.16),transparent_65%)]" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <p className="font-mono-label mb-6 flex items-center gap-3 text-xs text-iris-soft">
            <span className="h-px w-8 bg-iris/50" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="font-display max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-snow">
          <SplitReveal text={title} />
          {accent && (
            <>
              {" "}
              <SplitReveal
                text={accent}
                className="font-serif-accent text-gradient"
                delay={0.2}
              />
            </>
          )}
        </h1>
        {description && (
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
