"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const HERO_REVIEW = {
  quote:
    "The process was painless and respectful. My doctor actually listened to my chronic pain history before approving me. My card arrived within the week.",
  author: "Sarah K.",
  city: "Little Rock, AR",
  date: "March 2026",
  stars: 5,
};

const REVIEWS = [
  {
    quote:
      "I was nervous about doing the appointment online but it felt as personal as any in-person visit I've had in Fayetteville.",
    author: "Jordan M.",
    city: "Fayetteville, AR",
    date: "February 2026",
    stars: 5,
  },
  {
    quote:
      "After years of fibromyalgia, finally a clinician who took the time to explain how medical cannabis fits into a treatment plan.",
    author: "Brittany L.",
    city: "Fort Smith, AR",
    date: "April 2026",
    stars: 5,
  },
  {
    quote:
      "Affordable, fast, and the patient advocate walked me through the ADH paperwork step by step. Highly recommend.",
    author: "Marcus T.",
    city: "Jonesboro, AR",
    date: "January 2026",
    stars: 5,
  },
  {
    quote:
      "Got my certification approved in 24 hours and the team followed up to make sure I submitted everything to Arkansas Department of Health correctly.",
    author: "Elena R.",
    city: "Little Rock, AR",
    date: "March 2026",
    stars: 5,
  },
];

export function Reviews() {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const onDown = (e: PointerEvent) => {
      setIsDragging(true);
      strip.setPointerCapture(e.pointerId);
      startX.current = e.clientX;
      scrollStart.current = strip.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX.current;
      strip.scrollLeft = scrollStart.current - dx;
    };
    const onUp = (e: PointerEvent) => {
      setIsDragging(false);
      if (strip.hasPointerCapture(e.pointerId)) {
        strip.releasePointerCapture(e.pointerId);
      }
    };

    strip.addEventListener("pointerdown", onDown);
    strip.addEventListener("pointermove", onMove);
    strip.addEventListener("pointerup", onUp);
    strip.addEventListener("pointercancel", onUp);

    return () => {
      strip.removeEventListener("pointerdown", onDown);
      strip.removeEventListener("pointermove", onMove);
      strip.removeEventListener("pointerup", onUp);
      strip.removeEventListener("pointercancel", onUp);
    };
  }, [isDragging]);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="relative bg-white"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28">
        <header className="max-w-[60ch] mb-14 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            [R] PATIENT REVIEWS · 4.9 ★ FROM ARKANSAS PATIENTS
          </p>
          <h2
            id="reviews-heading"
            className="heading-primary"
            style={{ color: "var(--color-heading)" }}
          >
            Real Arkansans. <span className="italic text-[var(--color-accent)]">Real outcomes.</span>
          </h2>
        </header>

        <article className="relative max-w-4xl mx-auto text-center px-4">
          <h3 className="sr-only">
            Featured review from {HERO_REVIEW.author}
          </h3>
          <span
            aria-hidden="true"
            className="block leading-none mb-2"
            style={{
              fontFamily:
                "var(--font-sans-display), system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(6rem, 14vw, 12rem)",
              color: "var(--color-accent)",
              lineHeight: 0.7,
            }}
          >
            &ldquo;
          </span>
          <blockquote
            className="text-2xl lg:text-3xl leading-snug -mt-8"
            style={{
              fontFamily:
                "var(--font-sans-display), system-ui, sans-serif",
              fontStyle: "italic",
              fontWeight: 500,
              color: "var(--color-heading)",
            }}
          >
            {HERO_REVIEW.quote}
          </blockquote>
          <footer className="mt-8 space-y-2">
            <div
              role="img"
              className="flex justify-center gap-1 text-[var(--color-accent)]"
              aria-label={`${HERO_REVIEW.stars} out of 5 stars`}
            >
              {Array.from({ length: HERO_REVIEW.stars }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="currentColor"
                  strokeWidth={0}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              {HERO_REVIEW.author} · {HERO_REVIEW.city} · {HERO_REVIEW.date}
            </p>
          </footer>
        </article>

        <div className="mt-16 pt-12 border-t border-[#e5e7eb]">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-6">
            DRAG TO EXPLORE MORE REVIEWS →
          </p>
          <div
            ref={stripRef}
            className="flex gap-5 overflow-x-auto pb-6 cursor-grab active:cursor-grabbing select-none scrollbar-thin"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "thin",
            }}
            role="region"
            aria-label="More patient reviews"
          >
            {REVIEWS.map((r, i) => (
              <article
                key={`${r.author}-${i}`}
                className="shrink-0 w-[320px] lg:w-[380px] bg-white border border-[#e5e7eb] p-7 space-y-4"
                style={{ scrollSnapAlign: "start" }}
              >
                <h3 className="sr-only">Review from {r.author}</h3>
                <div
                  role="img"
                  className="flex gap-1 text-[var(--color-accent)]"
                  aria-label={`${r.stars} out of 5 stars`}
                >
                  {Array.from({ length: r.stars }).map((_, i2) => (
                    <Star
                      key={i2}
                      size={14}
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="text-[var(--color-body)] leading-relaxed text-sm">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <footer className="pt-2 border-t border-[#e5e7eb]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    {r.author}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    {r.city} · {r.date}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
