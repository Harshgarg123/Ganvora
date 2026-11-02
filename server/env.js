// Robust .env loader. Import this FIRST in every server entry file.
// Handles: wrong working directory, Windows UTF-16 / BOM files, CRLF, and alternative variable names.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const candidates = [...new Set([path.join(root, '.env'), path.join(process.cwd(), '.env'), path.join(root, '..', '.env')])];

function readText(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0xff && b[1] === 0xfe) return b.toString('utf16le').replace(/^\uFEFF/, ''); // PowerShell ">" output
  return b.toString('utf8').replace(/^\uFEFF/, ''); // strip BOM from Notepad
}

export const envInfo = { loadedFrom: [], keys: [], checked: candidates, root };

for (const file of candidates) {
  if (!fs.existsSync(file)) continue;
  try {
    const parsed = dotenv.parse(readText(file));
    for (const [k, v] of Object.entries(parsed)) {
      process.env[k.trim()] = v; // .env wins over stale terminal variables
      envInfo.keys.push(k.trim());
    }
    envInfo.loadedFrom.push(file);
  } catch (e) {
    console.error(`Could not read ${file}: ${e.message}`);
  }
}

// Accept common alternative names for the connection string.
if (!process.env.MONGODB_URI) {
  for (const alt of ['MONGO_URI', 'MONGODB_URL', 'MONGO_URL', 'DATABASE_URL', 'MONGODB_CONNECTION_STRING']) {
    if (process.env[alt]) { process.env.MONGODB_URI = process.env[alt]; envInfo.keys.push(`${alt} (used as MONGODB_URI)`); break; }
  }
}

// Human-readable diagnosis (never prints values).
export function describeEnv() {
  const lines = [];
  lines.push(envInfo.loadedFrom.length ? `.env loaded from: ${envInfo.loadedFrom.join(', ')}` : `NO .env file found. Looked in: ${envInfo.checked.join(' | ')}`);
  lines.push(`Variables in .env: ${envInfo.keys.length ? envInfo.keys.join(', ') : '(none)'}`);
  lines.push(`MONGODB_URI is ${process.env.MONGODB_URI ? 'SET (' + process.env.MONGODB_URI.length + ' chars)' : 'EMPTY / MISSING'}`);
  try {
    const odd = fs.readdirSync(root).filter((f) => /^\.env/i.test(f) && f !== '.env' && f !== '.env.example');
    if (odd.length) lines.push(`Possible misnamed file(s) in project folder: ${odd.join(', ')} -> it must be named exactly ".env"`);
    if (!fs.existsSync(path.join(root, '.env')) && fs.existsSync(path.join(root, '.env.example')))
      lines.push('Found .env.example but no .env -> copy it: cp .env.example .env (Windows: copy .env.example .env)');
  } catch { /* ignore */ }
  return lines.join('\n  ');
}
