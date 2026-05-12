import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo";
import ScrollProvider from "@/components/motion/ScrollProvider";
import ScrollProgress from "@/components/motion/ScrollProgress";
import CustomCursor from "@/components/cursor/CustomCursor";
import BackToTop from "@/components/backtotop";

const bricolage = Bricolage_Grotesque({
  variable: "--font-sans-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const GTM_ID = "GTM-XXXXXXXX";

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#033c3f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[var(--color-body)]">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <ScrollProvider>
          <CustomCursor />
          <ScrollProgress />
          {children}
          <BackToTop />
        </ScrollProvider>

        <div aria-hidden="true" className="site-grain" />

        <span className="sr-only">
          {SITE_CONFIG.name} — Arkansas Medical Marijuana Card.
        </span>
      </body>
    </html>
  );
}
