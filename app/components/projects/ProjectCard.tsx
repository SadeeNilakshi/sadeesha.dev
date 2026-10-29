"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, FileText, Maximize2, X } from "lucide-react";
import { FaGithub, FaFigma } from "react-icons/fa";
import { Project } from "@/lib/getProjects";
import { videoPoster } from "@/lib/media";

const categoryLabels: Record<string, string> = {
  uiux: "UI/UX",
  frontend: "Frontend",
  fullstack: "Fullstack",
};

const tiltSpring = { stiffness: 220, damping: 20 };

export default function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const expandRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const reduce = useReducedMotion();

  /* ⌨️ Esc closes the video; focus starts on the close button */
  useEffect(() => {
    if (!showModal) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      modalVideoRef.current?.pause();
      setShowModal(false);
      expandRef.current?.focus();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  /* 📱 Touch screens can't hover: play the preview while it's on screen */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce || !window.matchMedia("(hover: none)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduce]);

  /* "Read more" only appears when the description is actually cut off */
  useEffect(() => {
    const el = descRef.current;
    if (!el || expanded) return;
    const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  /* 🪄 Subtle 3D tilt toward the mouse */
  const rotateX = useSpring(useMotionValue(0), tiltSpring);
  const rotateY = useSpring(useMotionValue(0), tiltSpring);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 6);
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    rotateX.set(0);
    rotateY.set(0);
    if (e.pointerType === "mouse" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => {
      modalVideoRef.current?.play().catch(() => {});
    }, 100);
  };

  const closeModal = () => {
    modalVideoRef.current?.pause();
    setShowModal(false);
    expandRef.current?.focus(); // return focus to the button that opened it
  };

  const isUIUX = !!project.video;
  const category = categoryLabels[project.category_id?.trim().toLowerCase()] ?? project.category_id;
  const primaryHref = project.git_link || project.live_link;

  return (
    <>
      {/* ================= CARD ================= */}
      <motion.article
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl
                   border border-white/10 bg-white/[0.04]
                   shadow-[0_0_20px_rgba(0,229,134,0.08)]
                   hover:border-[#00E586]/40 hover:shadow-[0_0_35px_rgba(0,229,134,0.25)]
                   transition-[border-color,box-shadow] duration-300"
      >
        {/* MEDIA */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          {project.video ? (
            <>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                poster={videoPoster(project.video)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              >
                <source src={project.video} type="video/mp4" />
              </video>

              {/* Expand */}
              <button
                ref={expandRef}
                aria-label={`Play ${project.name} video full screen`}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur
                           hover:bg-black transition"
              >
                <Maximize2 size={16} />
              </button>
            </>
          ) : project.img ? (
            <Image
              src={project.img}
              alt={project.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/40">
              No Preview
            </div>
          )}

          {category && (
            <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur">
              {category}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-inter text-lg font-semibold leading-snug text-white">{project.name}</h3>

          <p
            ref={descRef}
            className={`mt-2 text-sm leading-relaxed text-white/65 ${expanded ? "" : "line-clamp-3"}`}
          >
            {project.description}
          </p>
          {(overflowing || expanded) && (
            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="mt-1.5 self-start text-xs font-medium text-[#00E586] hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          {/* ACTION BUTTONS */}
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {/* PRIMARY: Figma for design work, GitHub for code */}
            {primaryHref && (project.git_link || project.video) && (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#00E586]/40 bg-[#00E586]/10
                           px-3.5 py-1.5 text-xs font-semibold text-[#00E586]
                           hover:bg-[#00E586] hover:text-[#0F0E16] transition"
              >
                {isUIUX ? <FaFigma /> : <FaGithub />}
                {isUIUX ? "Open in Figma" : "View code"}
              </a>
            )}

            {/* OUTLINE: LIVE */}
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-white/25 px-3.5 py-1.5 text-xs
                           text-white/80 hover:bg-white hover:text-black transition"
              >
                Live site <ArrowUpRight size={13} />
              </a>
            )}

            {/* OUTLINE: USE CASE */}
            {project.usecase_pdf && (
              <a
                href={project.usecase_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3.5 py-1.5 text-xs
                           text-white/80 hover:bg-white hover:text-black transition"
              >
                <FileText size={13} /> Case study
              </a>
            )}
          </div>
        </div>
      </motion.article>

      {/* ================= MODAL =================
          Portalled to <body>: the animated (transformed) card would otherwise
          trap a position:fixed overlay inside itself */}
      {showModal && createPortal(
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} video`}
            className="relative w-[90%] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={closeModal}
              aria-label="Close video"
              className="absolute -top-10 right-0 text-white hover:text-red-400"
            >
              <X size={28} />
            </button>

            <video
              ref={modalVideoRef}
              controls
              poster={videoPoster(project.video!, 1280)}
              className="w-full rounded-xl"
            >
              <source src={project.video!} type="video/mp4" />
            </video>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
