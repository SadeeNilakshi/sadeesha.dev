import { useEffect, useRef } from "react";

interface Skill {
  name: string;
  icon: string;
  percentage: number; // still kept if you want future logic
}

export default function SkillCircle({
  skill,
  animate,
}: {
  skill: Skill;
  animate: boolean;
}) {
  const circleRef = useRef<SVGCircleElement>(null);

 useEffect(() => {
  if (!circleRef.current) return;

  if (animate) {
    // Remove first (reset)
    circleRef.current.classList.remove("animate-ring-enter");

    // Force reflow (IMPORTANT 🔥)
    circleRef.current.getBoundingClientRect();


    // Re-add animation
    circleRef.current.classList.add("animate-ring-enter");
  } else {
    circleRef.current.classList.remove("animate-ring-enter");
  }
}, [animate]);



  return (
    <div className="flex flex-col justify-center gap-4 text-center">
      {/* ICON + ENERGY RING */}
      <div className="relative w-[90px] h-[90px]">
        {/* Glow Halo */}
        <div className="absolute inset-0 rounded-full bg-[#00E586]/15 blur-xl animate-pulseGlow" />

        {/* Ring */}
        <svg width="90" height="90" className="relative z-10">
          <defs>
            <linearGradient
              id={`grad-${skill.name}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#00E586" />
              <stop offset="100%" stopColor="#00FFD1" />
            </linearGradient>
          </defs>

          {/* Base Ring */}
          <circle
            cx="45"
            cy="45"
            r="42"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="6"
            fill="none"
          />

          {/* Energy Ring */}
         <circle
  ref={circleRef}
  cx="45"
  cy="45"
  r="42"
  stroke={`url(#grad-${skill.name})`}
  strokeWidth="6"
  fill="none"
  strokeLinecap="round"
/>

        </svg>

        {/* Floating Icon */}
        <div
          className="
            absolute inset-4 rounded-full bg-[#0F0E16]
            flex items-center justify-center
            shadow-[inset_0_4px_6px_rgba(255,255,255,0.2)]
            animate-float
          "
        >
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-8 h-8"
          />
        </div>
      </div>

      {/* Skill Name */}
      <p className="text-white font-lato text-base text-center">
        {skill.name}
      </p>
    </div>
  );
}
