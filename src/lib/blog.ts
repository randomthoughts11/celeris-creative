export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  date: string;
  readTime: string;
  sections: { heading: string; body: string[] }[];
};

/**
 * SEO content pages for target keywords.
 * Discoverable via sitemap + internal links from other posts —
 * never linked from navbar, footer, or homepage.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-marketing-agency",
    title: "What an AI Marketing Agency Actually Builds for Growing Brands",
    description:
      "An AI marketing agency doesn't just run ads — it builds automated growth systems. Here's what that looks like for ambitious businesses.",
    keyword: "AI marketing agency",
    date: "2026-07-01",
    readTime: "7 min",
    sections: [
      {
        heading: "AI marketing is not another ad platform",
        body: [
          "Most agencies bolted AI onto the same deliverables they've always sold: posts, campaigns, and decks. An AI marketing agency starts from a different premise — that every repetitive step between attention and revenue can be systematized.",
          "That means scoring leads automatically, following up before a competitor does, turning one recording into a month of content, and reporting without a human copy-pasting into slides. The creative still matters. The system is what compounds.",
        ],
      },
      {
        heading: "Where AI changes the marketing stack",
        body: [
          "Intelligent CRM routing makes sure the right lead reaches the right person in seconds. Content engines repurpose podcasts and webinars into short-form video, emails, and social without losing brand voice. Sales systems qualify and book — so your calendar fills with conversations, not chase work.",
          "When those pieces connect to a conversion-focused website and paid media, you stop buying disconnected deliverables and start operating a growth machine.",
        ],
      },
      {
        heading: "Who this is for",
        body: [
          "Founders and operators who have already tried \"good marketing\" from separate vendors and still feel the pipeline is fragile. If you sell a considered purchase — wellness, healthcare, professional services, SaaS — an AI-first approach usually outperforms another campaign brief.",
        ],
      },
    ],
  },
  {
    slug: "digital-marketing-agency-plano-tx",
    title: "Digital Marketing Agency in Plano, TX for Brands Ready to Scale",
    description:
      "Looking for a digital marketing agency in Plano, TX? Celeris Creative builds AI-powered growth systems for wellness, healthcare, and ambitious local brands.",
    keyword: "digital marketing agency Plano TX",
    date: "2026-07-02",
    readTime: "6 min",
    sections: [
      {
        heading: "Why location still matters in a remote world",
        body: [
          "Digital marketing can be done from anywhere. Local strategy usually can't. A Plano-based team that understands North Texas search behavior, Google Maps competition, and how regional wellness and service businesses buy is a practical advantage — not nostalgia.",
          "Celeris Creative Agency LLP operates from Plano, TX and serves brands nationwide. Local roots inform how we build maps ranking, review systems, and paid acquisition for businesses that win in-person as well as online.",
        ],
      },
      {
        heading: "What we deliver from Plano",
        body: [
          "Full-funnel digital marketing: SEO and local search, Meta and Google ads, conversion websites, email and lifecycle, and AI automation that keeps follow-up from depending on whoever remembers to check the inbox.",
          "Monthly partnerships start with a strategy call and a written plan — whether or not you hire us. No six-month black-box retainers.",
        ],
      },
      {
        heading: "Ready to talk?",
        body: [
          "If you're searching for a digital marketing agency in Plano, TX that measures growth systems instead of vanity metrics, book a strategy call. We'll map the constraint costing you the most and tell you honestly if we can produce a return.",
        ],
      },
    ],
  },
  {
    slug: "ai-automation-agency",
    title: "AI Automation Agency: Systems That Sell While You Sleep",
    description:
      "An AI automation agency designs the workflows, CRMs, and sales systems that remove manual work between a lead and a closed deal.",
    keyword: "AI automation agency",
    date: "2026-07-03",
    readTime: "8 min",
    sections: [
      {
        heading: "Automation without the spaghetti",
        body: [
          "Buy a dozen Zapier zaps and you get automation theater — brittle chains that break when a field renames. An AI automation agency designs the operating system first: where leads enter, how they're scored, who owns them, and what happens when someone goes quiet.",
          "Then we build. Intelligent CRM pipelines, outbound and booking flows, content engines, podcast workflows, and AI concierge support that answers, qualifies, and books around the clock.",
        ],
      },
      {
        heading: "What \"first system in 14 days\" really means",
        body: [
          "Speed is a feature. We ship a working constraint-removal system quickly — usually a rebuilt follow-up path or booking flow — then expand. You see progress weekly. You own everything we build.",
          "Typical outcomes: hours of admin removed each week, faster response times, and a pipeline you can forecast instead of guess.",
        ],
      },
      {
        heading: "Connect automation to growth",
        body: [
          "Automation alone doesn't create demand. Pair it with brand, website, and performance marketing and the machine feeds itself. That's the Celeris model — AI in the engine room of a full growth system.",
        ],
      },
    ],
  },
  {
    slug: "branding-agency",
    title: "Branding Agency Work That Converts — Not Just Looks Expensive",
    description:
      "A branding agency should make you unmistakable and financially sharper. Here's how strategy-first identity systems drive growth.",
    keyword: "branding agency",
    date: "2026-07-04",
    readTime: "6 min",
    sections: [
      {
        heading: "Identity is a growth asset",
        body: [
          "Pretty logos that don't survive contact with a sales call are decoration. A serious branding agency starts with positioning, audience, and offer clarity — then builds visual language, messaging, and guidelines that hold up across ads, websites, and sales decks.",
          "At Celeris, brand work is designed to plug into websites, campaigns, and automation. Consistency isn't aesthetic preference; it's how trust compounds.",
        ],
      },
      {
        heading: "What we ship",
        body: [
          "Brand strategy, identity systems, messaging and voice, and guidelines your team can actually use. For wellness and trust-heavy industries, we design for compliance-aware storytelling — credibility first, flash second.",
        ],
      },
      {
        heading: "Brand plus system",
        body: [
          "The brands that win aren't the ones with the best moodboard. They're the ones whose identity shows up the same way in a Google ad, a booking confirmation, and an AI follow-up. We build that whole chain.",
        ],
      },
    ],
  },
  {
    slug: "web-design-agency",
    title: "Web Design Agency Sites Engineered to Book Calls, Not Win Awards Alone",
    description:
      "A modern web design agency builds fast, cinematic sites that convert. Learn how Celeris engineers websites as growth infrastructure.",
    keyword: "web design agency",
    date: "2026-07-05",
    readTime: "7 min",
    sections: [
      {
        heading: "Beautiful and measurable",
        body: [
          "Award-chasing sites that load slowly and confuse visitors waste every dollar of traffic you buy. A conversion-focused web design agency optimizes for clarity, speed, Core Web Vitals, and one primary action — usually booking a call.",
          "We design and develop in Next.js with performance budgets, structured content, and analytics wired from day one. Cinematic motion is allowed. Friction is not.",
        ],
      },
      {
        heading: "SEO foundations baked in",
        body: [
          "Clean heading hierarchy, canonical URLs, schema markup, sitemap hygiene, and fast static rendering aren't \"phase two.\" They're part of the build. A site that looks premium but can't be found is an unfinished product.",
        ],
      },
      {
        heading: "Website as system node",
        body: [
          "Your site should connect to CRM, booking, ads, and content engines — not sit alone as a brochure. That's why we treat web design as infrastructure inside a larger growth system.",
        ],
      },
    ],
  },
  {
    slug: "growth-systems",
    title: "Growth Systems Beats Random Marketing — How Connected Funnels Win",
    description:
      "Growth systems connect brand, website, campaigns, and AI automation into one machine. Here's why they outperform isolated agency retainers.",
    keyword: "growth systems",
    date: "2026-07-06",
    readTime: "7 min",
    sections: [
      {
        heading: "The real problem with most agencies",
        body: [
          "You hire a brand studio, a web firm, and a media buyer. Each does competent work. Nothing talks to anything else. Leads fall through cracks, creative doesn't match the landing page, and reporting is three different PDFs.",
          "Growth systems are the antidote: one architecture where brand feeds website, website feeds pipeline, pipeline feeds automation, and automation feeds retained customers.",
        ],
      },
      {
        heading: "How Celeris builds them",
        body: [
          "Diagnose the constraint. Design the system. Build in weekly sprints. Scale what the math supports. First system typically lives in 14 days. You get visibility and ownership — not a black box.",
        ],
      },
      {
        heading: "Outcomes over hours",
        body: [
          "We don't sell hours. We sell machines that keep working. If that framing fits how you run your company, a strategy call is the fastest way to see whether a growth system would move your revenue.",
        ],
      },
    ],
  },
  {
    slug: "wellness-marketing",
    title: "Wellness Marketing That Builds Trust — Not Just Traffic",
    description:
      "Wellness marketing for Ayurveda, clinics, and health brands needs trust-first creative, compliant messaging, and AI follow-up systems.",
    keyword: "wellness marketing",
    date: "2026-07-07",
    readTime: "8 min",
    sections: [
      {
        heading: "Trust is the product",
        body: [
          "In wellness and Ayurveda, people research deeply before they buy. Hypey claims and generic gym-ad creativity destroy credibility. Effective wellness marketing leads with clarity, education, and consistent presence across Maps, search, and social.",
          "Celeris built its deepest playbooks in this niche — AI-powered marketing for wellness brands that need compliant messaging and patient or client acquisition systems that feel human.",
        ],
      },
      {
        heading: "What works in practice",
        body: [
          "Local SEO and review strategy for clinics. Content engines that turn practitioner expertise into podcasts, Shorts, and email without burning the team's time. Booking automation that answers in under a minute. Ads that sell transformation without promising miracles.",
        ],
      },
      {
        heading: "Beyond wellness",
        body: [
          "The same trust-first systems transfer to medical practices, coaches, and any category where the buyer evaluates carefully. Wellness taught us the discipline. The growth systems scale.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs() {
  return BLOG_POSTS.map((p) => p.slug);
}
