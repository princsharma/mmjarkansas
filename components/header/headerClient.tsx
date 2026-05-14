"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SITE_CONFIG } from "@/lib/seo";

type NavItem = { label: string; href: string; index: string };

export function HeaderClient({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLUListElement | null>(null);

  useGSAP(
    () => {
      const el = headerRef.current;
      if (!el) return;
      gsap.from(el, {
        y: -40,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
        delay: 0.05,
      });
    },
    { scope: headerRef }
  );

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const panel = panelRef.current;
    const links = linksRef.current?.querySelectorAll("[data-mobile-link]");
    if (!panel) return;
    gsap.fromTo(
      panel,
      { xPercent: -100 },
      { xPercent: 0, duration: 0.55, ease: "expo.out" }
    );
    if (links?.length) {
      gsap.from(links, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.06,
        delay: 0.25,
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb]"
      data-cursor="hover"
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 h-[72px] flex items-center gap-6">
        <Link
          href="/"
          aria-label={`${SITE_CONFIG.name} – home`}
          className="flex items-center shrink-0"
        >
          <Image
            src="/assets/arkansas-logo.webp"
            alt={SITE_CONFIG.name}
            width={176}
            height={60}
            priority
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-8 mx-auto"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-[var(--color-heading)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="font-mono text-[10px] text-[var(--color-muted)] mr-1 tracking-[0.2em]">
                {item.index}
              </span>
              {item.label}
              <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
            className="hidden md:inline-flex items-center gap-2 font-mono text-xs text-[var(--color-heading)] hover:text-[var(--color-accent)] tracking-[0.12em]"
          >
            <Phone size={14} aria-hidden="true" />
            <span className="tabular-nums">{SITE_CONFIG.phone}</span>
          </a>
          <Link
            href="#form-section"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#033c3f] px-5 py-2.5 text-xs font-mono uppercase tracking-[0.18em] text-white hover:bg-[#002124] transition-colors"
          >
            <span className="opacity-70">[01]</span> Apply Now
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#e5e7eb] text-[var(--color-heading)]"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            ref={panelRef}
            className="absolute inset-0 flex flex-col"
            style={{
              background:
                "linear-gradient(135deg, #033c3f 0%, #002124 100%)",
            }}
          >
            <div className="flex items-center justify-between px-5 h-[72px] border-b border-white/10">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-accent)]">
                MENU
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/15 text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <ul
              ref={linksRef}
              className="flex-1 overflow-y-auto px-6 py-10 space-y-1"
            >
              {items.map((item) => (
                <li key={item.href} data-mobile-link>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-3 border-b border-white/10"
                  >
                    <span className="font-mono text-xs text-[var(--color-accent)] tracking-[0.2em]">
                      {item.index}
                    </span>
                    <span
                      className="text-white"
                      style={{
                        fontFamily:
                          "var(--font-sans-display), system-ui, sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(2rem, 7vw, 3rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-6 py-6 border-t border-white/10 space-y-4">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-2 font-mono text-sm text-white tracking-[0.12em]"
              >
                <Phone size={16} aria-hidden="true" />
                <span className="tabular-nums">{SITE_CONFIG.phone}</span>
              </a>
              <Link
                href="#form-section"
                onClick={() => setOpen(false)}
                className="block text-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-xs font-mono uppercase tracking-[0.2em] text-[#033c3f] font-semibold"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default HeaderClient;
