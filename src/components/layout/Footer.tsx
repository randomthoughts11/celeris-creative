import Link from "next/link";
import { NAV_LINKS, SERVICES, SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-iris/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 pb-10 pt-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-snow"
            >
              celeris<span className="text-iris">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">
              The AI-powered growth agency for ambitious brands. Brand, web,
              marketing, and automation — engineered as one system.
            </p>
          </div>

          <nav aria-label="Footer — pages">
            <p className="font-mono-label mb-5 text-xs text-mist">Pages</p>
            <ul className="space-y-3">
              {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fog transition-colors hover:text-snow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — services">
            <p className="font-mono-label mb-5 text-xs text-mist">Services</p>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.id}`}
                    className="text-sm text-fog transition-colors hover:text-snow"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono-label mb-5 text-xs text-mist">Contact</p>
            <a
              href={`mailto:${SITE.email}`}
              className="block text-sm text-fog transition-colors hover:text-snow"
            >
              {SITE.email}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-fog">{SITE.address}</p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-snow transition-colors hover:border-iris"
            >
              Book Strategy Call
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <p
          aria-hidden
          className="font-display pointer-events-none mt-20 select-none bg-gradient-to-b from-snow/10 to-transparent bg-clip-text text-center text-[18vw] font-bold leading-none tracking-tight text-transparent"
        >
          celeris
        </p>

        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-mist sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p className="font-mono-label">Plano, TX — Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
