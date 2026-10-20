import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
const port = Number(process.env.PORT || 4173);
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.xml':'application/xml', '.txt':'text/plain; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.ico':'image/x-icon', '.pdf':'application/pdf', '.woff2':'font/woff2', '.map':'application/json' };
const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (urlPath.includes('\0')) throw new Error('Bad path');
    let file = path.resolve(root, '.' + urlPath);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    let stat = await fs.stat(file).catch(()=>null);
    if (stat?.isDirectory()) file = path.join(file,'index.html');
    else if (!stat && !path.extname(file)) file = path.join(file,'index.html');
    const bytes = await fs.readFile(file);
    res.writeHead(200, {'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-cache'}).end(bytes);
  } catch(e) { 
    if (e.code === 'ENOENT' || e.code === 'ENOTDIR') {
      try {const data=await fs.readFile(path.join(root,'404.html'));res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end(data);}
      catch {res.writeHead(404).end('Not found');}
    } else res.writeHead(400).end('Bad request');
  }
});
server.listen(port, '127.0.0.1', ()=>console.log(`Static export preview: http://localhost:${port}`));
