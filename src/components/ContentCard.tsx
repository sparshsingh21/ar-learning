import Link from "next/link";
import type { ContentItem } from "@/lib/types";
import { hrefFor } from "@/lib/content";

export function ContentCard({ item }: { item: ContentItem }) {
  const stub = item.frontmatter.status === "stub";
  return (
    <Link
      href={hrefFor(item)}
      className="group block rounded-xl border border-border bg-bg-elevated p-5 transition hover:border-accent/40 hover:shadow-[var(--shadow)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-fg group-hover:text-accent-deep">
          {item.frontmatter.title}
        </h3>
        {stub && (
          <span className="shrink-0 rounded-md bg-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fg-muted">
            Outline
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted line-clamp-2">
        {item.frontmatter.description}
      </p>
      {!stub && (
        <p className="mt-3 text-xs text-fg-muted">
          {item.readingMinutes} min read
        </p>
      )}
    </Link>
  );
}

export function SectionHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-fg-muted">{description}</p>
    </div>
  );
}
