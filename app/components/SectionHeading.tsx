"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import TextReveal from "./motion/TextReveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode; // optional content on the right (e.g. filters)
};

/* Section title: green eyebrow label, big word-by-word title, short description */
export default function SectionHeading({ eyebrow, title, description, children }: Props) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#00E586]"
        >
          <span className="h-px w-8 bg-[#00E586]" />
          {eyebrow}
        </motion.p>

        <h2 className="mt-4 font-inter text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
          <TextReveal text={title} inView />
        </h2>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-white/60 md:text-lg leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>

      {children}
    </div>
  );
}
