import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

/**
 * Minimal index for crawlers / direct URL access.
 * Not linked from navbar, footer, or homepage — blogs stay "hidden"
 * from main UX while remaining indexable.
 */
export const metadata: Metadata = pageMetadata({
  title: "Insights on AI Marketing & Growth Systems | Celeris Creative",
  description:
    "Articles on AI marketing, automation, branding, web design, and wellness growth systems from Celeris Creative.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog" },
        ])}
      />

      <section className="relative overflow-hidden pb-28 pt-36 sm:pt-44">
        <div
          aria-hidden
          className="absolute left-1/2 top-[-30%] h-[55vh] w-[100vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(132,120,255,0.12),transparent_65%)]"
        />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
          <Link
            href="/"
            className="font-mono-label mb-8 inline-flex text-xs text-iris-soft transition-colors hover:text-snow"
          >
            ← Celeris Creative home
          </Link>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl">
            Insights
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fog">
            Deep dives on AI marketing, automation, and growth systems. For the
            full agency experience, start on the homepage.
          </p>

          <ul className="mt-14 space-y-5">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-card border border-line bg-ink-2 p-6 transition-colors hover:border-iris/40"
                >
                  <p className="font-mono-label text-[10px] text-mist">
                    {post.keyword}
                  </p>
                  <h2 className="font-display mt-2 text-xl font-semibold text-snow transition-colors group-hover:text-iris-soft">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-fog">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-snow px-8 py-4 text-sm font-medium text-ink"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
