import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Arkansas Medical Marijuana Card",
  shortName: "AR MMJ Card",
  url: "https://arkansasmedicalmarijuanascard.com",
  defaultTitle:
    "Arkansas Medical Marijuana Card | Online Doctor Evaluations Under Amendment 98",
  defaultDescription:
    "Apply for your Arkansas Medical Marijuana Card online with licensed Arkansas physicians. HIPAA-compliant telehealth evaluations, money-back guarantee if not approved.",
  defaultKeywords: [
    "Arkansas medical marijuana card",
    "Arkansas MMJ card",
    "Amendment 98",
    "Arkansas medical cannabis",
    "Arkansas medical marijuana doctor",
    "online medical marijuana evaluation Arkansas",
    "Arkansas Department of Health medical marijuana",
    "Little Rock medical marijuana card",
    "Fayetteville medical marijuana card",
    "telehealth medical marijuana Arkansas",
  ],
  twitterHandle: "@ARMedCard",
  locale: "en_US",
  phone: "1-855-AR-CARD-1",
  email: "support@arkansasmedicalmarijuanascard.com",
  address: {
    locality: "Little Rock",
    region: "AR",
    country: "US",
  },
} as const;

type BuildMetadataInput = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  extra?: Partial<Metadata>;
};

export function buildMetadata({
  title,
  description,
  keywords,
  canonicalPath = "/",
  ogImage = "/assets/og-homepage.svg",
  ogType = "website",
  extra = {},
}: BuildMetadataInput = {}): Metadata {
  const fullTitle = title ?? SITE_CONFIG.defaultTitle;
  const fullDescription = description ?? SITE_CONFIG.defaultDescription;
  const url = `${SITE_CONFIG.url}${canonicalPath}`;
  const allKeywords = keywords ?? [...SITE_CONFIG.defaultKeywords];

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    applicationName: SITE_CONFIG.name,
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: ogType,
      url,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description: fullDescription,
      locale: SITE_CONFIG.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...extra,
  };
}
