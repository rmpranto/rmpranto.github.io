import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
const data = await fs.readFile(path.join(root,'content','data.ts'),'utf8');
const slugs = [...data.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const paths = [
  'index.html','about/index.html','projects/index.html','404.html',
  'sitemap.xml','robots.txt','.nojekyll',
  'resume/Rahat_Maksud_Pranto_Data_Analyst_2Y_Exp_CV.pdf',
  'resume/cv-preview-page-1.webp',
  'resume/cv-preview-page-2.webp',
  ...slugs.map(slug => `projects/${slug}/index.html`),
  ...(['pizza-sales-dashboard.html', "Spotify's-Most-Streamed-Tracks.html",'Maven-Market-Analysis.html', 'Road-Accident-Dashboard.html','Adventure-work-Report.html', 'Car-Transport-Management-System.html','Helping-Hand.html','Library-Management-System.html'].map(name=>`project-details/${name}`)),
];
const missing=[];
for (const filename of paths) {
  try { const file=await fs.stat(path.join(out,filename)); if(!file.isFile()) missing.push(filename); }
  catch {missing.push(filename);}
}
const assetManifest=JSON.parse(await fs.readFile(path.join(root,'scripts','public-assets-manifest.json'),'utf8'));
for (const item of assetManifest) {
  try {const file=await fs.stat(path.join(out,item.localPath));if(!file.isFile() || file.size!==item.size)missing.push(item.localPath);}
  catch{missing.push(item.localPath);}
}
console.log(`Static route + assets check: ${paths.length + assetManifest.length - missing.length}/${paths.length + assetManifest.length} present`);
if (missing.length) {console.error('Build output is missing:\n'+missing.map(x=>' - '+x).join('\n'));process.exitCode=1;}
