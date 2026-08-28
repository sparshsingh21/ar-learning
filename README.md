# AR Training Guide

Public learning site for US medical billing **Accounts Receivable (AR)** — RCM basics, denial scenarios, eClinicalWorks (ECW) click-paths, and AR calculators.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- MDX content via `gray-matter` + `next-mdx-remote`
- Client search with Fuse.js (`⌘K`)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Content

Guides live in `/content` as MDX with YAML frontmatter:

| Folder | Section |
| --- | --- |
| `content/learn` | Core AR / RCM articles |
| `content/scenarios` | Full AR scenario library (61 playbooks — status + denials) |
| `content/denials` | Denial playbooks (54) + denial management overview |
| `content/ecw` | ECW usage guides |
| `content/references` | Phones, forms, websites |

The scenario/denial catalog is defined in `src/lib/ar-scenario-catalog.ts`. Regenerate MDX with:

```bash
npx tsx -e 'import { AR_SCENARIO_CATALOG } from "./src/lib/ar-scenario-catalog.ts"; import fs from "fs"; fs.writeFileSync("scripts/ar-scenario-catalog.json", JSON.stringify(AR_SCENARIO_CATALOG, null, 2));'
node scripts/generate-scenario-mdx.js
```

Prepare Notes schemas are mapped per slug in `src/lib/note-forms/registry.ts`.

Frontmatter fields: `title`, `description`, `section`, `tags`, `order`, `updated`, optional `status` (`published` \| `stub`), `whenToUse`, and for scenarios `questions` / `suggestedNotes`. ECW pages may include a `steps` array with optional `screenshot` paths.

### Add an article

1. Create `content/<section>/my-topic.mdx`
2. Set frontmatter (`section` must match the folder)
3. Restart or refresh — pages are generated from the filesystem at build time

### ECW screenshots

1. Add PHI-redacted images under `public/ecw/`
2. Reference them in frontmatter:

```yaml
steps:
  - title: Open AR queue
    detail: ...
    screenshot: /ecw/ar-queue.png
```

Scenario pages and denial articles include a **Prepare Notes** form. Fields are **per scenario/denial** (matching ARLearningOnline patterns) — e.g. medical records asks for MR mode/fax, auth asks auth#/retro paths, no-response asks TFL/coverage. Schemas live in `src/lib/note-forms/registry.ts`.

## Tools

- `/tools/days-in-ar`
- `/tools/tfl-afl`
- `/tools/attrition`
- `/tools/payment-validator`

## Deploy

Deploy to Vercel or any Node host that supports Next.js. Update `metadataBase` in `src/app/layout.tsx` and URLs in `src/app/sitemap.ts` / `robots.ts` for production.
