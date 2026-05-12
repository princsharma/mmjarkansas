"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<string>(
    `${prefix}${from.toFixed(decimals)}${suffix}`
  );

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
            setDisplay(`${prefix}${to.toFixed(decimals)}${suffix}`);
            return;
          }

          const counter = { value: from };
          const tween = gsap.to(counter, {
            value: to,
            duration,
            ease: "expo.out",
            onUpdate: () => {
              setDisplay(
                `${prefix}${counter.value.toFixed(decimals)}${suffix}`
              );
            },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
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
    { scope: ref, dependencies: [to, from, duration] }
  );

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  );
}

export default CountUp;
