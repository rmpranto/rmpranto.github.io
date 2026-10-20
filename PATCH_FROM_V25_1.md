# Patch: V25.1 -> V26 (GitHub Pages)

Extract this ZIP **into the existing V25.1 folder containing `package.json`**, allowing replacement. The patch includes all changed source and newly added deployment files; it does not remove historical changelogs/QA notes. The new `.gitignore` excludes them from future Git commits.

For a clean publish use the **full V26 ZIP** instead. If you use the patch, do not delete your existing `public/assets/` files: those downloaded originals are essential.

Then copy your older repository's hidden `.git` directory into the new project's root **only if** it connects to `rmpranto/rmpranto.github.io` and represents branch `master`.

Before staging or pushing:

```cmd
cd /d C:\xampp\htdocs\my-portfolio
npm.cmd install
npm.cmd run assets:check
npm.cmd run build
npm.cmd run preview
```

The asset check must report **25/25** and the production build must succeed. Then use GitHub Settings > Pages > **Source: GitHub Actions**, and only then commit/push to master. See `DEPLOY_TO_GITHUB_PAGES_V26.md` for full instructions.
