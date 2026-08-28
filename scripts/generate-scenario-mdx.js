#!/usr/bin/env node
/**
 * Generates MDX playbooks from AR_SCENARIO_CATALOG:
 * status → content/scenarios, denials → content/denials (no overlap).
 */
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

async function loadCatalog() {
  // Compile-free: read and eval isn't great; duplicate minimal parse via dynamic import of ts with tsx
  const catalogPath = path.join(
    __dirname,
    "../src/lib/ar-scenario-catalog.ts",
  );
  // Use tsx if available via require of compiled approach - write JSON sidecar instead
  const jsonPath = path.join(__dirname, "ar-scenario-catalog.json");
  if (!fs.existsSync(jsonPath)) {
    throw new Error("Missing scripts/ar-scenario-catalog.json — run export first");
  }
  return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
}

function mdxFor(entry, section) {
  const questionsYaml = entry.questions
    .map((q) => `  - ${JSON.stringify(q)}`)
    .join("\n");
  const outline = entry.outline.map((o) => `- ${o}`).join("\n");
  const questionsMd = entry.questions
    .map((q, i) => `${i + 1}. ${q}`)
    .join("\n");
  const actions = entry.actions.map((a) => `- ${a}`).join("\n");

  return `---
title: ${JSON.stringify(entry.title)}
description: ${JSON.stringify(entry.description)}
section: ${section}
tags: [${section === "denials" ? '"denial", ' : ""}"ar-scenario", "${entry.noteSchema}"]
order: ${entry.order}
updated: "2026-08-27"
whenToUse: ${JSON.stringify(entry.whenToUse)}
questions:
${questionsYaml}
---

## When this applies

${entry.description}

## Call / portal questions

${questionsMd}

## Research checklist

${outline}

## Typical actions

${actions}

## Notes

Always follow your client SOP. Remark codes can change the true root cause — open the matching scenario if the payer explanation differs from the denial title.

Use **Prepare Notes** below to build Analysis / Research / Action documentation for your system.
`;
}

async function main() {
  const catalog = await loadCatalog();
  const root = path.join(__dirname, "..");
  const scenDir = path.join(root, "content/scenarios");
  const denDir = path.join(root, "content/denials");

  // Remove old short-list scenario/denial playbooks (keep denial overview)
  for (const dir of [scenDir, denDir]) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  const keepDenials = new Set(["denial-management-overview.mdx"]);

  for (const f of fs.readdirSync(scenDir)) {
    if (f.endsWith(".mdx")) fs.unlinkSync(path.join(scenDir, f));
  }
  for (const f of fs.readdirSync(denDir)) {
    if (f.endsWith(".mdx") && !keepDenials.has(f)) {
      fs.unlinkSync(path.join(denDir, f));
    }
  }

  let statusCount = 0;
  let denialCount = 0;

  for (const entry of catalog) {
    // Status playbooks → /scenarios; denials → /denials (no duplication)
    if (entry.kind === "denial") {
      fs.writeFileSync(
        path.join(denDir, `${entry.slug}.mdx`),
        mdxFor(entry, "denials"),
      );
      denialCount += 1;
    } else {
      fs.writeFileSync(
        path.join(scenDir, `${entry.slug}.mdx`),
        mdxFor(entry, "scenarios"),
      );
      statusCount += 1;
    }
  }

  console.log(`Wrote ${statusCount} scenarios and ${denialCount} denials`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
