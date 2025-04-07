
@echo off
echo Starte Mercedes-Benz Fahrzeugliste-Anwendung...
echo.

:: Prüfen, ob Python installiert ist
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo Python wurde nicht gefunden! Bitte installieren Sie Python 3.x
  pause
  exit /b 1
)

:: Prüfen, ob Node.js installiert ist
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo Node.js wurde nicht gefunden! Bitte installieren Sie Node.js
  pause
  exit /b 1
)

:: Backend starten
echo Starte Backend-Server...
start cmd /k "cd backend && python app.py"

:: Warten bis Backend initialisiert ist
timeout /t 5 /nobreak

:: Frontend starten
echo Starte Frontend-Anwendung...
start cmd /k "npm start"

echo.
echo Anwendung gestartet! Bitte öffnen Sie Ihren Browser unter http://localhost:3000
echo Zum Beenden schließen Sie bitte die Kommandozeilen-Fenster.
echo.
pause
