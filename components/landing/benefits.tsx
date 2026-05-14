"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const BENEFITS = [
  {
    title: "Legal Protection Under Amendment 98",
    body: "Your Arkansas Medical Marijuana Card provides legal protection to purchase medical cannabis from any licensed Arkansas dispensary.",
  },
  {
    title: "Higher Purchase & Possession Limits",
    body: "Cardholders may purchase or possess up to 2.5 ounces of usable cannabis over any 14-day period from licensed AR dispensaries.",
  },
  {
    title: "Lower Total Cost of Care",
    body: "Many Arkansas dispensaries offer medical-patient pricing and exemptions on certain local taxes that reduce out-of-pocket cost.",
  },
  {
    title: "Caregiver Designation Available",
    body: "Designate a registered caregiver to purchase product on your behalf — particularly valuable for elderly or mobility-limited patients.",
  },
  {
    title: "Reciprocity for Visiting Patients",
    body: "Arkansas accepts qualifying out-of-state medical cannabis cards for visiting patients for up to 90 days per visit.",
  },
  {
    title: "Annual Renewal, Year-Round Access",
    body: "Your AR Medical Marijuana Card is valid for one full year — and we send renewal reminders so you never lose access.",
  },
];

export function Benefits() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const rows = sectionRef.current?.querySelectorAll("[data-benefit-row]");
      if (!rows?.length) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(rows, { opacity: 1, y: 0 });
            return;
          }
          rows.forEach((row) => {
            const bar = row.querySelector("[data-benefit-bar]");
            gsap.fromTo(
              row,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 85%",
                },
              }
            );
            if (bar) {
              gsap.fromTo(
                bar,
                { scaleY: 0, transformOrigin: "top center" },
                {
                  scaleY: 1,
                  duration: 0.9,
                  ease: "expo.out",
                  scrollTrigger: {
                    trigger: row,
                    start: "top 80%",
                  },
                }
              );
            }
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="benefits"
      aria-labelledby="benefits-heading"
      className="relative bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                [B] BENEFITS OF A CARD
              </p>
              <h2
                id="benefits-heading"
                className="heading-primary"
                style={{ color: "var(--color-heading)" }}
              >
                Six reasons<br />
                <span className="italic text-[var(--color-accent)]">it matters.</span>
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed">
                More than a piece of paper — your Arkansas Medical Marijuana
                Card unlocks legal protections, higher limits, and a clearer
                path to consistent treatment.
              </p>
              <div className="h-px w-16 bg-[var(--color-accent)]" />
              <div className="pt-2">
                <a
                  href="#form-section"
                  className="inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-7 py-4 text-xs font-mono uppercase tracking-[0.2em] text-white hover:scale-[1.02] transition-transform"
                  style={{
                    boxShadow: "0 20px 40px -24px rgba(32, 183, 128, 0.6)",
                  }}
                >
                  <span className="opacity-70">[07]</span>
                  Claim Your Card
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-8 space-y-2">
            {BENEFITS.map((b, i) => (
              <li
                key={b.title}
                data-benefit-row
                className="relative grid grid-cols-12 gap-4 lg:gap-6 items-start py-8 border-b border-[#e5e7eb] last:border-b-0"
              >
                <div className="col-span-2 lg:col-span-2 relative">
                  <span
                    aria-hidden="true"
                    data-benefit-bar
                    className="absolute -left-1 top-0 bottom-0 w-[3px] bg-[var(--color-accent)]"
                  />
                  <span
                    style={{
                      fontFamily:
                        "var(--font-sans-display), system-ui, sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.04em",
                      color: "var(--color-heading)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-10 lg:col-span-10 space-y-2">
                  <h3
                    className="heading-tertiary"
                    style={{ color: "var(--color-heading)" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-[var(--color-body)] leading-relaxed max-w-[60ch]">
                    {b.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Benefits;
