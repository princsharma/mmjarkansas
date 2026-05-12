"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      gsap.set(ref.current, { autoAlpha: visible ? 1 : 0 });
      return;
    }
    gsap.to(ref.current, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 8,
      duration: 0.35,
      ease: "expo.out",
    });
  }, [visible]);

  const onClick = () => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const start = window.scrollY;
    const proxy = { value: start };
    gsap.to(proxy, {
      value: 0,
      duration: 0.8,
      ease: "expo.inOut",
      onUpdate: () => window.scrollTo(0, proxy.value),
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      style={{ opacity: 0, visibility: "hidden" }}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-accent)] text-[#033c3f] shadow-[0_24px_60px_-28px_rgba(3,60,63,0.45)] hover:scale-105 transition-transform"
    >
      <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
        Top
      </span>
    </button>
  );
}

export default BackToTop;
