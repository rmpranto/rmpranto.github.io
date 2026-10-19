@echo off
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (echo Node.js LTS is required. & pause & exit /b 1)
node scripts\sync-public-assets.mjs
pause
