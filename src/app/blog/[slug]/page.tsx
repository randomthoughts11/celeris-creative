import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getAllSlugs, getPost } from "@/lib/blog";
import { articleSchema, breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: [post.keyword, "Celeris Creative", "AI growth agency"],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="relative overflow-hidden pb-28 pt-36 sm:pt-44">
        <div
          aria-hidden
          className="absolute left-1/2 top-[-30%] h-[55vh] w-[100vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(132,120,255,0.14),transparent_65%)]"
        />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
          <p className="font-mono-label mb-6 text-xs text-iris-soft">
            {post.keyword} · {post.readTime} · {post.date}
          </p>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-snow sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-fog">{post.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-snow px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
            >
              ← Back to Celeris home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm text-snow transition-colors hover:border-iris"
            >
              Book Strategy Call
            </Link>
          </div>

          <div className="hairline mt-14" aria-hidden />

          <div className="mt-14 space-y-14">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-snow sm:text-3xl">
                  {section.heading}
                </h2>
                {section.body.map((para) => (
                  <p key={para.slice(0, 40)} className="mt-4 text-base leading-relaxed text-fog">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <aside className="mt-16 rounded-card border border-line bg-ink-2 p-8">
            <h2 className="font-display text-xl font-semibold text-snow">
              Prefer the full story?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-fog">
              See how Celeris Creative builds AI-powered growth systems — brand,
              web, marketing, and automation — as one connected machine.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 text-sm text-iris-soft transition-colors hover:text-snow"
            >
              Visit the homepage →
            </Link>
          </aside>

          {related.length > 0 && (
            <nav aria-label="Related articles" className="mt-16">
              <p className="font-mono-label mb-5 text-xs text-mist">Related reading</p>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="text-sm text-fog transition-colors hover:text-snow"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>
    </>
  );
}
