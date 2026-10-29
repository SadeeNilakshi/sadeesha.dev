"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import Magnetic from "../motion/Magnetic";
import SectionLink from "../motion/SectionLink";
import TextReveal from "../motion/TextReveal";
import { site } from "@/lib/site";

type Props = {
  projects: number;
  experience: number;
  cv: string | null;
};

const ease = [0.22, 1, 0.36, 1] as const; // cinematic easing

// Each block fades up after the one before it (delay in seconds)
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

// What I design & build — cycles in the headline
const rotatingWords = ["interfaces", "web apps", "mobile apps", "websites"];

const socials = [
  { label: "GitHub", href: site.socials.github, icon: <FaGithub /> },
  { label: "LinkedIn", href: site.socials.linkedin, icon: <FaLinkedinIn /> },
  { label: "Email", href: `mailto:${site.email}`, icon: <FaEnvelope /> },
];

const ringGradient =
  "conic-gradient(from 0deg, transparent 0deg, #00E586 80deg, transparent 150deg, transparent 200deg, #00FFD1 280deg, transparent 340deg)";

export default function HeroClient({ projects, experience, cv }: Props) {
  const reduce = useReducedMotion();

  /* 🔁 Rotating headline word */
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(
      () => setWordIndex((i) => (i + 1) % rotatingWords.length),
      2600
    );
    return () => clearInterval(timer);
  }, [reduce]);

  /* 📊 Stats count up (the real numbers are server-rendered first) */
  const projectsRef = useRef<HTMLSpanElement>(null);
  const experienceRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reduce || !projectsRef.current || !experienceRef.current) return;

    const tweens = [
      gsap.fromTo(
        projectsRef.current,
        { innerText: 0 },
        { innerText: projects, duration: 2, delay: 1, snap: { innerText: 1 }, ease: "power1.out" }
      ),
      gsap.fromTo(
        experienceRef.current,
        { innerText: 0 },
        { innerText: experience, duration: 2, delay: 1.1, snap: { innerText: 1 }, ease: "power1.out" }
      ),
    ];
    return () => tweens.forEach((t) => t.kill());
  }, [projects, experience, reduce]);

  /* 🪄 Artwork tilts toward the mouse */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  return (
    <div
      className="relative h-full min-h-screen flex items-start lg:items-center justify-center px-6 overflow-hidden"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* 🌌 Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-[300px] h-[300px] bg-[#00E586]/20 rounded-full blur-3xl top-10 left-10"
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 dot-grid" />
        <div className="absolute inset-0 grain" />
      </div>

      {/* 🧠 Hero Content */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-6 lg:gap-6 pt-24 sm:pt-28 pb-20 lg:py-0">

        {/* LEFT */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* ● Availability */}
          <motion.p
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-[#00E586]/30 bg-[#00E586]/10
                       px-3.5 py-1.5 text-xs sm:text-sm text-[#00E586]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#00E586] opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00E586]" />
            </span>
            Open to full-time &amp; freelance work
          </motion.p>

          <motion.p {...fadeUp(0.2)} className="mt-4 sm:mt-5 text-base sm:text-lg text-white/70">
            Hi, I’m <span className="font-semibold text-white">{site.name}</span>
          </motion.p>

          <h1 className="mt-1 sm:mt-2 font-inter font-bold tracking-tight leading-[1.08] text-[2.1rem] sm:text-5xl xl:text-[4rem]">
            <TextReveal text="I design & build" delay={0.3} />
            <motion.span
              {...fadeUp(0.5)}
              aria-hidden="true"
              className="block relative h-[1.2em] overflow-hidden"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={rotatingWords[wordIndex]}
                  className="block text-[#00E586]"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.45, ease }}
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
            <span className="sr-only">interfaces</span>
            <TextReveal text="people enjoy using." delay={0.55} />
          </h1>

          <motion.p
            {...fadeUp(0.75)}
            className="mt-4 sm:mt-5 max-w-xl text-[15px] sm:text-lg leading-relaxed text-white/70"
          >
            <span className="text-white">{site.role}</span> turning ideas into user-centered Figma
            designs and fast, accessible React &amp; Next.js interfaces.
          </motion.p>

          {/* 🎯 Buttons */}
          <motion.div
            {...fadeUp(0.9)}
            className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            <Magnetic>
              <SectionLink
                to="projects"
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-semibold
                           bg-[radial-gradient(ellipse_at_center,#569A7E_32%,#00C976_100%)]
                           shadow-[0_0_30px_rgba(0,229,134,0.3)] hover:shadow-[0_0_45px_rgba(0,229,134,0.55)]
                           transition-shadow"
              >
                View my work
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </SectionLink>
            </Magnetic>

            {cv && (
              /* Opens the latest CV on Google Drive, where it can be read or downloaded */
              <a
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full border border-[#00E586]
                           text-[#00E586] hover:bg-[#00E586]/10 transition"
              >
                View CV <ArrowUpRight size={16} />
              </a>
            )}
          </motion.div>

          {/* 🔗 Socials + 📊 Stats */}
          <motion.div
            {...fadeUp(1.05)}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 sm:gap-x-5 gap-y-4"
          >
            <div className="flex gap-2 sm:gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1E1E1E] flex items-center justify-center text-white/80
                             shadow-[inset_0px_4px_4px_rgba(255,255,255,0.25)]
                             hover:text-[#00E586] hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,229,134,0.6)]
                             transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 sm:gap-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 sm:px-5 py-2.5">
              <div className="text-left">
                <p className="font-inter text-2xl font-bold leading-none text-[#00E586]">
                  <span ref={projectsRef}>{projects}</span>+
                </p>
                <p className="mt-1 text-xs text-white/60">Projects</p>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div className="text-left">
                <p className="font-inter text-2xl font-bold leading-none text-[#00E586]">
                  <span ref={experienceRef}>{experience}</span>+
                </p>
                <p className="mt-1 text-xs text-white/60">Years experience</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 🖼️ RIGHT — neon artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease }}
          className="hero-art relative flex items-center justify-center"
        >
          <div
            aria-hidden="true"
            className="absolute w-[230px] h-[230px] sm:w-[340px] sm:h-[340px] lg:w-[480px] lg:h-[480px]
                       rounded-full bg-[#00E586]/25 blur-3xl animate-pulseGlow"
          />
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }} className="relative">
            <div className="relative animate-[float_6s_ease-in-out_infinite]">
              {/* Rotating gradient ring + its glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-[5px] rounded-full animate-spin-slow"
                style={{ background: ringGradient, animationDuration: "8s" }}
              />
              <div
                aria-hidden="true"
                className="absolute -inset-[5px] rounded-full blur-lg opacity-70 animate-spin-slow"
                style={{ background: ringGradient, animationDuration: "8s" }}
              />
              <Image
                src="/profile.png"
                alt="Neon artwork: Frontend Dev, UI | UX, with Figma, React, TypeScript, JavaScript, VS Code and CSS icons"
                width={500}
                height={500}
                priority
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 280px, 420px"
                className="relative rounded-full w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] lg:w-[400px] lg:h-[400px] xl:w-[420px] xl:h-[420px]"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ⬇️ Scroll cue */}
      <motion.div
        {...fadeUp(1.4)}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <SectionLink
          to="projects"
          aria-label="Scroll to my work"
          className="flex flex-col items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
        >
          <span className="w-6 h-10 rounded-full border border-white/25 flex justify-center pt-2">
            <span className="w-1 h-2 rounded-full bg-[#00E586] animate-bounce" />
          </span>
          Scroll
        </SectionLink>
      </motion.div>
    </div>
  );
}
