"use client";

import CountUp from "@/components/motion/CountUp";

const STATS = [
  { value: 5000, suffix: "+", label: "ARKANSAS PATIENTS CERTIFIED" },
  { value: 98, suffix: "%", label: "APPROVAL RATE" },
  { value: 24, suffix: " HR", label: "AVERAGE TURNAROUND" },
  { value: 1, suffix: " YR", label: "CARD VALIDITY" },
];

export function Stats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative bg-white border-y border-[#e5e7eb]"
    >
      <h2 id="stats-heading" className="sr-only">
        Arkansas patient outcomes
      </h2>
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="relative pl-6"
              style={{
                borderLeft: "1px solid #e5e7eb",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-8 w-[2px] bg-[var(--color-accent)]"
              />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {String(i + 1).padStart(2, "0")} / 04
              </p>
              <div
                className="mt-4"
                style={{
                  fontFamily:
                    "var(--font-sans-display), system-ui, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  color: "var(--color-heading)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <CountUp to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {stat.label}
              </p>
              <span
                aria-hidden="true"
                className="block mt-3 h-px w-12 bg-[var(--color-accent)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
