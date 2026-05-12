"use client";

import { ArrowDown } from "lucide-react";
import EmeraldOrb from "@/components/motion/EmeraldOrb";
import SplitText from "@/components/motion/SplitText";
import FormWrapper from "@/components/landing/formwrapper";

const KPI = [
  { value: "98%", label: "APPROVED" },
  { value: "24 HR", label: "TURNAROUND" },
  { value: "5,000+", label: "AR PATIENTS" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-white"
      data-section="hero"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, #f6faf8 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "url(/assets/hero/diamond-pattern.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "url(/assets/hero/grain.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          mixBlendMode: "multiply",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -z-10 left-[10%] top-[20%] w-[680px] h-[680px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(32,183,128,0.18), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 pt-16 pb-20 lg:pt-24 lg:pb-28 relative">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-6 space-y-8 relative z-10">
            <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              ARKANSAS · AMENDMENT 98
            </span>

            <h1
              style={{
                color: "var(--color-heading)",
                fontFamily:
                  "var(--font-sans-display), system-ui, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
              }}
            >
              <SplitText as="span" className="block">
                Apply for Your
              </SplitText>
              <SplitText
                as="span"
                delay={0.3}
                className="block italic text-[var(--color-accent)]"
              >
                Arkansas
              </SplitText>
              <SplitText as="span" delay={0.55} className="block">
                Medical Marijuana Card
              </SplitText>
            </h1>

            <div
              aria-hidden="true"
              className="h-px w-32 bg-[var(--color-accent)]"
            />

            <p className="max-w-[50ch] text-[var(--color-muted)] text-lg leading-relaxed">
              Get evaluated by Arkansas-licensed physicians and apply for
              your medical marijuana card online through our secure,
              HIPAA-compliant telehealth platform.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#form-section"
                className="group relative inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]"
              >
                <span className="opacity-70">[02]</span>
                Read the Process
                <ArrowDown size={16} />
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#e5e7eb] max-w-md">
              {KPI.map((kpi) => (
                <div key={kpi.label}>
                  <p
                    className="font-mono text-sm tabular-nums"
                    style={{
                      color: "var(--color-brand-dark, #033c3f)",
                      fontFamily:
                        "var(--font-sans-display), system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {kpi.value}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-muted)] mt-1">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono uppercase tracking-[0.18em] text-[var(--color-muted)]">
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                HIPAA-COMPLIANT
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                MONEY-BACK GUARANTEE
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                AR-LICENSED DOCTORS
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -right-6 lg:-right-20 -top-10 -z-0 pointer-events-none">
              <EmeraldOrb size={360} />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between gap-4 mb-4 px-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#033c3f]">
                  ISSUE No. 01
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  THE NATURAL STATE
                </span>
              </div>
              <FormWrapper />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
