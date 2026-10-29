"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/* Thin green bar that fills as the page is scrolled */
export default function ScrollProgress({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={`h-[2px] origin-left bg-gradient-to-r from-[#00E586] to-[#00FFD1] ${className}`}
    />
  );
}
