import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { InsurancePhoneDirectory } from "@/components/references/InsurancePhoneDirectory";
import { INSURANCE_PHONES } from "@/lib/references";

export const metadata: Metadata = {
  title: "Insurance Phone Numbers",
  description:
    "Insurance contact numbers to check claim status — directory matching ARLearningOnline Ins Ph# list.",
};

export default function InsurancePhonesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "References", href: "/references" },
          { label: "Insurance Phone Numbers" },
        ]}
      />
      <header className="mb-8 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-fg">
          Insurance contact numbers to check claim status
        </h1>
        <p className="mt-3 text-fg-muted">
          Directory of commercial, Medicaid, WC, and other payer phones for claim
          status follow-up. For Medicare MAC phones, IVR, and appeal forms, see{" "}
          <a
            href="/references/medicare-phones-forms"
            className="font-medium text-accent-deep underline underline-offset-2"
          >
            Medicare Phone# / Forms
          </a>
          .
        </p>
        <p className="mt-2 text-sm text-fg-muted">
          Numbers are compiled to match the ARLearningOnline Ins Ph# list. Always
          confirm against your current payer job aid — lines change.
        </p>
      </header>
      <InsurancePhoneDirectory entries={INSURANCE_PHONES} />
    </div>
  );
}
