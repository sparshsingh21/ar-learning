import Link from "next/link";
import { mainNav, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-bold text-fg">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
            Original training material for US medical billing Accounts Receivable.
            Educational only — always follow your client and payer guidelines.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-fg-muted transition hover:text-accent-deep"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-fg-muted sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Not affiliated with
          eClinicalWorks or any payer.
        </p>
      </div>
    </footer>
  );
}
