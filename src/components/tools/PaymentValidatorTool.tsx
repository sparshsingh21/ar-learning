"use client";

import { useMemo, useState } from "react";
import { Field, inputClass, ToolShell } from "./ToolShell";

function num(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function PaymentValidatorTool() {
  const [billed, setBilled] = useState("");
  const [allowed, setAllowed] = useState("");
  const [paid, setPaid] = useState("");
  const [adjustment, setAdjustment] = useState("");
  const [patientPaid, setPatientPaid] = useState("");

  const result = useMemo(() => {
    const b = num(billed);
    const a = num(allowed);
    const p = num(paid);
    const adj = num(adjustment);
    const pp = num(patientPaid);

    if (!billed && !allowed) return null;

    const contractual = Math.max(0, b - a);
    const expectedPatient = Math.max(0, a - p - adj);
    const remainingPatient = expectedPatient - pp;
    const balanceCheck = a - (p + adj + pp);
    const flags: string[] = [];

    if (a > b && b > 0) flags.push("Allowed is higher than billed — verify fee schedule entry.");
    if (p > a && a > 0) flags.push("Paid exceeds allowed — possible overpayment / posting error.");
    if (Math.abs(balanceCheck) > 0.009) {
      flags.push(
        balanceCheck > 0
          ? "Open balance remains after payments and adjustments."
          : "Credit / negative balance — payments + adjustments exceed allowed.",
      );
    }
    if (adj < 0) flags.push("Negative adjustment entered — confirm sign convention.");

    return {
      contractual,
      expectedPatient,
      remainingPatient,
      balanceCheck,
      flags,
    };
  }, [billed, allowed, paid, adjustment, patientPaid]);

  return (
    <ToolShell
      title="Payment Validator"
      description="Cross-check billed, allowed, paid, adjustments, and patient responsibility for posting imbalances."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Billed amount">
          <input
            type="number"
            step="0.01"
            value={billed}
            onChange={(e) => setBilled(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Allowed amount">
          <input
            type="number"
            step="0.01"
            value={allowed}
            onChange={(e) => setAllowed(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Insurance paid">
          <input
            type="number"
            step="0.01"
            value={paid}
            onChange={(e) => setPaid(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Adjustments / contractual">
          <input
            type="number"
            step="0.01"
            value={adjustment}
            onChange={(e) => setAdjustment(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Patient paid (optional)">
          <input
            type="number"
            step="0.01"
            value={patientPaid}
            onChange={(e) => setPatientPaid(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-6 space-y-3 rounded-lg bg-accent-soft px-4 py-4">
        {result ? (
          <>
            <p className="text-sm text-fg">
              Contractual write-off (billed − allowed):{" "}
              <strong>${result.contractual.toFixed(2)}</strong>
            </p>
            <p className="text-sm text-fg">
              Expected patient responsibility:{" "}
              <strong>${result.expectedPatient.toFixed(2)}</strong>
            </p>
            <p className="text-sm text-fg">
              Remaining patient balance:{" "}
              <strong>${result.remainingPatient.toFixed(2)}</strong>
            </p>
            <p className="text-sm text-fg">
              Allowed − (paid + adj + patient paid):{" "}
              <strong>${result.balanceCheck.toFixed(2)}</strong>
            </p>
            {result.flags.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-warning">
                {result.flags.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm font-medium text-success">
                No imbalance flags detected.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-fg-muted">Enter billed and allowed amounts.</p>
        )}
      </div>
    </ToolShell>
  );
}
