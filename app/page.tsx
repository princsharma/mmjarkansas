import type { Metadata } from "next";
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
import FormWrapper from "@/components/landing/formwrapper";
import Trust from "@/components/landing/trust";
import StartJourney from "@/components/landing/startjourney";
import FAQ from "@/components/landing/faq";
import SpeakWithDoc from "@/components/landing/speakwithdoc";
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
  logo: `${SITE_CONFIG.url}/assets/logo.svg`,
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

        <FormSection />

        <Trust />
        <StartJourney />
        <FAQ />
        <SpeakWithDoc />
      </main>

      <Footer />
    </>
  );
}

function FormSection() {
  return (
    <section
      id="form-section"
      aria-labelledby="form-section-heading"
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f6faf8 100%)",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-5 lg:px-10 py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              [F] BEGIN YOUR EVALUATION
            </p>
            <h2
              id="form-section-heading"
              className="heading-primary"
              style={{ color: "var(--color-heading)" }}
            >
              Begin your evaluation. <span className="italic text-[var(--color-accent)]">It takes about 90 seconds.</span>
            </h2>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Share a few details and an Arkansas-licensed physician will
              reach out within one business hour to schedule your secure
              telehealth visit. You are only billed if your application is
              approved — 100% money-back guarantee.
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
          </div>

          <div className="lg:col-span-7">
            <FormWrapper />
          </div>
        </div>
      </div>
    </section>
  );
}
