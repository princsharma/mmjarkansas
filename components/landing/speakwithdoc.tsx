"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Phone } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import { SITE_CONFIG } from "@/lib/seo";

export function SpeakWithDoc() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const digits = sectionRef.current?.querySelectorAll("[data-digit]");
      const rule = sectionRef.current?.querySelector("[data-rule]");
      if (!digits?.length) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(digits, { opacity: 1, y: 0, rotationX: 0 });
            if (rule) gsap.set(rule, { scaleX: 1 });
            return;
          }
          gsap.set(digits, { opacity: 0, y: 30, rotationX: 80 });
          gsap.to(digits, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          });
          if (rule) {
            gsap.fromTo(
              rule,
              { scaleX: 0, transformOrigin: "left center" },
              {
                scaleX: 1,
                duration: 1.2,
                ease: "expo.out",
                delay: 0.6,
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 75%",
                },
              }
            );
          }
        }
      );
    },
    { scope: sectionRef }
  );

  const digits = SITE_CONFIG.phone.split("");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="speakwithdoc-heading"
      className="relative isolate overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #033c3f 0%, #002124 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side at 75% 50%, rgba(32,183,128,0.22), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              [SD] SPEAK WITH A DOCTOR
            </p>
            <h2
              id="speakwithdoc-heading"
              className="heading-primary"
              style={{
                color: "#ffffff",
                fontFamily:
                  "var(--font-sans-display), system-ui, sans-serif",
                fontStyle: "italic",
              }}
            >
              Speak with a licensed Arkansas physician <span className="not-italic text-[var(--color-accent)]">today.</span>
            </h2>
            <p className="text-[rgba(255,255,255,0.85)] max-w-[55ch] text-lg leading-relaxed">
              No automated systems. Just real conversations with a real
              physician licensed by the Arkansas State Medical Board.
            </p>

            <div className="space-y-4">
              <div
                aria-label={SITE_CONFIG.phone}
                className="flex items-center gap-[2px]"
                style={{
                  fontFamily:
                    "var(--font-sans-display), system-ui, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.5rem, 7vw, 5rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: "#ffffff",
                  fontVariantNumeric: "tabular-nums",
                  perspective: "600px",
                }}
              >
                {digits.map((d, i) => (
                  <span
                    key={`${d}-${i}`}
                    data-digit
                    style={{ display: "inline-block" }}
                    aria-hidden="true"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <span
                aria-hidden="true"
                data-rule
                className="block h-px w-48 bg-[var(--color-accent)]"
              />
            </div>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <Magnetic>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-7 py-5 text-sm font-mono uppercase tracking-[0.2em] text-[#033c3f] hover:scale-[1.02] transition-transform font-semibold"
              >
                <Phone size={18} />
                <span>
                  <span className="opacity-60">[05]</span> Call Now
                </span>
              </a>
            </Magnetic>
            <p className="mt-4 text-xs font-mono uppercase tracking-[0.18em] text-[rgba(255,255,255,0.7)]">
              MON-FRI 8AM-8PM · SAT 9AM-5PM CST
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpeakWithDoc;
