"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import QueryForm from "@/components/contact/queryForm";
import { SITE_CONFIG } from "@/lib/seo";

export function ContactPageContent() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex-1 relative bg-white"
      aria-label="Contact page content"
    >
      <section
        className="relative isolate text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #033c3f 0%, #002124 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage: "url(/assets/hero/diamond-pattern.svg)",
            backgroundRepeat: "repeat",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-24 lg:py-32">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)] mb-6">
            [C] CONTACT US
          </p>
          <h1
            className="heading-primary max-w-[20ch]"
            style={{ color: "#ffffff" }}
          >
            We&apos;re here to help. <span className="italic text-[var(--color-accent)]">Anytime.</span>
          </h1>
          <p className="mt-6 max-w-[55ch] text-[rgba(255,255,255,0.85)] text-lg leading-relaxed">
            Whether you have a question about Arkansas Amendment 98, need
            help with your ADH application, or want to schedule your
            telehealth evaluation — an Arkansas patient advocate is ready.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4 space-y-8">
            <ContactRow
              icon={<Phone size={18} />}
              label="PHONE"
              primary={SITE_CONFIG.phone}
              href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
              footnote="Mon-Fri 8am-8pm · Sat 9am-5pm CST"
            />
            <ContactRow
              icon={<Mail size={18} />}
              label="EMAIL"
              primary={SITE_CONFIG.email}
              href={`mailto:${SITE_CONFIG.email}`}
              footnote="We respond within one business hour."
            />
            <ContactRow
              icon={<MapPin size={18} />}
              label="SERVICE AREA"
              primary="All 75 Arkansas Counties"
              footnote="100% online telehealth — no in-person visit required."
            />
            <ContactRow
              icon={<Clock size={18} />}
              label="TURNAROUND"
              primary="24-hour average"
              footnote="From application submission to physician decision."
            />
          </div>

          <div className="lg:col-span-8">
            <QueryForm />
          </div>
        </div>
      </section>
    </main>
  );
}

type ContactRowProps = {
  icon: React.ReactNode;
  label: string;
  primary: string;
  href?: string;
  footnote: string;
};

function ContactRow({ icon, label, primary, href, footnote }: ContactRowProps) {
  const PrimaryNode = href ? (
    <a
      href={href}
      className="text-xl lg:text-2xl text-[var(--color-heading)] hover:text-[var(--color-accent)] transition-colors"
      style={{
        fontFamily: "var(--font-sans-display), system-ui, sans-serif",
        fontWeight: 600,
      }}
    >
      {primary}
    </a>
  ) : (
    <span
      className="text-xl lg:text-2xl text-[var(--color-heading)]"
      style={{
        fontFamily: "var(--font-sans-display), system-ui, sans-serif",
        fontWeight: 600,
      }}
    >
      {primary}
    </span>
  );

  return (
    <div className="space-y-2 border-l-2 border-[var(--color-accent)] pl-5">
      <div className="flex items-center gap-3 text-[var(--color-accent)]">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
          {label}
        </span>
      </div>
      {PrimaryNode}
      <p className="text-sm text-[var(--color-muted)]">{footnote}</p>
    </div>
  );
}

export default ContactPageContent;
