"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DOCTORS = [
  {
    name: "Dr. Marcus Whitfield, MD",
    credentials: "AR LICENSE · INT MED · 18 YRS",
    bio: "Internal medicine specialist with 18 years guiding Arkansas patients through chronic-pain and qualifying-condition evaluations.",
    image: "/assets/doctors/doc-1.svg",
  },
  {
    name: "Dr. Lena Castillo, DO",
    credentials: "AR LICENSE · FAMILY MED · 12 YRS",
    bio: "Family physician focused on PTSD, fibromyalgia, and neurological conditions across central Arkansas.",
    image: "/assets/doctors/doc-2.svg",
  },
  {
    name: "Dr. James Beauregard, MD",
    credentials: "AR LICENSE · ONCOLOGY · 22 YRS",
    bio: "Board-certified oncologist serving cancer and cachexia patients with compassionate cannabis-supportive care.",
    image: "/assets/doctors/doc-3.svg",
  },
  {
    name: "Dr. Priya Ramaswamy, MD",
    credentials: "AR LICENSE · NEUROLOGY · 14 YRS",
    bio: "Neurologist specializing in seizure disorders, multiple sclerosis spasms, and intractable pain protocols.",
    image: "/assets/doctors/doc-4.svg",
  },
];

export function Doctors() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll("[data-doc-card]");
      if (!cards?.length) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            gsap.set(cards, { opacity: 1, rotationY: 0 });
            return;
          }
          gsap.set(cards, { opacity: 0, rotationY: -8 });
          gsap.to(cards, {
            opacity: 1,
            rotationY: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.1,
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
      id="doctors"
      aria-labelledby="doctors-heading"
      className="relative bg-[#f6faf8]"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28">
        <header className="max-w-[60ch] mb-14 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            [D] OUR PHYSICIANS
          </p>
          <h2
            id="doctors-heading"
            className="heading-primary"
            style={{ color: "var(--color-heading)" }}
          >
            Arkansas-licensed. <span className="italic text-[var(--color-accent)]">Patient-first.</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            Every evaluation on our platform is conducted by a physician
            licensed by the Arkansas State Medical Board.
          </p>
        </header>

        <div className="grid gap-px bg-[#e5e7eb] sm:grid-cols-2 border border-[#e5e7eb]">
          {DOCTORS.map((doc, i) => (
            <article
              key={doc.name}
              data-doc-card
              className="group relative bg-white overflow-hidden"
              style={{ perspective: "800px" }}
            >
              <div className="grid grid-cols-5 gap-0">
                <div className="col-span-2 relative aspect-square">
                  <Image
                    src={doc.image}
                    alt={`Portrait of ${doc.name}`}
                    fill
                    sizes="(max-width: 768px) 40vw, 240px"
                    className="object-cover"
                  />
                </div>
                <div className="col-span-3 p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] mb-3">
                      DOC · {String(i + 1).padStart(2, "0")} / {DOCTORS.length.toString().padStart(2, "0")}
                    </p>
                    <h3
                      className="heading-tertiary mb-2"
                      style={{ color: "var(--color-heading)" }}
                    >
                      {doc.name}
                    </h3>
                  </div>
                  <div className="relative overflow-hidden mt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] transition-transform duration-500 group-hover:-translate-y-[120%]">
                      {doc.credentials}
                    </p>
                    <p className="absolute left-0 top-0 translate-y-[120%] text-xs text-[var(--color-body)] leading-relaxed transition-transform duration-500 group-hover:translate-y-0">
                      {doc.bio}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doctors;
