export type ContentSection =
  | "learn"
  | "scenarios"
  | "denials"
  | "ecw"
  | "references";

export type ContentStatus = "published" | "stub";

export interface ContentFrontmatter {
  title: string;
  description: string;
  section: ContentSection;
  tags: string[];
  order: number;
  updated: string;
  status?: ContentStatus;
  whenToUse?: string;
  questions?: string[];
  suggestedNotes?: string;
  steps?: EcwStep[];
}

export interface EcwStep {
  title: string;
  detail: string;
  screenshot?: string;
}

export interface ContentItem {
  slug: string;
  section: ContentSection;
  frontmatter: ContentFrontmatter;
  content: string;
  readingMinutes: number;
}

export interface SearchDocument {
  slug: string;
  section: ContentSection;
  title: string;
  description: string;
  tags: string[];
  href: string;
  body: string;
}
