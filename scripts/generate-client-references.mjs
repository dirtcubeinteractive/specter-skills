#!/usr/bin/env node
/**
 * Generates DTO-level CLIENT (game-side) API references from the client OpenAPI
 * spec, routed by domain into each skill's references/api/ folder. These are the
 * endpoints a game developer calls FROM THEIR GAME — all under /v2/client/* and
 * authenticated with the project api-key (+ a player access token for
 * player-scoped calls). The admin/dashboard API is /v1 and lives elsewhere.
 *
 * Source of truth: specs/client-openapi.json  (vendored copy of
 *                  https://api.specterapp.xyz/api-docs/client-json)
 * Output:          skills/<skill>/references/api/<slug>.md
 *                  skills/<skill>/references/client-api-index.md
 *
 * Complements the prose endpoint refs under references/endpoints/ (which carry
 * examples) with exhaustive, always-up-to-date request DTOs + auth per endpoint.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SPEC = join(ROOT, 'specs', 'client-openapi.json');
const SKILLS = join(ROOT, 'skills');

const spec = JSON.parse(readFileSync(SPEC, 'utf8'));
const schemas = spec.components?.schemas ?? {};

// Route a client endpoint to the skill that owns its domain, by OpenAPI tag.
const TAG_SKILL = {
  App: 'specter',
  Auth: 'specter-players',
  Account: 'specter-players',
  'My Player': 'specter-players',
  'Player Others': 'specter-players',
  Friends: 'specter-players',
  Achievements: 'specter-progression',
  Progression: 'specter-progression',
  Battlepass: 'specter-progression',
  Event: 'specter-progression',
  Wallet: 'specter-economy',
  Inventory: 'specter-economy',
  Stores: 'specter-economy',
  Leaderboard: 'specter-competitions',
  Competition: 'specter-competitions',
  'Live-ops': 'specter-competitions',
  Matches: 'specter-multiplayer',
  Matchmaking: 'specter-multiplayer',
  Party: 'specter-multiplayer',
};

const refName = (ref) => (ref ? ref.split('/').pop() : null);
const deref = (schema) => (schema?.$ref ? schemas[refName(schema.$ref)] ?? {} : schema ?? {});
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();

function typeLabel(p) {
  if (!p) return '?';
  if (p.$ref) return refName(p.$ref);
  if (p.type === 'array') {
    const it = p.items || {};
    return `${it.$ref ? refName(it.$ref) : it.type || 'any'}[]`;
  }
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
function fieldTable(schema, nestedOut) {
  const obj = deref(schema);
  const props = obj.properties ?? {};
  const required = new Set(obj.required ?? []);
  if (!Object.keys(props).length) return '';
  const rows = Object.entries(props).map(([name, p]) => {
    const r = p.$ref ? refName(p.$ref) : p.type === 'array' && p.items?.$ref ? refName(p.items.$ref) : null;
    if (r && schemas[r]?.properties) nestedOut.add(r);
    return `| \`${name}\` | ${typeLabel(p)} | ${required.has(name) ? '✅' : '—'} | ${allowedExample(p)} | ${esc(p.description)} |`;
  });
  return `| Field | Type | Required | Allowed / Example | Description |\n|---|---|---|---|---|\n${rows.join('\n')}`;
}

function authLine(op) {
  const sec = op.security || [];
  const hasKey = sec.some((s) => 'apiKey' in s);
  const hasBearer = sec.some((s) => 'bearer' in s);
  if (hasBearer) return 'Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.';
  if (hasKey) return 'Project **api-key** (`api-key` header) only. No player login required.';
  return 'See the endpoint (auth not declared in spec).';
}

function slugFor(path) {
  return path.replace(/^\/v2\/client\//, '').replace(/\{([^}]+)\}/g, '$1').replace(/\//g, '-').replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
}

function render({ method, path, op }) {
  const tag = (op.tags && op.tags[0]) || 'Client';
  const lines = [`# Client API (v2): \`${path.replace(/^\/v2\/client\//, '')}\``, ''];
  lines.push(`**Endpoint:** \`${method.toUpperCase()} ${path}\``, '');
  lines.push(`**Tag:** ${tag}`, '');
  if (op.summary) lines.push(`**Summary:** ${esc(op.summary)}`, '');
  lines.push(`**Auth:** ${authLine(op)}`, '');
  lines.push('---', '');
  const rb = op.requestBody?.content?.['application/json']?.schema;
  if (rb) {
    const dto = refName(rb.$ref) || 'Request body';
    const nested = new Set();
    const table = fieldTable(rb, nested);
    lines.push(`## Request body${rb.$ref ? ` — \`${dto}\`` : ''}`, '', table || '_No documented fields._', '');
    for (const n of nested) {
      const inner = new Set();
      const t = fieldTable({ $ref: `#/components/schemas/${n}` }, inner);
      if (t) lines.push('', `### Nested object: \`${n}\``, '', t);
    }
  } else {
    lines.push('## Request body', '', '_No request body (send `{}`)._');
  }
  lines.push('');
  return lines.join('\n');
}

// collect + route
const ops = [];
for (const [path, methods] of Object.entries(spec.paths)) {
  for (const [method, op] of Object.entries(methods)) {
    if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;
    const tag = (op.tags && op.tags[0]) || 'App';
    ops.push({ method, path, op, skill: TAG_SKILL[tag] || 'specter', tag });
  }
}

const bySkill = {};
for (const o of ops) (bySkill[o.skill] ||= []).push(o);

let total = 0;
for (const [skill, list] of Object.entries(bySkill)) {
  if (!existsSync(join(SKILLS, skill))) {
    console.error(`✗ skill missing: ${skill} (skipping ${list.length})`);
    continue;
  }
  const outDir = join(SKILLS, skill, 'references', 'api');
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const used = new Map();
  const written = [];
  for (const o of list.sort((a, b) => a.path.localeCompare(b.path))) {
    let slug = slugFor(o.path);
    if (used.has(slug)) slug = `${slug}-${o.method}`;
    used.set(slug, true);
    writeFileSync(join(outDir, `${slug}.md`), render(o));
    written.push({ ...o, file: `${slug}.md` });
    total++;
  }
  // index grouped by tag
  const byTag = {};
  for (const w of written) (byTag[w.tag] ||= []).push(w);
  const idx = [
    `# ${skill} — client (v2) API index`,
    '',
    '> Generated by `scripts/generate-client-references.mjs` from `specs/client-openapi.json`.',
    '> These are the **game-side** endpoints (all `POST /v2/client/*`) a developer calls from their',
    '> game, with the request DTO + auth (api-key, plus a player token for player-scoped calls).',
    '> The dashboard/admin API is `/v1/*` — see the admin skill, not here.',
    '',
  ];
  for (const tag of Object.keys(byTag).sort()) {
    idx.push(`## ${tag}`, '', '| Endpoint | Auth | Reference |', '|---|---|---|');
    for (const w of byTag[tag]) {
      const a = (w.op.security || []).some((s) => 'bearer' in s) ? 'api-key + player' : 'api-key';
      idx.push(`| \`${w.method.toUpperCase()} ${w.path}\` | ${a} | [${w.file}](api/${w.file}) |`);
    }
    idx.push('');
  }
  writeFileSync(join(SKILLS, skill, 'references', 'client-api-index.md'), idx.join('\n'));
  console.log(`✓ ${skill.padEnd(20)} ${written.length} client endpoints`);
}
console.log(`\n✓ ${total} client (v2) endpoints across ${Object.keys(bySkill).length} skills`);
