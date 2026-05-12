"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import {
  AR_CONDITIONS,
  AR_COUNTIES,
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/formSchema";
import { sleep } from "@/lib/utils";

type FieldKey = keyof LeadFormValues;

const fieldOrder: FieldKey[] = [
  "fullName",
  "email",
  "phone",
  "county",
  "qualifyingCondition",
  "consent",
];

export function LeadForm() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    mode: "onBlur",
  });

  const onValid = async (_values: LeadFormValues) => {
    void _values;
    await sleep(900);
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) {
      setSubmitted(true);
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setSubmitted(true);
      return;
    }
    const height = card.getBoundingClientRect().height;
    gsap.set(card, { height });
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(card, { height: "auto" });
      },
    });
    tl.to(content, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setSubmitted(true),
    });
    tl.fromTo(
      content,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" },
      "+=0.05"
    );
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

  return (
    <div
      ref={cardRef}
      className="relative bg-white border border-[#e5e7eb] rounded-lg overflow-hidden"
      style={{
        boxShadow: "0 24px 60px -28px rgba(3, 60, 63, 0.18)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-accent)]" />
      <div ref={contentRef} className="p-6 lg:p-8">
        {!submitted ? (
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
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-between gap-3 rounded-full bg-[#033c3f] px-6 py-4 text-sm font-mono uppercase tracking-[0.2em] text-white hover:bg-[#002124] transition-colors disabled:opacity-60"
            >
              <span className="flex items-center gap-2">
                <span className="opacity-70">[F-02]</span>
                {isSubmitting ? "Submitting..." : "Start My Application"}
              </span>
              <ChevronRight size={18} />
            </button>

            <p className="flex items-center gap-2 text-xs text-[var(--color-muted)] font-mono tracking-[0.04em]">
              <ShieldCheck size={14} className="text-[var(--color-accent)]" />
              HIPAA-compliant · No charge if not approved · 256-bit encrypted
            </p>
          </form>
        ) : (
          <div
            className="space-y-4 py-4"
            role="status"
            aria-live="polite"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-accent)] text-white">
              <CheckCircle2 size={28} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              [F-99] APPLICATION RECEIVED
            </p>
            <h3
              className="heading-secondary"
              style={{ color: "var(--color-heading)" }}
            >
              Thank you.
            </h3>
            <p className="text-[var(--color-body)] leading-relaxed">
              An Arkansas-licensed physician will reach out within one
              business hour to schedule your evaluation. In the meantime,
              please prepare any prior medical records related to your
              qualifying condition.
            </p>
            <ul className="space-y-2 pt-2 text-sm text-[var(--color-muted)]">
              <li className="flex items-start gap-2">
                <span className="font-mono text-[var(--color-accent)]">
                  01
                </span>
                Check your email — including spam — for our scheduling
                link.
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[var(--color-accent)]">
                  02
                </span>
                Save {fieldOrder.length > 0 ? "1-855-AR-CARD-1" : ""} to your contacts.
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[var(--color-accent)]">
                  03
                </span>
                Have a government-issued Arkansas ID ready for your
                telehealth visit.
              </li>
            </ul>
          </div>
        )}
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
