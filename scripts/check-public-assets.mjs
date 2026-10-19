import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const items = JSON.parse(await fs.readFile(path.join(root,'scripts','public-assets-manifest.json'),'utf8'));
const calcSha = bytes => crypto.createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
const missing = [], mismatched = [], valid = [];
for (const item of items) {
  const safe = item.localPath.replaceAll('\\','/');
  if (!/^assets\/(projects|certifications|profile)\//.test(safe) || safe.includes('..')) {
    mismatched.push(`${safe}: unexpected path`); continue;
  }
  try {
    const bytes = await fs.readFile(path.join(root,'public',safe));
    if (bytes.length !== item.size || calcSha(bytes) !== item.gitBlobSha) mismatched.push(safe);
    else valid.push(safe);
  } catch (error) {
    if (error?.code === 'ENOENT') missing.push(safe);
    else throw error;
  }
}
console.log(`Public assets verified: ${valid.length}/${items.length}`);
if (missing.length) console.error('MISSING public assets:\n' + missing.map(x=>' - '+x).join('\n'));
if (mismatched.length) console.error('INVALID public assets:\n' + mismatched.map(x=>' - '+x).join('\n'));
if (missing.length || mismatched.length) {
  console.error('Copy your already-synced public/assets/ directory into this project. Do this BEFORE pushing.');
  process.exitCode = 1;
}
