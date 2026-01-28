"use client";

import { useEffect, useState, useRef } from "react";
import SkillCircle from "./SkillCircle";
import StackIconMarquee from "../StackIconMarquee";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface StackItem {
  name: string;
  icon: string;
  percentage: number;
  order: number;
}

export default function Stacks() {
  const [stacks, setStacks] = useState<StackItem[]>([]);
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchStacks() {
      const q = query(collection(db, "stacks"), orderBy("order"));
      const snapshot = await getDocs(q);
      setStacks(snapshot.docs.map((doc) => doc.data() as StackItem));
    }
    fetchStacks();
  }, []);

  // Intersection Observer
 useEffect(() => {
  if (!sectionRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        } else {
          setAnimate(false); // 👈 reset when leaving
        }
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(sectionRef.current);

  return () => observer.disconnect();
}, []);


  return (
    <section
      ref={sectionRef}
      id="stacks"
      className="w-full py-6 md:py-12 flex flex-col items-center gap-16"
    >
      <h2 className="text-2xl font-lato text-white">UI Tools & Dev Stack</h2>
      
      <div
  className="
    grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
    gap-x-12 gap-y-6
    sm:gap-x-10 sm:gap-y-8
    md:gap-x-16 md:gap-y-12
    lg:gap-x-[120px] lg:gap-y-[80px]
    max-w-[1400px] mx-auto justify-items-center
  "
>

        {stacks.map((skill) => (
          <SkillCircle key={skill.name} skill={skill} animate={animate} />
        ))}
      </div>
      <div className="w-full  flex flex-col items-center gap-6">
  {/* Top Divider */}
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00E586]/40 to-transparent" />

  <StackIconMarquee />

  {/* Bottom Divider */}
  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00E586]/40 to-transparent" />
</div>

    </section>
  );
}

