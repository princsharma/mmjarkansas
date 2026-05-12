"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PinnedSteps from "@/components/motion/PinnedSteps";
import { STEPS } from "@/lib/content";

export function Steps() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(
        "[data-step-card]"
      );
      if (!cards?.length) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(cards, { opacity: 1, y: 0 });
            return;
          }
          gsap.set(cards, { opacity: 0, y: 24 });
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="steps"
      aria-labelledby="steps-heading"
      className="relative bg-[#f6faf8]"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 pt-24 lg:pt-32 pb-10">
        <header className="max-w-[60ch] mb-14 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            [H] HOW IT WORKS
          </p>
          <h2
            id="steps-heading"
            className="heading-primary"
            style={{ color: "var(--color-heading)" }}
          >
            Four steps. Roughly <span className="italic text-[var(--color-accent)]">two days.</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            From application to certification — here&apos;s exactly what
            happens between you and your Arkansas Medical Marijuana Card.
          </p>
        </header>
      </div>

      <PinnedSteps
        className="relative overflow-hidden pb-24 lg:pb-32"
        trackClassName="flex gap-6 px-5 lg:px-10"
      >
        {STEPS.map((step) => (
          <article
            key={step.index}
            data-step-card
            className="relative shrink-0 bg-white border border-[#e5e7eb] p-8 lg:p-10"
            style={{
              width: "min(92vw, 480px)",
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
              boxShadow: "0 24px 60px -28px rgba(3, 60, 63, 0.18)",
            }}
          >
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 w-40 h-40 pointer-events-none"
              style={{ opacity: 0.18 }}
            >
              <svg
                viewBox="0 0 160 160"
                width="160"
                height="160"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <polygon
                  points="80,8 152,80 80,152 8,80"
                  fill="none"
                  stroke="#20B780"
                  strokeWidth="1.5"
                />
                <polygon
                  points="80,38 122,80 80,122 38,80"
                  fill="#20B780"
                  fillOpacity="0.18"
                />
              </svg>
            </div>

            <p
              style={{
                fontFamily:
                  "var(--font-sans-display), system-ui, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(4rem, 9vw, 7rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.05em",
                color: "var(--color-accent)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {step.index}
            </p>

            <div className="h-px w-12 bg-[var(--color-accent)] my-6" />

            <h3
              className="heading-secondary mb-4"
              style={{ color: "var(--color-heading)" }}
            >
              {step.title}
            </h3>
            <p className="text-[var(--color-body)] leading-relaxed">
              {step.body}
            </p>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              STEP {step.index} / 04
            </p>
          </article>
        ))}
      </PinnedSteps>
    </section>
  );
}

export default Steps;
