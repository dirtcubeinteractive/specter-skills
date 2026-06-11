#!/usr/bin/env node
/**
 * specter-skills — installer for Specter's Claude Skills.
 *
 *   npx specter-skills init                      interactive install
 *   npx specter-skills install [names...]        install (default: all skills)
 *       --global                                 install to ~/.claude/skills
 *       --dir <path>                             install to a custom skills dir
 *   npx specter-skills update                    re-install previously installed skills
 *   npx specter-skills list                      show available + installed skills
 */
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const PKG_ROOT = path.dirname(__dirname);
const SKILLS_SRC = path.join(PKG_ROOT, 'skills');
const VERSION = require(path.join(PKG_ROOT, 'package.json')).version;

function availableSkills() {
  return fs
    .readdirSync(SKILLS_SRC)
    .filter((d) => fs.existsSync(path.join(SKILLS_SRC, d, 'SKILL.md')))
    .sort();
}

function skillDescription(name) {
  const md = fs.readFileSync(path.join(SKILLS_SRC, name, 'SKILL.md'), 'utf8');
  const m = md.match(/description:\s*>-?\n((?:\s{2,}.+\n)+)/);
  if (!m) return '';
  return m[1].replace(/\s+/g, ' ').trim().slice(0, 110) + '…';
}

function targetDir(opts) {
  if (opts.dir) return path.resolve(opts.dir);
  if (opts.global) return path.join(os.homedir(), '.claude', 'skills');
  return path.join(process.cwd(), '.claude', 'skills');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function installedVersion(dir, name) {
  const f = path.join(dir, name, '.specter-skills-version');
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8').trim() : null;
}

function install(names, opts) {
  const all = availableSkills();
  const unknown = names.filter((n) => !all.includes(n));
  if (unknown.length) {
    console.error(`✗ unknown skill(s): ${unknown.join(', ')}\n  available: ${all.join(', ')}`);
    process.exit(1);
  }
  const chosen = names.length ? names : all;
  const dest = targetDir(opts);
  for (const name of chosen) {
    const prev = installedVersion(dest, name);
    copyDir(path.join(SKILLS_SRC, name), path.join(dest, name));
    fs.writeFileSync(path.join(dest, name, '.specter-skills-version'), VERSION + '\n');
    console.log(
      prev && prev !== VERSION
        ? `✓ ${name} updated ${prev} → ${VERSION}`
        : `✓ ${name} installed (${VERSION})`
    );
  }
  console.log(`\nInstalled to ${dest}`);
  console.log('Open Claude Code in this project and ask it to integrate Specter — e.g.');
  console.log('  "Add Specter login and a coin wallet to my game"');
}

function update(opts) {
  const dest = targetDir(opts);
  if (!fs.existsSync(dest)) {
    console.error(`✗ nothing installed at ${dest}`);
    process.exit(1);
  }
  const installed = availableSkills().filter((n) => installedVersion(dest, n));
  if (!installed.length) {
    console.error(`✗ no specter skills found in ${dest} (looked for .specter-skills-version stamps)`);
    process.exit(1);
  }
  install(installed, opts);
}

function list(opts) {
  const dest = targetDir(opts);
  const globalDir = path.join(os.homedir(), '.claude', 'skills');
  console.log(`specter-skills ${VERSION}\n`);
  for (const name of availableSkills()) {
    const local = installedVersion(dest, name);
    const glob = installedVersion(globalDir, name);
    const status = local
      ? `installed ${local} (project)`
      : glob
        ? `installed ${glob} (global)`
        : 'not installed';
    console.log(`  ${name.padEnd(22)} ${status}`);
    console.log(`    ${skillDescription(name)}`);
  }
}

async function init() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log(`specter-skills ${VERSION} — Claude Skills for the Specter game backend\n`);
  const all = availableSkills();
  all.forEach((n, i) => console.log(`  ${i + 1}. ${n}`));
  const pick = (
    await ask('\nSkills to install (numbers/names, comma-separated, Enter = all): ')
  ).trim();
  const names = !pick
    ? []
    : pick.split(',').map((p) => {
        const t = p.trim();
        return /^\d+$/.test(t) ? all[Number(t) - 1] : t;
      });
  const where = (await ask('Install to (1) this project [.claude/skills] or (2) global [~/.claude/skills]? [1]: ')).trim();
  rl.close();
  install(names.filter(Boolean), { global: where === '2' });
}

// --- arg parsing ---
const argv = process.argv.slice(2);
const opts = { global: false, dir: null };
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--global' || argv[i] === '-g') opts.global = true;
  else if (argv[i] === '--dir') opts.dir = argv[++i];
  else positional.push(argv[i]);
}
const cmd = positional.shift() || 'init';

switch (cmd) {
  case 'init':
    init();
    break;
  case 'install':
    install(positional, opts);
    break;
  case 'update':
    update(opts);
    break;
  case 'list':
    list(opts);
    break;
  case '--version':
  case '-v':
    console.log(VERSION);
    break;
  default:
    console.log(
      'Usage: specter-skills <init|install [names...]|update|list> [--global] [--dir <path>]'
    );
    process.exit(cmd === 'help' || cmd === '--help' ? 0 : 1);
}
