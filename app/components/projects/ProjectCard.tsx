"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/getProjects";
import { Maximize2, X } from "lucide-react";
import { FaGithub, FaFigma } from "react-icons/fa";

export default function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
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
  };

  const isUIUX = !!project.video;

  return (
    <>
      {/* ================= CARD ================= */}
 <div
  className="
   max-w-[330px] md:max-w-[360px]
    px-0
    mx-auto
    h-[475px]
    bg-white/5 border border-white/10
    rounded-2xl overflow-hidden
    transition-all duration-300
    hover:scale-[1.03]
    hover:shadow-[0_0_35px_rgba(0,229,134,0.35)]
    shadow-[0_0_20px_rgba(0,229,134,0.15)]
    flex flex-col
  "
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>


        {/* MEDIA */}
        <div className="relative w-full h-[225px] bg-black overflow-hidden">
          {project.video ? (
            <>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src={project.video} type="video/mp4" />
              </video>

              {/* Expand */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
                className="absolute top-2 right-2 z-10 bg-black/60 p-2 rounded-full
                text-white hover:bg-black transition"
              >
                <Maximize2 size={16} />
              </button>
            </>
          ) : project.img ? (
            <Image
              src={project.img}
              alt={project.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
              No Preview
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">
            {project.name}
          </h3>

          <p className="text-white/70 text-sm mt-2 ">
            {project.description}
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-auto flex justify-center gap-4 pt-6">
            {/* PRIMARY BUTTON */}
            {(project.git_link || project.video) && (
              <a
  href={project.git_link || project.live_link}
  target="_blank"
  className="
    group flex items-center gap-2 px-5 py-2.5 text-sm
    font-lato rounded-full
    bg-[#0F0E16]/60 backdrop-blur-md
    border border-[#00E586]/40
    text-[#00E586]
    transition-all duration-300
    hover:border-[#00E586]
    hover:text-black
    hover:bg-[#00E586]
  "
>
  {isUIUX ? <FaFigma className="transition-transform group-hover:scale-110" /> : <FaGithub className="transition-transform group-hover:scale-110" />}
  {isUIUX ? "View in Figma" : "View in GitHub"}
</a>

            )}

            {/* OUTLINE: LIVE */}
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                className="px-4 py-2 text-sm rounded-full font-lato
                border border-white/40 text-white/80
                hover:bg-white hover:text-black transition"
              >
                View Live
              </a>
            )}

            {/* OUTLINE: USE CASE */}
            {project.usecase_pdf && (
              <a
                href={project.usecase_pdf}
                target="_blank"
                className="px-4 py-2 text-sm rounded-full font-lato
                border border-white/40 text-white/80
                hover:bg-white hover:text-black transition"
              >
                Case Study
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative w-[90%] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white hover:text-red-400"
            >
              <X size={28} />
            </button>

            <video
              ref={modalVideoRef}
              controls
              className="w-full rounded-xl"
            >
              <source src={project.video!} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
}
