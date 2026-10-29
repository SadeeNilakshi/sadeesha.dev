"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToId } from "./SmoothScroll";

type Props = {
  to: string; // section id, e.g. "projects"
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-current"?: "location";
};

/* In-page link to a home-page section: smooth-scrolls on the home page,
   navigates to /#section from any other page (e.g. a case study). */
export default function SectionLink({ to, children, onClick, ...rest }: Props) {
  const pathname = usePathname();

  if (pathname !== "/") {
    return (
      <Link href={`/#${to}`} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        onClick?.();
        if (scrollToId(to)) e.preventDefault();
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
