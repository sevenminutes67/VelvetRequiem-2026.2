@echo off
if not exist "%~dp0server.mjs" (
  echo Extraia todos os arquivos do ZIP antes de abrir o prototipo.
  echo Depois, execute este arquivo dentro da pasta extraida VelvetRequiem.
  pause
  exit /b 1
)
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Instale o Node.js 22 ou superior e abra este arquivo novamente.
  pause
  exit /b 1
)
set "PORT=4173"
start "" /min cmd /d /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:4173"
node server.mjs
if errorlevel 1 pause
