"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function ExpertCare() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const radial = sectionRef.current?.querySelector("[data-radial]");
      const heading = sectionRef.current?.querySelector("[data-heading]");
      const quote = sectionRef.current?.querySelector("[data-quote]");
      if (!radial || !heading || !quote) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) return;
          gsap.fromTo(
            radial,
            { scale: 0.4, opacity: 0 },
            {
              scale: 1.4,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
          gsap.fromTo(
            heading,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
              },
            }
          );
          gsap.fromTo(
            quote,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
              delay: 0.15,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
              },
            }
          );
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="expertcare-heading"
      className="relative isolate overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #033c3f 0%, #002124 100%)",
      }}
    >
      <div
        aria-hidden="true"
        data-radial
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side at 30% 50%, rgba(32,183,128,0.28), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7" data-heading>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] mb-6">
              [X] EXPERT CARE · AR-LICENSED PHYSICIANS
            </p>
            <h2
              id="expertcare-heading"
              className="heading-primary"
              style={{
                color: "#ffffff",
                fontFamily:
                  "var(--font-sans-display), system-ui, sans-serif",
                fontStyle: "italic",
              }}
            >
              Compassionate care from physicians who actually <span className="not-italic text-[var(--color-accent)]">listen.</span>
            </h2>
            <p className="mt-8 max-w-[55ch] text-[rgba(255,255,255,0.85)] text-lg leading-relaxed">
              Every evaluation is conducted by an Arkansas-licensed physician
              over secure, HIPAA-compliant telehealth. No rushed visits. No
              one-size-fits-all answers. Just real conversations about your
              health and whether medical cannabis is right for you.
            </p>
          </div>

          <div
            className="lg:col-span-5 relative pl-8 lg:pl-12"
            data-quote
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-px bg-[var(--color-accent)]"
            />
            <p
              className="text-2xl lg:text-3xl leading-snug"
              style={{
                fontFamily:
                  "var(--font-sans-display), system-ui, sans-serif",
                fontWeight: 500,
                color: "rgba(255,255,255,0.95)",
                fontStyle: "italic",
              }}
            >
              &ldquo;Our job isn&apos;t to push paperwork — it&apos;s to make sure
              every Arkansas patient walks away with a treatment plan they
              actually understand.&rdquo;
            </p>
            <footer className="mt-6 space-y-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Dr. Marcus Whitfield, MD
              </p>
              <p className="text-sm text-[rgba(255,255,255,0.7)]">
                Arkansas State Medical Board · Internal Medicine
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExpertCare;
