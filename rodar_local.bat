@echo off
cd /d "C:\Users\AVELL\meu-portfolio2"
for /f "tokens=5" %%i in ('netstat -ano ^| findstr :300') do taskkill /PID %%i /F
start "" /b npm run dev
timeout /t 5 /nobreak >nul
start http://localhost:3000
