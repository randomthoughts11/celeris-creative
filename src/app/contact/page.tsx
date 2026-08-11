import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a Strategy Call | AI Growth Agency — Celeris Creative",
  description:
    "Book a free 30-minute strategy call with Celeris Creative. Get a written growth plan for your business — whether or not you hire us.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactClient />
    </>
  );
}
