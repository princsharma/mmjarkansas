"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollProgress() {
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
          if (ctx.conditions?.reduced) {
            gsap.set(el, { scaleX: 0 });
            return;
          }
          gsap.set(el, { transformOrigin: "left center", scaleX: 0 });
          const st = ScrollTrigger.create({
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              gsap.to(el, {
                scaleX: self.progress,
                duration: 0.2,
                ease: "power2.out",
                overwrite: true,
              });
            },
          });
          return () => st.kill();
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        ref={ref}
        style={{
          height: "100%",
          width: "100%",
          background: "var(--color-accent, #20B780)",
        }}
      />
    </div>
  );
}

export default ScrollProgress;
