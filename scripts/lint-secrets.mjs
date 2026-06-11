#!/usr/bin/env node
/**
 * Blocks secrets and internal infrastructure details from entering published skills.
 * Runs on prepublishOnly. Scans everything under skills/.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SKILLS_DIR = join(ROOT, 'skills');

const PATTERNS = [
  [/[a-f0-9]{48,}/i, 'long hex string (possible secret/JWT signing key)'],
  [/AKIA[A-Z0-9]{16}/, 'AWS access key id'],
  [/mongodb(\+srv)?:\/\/[^\s"'<]+:[^\s"'<]+@/, 'MongoDB connection string with credentials'],
  [/postgres(ql)?:\/\/[^\s"'<]+:[^\s"'<]+@/, 'Postgres connection string with credentials'],
  [/\.elb\.amazonaws\.com/, 'internal ALB hostname'],
  [/\.rds\.amazonaws\.com/, 'internal RDS hostname'],
  [/-----BEGIN[ A-Z]*PRIVATE KEY-----/, 'private key material'],
  [/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}/, 'real JWT token'],
];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) yield* walk(p);
    else yield p;
  }
}

const findings = [];
for (const file of walk(SKILLS_DIR)) {
  const content = readFileSync(file, 'utf8');
  for (const [re, label] of PATTERNS) {
    const m = content.match(re);
    if (m) {
      const line = content.slice(0, m.index).split('\n').length;
      findings.push(`${relative(ROOT, file)}:${line} — ${label}`);
    }
  }
}

if (findings.length) {
  console.error(`✗ secret linter found ${findings.length} issue(s):`);
  for (const f of findings) console.error(`  ${f}`);
  process.exit(1);
}
console.log('✓ secret linter: skills/ is clean');
