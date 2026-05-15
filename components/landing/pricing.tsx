"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check, ArrowRight } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import CountUp from "@/components/motion/CountUp";

const FEATURES = [
  "100% online telehealth evaluation",
  "Arkansas-licensed physician review",
  "HIPAA-compliant secure platform",
  "Written certification if approved",
  "Money-back guarantee if not approved",
  "Patient-advocate support for ADH submission",
  "Annual renewal reminders",
];

export function Pricing() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const card = sectionRef.current?.querySelector("[data-pricing-card]");
      if (!card) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) return;
          gsap.fromTo(
            card,
            { scale: 0.96, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: "expo.out",
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
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28">
        <header className="max-w-[60ch] mb-14 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            [P] STRAIGHTFORWARD PRICING
          </p>
          <h2
            id="pricing-heading"
            className="heading-primary"
            style={{ color: "var(--color-heading)" }}
          >
            One transparent price. <span className="italic text-[var(--color-accent)]">No surprises.</span>
          </h2>
        </header>

        <article
          data-pricing-card
          className="relative bg-white border border-[#e5e7eb] p-8 lg:p-14"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)",
            boxShadow: "0 24px 60px -28px rgba(3, 60, 63, 0.18)",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-accent)]"
          />

          <div className="grid gap-10 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                ARKANSAS PATIENT PLAN
              </p>
              <h3
                className="heading-secondary"
                style={{ color: "var(--color-heading)" }}
              >
                Everything you need to apply, all in one place.
              </h3>
              <ul className="space-y-3 pt-2">
                {FEATURES.map((f, i) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[var(--color-body)]"
                  >
                    <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.2em] pt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Check
                      size={16}
                      className="text-[var(--color-accent)] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#f6faf8] border border-[#e5e7eb] p-8 lg:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  PHYSICIAN EVALUATION FEE
                </p>
                <div className="mt-4 flex items-start gap-1">
                  <span
                    style={{
                      fontFamily:
                        "var(--font-sans-display), system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                      color: "var(--color-heading)",
                      lineHeight: 1,
                      marginTop: "0.4em",
                    }}
                  >
                    $
                  </span>
                  <span
                    style={{
                      fontFamily:
                        "var(--font-sans-display), system-ui, sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(3.5rem, 8vw, 6rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 0.95,
                      color: "var(--color-heading)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    <CountUp to={199} />
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  one-time · billed only if approved
                </p>

                <div className="my-6 h-px w-full bg-[#e5e7eb]" />

                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Plus a separate <strong>$50 state application fee</strong>{" "}
                  paid directly to the Arkansas Department of Health Medical
                  Marijuana Section.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  100% MONEY-BACK GUARANTEE
                </div>

                <div className="mt-8">
                  <Magnetic>
                    <a
                      href="#form-section"
                      title="Apply for your Arkansas medical marijuana card"
                      className="inline-flex w-full items-center justify-between gap-3 rounded-full bg-[var(--color-accent)] px-6 py-4 text-sm font-mono uppercase tracking-[0.2em] text-white hover:scale-[1.02] transition-transform"
                    >
                      <span>
                        <span className="opacity-70">[03]</span> Apply Now
                      </span>
                      <ArrowRight size={18} />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Pricing;
