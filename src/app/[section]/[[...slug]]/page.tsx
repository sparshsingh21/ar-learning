import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { ContentCard, SectionHero } from "@/components/ContentCard";
import { EcwLayout } from "@/components/EcwLayout";
import { ScenarioLayout } from "@/components/ScenarioLayout";
import {
  getContentBySlug,
  getContentSlugs,
  getSectionItems,
} from "@/lib/content";
import { sectionLabels } from "@/lib/site";
import type { ContentSection } from "@/lib/types";

const SECTION_META: Record<
  ContentSection,
  { title: string; description: string }
> = {
  learn: {
    title: "Learn",
    description:
      "Core AR concepts, where AR sits in RCM, and how to work an account.",
  },
  denials: {
    title: "Denials",
    description:
      "Full denial playbooks matching common AR denial scenarios — with call questions and Prepare Notes.",
  },
  scenarios: {
    title: "Scenarios",
    description:
      "Status and payment scenarios with call questions and Prepare Notes. Denial playbooks live under Denials.",
  },
  ecw: {
    title: "ECW Guide",
    description:
      "eClinicalWorks click-paths for queues, claim status, notes, and reports.",
  },
  references: {
    title: "References",
    description:
      "Insurance phones, TFL sheet, Medicare MAC contacts, and useful websites.",
  },
};

const REFERENCE_EXTRA = [
  {
    href: "/references/insurance-phones",
    title: "Insurance Phone Numbers",
    description:
      "Full Ins Ph# directory for claim status calls (searchable).",
  },
  {
    href: "/references/tfl-sheet",
    title: "Timely Filing Limit (TFL) Sheet",
    description: "TFL by payer/plan matching the ARLearningOnline TFL sheet.",
  },
  {
    href: "/references/medicare-phones-forms",
    title: "Medicare Phone#, IVR & Appeal Forms",
    description: "MAC phones, IVR, appeal forms and status by contractor.",
  },
];

type PageProps = {
  params: Promise<{ section: string; slug?: string[] }>;
};

function asSection(value: string): ContentSection | null {
  if (value in SECTION_META) return value as ContentSection;
  return null;
}

export async function generateStaticParams() {
  const sections = Object.keys(SECTION_META) as ContentSection[];
  const params: { section: string; slug?: string[] }[] = sections.map(
    (section) => ({ section }),
  );

  for (const section of sections) {
    for (const slug of getContentSlugs(section)) {
      params.push({ section, slug: [slug] });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { section: sectionParam, slug } = await params;
  const section = asSection(sectionParam);
  if (!section) return {};

  if (!slug?.length) {
    return {
      title: SECTION_META[section].title,
      description: SECTION_META[section].description,
    };
  }

  const item = getContentBySlug(section, slug[0]);
  if (!item) return {};
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { section: sectionParam, slug } = await params;
  const section = asSection(sectionParam);
  if (!section) notFound();

  if (slug?.length) {
    const item = getContentBySlug(section, slug[0]);
    if (!item) notFound();

    if (section === "scenarios" || section === "denials") {
      if (
        section === "denials" &&
        item.slug === "denial-management-overview"
      ) {
        return <ArticleLayout item={item} />;
      }
      return <ScenarioLayout item={item} />;
    }
    if (section === "ecw") return <EcwLayout item={item} />;
    return <ArticleLayout item={item} />;
  }

  const items = getSectionItems(section);
  const meta = SECTION_META[section];
  const extraCards = section === "references" ? REFERENCE_EXTRA : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHero
        eyebrow={sectionLabels[section]}
        title={meta.title}
        description={meta.description}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {extraCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group block rounded-xl border border-border bg-bg-elevated p-5 transition hover:border-accent/40 hover:shadow-[var(--shadow)]"
          >
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-fg group-hover:text-accent-deep">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted line-clamp-2">
              {card.description}
            </p>
          </Link>
        ))}
        {items.map((item) => (
          <ContentCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
