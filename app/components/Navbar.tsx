"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Stacks", href: "#stacks" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

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
      navLinks.forEach(({ href }) => {
        const id = href.slice(1);
        if (id === "hero") return;
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
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);



  return (
    <nav
  aria-label="Primary"
  className={`
    fixed top-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-50
    w-fit max-w-[95vw]
    px-4 py-1 md:px-10
 rounded-xl
    transition-all duration-500 ease-out
    ${
      scrolled
        ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,229,134,0.35)]"
        : "bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,229,134,0.15)]"
    }
  `}
>

      <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:py-4
                flex items-center justify-between gap-6">


        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={active === id ? "location" : undefined}
                className={`relative group transition ${
                  active === id
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}

                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] bg-[#00E586]
                    transition-all duration-300
                    ${
                      active === id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile Button */}
        <button
  className="md:hidden ml-auto text-white text-xl
             w-9 h-9 flex items-center justify-center
             rounded-lg hover:bg-white/10 transition"
  onClick={() => setOpen(!open)}
  aria-label={open ? "Close menu" : "Open menu"}
  aria-expanded={open}
  aria-controls="mobile-menu"
>
  <span aria-hidden="true">☰</span>
</button>

      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden pb-3 rounded-2xl mt-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)">

          <div className="flex flex-col ">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "location" : undefined}
                  className={`transition text-md py-2 ${
                    active === id
                      ? "text-[#00E586]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
