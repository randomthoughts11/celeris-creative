import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLegalDoc } from "@/lib/legal";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const doc = getLegalDoc("terms");

export const metadata: Metadata = doc
  ? pageMetadata({
      title: `${doc.title} | Celeris Creative`,
      description: doc.description,
      path: "/terms",
    })
  : {};

export default function TermsPage() {
  if (!doc) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <LegalDocument doc={doc} />
    </>
  );
}
