import { cpSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcRoot = join(root, 'src');
const distRoot = join(root, 'dist');

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!name.endsWith('.prompt.md')) continue;
    const rel = relative(srcRoot, full);
    const dest = join(distRoot, rel);
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(full, dest);
  }
}

walk(srcRoot);
