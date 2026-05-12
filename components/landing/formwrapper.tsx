"use client";

import dynamic from "next/dynamic";

function FormSkeleton() {
  return (
    <div
      className="relative bg-white border border-[#e5e7eb] rounded-lg overflow-hidden"
      style={{ boxShadow: "0 24px 60px -28px rgba(3, 60, 63, 0.18)" }}
      aria-hidden="true"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--color-accent)]" />
      <div className="p-6 lg:p-8 space-y-5">
        <div className="h-3 w-32 bg-[#e5e7eb] rounded animate-pulse" />
        <div className="h-6 w-3/4 bg-[#e5e7eb] rounded animate-pulse" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-2 w-20 bg-[#eef2f0] rounded" />
            <div className="h-11 w-full bg-[#f6faf8] rounded border border-[#e5e7eb]" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-24 bg-[#eef2f0] rounded" />
            <div className="h-11 w-full bg-[#f6faf8] rounded border border-[#e5e7eb]" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="h-2 w-24 bg-[#eef2f0] rounded" />
            <div className="h-11 w-full bg-[#f6faf8] rounded border border-[#e5e7eb]" />
          </div>
          <div className="space-y-2">
            <div className="h-2 w-28 bg-[#eef2f0] rounded" />
            <div className="h-11 w-full bg-[#f6faf8] rounded border border-[#e5e7eb]" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-32 bg-[#eef2f0] rounded" />
          <div className="h-11 w-full bg-[#f6faf8] rounded border border-[#e5e7eb]" />
        </div>
        <div className="h-12 w-full bg-[#f0f6f3] rounded-full" />
        <div className="h-3 w-3/4 bg-[#eef2f0] rounded" />
      </div>
    </div>
  );
}

const LeadForm = dynamic(() => import("./form").then((m) => m.LeadForm), {
  ssr: false,
  loading: () => <FormSkeleton />,
});

export function FormWrapper() {
  return <LeadForm />;
}

export default FormWrapper;
