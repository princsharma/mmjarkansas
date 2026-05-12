"use client";

import Image from "next/image";
import Marquee from "@/components/motion/Marquee";

const TOP_ROW = [
  { src: "/assets/trust/partner-1.svg", label: "HIPAA Compliant" },
  { src: "/assets/trust/partner-2.svg", label: "Arkansas Department of Health" },
  { src: "/assets/trust/partner-3.svg", label: "Amendment 98 verified" },
  { src: "/assets/trust/partner-4.svg", label: "Telehealth Secure" },
  { src: "/assets/trust/partner-5.svg", label: "Money-back Guarantee" },
  { src: "/assets/trust/partner-6.svg", label: "AR-Licensed Physicians" },
];

const BOTTOM_ROW = [
  { src: "/assets/trust/partner-2.svg", label: "Arkansas Department of Health" },
  { src: "/assets/trust/partner-6.svg", label: "AR-Licensed Physicians" },
  { src: "/assets/trust/partner-1.svg", label: "HIPAA Compliant" },
  { src: "/assets/trust/partner-5.svg", label: "Money-back Guarantee" },
  { src: "/assets/trust/partner-3.svg", label: "Amendment 98 verified" },
  { src: "/assets/trust/partner-4.svg", label: "Telehealth Secure" },
];

export function Trust() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="relative bg-white border-y border-[#e5e7eb]"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-16">
        <p
          id="trust-heading"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] text-center mb-10"
        >
          [T] TRUSTED BY ARKANSANS · SECURED BY INDUSTRY STANDARDS
        </p>

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
            style={{
              background:
                "linear-gradient(to right, #ffffff, transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{
              background:
                "linear-gradient(to left, #ffffff, transparent)",
            }}
          />

          <div className="space-y-6">
            <Marquee speed={32} direction="left">
              {TOP_ROW.map((p, i) => (
                <div
                  key={`${p.label}-${i}`}
                  className="flex items-center grayscale opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={p.src}
                    alt={p.label}
                    width={200}
                    height={60}
                  />
                </div>
              ))}
            </Marquee>
            <Marquee speed={36} direction="right">
              {BOTTOM_ROW.map((p, i) => (
                <div
                  key={`${p.label}-${i}-b`}
                  className="flex items-center grayscale opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={p.src}
                    alt={p.label}
                    width={200}
                    height={60}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trust;
