import type { Metadata } from "next";
import Link from "next/link";
import { SectionHero } from "@/components/ContentCard";
import { toolLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tools",
  description: "AR calculators for days outstanding, timely filing, attendance, and payments.",
};

export default function ToolsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHero
        eyebrow="Tools"
        title="AR calculators"
        description="Quick utilities for follow-up work and team metrics. Results stay in your browser."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {toolLinks.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-xl border border-border bg-bg-elevated p-6 transition hover:border-accent/40 hover:shadow-[var(--shadow)]"
          >
            <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-fg">
              {tool.label}
            </h2>
            <p className="mt-2 text-sm text-fg-muted">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
