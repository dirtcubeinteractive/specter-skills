#!/usr/bin/env node
/**
 * Generates per-endpoint admin references for the specter-admin skill from the
 * backend's OpenAPI spec.
 *
 * Source of truth: specs/admin-openapi.json   (vendored copy of
 *                  https://api.specterapp.xyz/api-docs/admin-json)
 * Output:          skills/specter-admin/references/endpoints/*.md
 *                  skills/specter-admin/references/endpoints-index.md
 *
 * The OpenAPI request DTOs carry required flags, types, enums, examples and
 * descriptions — that's what we render. Responses in the spec are generic, so
 * we focus on the request shape (which is what callers actually need to build).
 *
 * Refresh the vendored spec with:
 *   curl -s https://api.specterapp.xyz/api-docs/admin-json -o specs/admin-openapi.json
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SPEC = join(ROOT, 'specs', 'admin-openapi.json');
const OUT_DIR = join(ROOT, 'skills', 'specter-admin', 'references', 'endpoints');
const INDEX = join(ROOT, 'skills', 'specter-admin', 'references', 'endpoints-index.md');

const spec = JSON.parse(readFileSync(SPEC, 'utf8'));
const schemas = spec.components?.schemas ?? {};

const refName = (ref) => (ref ? ref.split('/').pop() : null);
const deref = (schema) => (schema?.$ref ? schemas[refName(schema.$ref)] ?? {} : schema ?? {});

// Render a one-line type label for a property schema.
function typeLabel(p) {
  if (!p) return '?';
  if (p.$ref) return refName(p.$ref);
  if (p.type === 'array') {
    const it = p.items || {};
    return `${it.$ref ? refName(it.$ref) : it.type || 'any'}[]`;
  }
  if (p.enum) return p.type || 'string';
  return p.type || (p.properties ? 'object' : 'any');
}

function allowedExample(p) {
  if (!p) return '';
  if (p.enum) return p.enum.map((e) => `\`${e}\``).join(' \\| ');
  if (p.example !== undefined) {
    const v = typeof p.example === 'object' ? JSON.stringify(p.example) : String(p.example);
    return `e.g. \`${v.length > 48 ? v.slice(0, 45) + '…' : v}\``;
  }
  if (p.type === 'array' && p.items?.$ref) return 'see below';
  return '';
}

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();

// Build the field table for an object schema; collect nested object/array refs to expand.
function fieldTable(schema, nestedOut) {
  const obj = deref(schema);
  const props = obj.properties ?? {};
  const required = new Set(obj.required ?? []);
  if (!Object.keys(props).length) return '';
  const rows = Object.entries(props).map(([name, p]) => {
    // queue nested component schemas (objects + arrays-of-objects) for expansion
    const r = p.$ref ? refName(p.$ref) : p.type === 'array' && p.items?.$ref ? refName(p.items.$ref) : null;
    if (r && schemas[r]?.properties) nestedOut.add(r);
    return `| \`${name}\` | ${typeLabel(p)} | ${required.has(name) ? '✅' : '—'} | ${allowedExample(p)} | ${esc(p.description)} |`;
  });
  return `| Field | Type | Required | Allowed / Example | Description |\n|---|---|---|---|---|\n${rows.join('\n')}`;
}

function slugFor(path) {
  return path
    .replace(/^\/v\d+\//, '')
    .replace(/^\//, '')
    .replace(/\{([^}]+)\}/g, '$1')
    .replace(/\//g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .toLowerCase();
}

const DESTRUCTIVE = /\/(delete|remove|archive|revoke|deactivate|unsubscribe)/i;

function renderEndpoint({ method, path, op }) {
  const tag = (op.tags && op.tags[0]) || 'Admin';
  const title = op.summary || `${method.toUpperCase()} ${path}`;
  const lines = [`# Admin API: \`${path.replace(/^\/v\d+\//, '')}\``, ''];
  lines.push(`**Endpoint:** \`${method.toUpperCase()} ${path}\``, '');
  lines.push(`**Tag:** ${tag}`, '');
  lines.push(`**Summary:** ${esc(title)}`, '');
  lines.push(
    `**Auth:** Member Bearer token (\`Authorization: Bearer <token>\`) through the api-key gateway (\`api-key\` header). Get the token via the MCP browser sign-in — never ask the user for a password.`,
    ''
  );
  if (DESTRUCTIVE.test(path))
    lines.push(`> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.`, '');
  lines.push('---', '');

  const rbSchema = op.requestBody?.content?.['application/json']?.schema;
  if (rbSchema) {
    const dtoName = refName(rbSchema.$ref) || 'Request body';
    const nested = new Set();
    const table = fieldTable(rbSchema, nested);
    lines.push(`## Request body${rbSchema.$ref ? ` — \`${dtoName}\`` : ''}`, '');
    lines.push(table || '_No documented fields._', '');
    // expand nested DTOs one level
    for (const n of nested) {
      const innerNested = new Set();
      const t = fieldTable({ $ref: `#/components/schemas/${n}` }, innerNested);
      if (t) {
        lines.push('', `### Nested object: \`${n}\``, '', t);
      }
    }
  } else {
    lines.push('## Request body', '', '_No request body (or not documented in the spec)._');
  }
  lines.push('');
  return lines.join('\n');
}

// --- collect operations (skip infra/health probes with no game-config value) ---
const SKIP_PATH = /^\/(health|metrics)?$/i;
const ops = [];
for (const [path, methods] of Object.entries(spec.paths)) {
  if (SKIP_PATH.test(path)) continue;
  for (const [method, op] of Object.entries(methods)) {
    if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;
    ops.push({ method, path, op });
  }
}

// --- write files (dedupe slugs by appending method) ---
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

const used = new Map();
const written = [];
for (const e of ops) {
  let slug = slugFor(e.path);
  if (used.has(slug)) slug = `${slug}-${e.method}`;
  used.set(slug, true);
  const file = `${slug}.md`;
  writeFileSync(join(OUT_DIR, file), renderEndpoint(e));
  written.push({ ...e, file, tag: (e.op.tags && e.op.tags[0]) || 'Admin' });
}

// --- index grouped by tag ---
const byTag = {};
for (const w of written) (byTag[w.tag] ||= []).push(w);
const idx = [
  '# specter-admin — endpoint index',
  '',
  '> Generated by `scripts/generate-admin-references.mjs` from `specs/admin-openapi.json`. Do not edit by hand.',
  '> Each linked file documents the request DTO (required fields, enums, examples) for that admin endpoint.',
  '> All admin endpoints are `POST`/`GET` under `/v1` and require a member Bearer token + the api-key gateway.',
  '',
];
for (const tag of Object.keys(byTag).sort()) {
  idx.push(`## ${tag}`, '', '| Endpoint | Reference |', '|---|---|');
  for (const w of byTag[tag].sort((a, b) => a.path.localeCompare(b.path))) {
    const flag = DESTRUCTIVE.test(w.path) ? ' ⚠' : '';
    idx.push(`| \`${w.method.toUpperCase()} ${w.path}\`${flag} | [${w.file}](endpoints/${w.file}) |`);
  }
  idx.push('');
}
writeFileSync(INDEX, idx.join('\n'));

console.log(`✓ admin references: ${written.length} endpoints across ${Object.keys(byTag).length} tags → ${OUT_DIR.replace(ROOT + '/', '')}`);
