#!/usr/bin/env node
/**
 * specter-skills — installer for Specter's Claude Skills.
 *
 *   npx specter-skills init                      interactive install (+ optional MCP setup)
 *   npx specter-skills install [names...]        install (default: all skills)
 *       --global                                 install to ~/.claude/skills
 *       --dir <path>                             install to a custom skills dir
 *   npx specter-skills update                    re-install previously installed skills
 *   npx specter-skills list                      show available + installed skills
 *   npx specter-skills mcp                        register the MCP server in Claude Desktop
 *       --project                                ...or this project's .mcp.json (Claude Code)
 *       --production                              use the production environment
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

// --- MCP server auto-setup (so customers never hand-edit JSON) ---

function claudeDesktopConfigPath() {
  if (process.platform === 'darwin')
    return path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  if (process.platform === 'win32')
    return path.join(process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'), 'Claude', 'claude_desktop_config.json');
  return path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json');
}

function setupMcp({ target = 'desktop', env = 'staging', allowMutations = true }) {
  const file = target === 'project'
    ? path.join(process.cwd(), '.mcp.json')
    : claudeDesktopConfigPath();
  let cfg = {};
  if (fs.existsSync(file)) {
    try {
      cfg = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
      console.error(`✗ ${file} isn't valid JSON — add the "specter" MCP server manually (see the README).`);
      return false;
    }
  }
  cfg.mcpServers = cfg.mcpServers || {};
  cfg.mcpServers.specter = {
    command: 'npx',
    args: ['-y', '-p', 'specter-skills', 'specter-mcp'],
    env: { SPECTER_ENV: env, SPECTER_ALLOW_MUTATIONS: String(allowMutations) },
  };
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + '\n');
  console.log(`✓ Specter MCP server added to ${file} (env: ${env})`);
  if (target === 'project') console.log('  Claude Code picks up .mcp.json automatically.');
  else console.log('  Restart Claude Desktop to load it.');
  console.log('  The first time you ask Claude to create something, it opens a browser to sign in — no api-key or config needed.');
  return true;
}

async function init() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  console.log(`specter-skills ${VERSION} — Claude Skills + MCP for the Specter game backend\n`);
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

  // Offer to wire up the MCP server too — no manual JSON editing.
  const wantMcp = (await ask('\nAlso set up the MCP server, so Claude can create currencies/tasks/leaderboards for you? [Y/n]: ')).trim().toLowerCase();
  let mcp = null;
  if (wantMcp !== 'n' && wantMcp !== 'no') {
    const host = (await ask('  Set up for (1) Claude Desktop or (2) Claude Code [this project]? [1]: ')).trim();
    const e = (await ask('  Environment — (1) staging or (2) production? [1]: ')).trim();
    mcp = { target: host === '2' ? 'project' : 'desktop', env: e === '2' ? 'production' : 'staging', allowMutations: true };
  }
  rl.close();

  install(names.filter(Boolean), { global: where === '2' });
  if (mcp) {
    console.log('');
    setupMcp(mcp);
  }
}

// --- arg parsing ---
const argv = process.argv.slice(2);
const opts = { global: false, dir: null, project: false, env: 'staging' };
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--global' || argv[i] === '-g') opts.global = true;
  else if (argv[i] === '--dir') opts.dir = argv[++i];
  else if (argv[i] === '--project') opts.project = true;
  else if (argv[i] === '--production') opts.env = 'production';
  else if (argv[i] === '--env') opts.env = argv[++i];
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
  case 'mcp':
    // Add the MCP server to Claude Desktop (default) or this project's .mcp.json (--project)
    setupMcp({ target: opts.project ? 'project' : 'desktop', env: opts.env, allowMutations: true });
    break;
  case '--version':
  case '-v':
    console.log(VERSION);
    break;
  default:
    console.log(
      'Usage: specter-skills <init|install [names...]|update|list|mcp> [--global] [--dir <path>] [--project] [--production]'
    );
    process.exit(cmd === 'help' || cmd === '--help' ? 0 : 1);
}
