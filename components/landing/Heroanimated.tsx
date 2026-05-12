"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PHRASES = [
  { text: "APPLY", color: "#033c3f" },
  { text: "ARKANSAS", color: "#20B780", italic: true },
  { text: "MEDICAL", color: "#033c3f" },
  { text: "CARD", color: "#033c3f" },
];

export function HeroAnimated() {
  const sectionRef = useRef<HTMLElement | null>(null);
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
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(track, { x: 0 });
            return;
          }
          const totalWidth = track.scrollWidth;
          const viewport = section.clientWidth;
          const distance = Math.max(0, totalWidth - viewport);
          const tween = gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance + 400}`,
              pin: true,
              scrub: 1,
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
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden h-[80vh] flex items-center"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-12 px-10 will-change-transform"
        style={{ width: "max-content" }}
      >
        {PHRASES.map((p) => (
          <span
            key={p.text}
            className={p.italic ? "italic" : ""}
            style={{
              fontFamily:
                "var(--font-sans-display), system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(6rem, 22vw, 18rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: p.color,
              whiteSpace: "nowrap",
            }}
          >
            {p.text}
          </span>
        ))}
      </div>
    </section>
  );
}

export default HeroAnimated;
