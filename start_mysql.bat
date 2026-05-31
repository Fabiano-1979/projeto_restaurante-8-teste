@echo off
echo Starting XAMPP MySQL...
cd /d C:\xampp\mysql\bin
start /B mysqld --defaults-file=C:\xampp\mysql\bin\my.ini --standalone
timeout /t 5 >nul
tasklist | findstr /i mysqld.exe >nul && echo MySQL started successfully || echo Failed to start MySQL
echo.