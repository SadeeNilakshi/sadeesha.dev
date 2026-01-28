"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
  {
    title: "UI | UX Design",
    desc: "Crafting intuitive, user-centered interfaces that balance aesthetics and usability.",
    icon: "/figma.png",
  },
  {
    title: "Frontend Development",
    desc: "Transforming designs into fast, responsive, and accessible interfaces using modern frontend technologies.",
    icon: "/coding.png",
  },
  {
    title: "Figma to Frontend",
    desc: "Pixel-perfect conversion of Figma designs into clean, responsive, production-ready frontend code.",
    icon: "/software.png",
  },
  {
    title: "Mobile App Design",
    desc: "Designing sleek, usability focused high-performance interfaces for mobile applications.",
    icon: "/mobiledev.png",
  },
  {
    title: "UX Audit & Redesign",
    desc: "Analyzing existing products to identify usability gaps and improve user flows. Data-driven design improvements.",
    icon: "/audit.png",
  },
   {
    title: "Web SEO",
    desc: "Optimizing websites through clean structure, performance improvements, and SEO best practices.",
    icon: "/seo.png",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full py-6 md:py-12 justify-center px-6 overflow-hidden
    "
    >
      {/* Section Header */}
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: false, amount: 0.3 }}
  className="text-center mb-16"
>

        <h2 className="text-xl md:text-2xl  text-white font-lato">
          Services
        </h2>
        <p className="mt-3 text-white/70 max-w-xl mx-auto">
          Crafting experiences, not just products.
        </p>
      </motion.div>

      {/* Cards */}
      <div
        /* IMPORTANT: use auto-fit/minmax so the grid centers the last row */
        className="
          services-grid
        "
      >

        {services.map((service, i) => (
          <motion.div
            key={i}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: i * 0.15 }}
  viewport={{ once: false, amount: 0.3 }}
  whileHover={{ y: -8 }}
          className="group relative rounded-2xl p-8
              w-full max-w-[340px]
              flex flex-col items-center text-center
              bg-white/5 backdrop-blur-xl
              border border-white/10
              hover:border-[#00E586]/40
              transition-all duration-300 ease-out"


          >
            {/* Icon */}
            <div
              className="
              mb-6"
            >
              <Image
                src={service.icon}
                alt={service.title}
                width={75}
                height={75}
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-medium text-[#00E586] mb-3">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-white/70 leading-relaxed">
              {service.desc}
            </p>

            {/* Glow on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
              bg-gradient-to-r from-[#00E586]/10 to-transparent
              blur-xl transition-opacity duration-300 pointer-events-none"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
