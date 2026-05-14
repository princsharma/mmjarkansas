import { z } from "zod";

export const AR_COUNTIES = [
  "Pulaski",
  "Washington",
  "Benton",
  "Sebastian",
  "Faulkner",
  "Saline",
  "Craighead",
  "Garland",
  "Jefferson",
  "White",
  "Other",
] as const;

export const AR_CONDITIONS = [
  "Cancer",
  "Glaucoma",
  "HIV / AIDS positive status",
  "Hepatitis C",
  "Amyotrophic Lateral Sclerosis (ALS)",
  "Tourette's Syndrome",
  "Crohn's Disease",
  "Ulcerative Colitis",
  "Post-Traumatic Stress Disorder (PTSD)",
  "Severe Arthritis",
  "Fibromyalgia",
  "Alzheimer's Disease",
  "Cachexia or Wasting Syndrome",
  "Peripheral Neuropathy",
  "Intractable Pain",
  "Severe Nausea",
  "Seizures (including epilepsy)",
  "Severe and persistent muscle spasms",
  "Other",
] as const;

const phoneRegex = /^\+?1?[\s-.]?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/;

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Please enter your full name.")
    .max(80, "Name is too long."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .regex(phoneRegex, "Please enter a valid US phone number."),
  consent: z.literal(true, {
    error: "You must agree to the telehealth consent to continue.",
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const contactFormSchema = leadFormSchema.extend({
  county: z.enum(AR_COUNTIES, {
    error: "Please select your Arkansas county.",
  }),
  qualifyingCondition: z.enum(AR_CONDITIONS, {
    error: "Please select your qualifying condition.",
  }),
  message: z
    .string()
    .min(10, "Please share a few words about how we can help.")
    .max(1000, "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
