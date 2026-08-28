import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Breadcrumbs, sectionCrumb } from "./Breadcrumbs";
import { mdxComponents } from "./mdx-components";
import type { ContentItem } from "@/lib/types";
import { TableOfContents } from "./TableOfContents";

const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } };

export function ArticleLayout({ item }: { item: ContentItem }) {
  const stub = item.frontmatter.status === "stub";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          sectionCrumb(item.section),
          { label: item.frontmatter.title },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <article>
          <header className="mb-8 max-w-2xl">
            {item.frontmatter.whenToUse && (
              <p className="mb-3 rounded-lg border border-accent/25 bg-accent-soft px-3 py-2 text-sm text-accent-deep">
                <span className="font-semibold">When to use: </span>
                {item.frontmatter.whenToUse}
              </p>
            )}
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {item.frontmatter.title}
            </h1>
            <p className="mt-3 text-base text-fg-muted">
              {item.frontmatter.description}
            </p>
            <p className="mt-3 text-xs text-fg-muted">
              Updated {item.frontmatter.updated}
              {!stub && ` · ${item.readingMinutes} min read`}
              {stub && " · Outline preview"}
            </p>
          </header>
          <div className="prose-guide">
            <MDXRemote
              source={item.content}
              components={mdxComponents}
              options={mdxOptions}
            />
          </div>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents source={item.content} />
          </div>
        </aside>
      </div>
    </div>
  );
}
