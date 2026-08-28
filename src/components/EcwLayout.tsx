import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Breadcrumbs, sectionCrumb } from "./Breadcrumbs";
import { mdxComponents } from "./mdx-components";
import type { ContentItem, EcwStep } from "@/lib/types";

const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } };

export function EcwLayout({ item }: { item: ContentItem }) {
  const steps = (item.frontmatter.steps ?? []) as EcwStep[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[sectionCrumb("ecw"), { label: item.frontmatter.title }]}
      />
      <header className="mb-8">
        {item.frontmatter.whenToUse && (
          <p className="mb-3 rounded-lg border border-accent/25 bg-accent-soft px-3 py-2 text-sm text-accent-deep">
            <span className="font-semibold">When to use: </span>
            {item.frontmatter.whenToUse}
          </p>
        )}
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {item.frontmatter.title}
        </h1>
        <p className="mt-3 text-fg-muted">{item.frontmatter.description}</p>
      </header>

      {steps.length > 0 && (
        <ol className="mb-10 space-y-6">
          {steps.map((step, index) => (
            <li
              key={`${step.title}-${index}`}
              className="rounded-xl border border-border bg-bg-elevated p-5"
            >
              <div className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-fg">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {step.detail}
                  </p>
                  <div className="mt-4 overflow-hidden rounded-lg border border-dashed border-border bg-bg">
                    {step.screenshot ? (
                      <Image
                        src={step.screenshot}
                        alt={`Screenshot for ${step.title}`}
                        width={1200}
                        height={675}
                        className="h-auto w-full"
                      />
                    ) : (
                      <div className="flex aspect-video flex-col items-center justify-center gap-1 px-4 text-center">
                        <p className="text-sm font-medium text-fg-muted">
                          Screenshot placeholder
                        </p>
                        <p className="text-xs text-fg-muted">
                          Drop a PHI-redacted image in{" "}
                          <code className="rounded bg-accent-soft px-1">
                            public/ecw/
                          </code>{" "}
                          and set{" "}
                          <code className="rounded bg-accent-soft px-1">
                            screenshot
                          </code>{" "}
                          in frontmatter.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="prose-guide">
        <MDXRemote
          source={item.content}
          components={mdxComponents}
          options={mdxOptions}
        />
      </div>
    </div>
  );
}
