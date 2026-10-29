"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../motion/Reveal";

export type FeaturedCaseStudy = {
  slug: string;
  title: string;
  category: string;
  platform: string;
  summary: string;
  tools: string[];
  cover?: string;
  draft: boolean;
};

/* ⭐ Large case-study cards, alternating image left / right */
export default function FeaturedWork({ caseStudies }: { caseStudies: FeaturedCaseStudy[] }) {
  return (
    <div className="mt-14">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Case studies</h3>
      <div className="mt-6 space-y-8">
        {caseStudies.map((cs, i) => (
          <FeaturedCard key={cs.slug} cs={cs} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}

function FeaturedCard({ cs, flip }: { cs: FeaturedCaseStudy; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  // Cover drifts slightly as the card scrolls past (parallax)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <Reveal>
      {/* relative: Framer Motion needs a positioned element to measure scroll progress */}
      <div ref={ref} className="relative">
        <Link
          href={`/work/${cs.slug}`}
          className="group grid md:grid-cols-[1.35fr_1fr] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]
                     hover:border-[#00E586]/40 hover:shadow-[0_0_40px_rgba(0,229,134,0.15)] transition-[border-color,box-shadow] duration-300"
        >
          {/* COVER */}
          <div className={`relative aspect-[16/10] md:aspect-auto md:min-h-[380px] overflow-hidden bg-black ${flip ? "md:order-2" : ""}`}>
            {cs.cover && (
              <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[8%]">
                <Image
                  src={cs.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </motion.div>
            )}
            {cs.draft && (
              <span className="absolute left-4 top-4 rounded-full bg-amber-300 px-3 py-1 text-xs font-semibold text-black">
                Draft · hidden on the live site
              </span>
            )}
          </div>

          {/* TEXT */}
          <div className="flex flex-col p-7 md:p-10">
            <p className="text-sm text-[#00E586]">
              {cs.category} · {cs.platform}
            </p>
            <h4 className="mt-3 font-inter text-2xl md:text-3xl font-bold tracking-tight">{cs.title}</h4>
            <p className="mt-4 leading-relaxed text-white/70">{cs.summary}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {cs.tools.slice(0, 5).map((tool) => (
                <li key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {tool}
                </li>
              ))}
            </ul>

            <span className="mt-auto pt-8 inline-flex items-center gap-2 font-semibold text-[#00E586]">
              Read case study
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </Reveal>
  );
}
