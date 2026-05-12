"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SplitTextProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "word" | "char";
  trigger?: "load" | "scroll";
};

export function SplitText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.04,
  splitBy = "word",
  trigger = "load",
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const TagComponent = Tag as React.ElementType;

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll("[data-split-piece]");
      if (!targets.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const reduced = ctx.conditions?.reduced;
          if (reduced) {
            gsap.set(targets, { yPercent: 0, opacity: 1 });
            return;
          }
          gsap.set(targets, { yPercent: 110, opacity: 0 });
          const tween = gsap.to(targets, {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            stagger,
            delay,
            scrollTrigger:
              trigger === "scroll"
                ? {
                    trigger: ref.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                  }
                : undefined,
          });

          return () => {
            tween.kill();
            ScrollTrigger.getAll()
              .filter((st) => st.trigger === ref.current)
              .forEach((st) => st.kill());
          };
        }
      );

      return () => mm.revert();
    },
    { scope: ref, dependencies: [children] }
  );

  const tokens =
    splitBy === "word"
      ? children.split(/(\s+)/)
      : children.split("");

  return (
    <TagComponent
      ref={ref}
      className={className}
      aria-label={children}
    >
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={`s-${i}`}>{token}</span>;
        return (
          <span
            key={`t-${i}`}
            aria-hidden="true"
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "baseline",
            }}
          >
            <span
              data-split-piece=""
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {token}
            </span>
          </span>
        );
      })}
    </TagComponent>
  );
}

export default SplitText;
