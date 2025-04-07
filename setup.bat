
@echo off
echo Installiere Abhängigkeiten für Mercedes-Benz Fahrzeugliste-Anwendung...
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

:: Backend-Abhängigkeiten installieren
echo Installiere Python-Abhängigkeiten...
pip install -r backend/requirements.txt

:: Frontend-Abhängigkeiten installieren
echo Installiere Node.js-Abhängigkeiten...
npm install

echo.
echo Installation abgeschlossen!
echo.
pause
