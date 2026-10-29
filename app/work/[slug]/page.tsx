import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getCaseStudy, getVisibleCaseStudies, isPlaceholder } from "@/data/caseStudies";
import { videoPoster } from "@/lib/media";
import SectionLink from "@/components/motion/SectionLink";
import Reveal from "@/components/motion/Reveal";
import CaseStudyToc from "@/components/case-study/CaseStudyToc";
import CoverMedia from "@/components/case-study/CoverMedia";
import Footer from "@/components/sections/Footer";

type Params = { params: Promise<{ slug: string }> };

// Only case studies listed in app/data/caseStudies.ts exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleCaseStudies().map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};

  return {
    title: `${cs.title} · Case study`,
    description: cs.summary,
    alternates: { canonical: `/work/${cs.slug}` },
    robots: cs.published ? undefined : { index: false, follow: false },
  };
}

const sections = [
  { id: "problem", label: "The problem" },
  { id: "research", label: "Research" },
  { id: "process", label: "Process" },
  { id: "final-design", label: "Final design" },
  { id: "outcome", label: "Outcome" },
  { id: "learnings", label: "Learnings" },
];

/* ✏️ placeholders are highlighted so they're easy to spot and replace */
function Copy({ text, className = "" }: { text: string; className?: string }) {
  const placeholder = isPlaceholder(text)
    ? "rounded-lg border border-dashed border-amber-300/50 bg-amber-300/5 px-3 py-2 text-amber-200/90"
    : "";
  return <p className={`${className} ${placeholder}`}>{text}</p>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.2em] text-white/40">{label}</dt>
      <dd className={`mt-2 text-sm ${isPlaceholder(value) ? "text-amber-200/90" : "text-white/85"}`}>{value}</dd>
    </div>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id}>
      <Reveal>
        <h2 className="font-inter text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <div className="mt-5 space-y-5 leading-relaxed text-white/75 md:text-lg">{children}</div>
      </Reveal>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const visible = getVisibleCaseStudies();
  const next = visible[(visible.indexOf(cs) + 1) % visible.length];

  return (
    <>
      <main className="relative overflow-hidden px-6 pt-28 pb-24 md:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#00E586]/10 blur-3xl"
        />

        <article className="relative mx-auto max-w-6xl">
          {!cs.published && (
            <p className="mb-8 rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm text-amber-200">
              <strong>Draft.</strong> Only visible on your computer and on Vercel preview links. Replace the
              highlighted ✏️ placeholders in <code>app/data/caseStudies.ts</code>, then set{" "}
              <code>published: true</code>.
            </p>
          )}

          <SectionLink
            to="projects"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} /> All work
          </SectionLink>

          {/* HEADER */}
          <header className="mt-8 max-w-4xl">
            <p className="text-sm text-[#00E586]">
              {cs.category} · Case study
            </p>
            <h1 className="mt-3 font-inter text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              {cs.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/70">{cs.summary}</p>

            {cs.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {cs.links.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      i === 0
                        ? "bg-[#00E586] text-[#0F0E16] hover:bg-[#00ff95]"
                        : "border border-white/25 text-white/85 hover:bg-white hover:text-black"
                    }`}
                  >
                    {link.label} <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            )}
          </header>

          {/* COVER */}
          <Reveal className="mt-12">
            <CoverMedia
              title={cs.title}
              image={cs.cover.image}
              video={cs.cover.video}
              poster={cs.cover.video ? videoPoster(cs.cover.video, 1600) : undefined}
            />
          </Reveal>

          {/* BODY: sticky facts + contents on the left, the story on the right */}
          <div className="mt-16 grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
            <aside className="space-y-10 self-start lg:sticky lg:top-28">
              <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
                <Fact label="Role" value={cs.role} />
                <Fact label="Timeline" value={cs.timeline} />
                <Fact label="Platform" value={cs.platform} />
                <div className="col-span-2 lg:col-span-1">
                  <dt className="text-xs uppercase tracking-[0.2em] text-white/40">Tools</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {cs.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
                      >
                        {tool}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <CaseStudyToc sections={sections} />
            </aside>

            <div className="min-w-0 space-y-20">
              <Block id="problem" title="The problem">
                <Copy text={cs.problem} />
              </Block>

              <Block id="research" title="Research & insights">
                <Copy text={cs.research.summary} />
                <ul className="grid gap-3 sm:grid-cols-3">
                  {cs.research.insights.map((insight, i) => (
                    <li key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-base">
                      <span className="text-sm font-semibold text-[#00E586]">0{i + 1}</span>
                      <Copy text={insight} className="mt-2" />
                    </li>
                  ))}
                </ul>
              </Block>

              <Block id="process" title="Process">
                <ol className="grid gap-4 sm:grid-cols-2">
                  {cs.process.map((step, i) => (
                    <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                      <span className="font-inter text-3xl font-bold text-[#00E586]/40">0{i + 1}</span>
                      <h3 className="mt-2 font-semibold text-white">{step.title}</h3>
                      <Copy text={step.description} className="mt-2 text-base" />
                    </li>
                  ))}
                </ol>
              </Block>

              <Block id="final-design" title="Final design">
                <Copy text={cs.finalDesign.summary} />
                {cs.finalDesign.images.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {cs.finalDesign.images.map((img) => (
                      <div
                        key={img.src}
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black"
                      >
                        <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 45vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex aspect-[16/7] items-center justify-center rounded-2xl border border-dashed border-amber-300/50 bg-amber-300/5 px-6 text-center text-sm text-amber-200/90">
                    ✏️ Add 2–4 final screens to finalDesign.images
                  </div>
                )}
              </Block>

              <Block id="outcome" title="Outcome">
                <Copy text={cs.outcome.summary} />
                <ul className="space-y-3">
                  {cs.outcome.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E586]" />
                      <Copy text={highlight} />
                    </li>
                  ))}
                </ul>
              </Block>

              <Block id="learnings" title="What I learned">
                <Copy text={cs.learnings} />
              </Block>
            </div>
          </div>

          {/* NEXT */}
          {next && next.slug !== cs.slug && (
            <Reveal className="mt-24">
              <Link
                href={`/work/${next.slug}`}
                className="group block rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12
                           hover:border-[#00E586]/40 transition-colors"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">Next case study</p>
                <p className="mt-3 flex items-center justify-between gap-6 font-inter text-2xl md:text-4xl font-bold tracking-tight">
                  {next.title}
                  <ArrowRight
                    size={32}
                    className="shrink-0 text-[#00E586] transition-transform group-hover:translate-x-2"
                  />
                </p>
              </Link>
            </Reveal>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
}
