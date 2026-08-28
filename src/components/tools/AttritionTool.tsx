"use client";

import { useMemo, useState } from "react";
import { countWeekdays, percent } from "@/lib/calc";
import { Field, inputClass, ToolShell } from "./ToolShell";

type CalcType = "attrition" | "attendance" | "absenteeism";
type EntryType = "single" | "range";

type Entry = {
  id: string;
  dateLabel: string;
  headcount: number;
  count: number;
  pct: number | null;
};

export function AttritionTool() {
  const [calcType, setCalcType] = useState<CalcType>("attrition");
  const [entryType, setEntryType] = useState<EntryType>("single");
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [excludeSat, setExcludeSat] = useState(true);
  const [excludeSun, setExcludeSun] = useState(true);
  const [headcount, setHeadcount] = useState("");
  const [metricCount, setMetricCount] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);

  const countLabel =
    calcType === "attrition"
      ? "Attrition count"
      : calcType === "attendance"
        ? "Present count"
        : "Absent count";

  const currentPct = useMemo(() => {
    const h = Number(headcount);
    const c = Number(metricCount);
    if (!h || Number.isNaN(c)) return null;
    if (calcType === "attendance") return percent(c, h);
    return percent(c, h);
  }, [headcount, metricCount, calcType]);

  function addEntry() {
    const h = Number(headcount);
    const c = Number(metricCount);
    if (!h || Number.isNaN(c)) return;

    let dateLabel = date || "Entry";
    if (entryType === "range" && from && to) {
      const days = countWeekdays(
        new Date(`${from}T00:00:00`),
        new Date(`${to}T00:00:00`),
        excludeSat,
        excludeSun,
      );
      dateLabel = `${from} → ${to} (${days} counted days)`;
    }

    setEntries((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        dateLabel,
        headcount: h,
        count: c,
        pct: percent(c, h),
      },
    ]);
  }

  const monthlyAvg = useMemo(() => {
    if (!entries.length) return null;
    const sum = entries.reduce((acc, e) => acc + (e.pct ?? 0), 0);
    return Math.round((sum / entries.length) * 100) / 100;
  }, [entries]);

  function exportCsv() {
    const rows = [
      ["Date", "Headcount", countLabel, "Percentage %"],
      ...entries.map((e) => [
        e.dateLabel,
        String(e.headcount),
        String(e.count),
        e.pct == null ? "" : String(e.pct),
      ]),
      ["Monthly Average %", "", "", monthlyAvg == null ? "" : String(monthlyAvg)],
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${calcType}-metrics.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell
      title="Attrition / Attendance / Absenteeism"
      description="Track team metrics for a single date or date range. Export a simple CSV summary."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Calculation type">
          <select
            value={calcType}
            onChange={(e) => setCalcType(e.target.value as CalcType)}
            className={inputClass}
          >
            <option value="attrition">Attrition %</option>
            <option value="attendance">Attendance %</option>
            <option value="absenteeism">Absenteeism %</option>
          </select>
        </Field>
        <Field label="Entry type">
          <select
            value={entryType}
            onChange={(e) => setEntryType(e.target.value as EntryType)}
            className={inputClass}
          >
            <option value="single">Single date</option>
            <option value="range">Date range</option>
          </select>
        </Field>
        {entryType === "single" ? (
          <Field label="Date">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </Field>
        ) : (
          <>
            <Field label="From date">
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="To date">
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className={inputClass}
              />
            </Field>
            <div className="flex items-center gap-4 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-fg">
                <input
                  type="checkbox"
                  checked={excludeSat}
                  onChange={(e) => setExcludeSat(e.target.checked)}
                />
                Exclude Saturdays
              </label>
              <label className="flex items-center gap-2 text-sm text-fg">
                <input
                  type="checkbox"
                  checked={excludeSun}
                  onChange={(e) => setExcludeSun(e.target.checked)}
                />
                Exclude Sundays
              </label>
            </div>
          </>
        )}
        <Field label="Headcount">
          <input
            type="number"
            min={0}
            value={headcount}
            onChange={(e) => setHeadcount(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label={countLabel}>
          <input
            type="number"
            min={0}
            value={metricCount}
            onChange={(e) => setMetricCount(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={addEntry}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-deep"
        >
          Add / update entry
        </button>
        <button
          type="button"
          onClick={() => {
            setHeadcount("");
            setMetricCount("");
            setDate("");
            setFrom("");
            setTo("");
          }}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg hover:bg-bg"
        >
          Reset fields
        </button>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg hover:bg-bg"
          >
            Export to CSV
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-accent-soft px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-accent-deep">
            Current %
          </p>
          <p className="mt-1 text-2xl font-bold text-fg">
            {currentPct == null ? "—" : `${currentPct}%`}
          </p>
        </div>
        <div className="rounded-lg bg-accent-soft px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-accent-deep">
            Monthly average %
          </p>
          <p className="mt-1 text-2xl font-bold text-fg">
            {monthlyAvg == null ? "—" : `${monthlyAvg}%`}
          </p>
        </div>
      </div>

      {entries.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-fg-muted">
                <th className="py-2 pr-3 font-medium">Date</th>
                <th className="py-2 pr-3 font-medium">Headcount</th>
                <th className="py-2 pr-3 font-medium">{countLabel}</th>
                <th className="py-2 font-medium">%</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-border/70">
                  <td className="py-2 pr-3">{e.dateLabel}</td>
                  <td className="py-2 pr-3">{e.headcount}</td>
                  <td className="py-2 pr-3">{e.count}</td>
                  <td className="py-2">{e.pct == null ? "—" : `${e.pct}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ToolShell>
  );
}
