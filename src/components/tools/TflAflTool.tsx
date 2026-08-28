"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  daysBetween,
  formatDisplayDate,
  parseIsoDate,
} from "@/lib/calc";
import { Field, inputClass, ToolShell } from "./ToolShell";

const PRESETS = [
  { label: "Medicare Part B (1 year)", days: 365 },
  { label: "Commercial 90 days", days: 90 },
  { label: "Commercial 180 days", days: 180 },
  { label: "Custom", days: 0 },
];

export function TflAflTool() {
  const [dos, setDos] = useState("");
  const [preset, setPreset] = useState(PRESETS[0].label);
  const [customDays, setCustomDays] = useState("90");

  const windowDays = useMemo(() => {
    const found = PRESETS.find((p) => p.label === preset);
    if (!found || found.days === 0) return Number(customDays) || 0;
    return found.days;
  }, [preset, customDays]);

  const result = useMemo(() => {
    const start = parseIsoDate(dos);
    if (!start || windowDays <= 0) return null;
    const deadline = addDays(start, windowDays);
    const remaining = daysBetween(new Date(), deadline);
    return {
      deadline,
      remaining,
      expired: remaining < 0,
    };
  }, [dos, windowDays]);

  return (
    <ToolShell
      title="TFL / AFL Calculator"
      description="Estimate the timely filing deadline from date of service and a payer filing window."
    >
      <div className="grid gap-4">
        <Field label="Date of service">
          <input
            type="date"
            value={dos}
            onChange={(e) => setDos(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Filing window">
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            className={inputClass}
          >
            {PRESETS.map((p) => (
              <option key={p.label} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </Field>
        {preset === "Custom" && (
          <Field label="Custom days">
            <input
              type="number"
              min={1}
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value)}
              className={inputClass}
            />
          </Field>
        )}
      </div>
      <div className="mt-6 rounded-lg bg-accent-soft px-4 py-4">
        {result ? (
          <>
            <p className="text-sm text-accent-deep">
              Filing window: {windowDays} days from DOS
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-fg">
              Deadline {formatDisplayDate(result.deadline)}
            </p>
            <p
              className={`mt-1 text-sm font-medium ${
                result.expired ? "text-warning" : "text-success"
              }`}
            >
              {result.expired
                ? `Expired ${Math.abs(result.remaining)} days ago`
                : `${result.remaining} days remaining`}
            </p>
            <p className="mt-3 text-xs text-fg-muted">
              Always confirm the exact timely filing limit for the payer and
              plan. This is an estimate only.
            </p>
          </>
        ) : (
          <p className="text-sm text-fg-muted">Enter a date of service.</p>
        )}
      </div>
    </ToolShell>
  );
}
