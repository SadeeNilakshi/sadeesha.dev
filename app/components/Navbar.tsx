"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import ScrollProgress from "./motion/ScrollProgress";
import SectionLink from "./motion/SectionLink";
import { setScrollLocked } from "./motion/SmoothScroll";
import { site } from "@/lib/site";

const navLinks = [
  { name: "Work", id: "projects" },
  { name: "About", id: "about" },
  { name: "Skills", id: "stacks" },
  { name: "Services", id: "services" },
  { name: "Contact", id: "contact" },
];

const socials = [
  { label: "GitHub", href: site.socials.github, icon: <FaGithub /> },
  { label: "LinkedIn", href: site.socials.linkedin, icon: <FaLinkedinIn /> },
  { label: "Email", href: `mailto:${site.email}`, icon: <FaEnvelope /> },
];

export default function Navbar({ cv }: { cv: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /* 🔥 Scroll morph + 🎯 active section detection.
     Measured on scroll (not IntersectionObserver) because the hero is sticky —
     it always intersects — and sections may stream in after this mounts. */
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);

      // The section whose top most recently passed 40% of the viewport wins
      const line = window.innerHeight * 0.4;
      let current = "hero";
      let closest = -Infinity;
      navLinks.forEach(({ id }) => {
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
    window.addEventListener("resize", onScroll);
    // Sections move without any scroll event while content streams in and images load
    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  /* 📱 Mobile menu: lock page scroll, Esc closes, focus returns to the button */
  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    const button = menuButtonRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      setScrollLocked(false);
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-3 top-3 md:inset-x-0 md:top-4 z-50 flex justify-center pointer-events-none">
        <nav
          aria-label="Primary"
          className={`
            pointer-events-auto relative overflow-hidden
            w-full md:w-auto
            flex items-center justify-between gap-6 md:gap-10
            rounded-2xl pl-5 pr-2.5 py-2.5
            transition-[background-color,box-shadow] duration-500 ease-out
            ${
              scrolled || open
                ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,229,134,0.25)]"
                : "bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,229,134,0.15)]"
            }
          `}
        >
          {/* Wordmark → back to top */}
          <SectionLink
            to="hero"
            aria-label={`${site.name}, back to top`}
            onClick={() => setOpen(false)}
            className="font-inter font-semibold tracking-tight text-white"
          >
            sadeesha<span className="text-[#00E586]">.dev</span>
          </SectionLink>

          {/* Desktop links with a sliding active indicator */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <SectionLink
                  to={link.id}
                  aria-current={active === link.id ? "location" : undefined}
                  className={`text-sm transition-colors ${
                    active === link.id ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.name}
                </SectionLink>
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 right-0 -bottom-1.5 h-[2px] rounded-full bg-[#00E586]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {cv && (
              <a
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold
                           text-[#0F0E16] bg-[#00E586] hover:bg-[#00ff95] transition-colors"
              >
                Resume <ArrowUpRight size={15} />
              </a>
            )}

            {/* Mobile menu button (two lines → X) */}
            <button
              ref={menuButtonRef}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center rounded-xl hover:bg-white/10 transition"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${
                  open ? "translate-y-[1px] rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition-transform duration-300 ${
                  open ? "-translate-y-[1px] -rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>

          <ScrollProgress className="absolute bottom-0 left-0 right-0" />
        </nav>
      </header>

      {/* 📱 Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-8
                       bg-[#0F0E16]/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
              }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  <SectionLink
                    to={link.id}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? "location" : undefined}
                    className={`flex items-baseline gap-4 py-3 font-inter text-4xl font-semibold tracking-tight transition-colors ${
                      active === link.id ? "text-[#00E586]" : "text-white hover:text-[#00E586]"
                    }`}
                  >
                    <span className="text-sm font-normal text-white/40">0{i + 1}</span>
                    {link.name}
                  </SectionLink>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-12 flex items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {cv && (
                <a
                  href={cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl px-5 py-3 font-semibold
                             text-[#0F0E16] bg-[#00E586]"
                >
                  Resume <ArrowUpRight size={16} />
                </a>
              )}
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                             text-white/80 hover:text-[#00E586] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
