import Link from "next/link";
import { sectionLabels } from "@/lib/site";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-fg-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-accent-deep">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-accent-deep">
                {item.label}
              </Link>
            ) : (
              <span className="text-fg">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function sectionCrumb(section: string): Crumb {
  return {
    label: sectionLabels[section] ?? section,
    href: `/${section}`,
  };
}
