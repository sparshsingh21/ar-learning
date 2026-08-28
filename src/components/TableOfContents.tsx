function extractHeadings(source: string) {
  const lines = source.split("\n");
  const headings: { level: number; text: string; id: string }[] = [];
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    headings.push({ level: match[1].length, text, id });
  }
  return headings;
}

export function TableOfContents({ source }: { source: string }) {
  const headings = extractHeadings(source);
  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
        On this page
      </p>
      <ul className="mt-3 space-y-2 border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 border-transparent text-sm text-fg-muted transition hover:border-accent hover:text-accent-deep ${
                h.level === 3 ? "pl-5" : "pl-3"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
