@echo off
setlocal
cd /d "%~dp0"
echo =========================================
echo  RMP Portfolio - One-Click Local Preview
 echo =========================================
where node >nul 2>&1
if errorlevel 1 (
  echo ERROR: Node.js is not installed or is missing from PATH.
  echo Install the LTS edition from https://nodejs.org/
  pause
  exit /b 1
)
if not exist "node_modules\next\package.json" (
 echo First launch: installing website dependencies...
 call npm.cmd install
 if errorlevel 1 (
   echo Dependency installation failed. Please check your connection.
   pause
   exit /b 1
 )
)
if not exist "public\assets\projects\pizza-sales-analytics\apizza.webp" (
 echo Downloading original public project photos and certificates...
 call npm.cmd run assets:sync
 if errorlevel 1 (
  echo Some images could not be downloaded. The site will use original public URL fallbacks.
 )
)
echo Starting Next.js at http://localhost:3000
start "" "http://localhost:3000"
call npm.cmd run dev
pause
