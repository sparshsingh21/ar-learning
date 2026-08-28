import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function ToolShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Tools", href: "/tools" }, { label: title }]}
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-fg">
          {title}
        </h1>
        <p className="mt-2 text-fg-muted">{description}</p>
      </header>
      <div className="rounded-xl border border-border bg-bg-elevated p-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-fg">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg outline-none focus:border-accent";
