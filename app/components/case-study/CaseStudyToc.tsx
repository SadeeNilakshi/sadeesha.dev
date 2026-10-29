"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "../motion/SmoothScroll";

type Section = { id: string; label: string };

/* Sticky "Contents" list that highlights the section being read */
export default function CaseStudyToc({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = sections[0]?.id;
      let closest = -Infinity;
      sections.forEach(({ id }) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > closest) {
          closest = top;
          current = id;
        }
      });
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  return (
    <nav aria-label="Case study sections" className="hidden lg:block">
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">Contents</p>
      <ul className="mt-3 space-y-1 border-l border-white/10">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                if (scrollToId(id)) e.preventDefault();
              }}
              aria-current={active === id ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                active === id ? "border-[#00E586] text-white" : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
