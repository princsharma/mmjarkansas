"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type MarqueeProps = {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
};

export function Marquee({
  children,
  speed = 28,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(track, { x: 0 });
            return;
          }

          const from = direction === "left" ? 0 : -50;
          const to = direction === "left" ? -50 : 0;
          gsap.set(track, { xPercent: from });
          const tween = gsap.to(track, {
            xPercent: to,
            duration: speed,
            ease: "none",
            repeat: -1,
          });
          return () => {
            tween.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [speed, direction] }
  );

  const handleEnter = () => {
    if (!pauseOnHover || !trackRef.current) return;
    gsap.getTweensOf(trackRef.current).forEach((t) => t.pause());
  };
  const handleLeave = () => {
    if (!pauseOnHover || !trackRef.current) return;
    gsap.getTweensOf(trackRef.current).forEach((t) => t.resume());
  };

  return (
    <div
      ref={wrapRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max gap-12 will-change-transform">
        <div className="flex shrink-0 gap-12">{children}</div>
        <div className="flex shrink-0 gap-12">{children}</div>
      </div>
    </div>
  );
}

export default Marquee;
