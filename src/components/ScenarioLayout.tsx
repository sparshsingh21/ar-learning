import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Breadcrumbs, sectionCrumb } from "./Breadcrumbs";
import { mdxComponents } from "./mdx-components";
import { PrepareNotesForm } from "./PrepareNotesForm";
import { TableOfContents } from "./TableOfContents";
import type { ContentItem } from "@/lib/types";

const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } };

export function ScenarioLayout({ item }: { item: ContentItem }) {
  const questions = item.frontmatter.questions ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          sectionCrumb(item.section),
          { label: item.frontmatter.title },
        ]}
      />
      <div className="grid gap-8 lg:grid-cols-[180px_minmax(0,1fr)_260px]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents source={item.content} />
          </div>
        </aside>

        <article>
          <header className="mb-8">
            {item.frontmatter.whenToUse && (
              <p className="mb-3 rounded-lg border border-accent/25 bg-accent-soft px-3 py-2 text-sm text-accent-deep">
                <span className="font-semibold">When to use: </span>
                {item.frontmatter.whenToUse}
              </p>
            )}
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-fg">
              {item.frontmatter.title}
            </h1>
            <p className="mt-3 text-fg-muted">{item.frontmatter.description}</p>
          </header>
          <div className="prose-guide">
            <MDXRemote
              source={item.content}
              components={mdxComponents}
              options={mdxOptions}
            />
          </div>
        </article>

        <aside>
          <div className="sticky top-24 rounded-xl border border-border bg-bg-elevated p-4">
            <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold text-fg">
              Ask these questions
            </h2>
            {questions.length === 0 ? (
              <p className="mt-2 text-sm text-fg-muted">
                No call questions listed for this scenario yet.
              </p>
            ) : (
              <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-fg-muted">
                {questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ol>
            )}
          </div>
        </aside>
      </div>

      <div className="mt-10 max-w-4xl">
        <PrepareNotesForm
          section={item.section}
          slug={item.slug}
          scenarioTitle={item.frontmatter.title}
        />
      </div>
    </div>
  );
}
