import { SITE } from "@/lib/data";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDoc = {
  slug: "privacy" | "terms" | "cookies";
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const UPDATED = "September 3, 2026";

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
] as const;

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Celeris Creative Agency LLP collects, uses, and protects personal information when you use our website and services.",
    updated: UPDATED,
    intro: `This Privacy Policy explains how ${SITE.legalName} ("Celeris," "we," "us," or "our") collects, uses, discloses, and safeguards information when you visit ${SITE.url}, contact us, or engage our services. By using our website or submitting information to us, you agree to the practices described here.`,
    sections: [
      {
        heading: "1. Who we are",
        paragraphs: [
          `${SITE.legalName} is a digital growth agency providing branding, web design and development, digital marketing, content systems, lead generation, and AI automation services.`,
          `Contact for privacy requests: ${SITE.formEmail} (or ${SITE.email}). Postal address: ${SITE.address}.`,
        ],
      },
      {
        heading: "2. Information we collect",
        paragraphs: [
          "We collect information you provide directly and information collected automatically when you use our site.",
        ],
        bullets: [
          "Contact and inquiry details: name, email address, company information, service interests, and message content submitted through forms.",
          "Business communications: emails, call notes, project briefs, assets, and account details you share while working with us.",
          "Technical data: IP address, browser type, device information, pages visited, referring URL, and approximate location derived from IP.",
          "Cookies and similar technologies: as described in our Cookie Policy.",
        ],
      },
      {
        heading: "3. How we use information",
        paragraphs: ["We use personal information to:"],
        bullets: [
          "Respond to strategy-call requests and other inquiries.",
          "Provide, manage, and improve our services and client engagements.",
          "Send service-related communications and, where permitted, marketing updates (you may opt out of marketing at any time).",
          "Analyze website performance, fix issues, and improve user experience.",
          "Comply with legal obligations and protect our rights, security, and users.",
        ],
      },
      {
        heading: "4. Legal bases (where applicable)",
        paragraphs: [
          "If you are in a region that requires a legal basis for processing (such as the EEA/UK), we rely on one or more of: performance of a contract or pre-contractual steps; legitimate interests (operating and improving our business, responding to inquiries, securing our systems) where those interests are not overridden by your rights; consent where we ask for it; and compliance with legal obligations.",
        ],
      },
      {
        heading: "5. Sharing of information",
        paragraphs: [
          "We do not sell your personal information. We may share information with:",
        ],
        bullets: [
          "Service providers who help us operate the website and business (for example hosting, email delivery, analytics, CRM, or scheduling tools), under appropriate confidentiality and data-processing terms.",
          "Professional advisors (legal, accounting) when reasonably necessary.",
          "Authorities or other parties when required by law, legal process, or to protect rights, safety, or security.",
          "A successor entity in connection with a merger, acquisition, or sale of assets, subject to appropriate protections.",
        ],
      },
      {
        heading: "6. International transfers",
        paragraphs: [
          "We are based in the United States. If you access our site or communicate with us from outside the U.S., your information may be processed in the United States and other countries where our providers operate. Those countries may have different data-protection laws than your own.",
        ],
      },
      {
        heading: "7. Retention",
        paragraphs: [
          "We retain personal information only as long as needed for the purposes described in this policy, including to provide services, maintain business records, resolve disputes, and meet legal, tax, or accounting requirements. Retention periods vary by data type and context.",
        ],
      },
      {
        heading: "8. Security",
        paragraphs: [
          "We implement reasonable administrative, technical, and organizational measures designed to protect personal information. No method of transmission or storage is completely secure; we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "9. Your rights and choices",
        paragraphs: [
          "Depending on your location, you may have rights to access, correct, delete, or obtain a copy of your personal information; object to or restrict certain processing; withdraw consent where processing is based on consent; and lodge a complaint with a supervisory authority.",
          `To exercise privacy rights, email ${SITE.formEmail} with the subject “Privacy Request.” We may need to verify your identity before responding. California residents may have additional rights under the CCPA/CPRA, including the right to know, delete, and correct personal information, and to not be discriminated against for exercising those rights. We do not sell personal information as “sale” is commonly defined under California law.`,
        ],
      },
      {
        heading: "10. Children’s privacy",
        paragraphs: [
          "Our website and services are directed to businesses and adults. We do not knowingly collect personal information from children under 16. If you believe we have collected such information, contact us and we will take appropriate steps to delete it.",
        ],
      },
      {
        heading: "11. Third-party links",
        paragraphs: [
          "Our site may link to third-party websites or tools. We are not responsible for their privacy practices. Review their policies before providing personal information.",
        ],
      },
      {
        heading: "12. Changes to this policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. The “Last updated” date at the top of the page will change when we do. Continued use of the site after updates constitutes acceptance of the revised policy where permitted by law.",
        ],
      },
      {
        heading: "13. Contact",
        paragraphs: [
          `Questions about this Privacy Policy: ${SITE.formEmail} · ${SITE.legalName} · ${SITE.address}.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    description:
      "Terms governing use of the Celeris Creative website and engagement of our digital growth services.",
    updated: UPDATED,
    intro: `These Terms of Service (“Terms”) govern your access to and use of the website operated by ${SITE.legalName} at ${SITE.url}, and outline general conditions that apply when you inquire about or engage our services. By using the site, you agree to these Terms.`,
    sections: [
      {
        heading: "1. About the site",
        paragraphs: [
          "The website provides information about our agency, services, work, and contact options. Content is for general informational purposes and does not constitute a binding offer until we execute a separate written agreement (proposal, statement of work, or master services agreement).",
        ],
      },
      {
        heading: "2. Eligibility",
        paragraphs: [
          "You must be at least 18 years old and able to form a binding contract to use this site or request services. If you use the site on behalf of a company, you represent that you have authority to bind that company.",
        ],
      },
      {
        heading: "3. Inquiries and strategy calls",
        paragraphs: [
          "Submitting a contact form or booking a strategy call does not create a client relationship. Any advice shared on an introductory call is informal and not a substitute for a scoped engagement. We may decline projects at our discretion.",
        ],
      },
      {
        heading: "4. Services and contracts",
        paragraphs: [
          "Paid services are governed by the specific written agreement between you and Celeris. If there is a conflict between these Terms and a signed client agreement, the signed agreement controls for that engagement.",
          "Pricing shown on the website (including example plans) is illustrative and may change. Final fees, scope, timelines, and deliverables are defined in writing for each project or retainer.",
        ],
      },
      {
        heading: "5. Acceptable use",
        paragraphs: ["You agree not to:"],
        bullets: [
          "Use the site for unlawful, harmful, fraudulent, or abusive purposes.",
          "Attempt to gain unauthorized access to our systems, scrape the site in a way that impairs performance, or introduce malware.",
          "Misrepresent your identity or affiliation when contacting us.",
          "Copy, reverse engineer, or reuse site design, code, or content except as allowed by law or our prior written consent.",
        ],
      },
      {
        heading: "6. Intellectual property",
        paragraphs: [
          "The website’s design, text, graphics, logos, and code are owned by Celeris or our licensors and are protected by intellectual property laws. You may view and share pages for personal or internal business evaluation. Client deliverables are licensed or assigned only as stated in the applicable client agreement.",
        ],
      },
      {
        heading: "7. Client materials and testimonials",
        paragraphs: [
          "If you provide logos, copy, data, or other materials, you represent that you have the rights to do so. Case studies, metrics, and testimonials on the site may be illustrative, anonymized, or based on past results; they are not guarantees of future performance.",
        ],
      },
      {
        heading: "8. Third-party tools and AI",
        paragraphs: [
          "Our services and website may involve third-party platforms (advertising networks, CRMs, analytics, hosting, email) and AI-assisted tools. Your use of those platforms is also subject to their terms. AI outputs can contain errors; you remain responsible for reviewing business-critical content before publishing or acting on it.",
        ],
      },
      {
        heading: "9. Disclaimers",
        paragraphs: [
          'THE SITE AND ITS CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT MARKETING OR BUSINESS OUTCOMES WILL MEET YOUR EXPECTATIONS.',
        ],
      },
      {
        heading: "10. Limitation of liability",
        paragraphs: [
          "TO THE MAXIMUM EXTENT PERMITTED BY LAW, CELERIS AND ITS PARTNERS, OFFICERS, AND CONTRACTORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SITE OR RELIANCE ON ITS CONTENT. OUR TOTAL LIABILITY FOR CLAIMS ARISING OUT OF THE SITE IS LIMITED TO ONE HUNDRED U.S. DOLLARS (US $100). LIABILITY FOR PAID SERVICES IS GOVERNED BY THE APPLICABLE CLIENT AGREEMENT.",
        ],
      },
      {
        heading: "11. Indemnity",
        paragraphs: [
          "You agree to indemnify and hold harmless Celeris from claims, damages, losses, and expenses (including reasonable attorneys’ fees) arising from your misuse of the site, your violation of these Terms, or your infringement of any third-party rights.",
        ],
      },
      {
        heading: "12. Governing law",
        paragraphs: [
          "These Terms are governed by the laws of the State of Texas, United States, without regard to conflict-of-law principles. Exclusive venue for disputes arising from these Terms or the website shall be the state or federal courts located in Collin County or the Northern District of Texas, unless a client agreement specifies otherwise.",
        ],
      },
      {
        heading: "13. Changes",
        paragraphs: [
          "We may update these Terms periodically. The “Last updated” date will change when we do. Continued use of the site after changes constitutes acceptance where permitted by law.",
        ],
      },
      {
        heading: "14. Contact",
        paragraphs: [
          `Questions about these Terms: ${SITE.formEmail} · ${SITE.legalName} · ${SITE.address}.`,
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    description:
      "How Celeris Creative uses cookies and similar technologies on celeriscreative.com.",
    updated: UPDATED,
    intro: `This Cookie Policy explains how ${SITE.legalName} uses cookies and similar technologies on ${SITE.url}. It should be read together with our Privacy Policy.`,
    sections: [
      {
        heading: "1. What are cookies?",
        paragraphs: [
          "Cookies are small text files stored on your device when you visit a website. Similar technologies include local storage, pixels, and tags. They help sites function, remember preferences, and understand traffic.",
        ],
      },
      {
        heading: "2. How we use cookies",
        paragraphs: ["We may use cookies and similar technologies to:"],
        bullets: [
          "Essential operation: security, load balancing, form submission integrity, and remembering basic preferences.",
          "Analytics: understand how visitors use the site (pages viewed, approximate location, device type) so we can improve content and performance.",
          "Marketing measurement (if enabled): understand campaign effectiveness when you arrive from ads or partner links.",
        ],
      },
      {
        heading: "3. Types of cookies",
        paragraphs: [],
        bullets: [
          "Strictly necessary — required for core site functions; usually cannot be switched off via site settings.",
          "Performance / analytics — help us measure traffic and usage patterns.",
          "Functional — remember choices that improve your experience.",
          "Advertising / targeting — used only if we run or measure advertising that relies on such technologies.",
        ],
      },
      {
        heading: "4. Third-party cookies",
        paragraphs: [
          "Some cookies may be set by third parties that provide hosting, analytics, or marketing tools. Those parties process data under their own policies. We select providers we believe are reputable, but we do not control their independent technologies.",
        ],
      },
      {
        heading: "5. Your choices",
        paragraphs: [
          "Most browsers let you block or delete cookies through settings. Blocking strictly necessary cookies may break parts of the site (including forms). Where required by law, we will request consent before non-essential cookies are used.",
          "You can also use industry opt-out tools for interest-based advertising where applicable (for example, options provided by your browser or advertising industry programs).",
        ],
      },
      {
        heading: "6. Do Not Track",
        paragraphs: [
          "There is no consistent industry standard for responding to Do Not Track signals. We currently do not respond to DNT signals in a specialized way beyond the practices described in this policy and our Privacy Policy.",
        ],
      },
      {
        heading: "7. Updates",
        paragraphs: [
          "We may update this Cookie Policy when our practices or tools change. The “Last updated” date will reflect the latest revision.",
        ],
      },
      {
        heading: "8. Contact",
        paragraphs: [
          `Questions about cookies: ${SITE.formEmail} · ${SITE.legalName} · ${SITE.address}.`,
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}
