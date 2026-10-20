# Deploy V26 on your existing GitHub Pages repository

Target repository: `https://github.com/rmpranto/rmpranto.github.io`  
Branch: **`master`** (not `main`)  
Live URL after successful deployment: `https://rmpranto.github.io/`  
XAMPP/Apache is **not** required for Next.js.

## Step 1 — keep a complete backup
In Windows Explorer, rename existing `C:\xampp\htdocs\my-portfolio` to `my-portfolio-backup`. Do not delete this backup. The old site will be replaced at GitHub Pages when the new workflow first succeeds.

## Step 2 — extract V26 and preserve downloaded images
Extract the full V26 ZIP to `C:\xampp\htdocs\my-portfolio` (make sure `package.json` is at the root, not one level too deep).
If you already synced assets in the old folder, **copy** `my-portfolio-backup\public\assets\` to `my-portfolio\public\assets\`. The distribution ZIP is based on source and might NOT contain these separately downloaded files.
Do this **before** replacing the old site; once the old GitHub Pages site is replaced, the original public image URLs might stop working.

## Step 3 — reuse only your old local Git identity
Copy the hidden `.git` folder from `my-portfolio-backup` into the new `my-portfolio` folder. Don't copy the old `index.html`, old css/js files or the old `project-details` website into the new root.
Don't move `.git` if it belongs to a different repository.

## Step 4 — validate before pushing
Open CMD (not PowerShell) in the new folder:

```cmd
cd /d C:\xampp\htdocs\my-portfolio
node -v
git remote -v
git branch --show-current
git switch master
npm.cmd install
npm.cmd run assets:check
npm.cmd run build
npm.cmd run preview
```

If `npm.cmd run build` prints an error, stop and fix it before pushing. The `out/` site is NOT ready until that command succeeds.

Visit `http://localhost:4173/`, `http://localhost:4173/about/`, and **all 8** `/projects/<slug>/` pages; test mobile menu, light/dark mode, scrolling animations, image galleries and resume PDF. Stop preview with Ctrl+C.
Important: `npm run build` creates `out/`. GitHub Actions publishes `out/` but Git ignores that folder. The Actions workflow also validates routes, original images, sitemap and `.nojekyll` before publishing.

If asset check fails, copy the complete `public/assets/` directory you previously downloaded. `scripts/public-assets-manifest.json` tracks **25 original files**.

## Step 5 — set GitHub Pages to Actions
Open `https://github.com/rmpranto/rmpranto.github.io/settings/pages` → **Build and deployment** → **Source** → **GitHub Actions**. Do not use “Deploy from a branch”; that would serve raw Next.js source instead of the built site.

## Step 6 — review and push
```cmd
cd /d C:\xampp\htdocs\my-portfolio
git status
git add -A
git status
git commit -m "Deploy Next.js portfolio V26 with GitHub Pages"
git push -u origin master
```
Note that replacing the old HTML site will show many deletions in `git status`; inspect before committing. `.gitignore` excludes `drafts`, `node_modules`, `.next`, `out`, `.env` and QA files.

## Step 7 — watch deployment
Open `https://github.com/rmpranto/rmpranto.github.io/actions`. Click “Deploy RMP Portfolio to GitHub Pages” → newest run → build/deploy. Only **after green checks**, visit `https://rmpranto.github.io/`. If the workflow fails, the previous published artifact should remain; fix errors and push again.

## Legacy project links
Eight old `project-details/*.html` pages redirect to the matching `/projects/<slug>/` pages. Their original page content is retained in your Git history/backups, not republished alongside the new design.

## Later: rmpranto.dev
Buy & verify the domain, configure GitHub Pages custom domain and DNS, then update the workflow `NEXT_PUBLIC_SITE_URL` to `https://rmpranto.dev`. Review sitemap, canonical and HTTPS before announcing the new domain.

## Troubleshooting
- **404 on scripts or styles:** Pages Source must be GitHub Actions; `public/.nojekyll` should exist; GitHub user site should have no `basePath`.
- **Images missing:** Check `npm run assets:check` locally and ensure `public/assets/` was committed.
- **403 or 404 during GitHub Actions deploy:** Enable Pages in repository Settings and ensure Actions have sufficient permissions; organization rules may override workflow permissions.
- **Broken routes:** `npm run build` must generate `out/about/index.html` and eight `out/projects/<slug>/index.html`.
- **Contact form:** Requires availability of the configured external Formspree endpoint; static export does not host an inbox or server.
- **Node dependencies:** This distribution has no lock file; `npm install` will generate `package-lock.json` on your PC. Include it in your commit; the workflow will switch to `npm ci` automatically.

**Note on existing tracked files:** `.gitignore` prevents new unwanted files from being added; it does not untrack files already committed. Inspect `git status` and `git ls-files drafts`. If drafts are tracked, use `git rm -r --cached drafts` before staging (this keeps local files).
