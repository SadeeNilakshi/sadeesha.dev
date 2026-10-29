"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "./motion/SmoothScroll";
import "lenis/dist/lenis.css";

/* App-wide client setup: animations follow the OS "reduce motion" setting */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
    </MotionConfig>
  );
}
