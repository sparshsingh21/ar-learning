"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getNoteFormSchema } from "@/lib/note-forms/registry";
import type {
  NoteFieldDef,
  NoteFieldValues,
  NoteFormSchema,
} from "@/lib/note-forms/types";

type Props = {
  section: string;
  slug: string;
  scenarioTitle: string;
};

function RequiredMark() {
  return <span className="text-red-600">*</span>;
}

function FieldLabel({
  children,
  required,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <span className="mb-1.5 block text-sm font-medium text-fg">
      {children}
      {required ? (
        <>
          {" "}
          <RequiredMark />
        </>
      ) : null}
    </span>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg outline-none focus:border-accent";

function isVisible(field: NoteFieldDef, values: NoteFieldValues) {
  return field.showWhen ? field.showWhen(values) : true;
}

function isRequired(field: NoteFieldDef, values: NoteFieldValues) {
  if (!isVisible(field, values)) return false;
  if (typeof field.required === "function") return field.required(values);
  return Boolean(field.required);
}

function formatDateForNotes(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function emptyValues(schema: NoteFormSchema): NoteFieldValues {
  const values: NoteFieldValues = {};
  for (const field of schema.fields) {
    values[field.id] = "";
  }
  return values;
}

function buildNotes(
  schema: NoteFormSchema,
  values: NoteFieldValues,
  scenarioTitle: string,
) {
  const parts: string[] = [`Scenario: ${scenarioTitle}`];

  for (const field of schema.fields) {
    if (!isVisible(field, values)) continue;
    if (field.includeInNotes === false) continue;
    const raw = values[field.id]?.trim() ?? "";
    if (!raw) continue;
    const label = field.noteLabel ?? field.label;
    const display = field.type === "date" ? formatDateForNotes(raw) : raw;
    parts.push(`${label}: ${display}.`);
  }

  return parts.join(" ");
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: NoteFieldDef;
  value: string;
  onChange: (value: string) => void;
}) {
  if (field.type === "textarea") {
    return (
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={inputClass}
      />
    );
  }

  if (field.type === "select" || field.type === "yesno") {
    const options =
      field.type === "yesno" ? field.options ?? ["Yes", "No"] : field.options ?? [];
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={field.type === "date" ? "date" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={inputClass}
    />
  );
}

export function PrepareNotesForm({ section, slug, scenarioTitle }: Props) {
  // Resolve schema on the client — field showWhen/required are functions and
  // cannot be passed from Server Components.
  const schema = useMemo(
    () => getNoteFormSchema(section, slug),
    [section, slug],
  );

  const [values, setValues] = useState<NoteFieldValues>({});
  const [finalNotes, setFinalNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!schema) return;
    setValues(emptyValues(schema));
    setFinalNotes("");
    setSubmitted(false);
    setError("");
    setCopied(false);
  }, [schema]);

  function update(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  const visibleFields = useMemo(
    () => (schema ? schema.fields.filter((f) => isVisible(f, values)) : []),
    [schema, values],
  );

  const missing = useMemo(() => {
    return visibleFields
      .filter((f) => isRequired(f, values) && !values[f.id]?.trim())
      .map((f) => f.label);
  }, [visibleFields, values]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!schema) return;
    if (missing.length) {
      setError(`Please complete: ${missing.join(", ")}`);
      setSubmitted(false);
      return;
    }
    setError("");
    setFinalNotes(buildNotes(schema, values, scenarioTitle));
    setSubmitted(true);
  }

  function onReset() {
    if (!schema) return;
    setValues(emptyValues(schema));
    setFinalNotes("");
    setSubmitted(false);
    setError("");
    setCopied(false);
  }

  async function copyNotes() {
    if (!finalNotes.trim()) return;
    await navigator.clipboard.writeText(finalNotes);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  if (!schema) return null;

  return (
    <section className="rounded-xl border border-border bg-bg-elevated p-5 sm:p-6">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-fg underline decoration-accent/40 underline-offset-4">
        {schema.title ?? "Prepare Notes"}
      </h2>
      <p className="mt-2 text-sm text-fg-muted">
        {schema.description ??
          "Fields change based on this scenario. Submit to generate editable final notes. Nothing is saved on a server."}
      </p>

      <form onSubmit={onSubmit} className="mt-6" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          {visibleFields.map((field) => (
            <label
              key={field.id}
              className={`block ${field.fullWidth || field.type === "textarea" ? "sm:col-span-2" : ""}`}
            >
              <FieldLabel required={isRequired(field, values)}>
                {field.label}
              </FieldLabel>
              <FieldControl
                field={field}
                value={values[field.id] ?? ""}
                onChange={(v) => update(field.id, v)}
              />
            </label>
          ))}
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="submit"
            className="min-w-[120px] rounded-lg bg-accent px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-accent-deep"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onReset}
            className="min-w-[120px] rounded-lg border border-accent bg-accent/10 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-accent-deep transition hover:bg-accent/20"
          >
            Reset
          </button>
        </div>
      </form>

      <p className="mt-5 text-sm italic text-fg-muted">
        In the below box, final notes will be displayed once you click on Submit
        button and this box is editable, so you can make the changes as per the
        requirement.
      </p>

      {submitted && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-fg">Final notes</h3>
            <button
              type="button"
              onClick={copyNotes}
              className="rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-accent-deep"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <textarea
            value={finalNotes}
            onChange={(e) => setFinalNotes(e.target.value)}
            rows={8}
            className="w-full resize-y rounded-lg border border-border bg-bg px-3 py-2 font-mono text-xs leading-relaxed text-fg outline-none focus:border-accent"
          />
          <p className="mt-2 text-xs text-fg-muted">
            Note: We are not saving your inputs in the backend.
          </p>
        </div>
      )}
    </section>
  );
}
