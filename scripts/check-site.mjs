#!/usr/bin/env node
/**
 * Pre-publish checks for matchaxmoxie static HTML in site/.
 * Usage: node scripts/check-site.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = join(repoRoot, "site");
const htmlFiles = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (["scratch-player", "node_modules", ".git"].includes(name)) continue;
      walk(p);
    } else if (name.endsWith(".html")) htmlFiles.push(p);
  }
}

walk(siteRoot);

const errors = [];
const warnings = [];

function resolveHref(fromFile, href) {
  const pathPart = href.split("#")[0].split("?")[0];
  if (!pathPart) return null;
  return resolve(dirname(fromFile), pathPart);
}

for (const file of htmlFiles) {
  const rel = file.slice(siteRoot.length + 1);
  const html = readFileSync(file, "utf8");

  if (!/<meta[^>]+name=["']description["']/i.test(html)) {
    errors.push(`${rel}: missing meta description`);
  }

  const hrefRe = /href=["']([^"']+)["']/g;
  let m;
  while ((m = hrefRe.exec(html)) !== null) {
    const href = m[1];
    if (
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#") ||
      href.startsWith("javascript:")
    ) {
      continue;
    }
    const target = resolveHref(file, href);
    if (target && !existsSync(target)) {
      errors.push(`${rel}: broken link → ${href}`);
    }
  }
}

console.log(`Checked ${htmlFiles.length} HTML file(s) under ${siteRoot}\n`);

if (errors.length) {
  console.log("Errors:");
  for (const e of errors) console.log(`  • ${e}`);
  process.exit(1);
}

if (warnings.length) {
  console.log("Warnings:");
  for (const w of warnings) console.log(`  • ${w}`);
}

console.log("OK: descriptions present; relative links resolve.");
