import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MedicareContacts } from "@/components/references/MedicareContacts";
import { MEDICARE_CONTACTS } from "@/lib/references";

export const metadata: Metadata = {
  title: "Medicare Phone#, IVR, Appeal Forms & Status",
  description:
    "Medicare MAC phone numbers, IVR, appeal forms and status links by contractor — matching ARLearningOnline.",
};

export default function MedicarePhonesFormsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "References", href: "/references" },
          { label: "Medicare Phone# / Forms" },
        ]}
      />
      <header className="mb-8 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-fg">
          Medicare — Phone#, IVR Instructions, Appeal Forms & Appeal Status
        </h1>
        <p className="mt-3 text-fg-muted">
          MAC contractors with IVR and customer service numbers by jurisdiction,
          plus links for IVR guides, appeal forms, and redetermination/appeal
          status — structured to match ARLearningOnline&apos;s Medicare reference
          page.
        </p>
        <p className="mt-2 text-sm text-fg-muted">
          Contractor portals and phone trees change. Use the linked MAC site for
          the current form PDF and IVR menu path for your claim type (Part A / Part
          B).
        </p>
      </header>
      <MedicareContacts contractors={MEDICARE_CONTACTS} />
    </div>
  );
}
