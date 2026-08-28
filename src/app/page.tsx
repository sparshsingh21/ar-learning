import Link from "next/link";
import { toolLinks } from "@/lib/site";

const paths = [
  {
    href: "/learn",
    title: "Learn AR",
    body: "Start with RCM, what AR owns, and how to work an account end to end.",
  },
  {
    href: "/scenarios",
    title: "Work a scenario",
    body: "Open call questions and note templates for the situation in front of you.",
  },
  {
    href: "/ecw",
    title: "Use ECW",
    body: "Step through eClinicalWorks queues, claim status, notes, and aging reports.",
  },
  {
    href: "/tools",
    title: "Use a tool",
    body: "Days in AR, timely filing, attendance metrics, and payment checks.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-hero-from via-hero-via to-hero-to text-white">
        <div
          className="hero-orb pointer-events-none absolute -right-16 top-8 h-72 w-72 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-accent-warm/30 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
            AR Training Guide
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Clear AR training for medical billing teams.
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Learn the revenue cycle, resolve denials with confidence, follow ECW
            click-paths, and use practical calculators — without digging through a
            crowded blog menu.
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-hero-from transition hover:bg-white/90"
            >
              Start learning
            </Link>
            <Link
              href="/ecw"
              className="rounded-lg border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Open ECW guide
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-fg">
          Four ways to get work done
        </h2>
        <p className="mt-2 max-w-2xl text-fg-muted">
          Pick the path that matches your task — training, a live claim, the EHR,
          or a quick calculation.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {paths.map((path, i) => (
            <Link
              key={path.href}
              href={path.href}
              className="rounded-xl border border-border bg-bg-elevated p-6 transition hover:border-accent/40 hover:shadow-[var(--shadow)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-fg">
                {path.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {path.body}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-fg">
            AR tools
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {toolLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="rounded-lg border border-border bg-bg p-4 transition hover:border-accent/40"
              >
                <p className="font-semibold text-fg">{tool.label}</p>
                <p className="mt-1 text-xs text-fg-muted">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
