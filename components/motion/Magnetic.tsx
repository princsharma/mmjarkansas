"use client";

import { useRef } from "react";
import gsap from "gsap";

type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({
  children,
  strength = 40,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    )
      return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const ratioX = Math.max(Math.min(x / rect.width, 1), -1);
    const ratioY = Math.max(Math.min(y / rect.height, 1), -1);
    gsap.to(el, {
      x: ratioX * strength,
      y: ratioY * strength,
      duration: 0.4,
      ease: "expo.out",
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.35, ease: "expo.out" });
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </span>
  );
}

export default Magnetic;
