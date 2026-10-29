"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/* Scroll to a section smoothly (native scrolling when Lenis is off).
   Returns false when the section isn't on this page. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;

  if (lenis) {
    lenis.scrollTo(el); // respects the section's scroll-margin-top
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  return true;
}

/* Freeze page scrolling, e.g. while the mobile menu is open */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

/* 🧈 Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect the OS "reduce motion" setting: keep native scrolling
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ duration: 1.1 });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
