import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/data";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Celeris Creative — AI-Powered Growth Agency",
    template: "%s — Celeris Creative",
  },
  description: SITE.description,
  keywords: [
    "AI marketing agency",
    "digital marketing agency Plano TX",
    "AI automation agency",
    "branding agency",
    "web design agency",
    "growth systems",
    "wellness marketing",
  ],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "Celeris Creative — AI-Powered Growth Agency",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Celeris Creative — AI-Powered Growth Agency",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  verification: { google: "mlXPRl1OTLePX6b1bXWf00qb-Xj_L5Zs8jn8tpaSBSU" },
};

export const viewport: Viewport = {
  themeColor: "#05050a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.legalName,
  url: SITE.url,
  email: SITE.email,
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "700 E Park Blvd #208",
    addressLocality: "Plano",
    addressRegion: "TX",
    postalCode: "75074",
    addressCountry: "US",
  },
  areaServed: "United States",
  priceRange: "$350 - $1500+/month",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
