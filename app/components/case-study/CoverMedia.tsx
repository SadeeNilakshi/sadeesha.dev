"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

type Props = { title: string; image?: string; video?: string; poster?: string };

/* Case-study cover: a silent looping preview video, or an image.
   With "reduce motion" on, the video doesn't autoplay and shows controls instead. */
export default function CoverMedia({ title, image, video, poster }: Props) {
  const reduce = useReducedMotion();

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_60px_rgba(0,229,134,0.12)]">
      {video ? (
        <video
          key={reduce ? "still" : "playing"}
          src={video}
          poster={poster}
          aria-label={`${title} preview`}
          muted
          loop
          playsInline
          autoPlay={!reduce}
          controls={!!reduce}
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : image ? (
        <Image
          src={image}
          alt={`${title} cover`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1152px"
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
