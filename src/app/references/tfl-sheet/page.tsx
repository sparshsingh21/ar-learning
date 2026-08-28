import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TflDirectory } from "@/components/references/TflDirectory";
import { TFL_LIMITS } from "@/lib/references";

export const metadata: Metadata = {
  title: "Timely Filing Limit (TFL) Sheet",
  description:
    "Timely filing limits by insurance — matching the ARLearningOnline TFL sheet.",
};

export default function TflSheetPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "References", href: "/references" },
          { label: "TFL Sheet" },
        ]}
      />
      <header className="mb-8 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-fg">
          Timely Filing Limit (TFL) Sheet
        </h1>
        <p className="mt-3 text-fg-muted">
          TFL values by payer/plan as published on ARLearningOnline. Calculate
          deadlines with the{" "}
          <a
            href="/tools/tfl-afl"
            className="font-medium text-accent-deep underline underline-offset-2"
          >
            TFL / AFL Calculator
          </a>
          , then verify the plan-specific limit here.
        </p>
        <p className="mt-2 text-sm text-fg-muted">
          TFL is generally counted from date of service unless the payer states
          otherwise. Participating vs non-participating limits often differ.
        </p>
      </header>
      <TflDirectory entries={TFL_LIMITS} />
    </div>
  );
}
