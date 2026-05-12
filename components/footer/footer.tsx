import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";
import Marquee from "@/components/motion/Marquee";

const QUICK_LINKS = [
  { label: "Apply Now", href: "#form-section" },
  { label: "How It Works", href: "#steps" },
  { label: "Qualifying Conditions", href: "#conditions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Doctors", href: "#doctors" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "/contact-us" },
];

const STATE_PRIDE_TEXT = [
  "THE NATURAL STATE",
  "ARKANSAS",
  "EST 1836",
  "AMENDMENT 98",
  "THE NATURAL STATE",
  "ARKANSAS",
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e7eb] text-[var(--color-body)]">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" aria-label={`${SITE_CONFIG.name} – home`}>
              <Image
                src="/assets/logo.svg"
                alt={SITE_CONFIG.name}
                width={220}
                height={36}
              />
            </Link>
            <p className="max-w-[42ch] text-[var(--color-muted)] leading-relaxed">
              {SITE_CONFIG.name} connects Arkansas patients with licensed
              physicians for HIPAA-compliant telehealth evaluations under
              Amendment 98. We make legal access to medical cannabis simple,
              affordable, and patient-first.
            </p>
            <div className="opacity-90">
              <Image
                src="/assets/arkansas-silhouette.svg"
                alt=""
                width={200}
                height={160}
                aria-hidden="true"
                role="presentation"
              />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-heading)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center gap-3 text-[var(--color-heading)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Phone size={15} className="text-[var(--color-accent)]" />
                  <span className="font-mono tabular-nums tracking-[0.08em]">
                    {SITE_CONFIG.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-3 text-[var(--color-heading)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Mail size={15} className="text-[var(--color-accent)]" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-3 text-[var(--color-muted)]">
                <MapPin size={15} className="text-[var(--color-accent)] mt-0.5" />
                <span>
                  Serving all 75 Arkansas counties via secure telehealth.
                </span>
              </li>
            </ul>
            <div className="pt-2 text-xs text-[var(--color-muted)] leading-relaxed">
              This service provides medical evaluations only. Approved
              certifications are submitted to the Arkansas Department of
              Health Medical Marijuana Section along with the separate $50
              state application fee.
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#e5e7eb] flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            EST. 2016 · ARKANSAS AMENDMENT 98
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
        </div>
      </div>

      <div className="border-t border-[#e5e7eb] py-6 overflow-hidden">
        <Marquee speed={36} direction="left">
          {STATE_PRIDE_TEXT.map((text, i) => (
            <span
              key={`${text}-${i}`}
              className="state-pride-token"
              style={{
                fontFamily:
                  "var(--font-sans-display), system-ui, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.75rem, 9vw, 6rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "transparent",
                WebkitTextStroke: "1.5px #20B780",
                whiteSpace: "nowrap",
              }}
            >
              {text}
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "1ch",
                  textAlign: "center",
                  color: "#20B780",
                  WebkitTextStroke: "0",
                }}
              >
                •
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </footer>
  );
}

export default Footer;
