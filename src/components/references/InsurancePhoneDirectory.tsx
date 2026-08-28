"use client";

import { useMemo, useState } from "react";
import type { InsurancePhone } from "@/lib/references";

export function InsurancePhoneDirectory({
  entries,
}: {
  entries: InsurancePhone[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) || e.phone.toLowerCase().includes(q),
    );
  }, [entries, query]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <label className="block min-w-[240px] flex-1">
          <span className="mb-1.5 block text-sm font-medium text-fg">
            Search insurance name or phone
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Aetna, UHC, 800…"
            className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg outline-none focus:border-accent"
          />
        </label>
        <p className="text-sm text-fg-muted">
          Showing {filtered.length} of {entries.length}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-accent-soft text-fg">
            <tr>
              <th className="px-3 py-2.5 font-semibold">Insurance Name</th>
              <th className="px-3 py-2.5 font-semibold">Phone #</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={`${row.name}-${row.phone}`}
                className="border-t border-border/80 odd:bg-bg-elevated"
              >
                <td className="px-3 py-2 font-medium text-fg">{row.name}</td>
                <td className="px-3 py-2 font-mono text-fg-muted">{row.phone}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={2} className="px-3 py-8 text-center text-fg-muted">
                  No matches.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
