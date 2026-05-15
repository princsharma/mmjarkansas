"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { AR_CONDITIONS } from "@/lib/formSchema";

const CONDITIONS = AR_CONDITIONS.filter((c) => c !== "Other");

export function Conditions() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll("[data-cond-card]");
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
          gsap.set(cards, { opacity: 0, y: 28 });
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
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
      id="conditions"
      aria-labelledby="conditions-heading"
      className="relative bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28">
        <header className="max-w-[60ch] mb-14 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            [C] AMENDMENT 98 QUALIFYING CONDITIONS
          </p>
          <h2
            id="conditions-heading"
            className="heading-primary"
            style={{ color: "var(--color-heading)" }}
          >
            Eighteen qualifying conditions. <span className="italic text-[var(--color-accent)]">One path forward.</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            If you have been diagnosed with any of the conditions below,
            you may qualify for an Arkansas Medical Marijuana Card under
            Amendment 98.
          </p>
        </header>

        <div className="grid gap-px bg-[#e5e7eb] sm:grid-cols-2 lg:grid-cols-3 border border-[#e5e7eb]">
          {CONDITIONS.map((cond, i) => {
            const idx = String(i + 1).padStart(2, "0");
            return (
              <article
                key={cond}
                data-cond-card
                className="group relative bg-white p-7 lg:p-8 transition-colors hover:bg-[#f6faf8]"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#e5e7eb] group-hover:w-[4px] group-hover:bg-[var(--color-accent)] transition-all duration-300"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] mb-6">
                  C-{idx}
                </p>
                <h3
                  className="heading-tertiary group-hover:text-[var(--color-accent)] transition-colors"
                  style={{ color: "var(--color-heading)" }}
                >
                  {cond}
                </h3>
                {cond === "Intractable Pain" && (
                  <p className="mt-2 text-xs text-[var(--color-muted)] leading-relaxed">
                    Unrelieved by standard medical treatments and
                    medications for more than 6 months.
                  </p>
                )}
                {cond === "Severe and persistent muscle spasms" && (
                  <p className="mt-2 text-xs text-[var(--color-muted)] leading-relaxed">
                    Including multiple sclerosis.
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-end">
          <p className="lg:col-span-7 max-w-[60ch] text-sm text-[var(--color-muted)] leading-relaxed">
            Don&apos;t see your condition? Speak with one of our
            Arkansas-licensed physicians — additional conditions may qualify
            under physician discretion.
          </p>
          <div className="lg:col-span-5 lg:justify-self-end">
            <a
              href="#form-section"
              title="Check your eligibility for an Arkansas medical marijuana card"
              className="inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-7 py-4 text-xs font-mono uppercase tracking-[0.2em] text-white hover:scale-[1.02] transition-transform"
              style={{
                boxShadow: "0 20px 40px -24px rgba(32, 183, 128, 0.6)",
              }}
            >
              <span className="opacity-70">[05]</span>
              Check Your Eligibility
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Conditions;
