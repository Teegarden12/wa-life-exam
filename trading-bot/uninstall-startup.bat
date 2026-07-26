@echo off
REM Stop and remove the background Paper Trading Bot task.
REM Right-click and "Run as administrator".
net session >nul 2>nul
if %errorlevel% neq 0 (
    echo Run this as administrator (right-click ^> Run as administrator).
    pause
    exit /b 1
)
schtasks /End /TN "PaperTradingBot" >nul 2>nul
schtasks /Delete /TN "PaperTradingBot" /F
netsh advfirewall firewall delete rule name="PaperTradingBot" >nul 2>nul
echo.
echo Removed the background task and firewall rule.
echo Your files and settings (config.json, secrets.json) are untouched.
pause
