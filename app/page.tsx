import type { Metadata } from "next";
import Image from "next/image";
import HeaderServer from "@/components/header/headerServer";
import Footer from "@/components/footer/footer";
import Hero from "@/components/landing/hero";
import Stats from "@/components/landing/stats";
import Conditions from "@/components/landing/conditions";
import ExpertCare from "@/components/landing/expertcare";
import Steps from "@/components/landing/steps";
import Pricing from "@/components/landing/pricing";
import Doctors from "@/components/landing/doctors";
import Benefits from "@/components/landing/benefits";
import Reviews from "@/components/landing/reviews";
import Trust from "@/components/landing/trust";
import StartJourney from "@/components/landing/startjourney";
import FAQ from "@/components/landing/faq";
import SpeakWithDoc from "@/components/landing/speakwithdoc";
import EmeraldOrb from "@/components/motion/EmeraldOrb";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo";
import { STEPS, FAQ_ITEMS } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Apply Your Medical Marijuana Card Arkansas",
  description:
    "Start your Arkansas medical marijuana card application online with licensed physicians, secure consultations, and fast support.",
  keywords: [
    "Medical Marijuana Card Arkansas",
    "Arkansas medical marijuana card",
    "Arkansas MMJ card",
    "Amendment 98",
    "Arkansas medical cannabis",
    "online medical marijuana evaluation Arkansas",
    "Arkansas Department of Health medical marijuana",
  ],
  canonicalPath: "/",
});

const medicalOrganizationLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/assets/arkansas-logo.webp`,
  image: `${SITE_CONFIG.url}/assets/og-homepage.svg`,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE_CONFIG.address.locality,
    addressRegion: "AR",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "State",
    name: "Arkansas",
  },
  medicalSpecialty: "Medical Marijuana Certification",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE_CONFIG.phone,
    contactType: "Customer Service",
    areaServed: "US-AR",
    availableLanguage: ["English"],
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_CONFIG.url}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Apply for an Arkansas Medical Marijuana Card",
  description:
    "Apply online for your Arkansas Medical Marijuana Card under Amendment 98 in four steps.",
  totalTime: "PT2D",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "249",
  },
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
};

const REVIEWS_LD = [
  {
    author: "Sarah K.",
    location: "Little Rock, AR",
    rating: 5,
    body: "The process was painless and respectful. My doctor actually listened to my chronic pain history before approving me.",
  },
  {
    author: "Jordan M.",
    location: "Fayetteville, AR",
    rating: 5,
    body: "I was nervous about doing the appointment online but it felt as personal as any in-person visit I've had.",
  },
  {
    author: "Brittany L.",
    location: "Fort Smith, AR",
    rating: 5,
    body: "After years of fibromyalgia, finally a clinician who took the time to explain how medical cannabis fits into a treatment plan.",
  },
  {
    author: "Marcus T.",
    location: "Jonesboro, AR",
    rating: 5,
    body: "Affordable, fast, and the patient advocate walked me through the ADH paperwork step by step.",
  },
];

const medicalBusinessLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  image: `${SITE_CONFIG.url}/assets/og-homepage.svg`,
  telephone: SITE_CONFIG.phone,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE_CONFIG.address.locality,
    addressRegion: "AR",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: REVIEWS_LD.length,
    bestRating: "5",
    worstRating: "1",
  },
  review: REVIEWS_LD.map((r) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: r.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: r.body,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd id="ld-medical-organization" data={medicalOrganizationLd} />
      <JsonLd id="ld-website" data={websiteLd} />
      <JsonLd id="ld-faq" data={faqLd} />
      <JsonLd id="ld-howto" data={howToLd} />
      <JsonLd id="ld-medical-business" data={medicalBusinessLd} />

      <HeaderServer />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1"
        aria-label="Main content"
      >
        <Hero />
        <Stats />
        <Conditions />
        <ExpertCare />
        <Steps />
        <Pricing />
        <Doctors />
        <Benefits />
        <Reviews />

        <GuaranteeSection />

        <Trust />
        <StartJourney />
        <FAQ />
        <SpeakWithDoc />
      </main>

      <Footer />
    </>
  );
}

const GUARANTEE_CHIPS = [
  { label: "HIPAA · ENCRYPTED", position: "top-6 left-6" },
  { label: "AR-LICENSED MDs", position: "top-6 right-6" },
  { label: "100% MONEY-BACK", position: "bottom-6 left-6" },
  { label: "98% APPROVED", position: "bottom-6 right-6" },
];

function GuaranteeSection() {
  return (
    <section
      id="evaluation-details"
      aria-labelledby="form-section-heading"
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f6faf8 100%)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              [F] THE PATIENT GUARANTEE
            </p>
            <h2
              id="form-section-heading"
              className="heading-primary"
              style={{ color: "var(--color-heading)" }}
            >
              Care you can verify.{" "}
              <span className="italic text-[var(--color-accent)]">
                Built on the Natural State.
              </span>
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Every evaluation runs on a HIPAA-compliant platform, reviewed by
              Arkansas-licensed physicians who know Amendment 98 inside out.
              You only pay if you&apos;re approved — and a patient advocate
              follows up directly to walk you through the ADH paperwork.
            </p>
            <div className="space-y-3 pt-2">
              {[
                "Encrypted, HIPAA-compliant intake",
                "Licensed Arkansas physician review",
                "Money-back guarantee if not approved",
                "Patient advocate follows up directly",
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-[var(--color-body)]"
                >
                  <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-[0.2em] pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <a
                href="#form-section"
                className="inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-7 py-4 text-xs font-mono uppercase tracking-[0.2em] text-white hover:scale-[1.02] transition-transform"
              >
                <span className="opacity-70">[F]</span> Begin Your Evaluation
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 relative isolate">
            <div className="flex items-center justify-between gap-4 mb-4 px-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#033c3f]">
                ISSUE No. 02
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                THE TRUST GUARANTEE
              </span>
            </div>

            <div
              className="relative aspect-[5/6] rounded-3xl overflow-hidden border border-white/5 shadow-[0_30px_80px_-30px_rgba(3,60,63,0.45)]"
              style={{
                background:
                  "linear-gradient(160deg, #033c3f 0%, #002124 100%)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 pointer-events-none"
              >
                <EmeraldOrb size={520} />
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "url(/assets/hero/diamond-pattern.svg)",
                  backgroundRepeat: "repeat",
                  backgroundSize: "80px 80px",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center px-12">
                <Image
                  src="/assets/arkansas-silhouette.svg"
                  alt=""
                  width={440}
                  height={440}
                  className="opacity-90 drop-shadow-[0_20px_40px_rgba(32,183,128,0.35)]"
                />
              </div>

              {GUARANTEE_CHIPS.map((chip) => (
                <div
                  key={chip.label}
                  className={`absolute ${chip.position} inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-md px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white`}
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                  {chip.label}
                </div>
              ))}

              <div className="absolute inset-x-6 bottom-[18%] text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Amendment 98 · The Natural State
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
