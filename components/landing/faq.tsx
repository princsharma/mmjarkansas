"use client";

import { useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/content";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28">
        <header className="max-w-[60ch] mb-14 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            [F] FREQUENTLY ASKED QUESTIONS
          </p>
          <h2
            id="faq-heading"
            className="heading-primary"
            style={{ color: "var(--color-heading)" }}
          >
            Eight answers <span className="italic text-[var(--color-accent)]">every Arkansas patient asks.</span>
          </h2>
        </header>

        <div className="border-t border-[#e5e7eb]">
          {FAQ_ITEMS.map((item, i) => (
            <FAQRow
              key={item.q}
              index={i}
              question={item.q}
              answer={item.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type FAQRowProps = {
  index: number;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
};

function FAQRow({ index, question, answer, open, onToggle }: FAQRowProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="border-b border-[#e5e7eb]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-body-${index}`}
        className="w-full grid grid-cols-12 gap-4 items-baseline py-7 lg:py-8 text-left group"
      >
        <span className="col-span-2 lg:col-span-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Q-{String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="col-span-9 lg:col-span-10 heading-tertiary group-hover:text-[var(--color-accent)] transition-colors"
          style={{ color: "var(--color-heading)" }}
        >
          {question}
        </span>
        <span className="col-span-1 flex justify-end">
          <ChevronRight
            size={20}
            className="text-[var(--color-accent)] transition-transform duration-300"
            style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
            }}
            aria-hidden="true"
          />
        </span>
      </button>
      <div
        id={`faq-body-${index}`}
        ref={bodyRef}
        role="region"
        aria-hidden={!open}
        style={{
          maxHeight: open ? "600px" : "0px",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition:
            "max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease",
        }}
      >
        <div className="grid grid-cols-12 gap-4 pb-8">
          <div className="col-span-12 lg:col-start-2 lg:col-span-10">
            <p className="text-[var(--color-body)] leading-relaxed max-w-[70ch]">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
