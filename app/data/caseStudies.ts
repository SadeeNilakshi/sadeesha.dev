// ✏️ CASE STUDIES
// Replace every "✏️ …" placeholder with your own words, add final-design screenshots,
// then set `published: true`. Drafts show locally and on Vercel preview deployments,
// never on the live site.

export type CaseStudy = {
  slug: string; // URL: /work/<slug>
  title: string;
  category: string;
  platform: string;
  summary: string;
  role: string;
  timeline: string;
  tools: string[];
  cover: { image?: string; video?: string };
  links: { label: string; href: string }[];
  problem: string;
  research: { summary: string; insights: string[] };
  process: { title: string; description: string }[];
  finalDesign: { summary: string; images: { src: string; alt: string }[] };
  outcome: { summary: string; highlights: string[] };
  learnings: string;
  published: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "burgify-mobile-app",
    title: "Burgify — food ordering app",
    category: "UI/UX",
    platform: "Mobile app",
    summary:
      "A mobile app design focused on core user flows, interaction design, and smooth motion animations, prototyped in Figma.",
    role: "✏️ Your role, e.g. Solo UI/UX designer",
    timeline: "✏️ e.g. 3 weeks · 2025",
    tools: ["Figma"],
    cover: {
      video:
        "https://res.cloudinary.com/djtjixlhw/video/upload/v1770100054/projects/videos/tsfxpd6fptwhwiufytb0.mp4",
    },
    links: [
      {
        label: "Figma file",
        href: "https://www.figma.com/design/xi9IjPQvA4G3rMVzpdYfuZ/Burgify?node-id=0-1&t=uiyLkpqa1lbQFBmp-1",
      },
      {
        label: "Use-case document (PDF)",
        href: "https://drive.google.com/file/d/1n0pRcXo1xf6svyhMTkMLDD9QTKI8VNz3/view?usp=sharing",
      },
    ],
    problem:
      "✏️ What problem does Burgify solve, and for whom? 2–3 sentences, e.g. who orders burgers, what frustrates them in existing apps.",
    research: {
      summary:
        "✏️ How did you learn about the users? e.g. competitor apps you reviewed, a short survey, personas.",
      insights: [
        "✏️ Insight 1 — something you found that shaped the design",
        "✏️ Insight 2",
        "✏️ Insight 3",
      ],
    },
    process: [
      { title: "Research", description: "✏️ What you studied and why." },
      { title: "User flows & wireframes", description: "✏️ The key journeys you mapped, e.g. menu → customise → checkout." },
      { title: "Visual design", description: "✏️ Colours, type and components you chose, and why." },
      { title: "Prototype & motion", description: "✏️ The interactions and animations you prototyped in Figma." },
    ],
    finalDesign: {
      summary: "✏️ Describe the final screens: the main flows, visual style and key interactions.",
      images: [],
    },
    outcome: {
      summary: "✏️ What was the result? What would you test or improve next?",
      highlights: ["✏️ e.g. Checkout reduced to 3 taps", "✏️ e.g. A reusable component library in Figma"],
    },
    learnings: "✏️ What did this project teach you about interaction design and prototyping?",
    published: false,
  },
  {
    slug: "sirimali-grand-meridian",
    title: "Sirimali Grand Meridian — hotel website",
    category: "UI/UX",
    platform: "Website · light & dark themes",
    summary:
      "A hotel website UI designed in Figma, with matching light and dark themes.",
    role: "✏️ Your role, e.g. UI designer",
    timeline: "✏️ e.g. 2 weeks · 2024",
    tools: ["Figma"],
    cover: {
      video:
        "https://res.cloudinary.com/djtjixlhw/video/upload/v1769227794/projects/videos/ovzyrbr68b1w4urjpsyn.mp4",
    },
    links: [
      {
        label: "Figma — light theme",
        href: "https://www.figma.com/design/jLLtsdCo5opmVbV6zFx7rX/Hotel_Light?node-id=0-1&t=68q2BFJ1vnljQ5CL-1",
      },
      {
        label: "Figma — dark theme",
        href: "https://www.figma.com/design/7pkgCQKIYO25BAYPvd3bqa/Hotel_Dark?node-id=501-2&t=7rO5UmPszhhLBpOA-1",
      },
    ],
    problem:
      "✏️ What did the hotel's website need to achieve? e.g. showcase rooms and encourage direct bookings.",
    research: {
      summary: "✏️ Which hotel websites did you study, and what did you notice?",
      insights: ["✏️ Insight 1", "✏️ Insight 2", "✏️ Insight 3"],
    },
    process: [
      { title: "Research", description: "✏️ What you looked at before designing." },
      { title: "Layout & wireframes", description: "✏️ How you structured the pages." },
      { title: "Light & dark themes", description: "✏️ How you adapted colours and contrast for both themes." },
      { title: "Prototype", description: "✏️ The interactions you prototyped." },
    ],
    finalDesign: {
      summary: "✏️ Describe the final pages and the differences between the two themes.",
      images: [],
    },
    outcome: {
      summary: "✏️ What was the result, and what would you improve now?",
      highlights: ["✏️ Highlight 1", "✏️ Highlight 2"],
    },
    learnings: "✏️ What did designing two themes teach you?",
    published: false,
  },
  {
    slug: "portfolio-figma-to-nextjs",
    title: "This portfolio — from Figma to Next.js",
    category: "UI/UX & Frontend",
    platform: "Website",
    summary:
      "Designing my own portfolio in Figma and building it with Next.js, Tailwind CSS, Framer Motion and GSAP.",
    role: "✏️ e.g. Designer & developer",
    timeline: "✏️ e.g. 2025 – 2026",
    tools: ["Figma", "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Firebase", "Vercel"],
    cover: {
      video:
        "https://res.cloudinary.com/djtjixlhw/video/upload/v1769227569/projects/videos/xlhxtanbbvhkx2zqiqvx.mp4",
    },
    links: [
      {
        label: "Figma file",
        href: "https://www.figma.com/design/4gAJYAmMsjmkkH24ED2im1/My_Portfolio?node-id=0-1&t=sk9rbCf8WeBUN1eS-1",
      },
      { label: "Live site", href: "https://sadeesha-dev.vercel.app" },
    ],
    problem: "✏️ What did you want your portfolio to communicate to recruiters and clients?",
    research: {
      summary: "✏️ Which portfolios inspired you, and what did you learn from them?",
      insights: ["✏️ Insight 1", "✏️ Insight 2", "✏️ Insight 3"],
    },
    process: [
      { title: "Design in Figma", description: "✏️ Layout, colour theme and components." },
      { title: "Build with Next.js", description: "✏️ How you turned the design into code." },
      { title: "Motion", description: "✏️ The animations you added and why." },
      { title: "Content & CMS", description: "✏️ How projects are managed with Firebase and Cloudinary." },
    ],
    finalDesign: {
      summary: "✏️ Describe the final site and your favourite details.",
      images: [],
    },
    outcome: {
      summary: "✏️ What has the portfolio achieved so far?",
      highlights: ["✏️ Highlight 1", "✏️ Highlight 2"],
    },
    learnings: "✏️ What did building it teach you?",
    published: false,
  },
];

// Drafts show locally and on Vercel preview deployments, never on the live site
const showDrafts = process.env.VERCEL_ENV !== "production";

export function getVisibleCaseStudies() {
  return caseStudies.filter((cs) => cs.published || showDrafts);
}

export function getCaseStudy(slug: string) {
  return getVisibleCaseStudies().find((cs) => cs.slug === slug);
}

export const isPlaceholder = (text: string) => text.startsWith("✏️");
