@echo off
REM ==================================================================
REM  Install the Paper Trading Bot as a background task on Windows.
REM  After this, it runs even when you are LOGGED OUT, and restarts
REM  automatically every time the PC boots. The PC must stay powered
REM  on and awake (this script also disables sleep on AC power).
REM
REM  RIGHT-CLICK this file and choose "Run as administrator".
REM ==================================================================
setlocal enabledelayedexpansion

REM --- require administrator ---
net session >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo   This needs administrator rights.
    echo   Right-click install-startup.bat and choose "Run as administrator".
    echo.
    pause
    exit /b 1
)

cd /d "%~dp0"
set "FOLDER=%~dp0"
if "%FOLDER:~-1%"=="\" set "FOLDER=%FOLDER:~0,-1%"

REM --- find Python's full path (resolved now, so the SYSTEM task can find it) ---
set "PYEXE="
for /f "delims=" %%i in ('py -3 -c "import sys;print(sys.executable)" 2^>nul') do set "PYEXE=%%i"
if not defined PYEXE for /f "delims=" %%i in ('python -c "import sys;print(sys.executable)" 2^>nul') do set "PYEXE=%%i"
if not defined PYEXE (
    echo.
    echo   Python not found. Install it from https://www.python.org/downloads/
    echo   and tick "Add Python to PATH" on the first screen, then run this again.
    echo.
    pause
    exit /b 1
)
echo   Using Python: !PYEXE!

REM --- make sure a config exists ---
if not exist "%FOLDER%\config.json" (
    if exist "%FOLDER%\config.example.json" copy /y "%FOLDER%\config.example.json" "%FOLDER%\config.json" >nul
    echo   Created config.json from the example. Edit it to set host, token, ntfy-topic.
)

REM --- write the runner the task will launch ---
> "%FOLDER%\service-run.bat" echo @echo off
>> "%FOLDER%\service-run.bat" echo cd /d "%FOLDER%"
>> "%FOLDER%\service-run.bat" echo "!PYEXE!" app.py --config config.json

REM --- open the port for your phone (change 8787 if you use another port) ---
netsh advfirewall firewall delete rule name="PaperTradingBot" >nul 2>nul
netsh advfirewall firewall add rule name="PaperTradingBot" dir=in action=allow protocol=TCP localport=8787 >nul

REM --- keep the PC awake on AC power so it doesn't sleep mid-session ---
powercfg /change standby-timeout-ac 0 >nul 2>nul

REM --- create the scheduled task: at startup, as SYSTEM, survives logout ---
schtasks /Create /TN "PaperTradingBot" /TR "\"%FOLDER%\service-run.bat\"" /SC ONSTART /RU SYSTEM /RL HIGHEST /F
if %errorlevel% neq 0 (
    echo   Failed to create the scheduled task.
    pause
    exit /b 1
)

REM --- start it now so you don't have to reboot ---
schtasks /Run /TN "PaperTradingBot" >nul

echo.
echo   ================================================================
echo   Done. The bot now runs in the background:
echo     - starts automatically at every boot
echo     - keeps running after you log out
echo     - serving on port 8787
echo.
echo   Open it from this PC:  http://127.0.0.1:8787/
echo   From your phone: set host "0.0.0.0" and a token in config.json,
echo   use Tailscale, then open http://<pc-tailscale-ip>:8787/?token=YOURTOKEN
echo.
echo   To stop and remove it: run uninstall-startup.bat as administrator.
echo   ================================================================
echo.
pause
