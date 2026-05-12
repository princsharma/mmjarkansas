"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";

export function StartJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const headlinePart = sectionRef.current?.querySelector("[data-sj-head]");
      const supporting = sectionRef.current?.querySelector("[data-sj-sub]");
      if (!headlinePart || !supporting) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) return;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              pin: true,
              scrub: 1,
            },
          });
          tl.to(headlinePart, { y: -120, ease: "none" }, 0);
          tl.to(supporting, { y: -260, ease: "none" }, 0);
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="startjourney-heading"
      className="relative bg-[#f6faf8] overflow-hidden min-h-[80vh] flex items-center"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            [SJ] START YOUR JOURNEY
          </p>

          <h2
            id="startjourney-heading"
            data-sj-head
            className="display-xxl"
            style={{
              color: "var(--color-heading)",
              fontFamily:
                "var(--font-sans-display), system-ui, sans-serif",
            }}
          >
            Your card.
            <br />
            Your <span className="italic text-[var(--color-accent)]">relief.</span>
          </h2>

          <p
            data-sj-sub
            className="text-[var(--color-muted)] text-lg leading-relaxed max-w-[55ch] mx-auto"
          >
            Take 90 seconds to begin your Arkansas Medical Marijuana Card
            application — backed by our 100% money-back guarantee if you
            aren&apos;t approved.
          </p>

          <div>
            <Magnetic>
              <a
                href="#form-section"
                className="inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-8 py-5 text-sm font-mono uppercase tracking-[0.2em] text-white hover:scale-[1.02] transition-transform"
                style={{
                  boxShadow: "0 24px 60px -28px rgba(32, 183, 128, 0.65)",
                }}
              >
                <span className="opacity-70">[04]</span>
                Apply for My Card
                <ArrowRight size={18} />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartJourney;
