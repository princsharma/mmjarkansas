"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type EmeraldOrbProps = {
  className?: string;
  size?: number;
  intensity?: number;
};

export function EmeraldOrb({
  className = "",
  size = 360,
  intensity = 1,
}: EmeraldOrbProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) return;
          const tween = gsap.to(el, {
            y: -80 * intensity,
            rotation: 22 * intensity,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
          return () => {
            tween.kill();
            ScrollTrigger.getAll()
              .filter((st) => st.trigger === el)
              .forEach((st) => st.kill());
          };
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
      role="presentation"
    >
      <Image
        src="/assets/hero/orb-emerald.svg"
        alt="Emerald orb background decoration"
        title="Emerald orb background decoration"
        width={size}
        height={size}
        priority={false}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default EmeraldOrb;
