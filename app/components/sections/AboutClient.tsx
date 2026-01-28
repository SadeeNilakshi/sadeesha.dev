"use client";

import { motion } from "framer-motion";

export default function AboutClient() {
  return (
    <section
      id="about"
      className="relative w-full py-6 md:py-12 flex flex-col items-center justify-center px-6 
    "
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-xl md:text-2xl font-lato text-white">
          About Me
        </h2>
        <p className="mt-3 text-white/70 max-w-xl mx-auto">
          Design isn’t just how it looks — it’s how it works and how it feels.
        </p>
      </motion.div>

      {/* Content Card */}
    
<motion.div
  initial={{ opacity: 0, y: 40, scale: 0.98 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  animate={{
    y: [0, -4, 0], // 🌿 floating effect
  }}
  transition={{
    type: "spring",
    stiffness: 120,
    damping: 14,
    mass: 0.8,
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  viewport={{ once: false, amount: 0.3 }}
  className="
    max-w-6xl w-full
    backdrop-blur-xl
    border border-white/10
    rounded-4xl
    p-8 md:p-12
    text-white/90
    leading-relaxed
    space-y-6
    flex flex-col items-center text-center
  "
>


        <p>
          Hey there! I’m{" "}
          <span className="text-[#00E586] font-medium font-xl">
            Sadeesha Nilakshini
          </span>
          , a frontend developer and UI/UX designer who turns bold ideas into
          beautiful, interactive experiences. I speak fluent HTML, CSS,
          JavaScript, and Figma — with a sprinkle of design magic that brings
          pixels to life.
        </p>

        <p>
          Whether it’s a responsive web app or a seamless mobile UI, I believeation should feel intuitive, delightful, and human.
          I design with empathy and build with precision — crafting user-first
          interfaces that don’t just look good, but feel right.
        </p>

        <p>
          My creative process balances aesthetics with logic, blending clean
          code with captivating visuals to create meaningful digital
          experiences.
        </p>

        <p>
          Let’s build something users will love at first sight — and keep
          coming back to.
        </p>

        {/* Highlights */}
        <div className="pt-4 space-y-3 text-sm md:text-base">
          <p>
            📱{" "}
            <span className="text-[#00E586] font-medium">
              Responsive Design · Interactive Prototypes · Accessibility-First
            </span>
          </p>

          <p>
            🎯{" "}
            <span className="text-white/80">
              Currently open to freelance projects, collaborations, and
              full-time opportunities
            </span>
          </p>

          <p>
            🎓{" "}
            <span className="text-[#00E586] font-medium">
              BSc (Hons) in Software Engineering – Birmingham City University
            </span>
            <br />
            <span className="text-white/80">
              Certified in Professional UX Design
            </span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
