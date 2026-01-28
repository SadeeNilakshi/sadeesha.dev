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

  /* 🔥 Scroll morph */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 🎯 Active section detection */
 useEffect(() => {
  const sections = document.querySelectorAll("section[id]:not(#hero)");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-40% 0px -50% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));

  const onScroll = () => {
    if (window.scrollY < window.innerHeight * 0.4) {
      setActive("hero");
    }
  };

  window.addEventListener("scroll", onScroll);

  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", onScroll);
  };
}, []);


  return (
    <nav
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
>
  ☰
</button>

      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="md:hidden pb-3 rounded-2xl mt-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)">

          <div className="flex flex-col ">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
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
