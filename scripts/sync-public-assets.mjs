// Read-only download of approved PUBLIC assets from the owner's original GitHub repository.
// No confidential ECRM or client screenshots are requested here.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(await fs.readFile(path.join(project,'scripts','public-assets-manifest.json'),'utf8'));
const allow=new Set(['projects','certifications','profile']);
let downloaded=0,kept=0,failed=0;
function blobHash(bytes){return crypto.createHash('sha1').update(Buffer.from(`blob ${bytes.length}\0`)).update(bytes).digest('hex')}
async function syncOne(asset){
 try{
  const dest=path.resolve(project,'public',asset.localPath);
  const sub=asset.localPath.split('/');
  if(sub[0]!=='assets'||!allow.has(sub[1])||((sub[1]==='projects'&&sub.length!==4)||(sub[1]!=='projects'&&sub.length!==3))||sub.some(part=>part==='..'||!part))throw new Error('Unexpected asset path');
  if(await fs.stat(dest).then(x=>x.isFile(),()=>false)){
   const old=await fs.readFile(dest);
   if(old.length===asset.size&&blobHash(old)===asset.gitBlobSha){kept++;return}
  }
  // Two sources for the SAME public GitHub file. Never use production/private client URLs.
  const links=[`https://raw.githubusercontent.com/rmpranto/rmpranto.github.io/master/${asset.repoPath}`,`https://rmpranto.github.io/${asset.repoPath}`];
  let bytes;
  for(const link of links){
   try{
    const response=await fetch(link,{signal:AbortSignal.timeout(20000)});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const raw=Buffer.from(await response.arrayBuffer());
    if(raw.length!==asset.size||blobHash(raw)!==asset.gitBlobSha)throw new Error('Asset checksum mismatch');
    bytes=raw;break;
   }catch(error){if(link===links.at(-1))throw error}
  }
  await fs.mkdir(path.dirname(dest),{recursive:true});
  await fs.writeFile(dest,bytes);
  console.log(`Saved ${asset.localPath}`);downloaded++;
 }catch(error){failed++;console.error(`Could not sync ${asset.localPath}: ${error.message}`)}
}
// Fetch 4 at a time so first-run setup is not painfully slow.
for(let offset=0;offset<manifest.length;offset+=4){await Promise.all(manifest.slice(offset,offset+4).map(syncOne))}
console.log(`\nPublic assets: ${downloaded} downloaded, ${kept} already verified, ${failed} unavailable.`);
if(failed){console.log('The website falls back to the original public image URLs when local files are missing.');process.exitCode=1;}
