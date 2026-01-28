"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import HeroClient from "../hero/HeroClient";
import Services from "../sections/Services";
import About from "../sections/AboutClient";
import Stacks from "../sections/Stacks";
import Projects from "../projects/Projects";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

gsap.registerPlugin(ScrollTrigger);
type Props = {
  heroData: {
    projects: number;
    experience: number;
    cv: string | null;
  };
};


export default function ScrollLayout({ heroData }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !sheetRef.current) return;

    gsap.to(heroRef.current, {
      scale: 0.92,
      y: -80,
      opacity: 0.6,
      scrollTrigger: {
        trigger: sheetRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      {/* 🔥 HERO — STICKY BACKGROUND */}
      <section
        ref={heroRef}
        className="sticky top-0 h-screen w-screen z-10"
        id="hero"
      >
        <HeroClient
          projects={heroData.projects}
          experience={heroData.experience}
          cv={heroData.cv}
        />
      </section>

      {/* 🧩 CONTENT SHEET — FLOATS OVER HERO */}
      <section
  ref={sheetRef}
  className="
  relative z-20 bg-[#0F0E16]
  rounded-t-[48px]
  -mt-15 pt-8
  shadow-[0_-8px_20px_rgba(0,0,0,0.35)]
"
>

  <section id="services">
    <Services />
  </section>

  <section id="about">
    <About />
  </section>

  <section id="stacks">
    <Stacks />
  </section>

  <section id="projects">
    <Projects />
  </section>

  <section id="contact">
    <Contact />
  </section>

  <section id="footer">
    <Footer />
  </section>

</section>
    </>
  );
}
