import type { Metadata } from "next";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "Book a free 30-minute strategy call with Celeris Creative. Get a written growth plan for your business — whether or not you hire us.",
};

export default function ContactPage() {
  return <ContactClient />;
}
