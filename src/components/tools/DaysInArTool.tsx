"use client";

import { useMemo, useState } from "react";
import {
  agingBucket,
  daysBetween,
  formatDisplayDate,
  parseIsoDate,
} from "@/lib/calc";
import { Field, inputClass, ToolShell } from "./ToolShell";

export function DaysInArTool() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const [claimDate, setClaimDate] = useState("");
  const [asOf, setAsOf] = useState(todayIso);

  const result = useMemo(() => {
    const start = parseIsoDate(claimDate);
    const end = parseIsoDate(asOf);
    if (!start || !end) return null;
    const days = daysBetween(start, end);
    return {
      days,
      bucket: agingBucket(days),
      startLabel: formatDisplayDate(start),
      endLabel: formatDisplayDate(end),
    };
  }, [claimDate, asOf]);

  return (
    <ToolShell
      title="Days in AR"
      description="Measure how long a claim has been outstanding and which aging bucket it falls into."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Service / claim date">
          <input
            type="date"
            value={claimDate}
            onChange={(e) => setClaimDate(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="As of date">
          <input
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>
      <div className="mt-6 rounded-lg bg-accent-soft px-4 py-4">
        {result ? (
          <>
            <p className="text-sm text-accent-deep">
              From {result.startLabel} to {result.endLabel}
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-fg">
              {result.days} days
            </p>
            <p className="mt-1 text-sm font-medium text-fg-muted">
              Aging bucket: {result.bucket}
            </p>
          </>
        ) : (
          <p className="text-sm text-fg-muted">Enter a claim date to calculate.</p>
        )}
      </div>
    </ToolShell>
  );
}
