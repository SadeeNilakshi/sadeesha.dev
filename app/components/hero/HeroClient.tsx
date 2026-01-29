"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, Variants } from "framer-motion";
import Particles from "react-tsparticles";

type Props = {
  projects: number;
  experience: number;
  cv: string | null;
};

export default function HeroClient({ projects, experience, cv }: Props) {
  const socialContainer: Variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2,
      },
    },
  };

  const socialItem: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const heroTextContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.4,
      },
    },
  };

  const heroTextItem: Variants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1], // cinematic easing
      },
    },
  };

  useEffect(() => {
  gsap.fromTo(
    ".hero-image",
    { y: 0 },
    {
      y: -15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    }
  );
}, []);

function getDrivePreviewUrl(url: string) {
  return url.replace("/view", "/preview");
}

function getDriveDownloadUrl(previewUrl: string) {
  const match = previewUrl.match(/\/d\/([^/]+)/);
  if (!match) return previewUrl;

  return `https://drive.google.com/uc?export=download&id=${match[1]}`;
}



  const projectsRef = useRef<HTMLSpanElement>(null);
  const experienceRef = useRef<HTMLSpanElement>(null);

  /* Stats animation */
  useEffect(() => {
    if (!projectsRef.current || !experienceRef.current) return;

    gsap.fromTo(
      projectsRef.current,
      { innerText: 0 },
      {
        innerText: projects,
        duration: 6,
        snap: { innerText: 1 },
        ease: "power1.out",
      }
    );

    gsap.fromTo(
      experienceRef.current,
      { innerText: 0 },
      {
        innerText: experience,
        duration: 6,
        snap: { innerText: 1 },
        ease: "power1.out",
        delay: 0.2,
      }
    );
  }, [projects, experience]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute w-[300px] h-[300px] bg-[#00E586]/20 rounded-full blur-3xl top-10 left-10"
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* <motion.div
          className="absolute w-[400px] h-[400px] bg-[#569A7E]/20 rounded-full blur-3xl bottom-0 right-0"
          animate={{ x: [0, -60, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        /> */}

        <Particles
          className="absolute inset-0"
          options={{
            particles: {
              number: { value: 20 },
              size: { value: 2 },
              color: { value: "#00E586" },
              move: { speed: 0.5 },
              opacity: { value: 0.5 },
            },
          }}
        />
      </div>

      {/* 🧠 Hero Content */}
<div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center relative z-10 mt-12 md:mt-0">

        {/* LEFT */}
        <div className="flex flex-col sm:gap-2 md:gap-4 text-center md:text-left items-center md:items-start">
          <motion.div
            variants={heroTextContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            <motion.p variants={heroTextItem} className="text-lg text-gray-400">
              Hi I am,
            </motion.p>

            <motion.h1
              variants={heroTextItem}
              className="font-lato text-xl md:text-2xl"
            >
              Sadeesha Nilakshini
            </motion.h1>

            <motion.h2
              variants={heroTextItem}
              className="font-inter text-4xl md:text-5xl font-semibold text-[#00E586]"
            >
              UI | UX Engineer
            </motion.h2>
          </motion.div>

          {/* 🔗 Social Icons */}
          <motion.div
            className="flex gap-3 mt-4 justify-center md:justify-start"
            variants={socialContainer}
            initial="hidden"
            animate="show"
          >
            {[
              { href: "https://github.com/SadeeNilakshi", img: "/git.png" },
              {
                href: "https://www.linkedin.com/in/sadeesha-nilakshini-a592b529a/",
                img: "/business.png",
              },
              {
                href: "https://www.tiktok.com/@thatfrontendgirl",
                img: "/tik_tok.png",
              },
            ].map((icon, i) => (
              <motion.a
                key={i}
                href={icon.href}
                target="_blank"
                variants={socialItem}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-[45px] h-[45px] bg-[#1E1E1E] rounded-full flex items-center justify-center
                 shadow-[inset_0px_4px_4px_rgba(255,255,255,0.25)]
                 transition-shadow hover:shadow-[0_0_15px_rgba(0,229,134,0.6)]"
              >
                <img src={icon.img} className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* 🎯 Buttons */}
          <motion.div
            className="flex gap-4 mt-6 justify-center md:justify-start flex-wrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <a
              href="#contact"
              className="px-8 py-3 rounded-full text-white font-semibold hover:scale-105 transition-transform"
              style={{
                background:
                  "radial-gradient(ellipse at center, #569A7E 32%, #00C976 100%)",
              }}
            >
              Hire Me
            </a>

            {cv && (
  <button
    onClick={() => {
      const previewUrl = getDrivePreviewUrl(cv);
      const downloadUrl = getDriveDownloadUrl(previewUrl);

      // 1️⃣ Open preview
      window.open(previewUrl, "_blank");

      // 2️⃣ Trigger download
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "Sadeesha_Nilakshi_CV.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }}
    className="px-8 py-3 rounded-full border border-[#00E586] text-[#00E586]
               hover:bg-[#00E586]/10 transition"
  >
    Download CV
  </button>
)}


          </motion.div>

          {/* 📊 Stats */}
          <motion.div
            className="inline-flex gap-8 bg-white/5 backdrop-blur-md px-8 py-5 rounded-2xl border border-white/10 max-w-fit mt-6 mx-auto md:mx-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <div className="text-center min-w-[70px]">
              <h3 className="text-3xl font-bold text-[#00E586]">
                <span ref={projectsRef}>0</span>+
              </h3>
              <p className="text-gray-400">Projects</p>
            </div>

            <div className="h-15 w-px bg-white/20" />

            <div className="text-center min-w-[70px]">
              <h3 className="text-3xl font-bold text-[#00E586]">
                <span ref={experienceRef}>0</span>+
              </h3>
              <p className="text-gray-400">Experience</p>
            </div>
          </motion.div>
        </div>

        {/* 🖼️ RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.4,
            delay: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute w-[460px] h-[460px] bg-[#00E586]/30 blur-3xl rounded-full animate-pulse" />
          <img
  src="/profile.png"
  className="hero-image relative z-10 rounded-full
             w-[260px] h-[260px]
             md:w-[440px] md:h-[440px]
             animate-[float_6s_ease-in-out_infinite]"
/>

        </motion.div>
      </div>
    </section>
  );
}
