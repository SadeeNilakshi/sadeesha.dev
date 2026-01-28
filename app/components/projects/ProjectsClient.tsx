"use client";

import { useState } from "react";
import { Project } from "@/lib/getProjects";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence, Variants } from "framer-motion";


const categories = [
  { label: "Fullstack", key: "fullstack" },
  { label: "UI|UX", key: "uiux" },
  { label: "Frontend", key: "frontend" }
];

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.12,
//     },
//   },
// };

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};



export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("fullstack");

  const filtered = projects.filter(
    (p) => p.category_id?.trim().toLowerCase() === active
  );

  return (
    <div className="text-center">
      <h2 className="text-2xl font-lato">Projects</h2>
      <p className="text-white/70 mt-2">
        Real-world solutions, pixel-perfect designs, and interactive experiences.
      </p>

      {/* TABS */}
      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`relative px-4 py-2 text-md md:text-lg font-lato transition
              ${active === cat.key ? "text-white" : "text-white/60"}`}
          >
            {cat.label}
            {active === cat.key && (
              <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-[#00e586] to-[#007343]" />
            )}
          </button>
        ))}
      </div>

      {/* GRID */}
      {/* GRID */}
<motion.div
  className="mt-14 flex flex-wrap justify-center gap-12"
  // variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: false }} // 👈 re-animates every time
>
  <AnimatePresence>
    {filtered.map((project) => (
      <motion.div
        key={project.id}
        variants={cardVariants}
        layout
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <ProjectCard project={project} />
      </motion.div>
    ))}
  </AnimatePresence>
</motion.div>

    </div>
  );
}
