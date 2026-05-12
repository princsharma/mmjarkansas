"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || touch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-none-active");

    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3" });

    let visible = false;
    const showCursor = () => {
      if (visible) return;
      visible = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 });
    };
    const hideCursor = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 });
    };

    const onMove = (e: MouseEvent) => {
      showCursor();
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 1.6,
        backgroundColor: "rgba(32, 183, 128, 0.2)",
        borderColor: "rgba(32, 183, 128, 0.9)",
        duration: 0.25,
        ease: "expo.out",
      });
    };
    const onLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "rgba(32, 183, 128, 0)",
        borderColor: "rgba(3, 60, 63, 0.55)",
        duration: 0.25,
        ease: "expo.out",
      });
    };

    const interactiveSelector =
      'a, button, [data-cursor="hover"], input, select, textarea, [role="button"]';

    const bindInteractive = (el: Element) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    };
    const unbindInteractive = (el: Element) => {
      el.removeEventListener("mouseenter", onEnterInteractive);
      el.removeEventListener("mouseleave", onLeaveInteractive);
    };

    const allInteractive = document.querySelectorAll(interactiveSelector);
    allInteractive.forEach(bindInteractive);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof HTMLElement)) return;
          if (n.matches?.(interactiveSelector)) bindInteractive(n);
          n.querySelectorAll?.(interactiveSelector).forEach(bindInteractive);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mouseenter", showCursor);
      observer.disconnect();
      allInteractive.forEach(unbindInteractive);
      document.documentElement.classList.remove("cursor-none-active");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          border: "1.5px solid rgba(3, 60, 63, 0.55)",
          borderRadius: "9999px",
          backgroundColor: "rgba(32, 183, 128, 0)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          mixBlendMode: "normal",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          background: "#20B780",
          borderRadius: "9999px",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: 0,
        }}
      />
    </>
  );
}

export default CustomCursor;
