import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const contactMetadata: Metadata = buildMetadata({
  title: "Contact Us | Arkansas Medical Marijuana Card",
  description:
    "Get in touch with our Arkansas patient advocates. We answer questions about Amendment 98 evaluations, the ADH application, and your medical marijuana card.",
  canonicalPath: "/contact-us",
});
