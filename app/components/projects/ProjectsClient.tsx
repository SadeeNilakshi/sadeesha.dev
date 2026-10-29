"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/lib/getProjects";
import ProjectCard from "./ProjectCard";

// UI/UX first: that's what recruiters for UI/UX roles want to see
const categories = [
  { label: "UI/UX", key: "uiux" },
  { label: "Frontend", key: "frontend" },
  { label: "Fullstack", key: "fullstack" },
  { label: "All", key: "all" },
];

const categoryOf = (p: Project) => p.category_id?.trim().toLowerCase();

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("uiux");

  const filtered =
    active === "all" ? projects : projects.filter((p) => categoryOf(p) === active);

  const countFor = (key: string) =>
    key === "all" ? projects.length : projects.filter((p) => categoryOf(p) === key).length;

  return (
    <div className="mt-16 md:mt-20">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">All projects</h3>

        {/* TABS with a sliding indicator */}
        <div
          role="tablist"
          aria-label="Filter projects"
          className="flex w-fit gap-1 rounded-full border border-white/10 bg-white/5 p-1"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              role="tab"
              aria-selected={active === cat.key}
              onClick={() => setActive(cat.key)}
              className={`relative rounded-full px-3.5 sm:px-4 py-2 text-sm transition-colors ${
                active === cat.key ? "text-[#0F0E16] font-semibold" : "text-white/70 hover:text-white"
              }`}
            >
              {active === cat.key && (
                <motion.span
                  layoutId="project-tab"
                  className="absolute inset-0 rounded-full bg-[#00E586]"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">
                {cat.label}
                <span className={`ml-1.5 hidden sm:inline text-xs ${active === cat.key ? "text-[#0F0E16]/70" : "text-white/40"}`}>
                  {countFor(cat.key)}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <motion.ul layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
