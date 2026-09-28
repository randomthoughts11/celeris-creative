import Link from "next/link";
import type { LegalDoc } from "@/lib/legal";
import { LEGAL_LINKS } from "@/lib/legal";

export function LegalDocument({ doc, children }: { doc: LegalDoc; children?: React.ReactNode }) {
  return (
    <article className="relative overflow-hidden pb-28 pt-36 sm:pt-44">
      <div
        aria-hidden
        className="absolute left-1/2 top-[-30%] h-[50vh] w-[100vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(132,120,255,0.12),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
        <p className="font-mono-label mb-6 text-xs text-iris-soft">
          Legal · Last updated {doc.updated}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl">
          {doc.title}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-fog sm:text-lg">
          {doc.intro}
        </p>

        {children}

        <div className="hairline mt-12" aria-hidden />

        <div className="mt-12 space-y-12">
          {doc.sections.map((section) => (
            <section key={section.heading} id={section.heading.toLowerCase().replace(/[^\w]+/g, "-")}>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-snow">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="mt-4 text-base leading-relaxed text-fog">
                  {p}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-fog">
                  {section.bullets.map((b) => (
                    <li key={b.slice(0, 48)}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside className="mt-16 rounded-card border border-line bg-ink-2 p-6 text-sm leading-relaxed text-mist">
          This page is provided for transparency and general compliance. It is
          not personalized legal advice. If you need counsel for your
          jurisdiction or a specific engagement, consult a qualified attorney.
        </aside>

        <nav
          aria-label="Other legal pages"
          className="mt-10 flex flex-wrap gap-4 border-t border-line pt-8"
        >
          {LEGAL_LINKS.filter((l) => l.href !== `/${doc.slug}`).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-fog transition-colors hover:text-snow"
            >
              {link.label} →
            </Link>
          ))}
          <Link
            href="/"
            className="text-sm text-fog transition-colors hover:text-snow"
          >
            Back home →
          </Link>
        </nav>
      </div>
    </article>
  );
}
