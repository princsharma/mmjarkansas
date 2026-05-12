"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { CheckCircle2, Send, ShieldCheck } from "lucide-react";
import {
  AR_CONDITIONS,
  AR_COUNTIES,
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/formSchema";
import { sleep } from "@/lib/utils";

export function QueryForm() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onValid = async (_v: ContactFormValues) => {
    void _v;
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
      onComplete: () => gsap.set(card, { height: "auto" }),
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
      }
    );
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white border border-[#e5e7eb] rounded-lg overflow-hidden"
      style={{ boxShadow: "0 24px 60px -28px rgba(3, 60, 63, 0.18)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-accent)]" />
      <div ref={contentRef} className="p-6 lg:p-10">
        {!submitted ? (
          <form
            onSubmit={(e) => {
              void handleSubmit(onValid, onInvalid)(e);
            }}
            noValidate
            className="space-y-6"
          >
            <header className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                [Q-01] CONTACT US
              </p>
              <h2
                className="heading-secondary"
                style={{ color: "var(--color-heading)" }}
              >
                We&apos;re here to help.
              </h2>
              <p className="text-[var(--color-muted)] max-w-[55ch]">
                Send us a message and an Arkansas patient advocate will
                respond within one business hour.
              </p>
            </header>

            <div className="grid gap-5 sm:grid-cols-2">
              <FieldRow
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
              </FieldRow>
              <FieldRow
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
              </FieldRow>
              <FieldRow
                label="Phone Number"
                name="phone"
                error={errors.phone?.message}
              >
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className="form-input"
                  {...register("phone")}
                />
              </FieldRow>
              <FieldRow
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
              </FieldRow>
            </div>

            <FieldRow
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
            </FieldRow>

            <FieldRow
              label="How can we help?"
              name="message"
              error={errors.message?.message}
            >
              <textarea
                id="message"
                rows={5}
                className="form-input resize-y"
                placeholder="Share a few details about your situation."
                {...register("message")}
              />
            </FieldRow>

            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer text-sm text-[var(--color-body)]">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
                  {...register("consent")}
                />
                <span>
                  I consent to be contacted by phone or email regarding my
                  Arkansas medical marijuana application.
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
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#033c3f] px-7 py-4 text-sm font-mono uppercase tracking-[0.2em] text-white hover:bg-[#002124] transition-colors disabled:opacity-60"
            >
              <span className="opacity-70">[Q-02]</span>
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={16} />
            </button>

            <p className="flex items-center gap-2 text-xs text-[var(--color-muted)] font-mono tracking-[0.04em]">
              <ShieldCheck size={14} className="text-[var(--color-accent)]" />
              HIPAA-compliant · Confidential · Arkansas patients only
            </p>
          </form>
        ) : (
          <div className="space-y-4 py-4" role="status" aria-live="polite">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-accent)] text-white">
              <CheckCircle2 size={28} />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
              [Q-99] MESSAGE RECEIVED
            </p>
            <h3
              className="heading-secondary"
              style={{ color: "var(--color-heading)" }}
            >
              Thank you for reaching out.
            </h3>
            <p className="text-[var(--color-body)] leading-relaxed">
              An Arkansas patient advocate will respond within one business
              hour. Watch for an email — and check your spam folder just in
              case.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

type FieldRowProps = {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
};

function FieldRow({ label, name, error, children }: FieldRowProps) {
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

export default QueryForm;
