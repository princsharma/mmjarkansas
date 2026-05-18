"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type PinnedStepsProps = {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
};

export function PinnedSteps({
  children,
  className = "",
  trackClassName = "",
}: PinnedStepsProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
          touch: "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
        },
        (ctx) => {
          const reduced = ctx.conditions?.reduced;
          const touch = ctx.conditions?.touch;
          if (reduced || touch) {
            gsap.set(track, { x: 0 });
            return;
          }
          const totalWidth = track.scrollWidth;
          const viewportWidth = section.clientWidth;
          const distance = Math.max(0, totalWidth - viewportWidth);
          const tween = gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance + window.innerHeight * 0.4}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          return () => {
            tween.kill();
            ScrollTrigger.getAll()
              .filter((st) => st.trigger === section)
              .forEach((st) => st.kill());
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className={className}>
      <div
        ref={trackRef}
        className={trackClassName}
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}

export default PinnedSteps;
