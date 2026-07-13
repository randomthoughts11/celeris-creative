import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden text-center">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris/10 blur-[120px]"
      />
      <div className="relative px-6">
        <p className="font-mono-label text-xs text-iris-soft">404</p>
        <h1 className="font-display mt-6 text-5xl font-semibold tracking-tight text-snow sm:text-7xl">
          This page moved{" "}
          <span className="font-serif-accent text-gradient">too fast.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-fog">
          Even we couldn&rsquo;t keep up with it. Let&rsquo;s get you back on
          track.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-snow px-8 py-4 text-sm font-medium text-ink transition-transform duration-300 hover:scale-105"
        >
          Back home <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
