@echo off
REM One-click launcher for the paper trading app (Windows).
REM Double-click this file. It starts the app and opens it in your browser.
REM Close the black window (or press Ctrl+C in it) to stop the app.

cd /d "%~dp0"
title Paper Trading Bot

REM Find Python: prefer the "py" launcher, then "python".
where py >nul 2>nul
if %errorlevel%==0 (
    py -3 app.py
    goto :end
)
where python >nul 2>nul
if %errorlevel%==0 (
    python app.py
    goto :end
)

echo.
echo   Python is not installed (or not on your PATH).
echo   1. Install it from https://www.python.org/downloads/
echo   2. IMPORTANT: on the first install screen, tick "Add Python to PATH".
echo   3. Then double-click this file again.
echo.
pause
exit /b 1

:end
echo.
echo   The app has stopped. You can close this window.
pause
