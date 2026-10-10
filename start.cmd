@echo off
cd /d "%~dp0"
where node.exe >nul 2>nul
if errorlevel 1 (
  echo Install Node.js 22 or newer, then reopen this launcher.
  pause
  exit /b 1
)
echo Open http://localhost:8793 in your browser.
node server.mjs
pause
