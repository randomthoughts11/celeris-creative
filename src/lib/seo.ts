import type { Metadata } from "next";
import { FAQS, SITE } from "@/lib/data";

export const SEO_KEYWORDS = [
  "AI marketing agency",
  "digital marketing agency Plano TX",
  "AI automation agency",
  "branding agency",
  "web design agency",
  "growth systems",
  "wellness marketing",
] as const;

/** Build page metadata with canonical, robots, and social tags. */
export function pageMetadata({
  title,
  description,
  path,
  keywords = [...SEO_KEYWORDS],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = path === "/" ? SITE.url : `${SITE.url}${path}`;

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title,
      description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization", "LocalBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    image: `${SITE.url}/opengraph-image`,
    logo: `${SITE.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "700 E Park Blvd #208",
      addressLocality: "Plano",
      addressRegion: "TX",
      postalCode: "75074",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.0198,
      longitude: -96.6989,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    priceRange: "$350 - $1500+/month",
    knowsAbout: [...SEO_KEYWORDS],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Growth services",
      itemListElement: [
        "AI & Automation",
        "Branding & Identity",
        "Web Design & Development",
        "Performance Marketing",
        "Content Systems",
        "Lead Generation",
      ].map((name, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          url: `${SITE.url}/services`,
        },
        position: i + 1,
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? SITE.url : `${SITE.url}${item.path}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE.legalName,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/opengraph-image`,
      },
    },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    keywords: post.title,
  };
}
