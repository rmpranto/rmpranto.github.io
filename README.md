# Rahat Maksud Pranto — Portfolio V26 (GitHub Pages)

Next.js 15, React 19, TypeScript, Motion, static export for **rmpranto/rmpranto.github.io** (default branch `master`).
This replaces the older static HTML website at the same URL once deployed.

## Run locally
- Install Node.js 22.
- Run `npm install` then `npm run dev` (http://localhost:3000).
- After downloading public assets, run `npm run assets:check` and `npm run build`.
- Inspect **actual exported pages** via `npm run preview` (http://localhost:4173).

## Deploy
Follow **`DEPLOY_TO_GITHUB_PAGES_V26.md`** precisely. A GitHub Actions workflow builds the `out/` directory and publishes it automatically when `master` is pushed. Don't upload `out/` or `.next/` to Git.

## Content
- Eight public independent / academic projects are available under `/projects/`.
- Dark/light theme, Motion animations, resume preview and Formspree contact form are client-side features designed to work on static hosting.
- The historical `/project-details/*.html` URLs have small static redirect pages.
- `drafts/` is excluded from Git. Preserve it locally and back it up separately. Private client screenshots/content must not be published.
- Read **`SECURITY_PUBLICATION_CHECK_V26.md`** before deploying: the original full CV is included in `public/resume/` as requested and may contain personal and reference contact information.

## Changing domain in the future
GitHub Pages supports custom domains such as `rmpranto.dev`. After registering/verifying the domain, set the custom domain in Settings → Pages, follow GitHub's DNS instructions, and change `NEXT_PUBLIC_SITE_URL` in `.github/workflows/deploy-pages.yml`. Don't add a CNAME before owning the domain.

Build cannot be guaranteed until Node dependencies install and `npm run build` completes. GitHub is not modified by this package.
