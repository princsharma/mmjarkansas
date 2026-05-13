"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { ChevronRight, ShieldCheck, Loader2 } from "lucide-react";
import {
  AR_CONDITIONS,
  AR_COUNTIES,
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/formSchema";

const STATE = {
  stateAbbr: "AR",
  stateName: "Arkansas",
  city: "Little Rock",
  timezone: "CST",
} as const;

const UTM_SOURCE = "arkansasmedicalmarijuanascard";

const HEALLY_PREFILL_URL = "https://mymmj.getheally.com/patient_admin/prefill";

function toBase64Url(json: string): string {
  return btoa(json)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function LeadForm() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onBlur",
  });

  const onValid = (data: LeadFormValues) => {
    const nameParts = data.fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: data.email,
      phone: data.phone,
      state: STATE.stateAbbr,
      state_of_evaluation: STATE.stateAbbr,
      timezone: STATE.timezone,
      city: STATE.city,
      extra_data: {
        "contact[contact_type]": "Web Form",
        "product[name]": "Eva",
        utm_source: UTM_SOURCE,
        county: data.county,
        qualifying_condition: data.qualifyingCondition,
      },
    };

    const preset = toBase64Url(JSON.stringify(payload));

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "heallyValidatedSubmit",
        utm_source: UTM_SOURCE,
      });
    }

    setRedirecting(true);

    const url = `${HEALLY_PREFILL_URL}?redirect=sched&preset=${preset}&utm_source=${UTM_SOURCE}`;
    window.location.assign(url);
  };

  const onInvalid = () => {
    if (!cardRef.current) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;
    gsap.fromTo(
      cardRef.current,
      { x: 0 },
      {
        x: 0,
        keyframes: [
          { x: -10 },
          { x: 10 },
          { x: -6 },
          { x: 6 },
          { x: 0 },
        ],
        duration: 0.45,
        ease: "power2.out",
      }
    );
  };

  const busy = isSubmitting || redirecting;

  return (
    <div
      ref={cardRef}
      className="relative bg-white border border-[#e5e7eb] rounded-lg overflow-hidden"
      style={{
        boxShadow: "0 24px 60px -28px rgba(3, 60, 63, 0.18)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-accent)]" />
      <div className="p-6 lg:p-8">
        <form
          onSubmit={(e) => {
            void handleSubmit(onValid, onInvalid)(e);
          }}
          noValidate
          className="space-y-5"
        >
          <header className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              [F-01] BEGIN APPLICATION
            </p>
            <h3
              className="heading-tertiary"
              style={{ color: "var(--color-heading)" }}
            >
              Free 90-second pre-qualification
            </h3>
          </header>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Full Name"
              name="fullName"
              error={errors.fullName?.message}
            >
              <input
                id="fullName"
                autoComplete="name"
                className="form-input"
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
            </Field>

            <Field
              label="Email Address"
              name="email"
              error={errors.email?.message}
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="form-input"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Phone Number"
              name="phone"
              error={errors.phone?.message}
            >
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(555) 123-4567"
                className="form-input"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
            </Field>

            <Field
              label="Arkansas County"
              name="county"
              error={errors.county?.message}
            >
              <select
                id="county"
                defaultValue=""
                className="form-input"
                aria-invalid={!!errors.county}
                {...register("county")}
              >
                <option value="" disabled>
                  Select your county
                </option>
                {AR_COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            label="Qualifying Condition"
            name="qualifyingCondition"
            error={errors.qualifyingCondition?.message}
          >
            <select
              id="qualifyingCondition"
              defaultValue=""
              className="form-input"
              aria-invalid={!!errors.qualifyingCondition}
              {...register("qualifyingCondition")}
            >
              <option value="" disabled>
                Select your condition
              </option>
              {AR_CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer text-sm text-[var(--color-body)]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
                {...register("consent")}
              />
              <span>
                I consent to a HIPAA-compliant telehealth evaluation with
                an Arkansas-licensed physician and agree to the privacy
                policy and terms of service.
              </span>
            </label>
            {errors.consent && (
              <p
                role="alert"
                aria-live="polite"
                className="text-xs text-red-600 font-mono"
              >
                {errors.consent.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={busy}
            aria-busy={busy}
            className="w-full inline-flex items-center justify-between gap-3 rounded-full bg-[#033c3f] px-6 py-4 text-sm font-mono uppercase tracking-[0.2em] text-white hover:bg-[#002124] transition-colors disabled:opacity-60"
          >
            <span className="flex items-center gap-2">
              <span className="opacity-70">[F-02]</span>
              {busy ? "Redirecting to evaluation..." : "Apply for Your MMJ Card"}
            </span>
            {busy ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          <p className="flex items-center gap-2 text-xs text-[var(--color-muted)] font-mono tracking-[0.04em]">
            <ShieldCheck size={14} className="text-[var(--color-accent)]" />
            HIPAA-compliant · Secure scheduling via Heally · 256-bit encrypted
          </p>
        </form>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
};

function Field({ label, name, error, children }: FieldProps) {
  return (
    <div className="form-field">
      <label
        htmlFor={name}
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] block mb-2"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-2 text-xs text-red-600 font-mono"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default LeadForm;
