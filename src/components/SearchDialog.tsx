"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { SearchDocument } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ open, onClose }: Props) {
  const [docs, setDocs] = useState<SearchDocument[]>([]);
  const [query, setQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open || loaded) return;
    fetch("/api/search")
      .then((r) => r.json())
      .then((data: SearchDocument[]) => {
        setDocs(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [open, loaded]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.25 },
          { name: "tags", weight: 0.15 },
          { name: "body", weight: 0.1 },
        ],
        threshold: 0.35,
        includeScore: true,
      }),
    [docs],
  );

  const results = useMemo(() => {
    if (!query.trim()) return docs.slice(0, 8);
    return fuse.search(query.trim()).slice(0, 12).map((r) => r.item);
  }, [docs, fuse, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-fg/40 px-4 pt-[12vh] backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close search"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-[var(--shadow)]"
      >
        <div className="border-b border-border px-4 py-3">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, scenarios, ECW steps…"
            className="w-full bg-transparent text-base text-fg outline-none placeholder:text-fg-muted"
          />
        </div>
        <ul className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-sm text-fg-muted">
              {loaded ? "No matches." : "Loading index…"}
            </li>
          )}
          {results.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block px-4 py-3 transition hover:bg-accent-soft"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-accent">
                  {item.section}
                </span>
                <span className="mt-0.5 block font-medium text-fg">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-sm text-fg-muted line-clamp-1">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
