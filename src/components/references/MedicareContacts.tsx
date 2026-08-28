import type { MedicareContractor } from "@/lib/references";

export function MedicareContacts({
  contractors,
}: {
  contractors: MedicareContractor[];
}) {
  return (
    <div className="space-y-6">
      {contractors.map((c, i) => (
        <section
          key={c.contractor}
          className="rounded-xl border border-border bg-bg-elevated p-5"
        >
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-fg">
            {i + 1}) {c.contractor}
          </h2>
          <div className="mt-4 space-y-4">
            {c.regions.map((region) => (
              <div
                key={`${c.contractor}-${region.states}`}
                className="rounded-lg border border-border/70 bg-bg p-4"
              >
                <p className="text-sm text-fg">
                  <span className="font-semibold">States / territories: </span>
                  {region.states}
                </p>
                <p className="mt-2 text-sm text-fg-muted">
                  <span className="font-semibold text-fg">IVR: </span>
                  {region.ivr}
                </p>
                <p className="mt-1 text-sm text-fg-muted">
                  <span className="font-semibold text-fg">
                    Customer Service:{" "}
                  </span>
                  {region.customerService}
                </p>
                {region.links && (
                  <ul className="mt-3 flex flex-wrap gap-3 text-sm">
                    {region.links.ivrGuide && (
                      <li>
                        <a
                          href={region.links.ivrGuide}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-accent-deep underline underline-offset-2"
                        >
                          IVR Guide
                        </a>
                      </li>
                    )}
                    {region.links.appealForms && (
                      <li>
                        <a
                          href={region.links.appealForms}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-accent-deep underline underline-offset-2"
                        >
                          Appeal Forms
                        </a>
                      </li>
                    )}
                    {region.links.appealStatus && (
                      <li>
                        <a
                          href={region.links.appealStatus}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-accent-deep underline underline-offset-2"
                        >
                          Appeal Status
                        </a>
                      </li>
                    )}
                    {region.links.redeterminationStatus && (
                      <li>
                        <a
                          href={region.links.redeterminationStatus}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-accent-deep underline underline-offset-2"
                        >
                          Redetermination Status
                        </a>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
