import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  ContentFrontmatter,
  ContentItem,
  ContentSection,
  SearchDocument,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const SECTIONS: ContentSection[] = [
  "learn",
  "scenarios",
  "denials",
  "ecw",
  "references",
];

function sectionDir(section: ContentSection) {
  return path.join(CONTENT_ROOT, section);
}

function parseFile(section: ContentSection, fileName: string): ContentItem {
  const fullPath = path.join(sectionDir(section), fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ContentFrontmatter;
  const slug = fileName.replace(/\.mdx?$/, "");

  const updatedRaw = frontmatter.updated as unknown;
  const updated =
    updatedRaw instanceof Date
      ? updatedRaw.toISOString().slice(0, 10)
      : String(updatedRaw ?? "");

  return {
    slug,
    section,
    frontmatter: {
      ...frontmatter,
      updated,
      tags: frontmatter.tags ?? [],
      status: frontmatter.status ?? "published",
      questions: frontmatter.questions ?? [],
      steps: frontmatter.steps ?? [],
      suggestedNotes:
        typeof frontmatter.suggestedNotes === "string"
          ? frontmatter.suggestedNotes
          : frontmatter.suggestedNotes
            ? String(frontmatter.suggestedNotes)
            : undefined,
    },
    content,
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

export function getSectionItems(section: ContentSection): ContentItem[] {
  const dir = sectionDir(section);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => parseFile(section, f))
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getAllContent(): ContentItem[] {
  return SECTIONS.flatMap((section) => getSectionItems(section));
}

export function getContentBySlug(
  section: ContentSection,
  slug: string,
): ContentItem | undefined {
  return getSectionItems(section).find((item) => item.slug === slug);
}

export function getContentSlugs(section: ContentSection): string[] {
  return getSectionItems(section).map((item) => item.slug);
}

export function hrefFor(item: Pick<ContentItem, "section" | "slug">): string {
  return `/${item.section}/${item.slug}`;
}

export function buildSearchDocuments(): SearchDocument[] {
  return getAllContent().map((item) => ({
    slug: item.slug,
    section: item.section,
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    tags: item.frontmatter.tags,
    href: hrefFor(item),
    body: item.content.replace(/[#>*`\[\]()]/g, " ").slice(0, 4000),
  }));
}

export { SECTIONS };
