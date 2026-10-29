"use client";

import { motion, type Variants } from "framer-motion";

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

type Props = {
  text: string;
  className?: string;
  delay?: number;
  inView?: boolean; // wait until scrolled into view instead of playing on load
};

/* Slides each word up from behind a mask, one after another */
export default function TextReveal({ text, className = "", delay = 0, inView = false }: Props) {
  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, amount: 0.6 } }
    : { animate: "show" };

  return (
    <motion.span
      className={`block ${className}`}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
