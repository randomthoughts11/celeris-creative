import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SmsOptInForm } from "@/components/forms/SmsOptInForm";
import { LegalDocument } from "@/components/layout/LegalDocument";
import { JsonLd } from "@/components/seo/JsonLd";
import { getLegalDoc } from "@/lib/legal";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const doc = getLegalDoc("sms-disclosure");

export const metadata: Metadata = doc
  ? pageMetadata({
      title: `${doc.title} | Celeris Creative`,
      description: doc.description,
      path: "/sms-disclosure",
    })
  : {};

export default function SmsDisclosurePage() {
  if (!doc) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "SMS Disclosure", path: "/sms-disclosure" },
        ])}
      />
      <LegalDocument doc={doc}>
        <SmsOptInForm />
      </LegalDocument>
    </>
  );
}
