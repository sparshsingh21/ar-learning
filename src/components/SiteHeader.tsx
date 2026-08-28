"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, siteConfig } from "@/lib/site";
import { SearchDialog } from "./SearchDialog";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-bg-elevated/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="group flex items-baseline gap-2 shrink-0">
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-fg">
              {siteConfig.shortName}
            </span>
            <span className="hidden text-xs text-fg-muted sm:inline">
              Medical AR training
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {mainNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-accent-soft text-accent-deep"
                      : "text-fg-muted hover:bg-bg hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-md border border-border bg-bg px-3 py-1.5 text-sm text-fg-muted transition hover:border-accent/40 hover:text-fg sm:inline-flex"
              aria-label="Open search"
            >
              <span>Search</span>
              <kbd className="rounded border border-border bg-bg-elevated px-1.5 py-0.5 text-[10px] font-medium">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className="flex w-4 flex-col gap-1">
                <span className="h-0.5 w-full bg-fg" />
                <span className="h-0.5 w-full bg-fg" />
                <span className="h-0.5 w-full bg-fg" />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border bg-bg-elevated lg:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
                className="mb-2 rounded-md border border-border px-3 py-2 text-left text-sm text-fg-muted"
              >
                Search guides…
              </button>
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-fg hover:bg-accent-soft"
                >
                  {item.label}
                  <span className="mt-0.5 block text-xs font-normal text-fg-muted">
                    {item.description}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
