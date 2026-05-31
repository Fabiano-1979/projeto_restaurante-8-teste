@echo off
echo Testing MySQL/MariaDB connection...
"C:\xampp\mysql\bin\mysql.exe" -u root -e "SELECT 'CONNECTED OK' as status; SHOW DATABASES LIKE 'projeto%%';" --protocol=tcp 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Trying without --protocol=tcp...
  "C:\xampp\mysql\bin\mysql.exe" -u root -e "SELECT 'CONNECTED OK' as status; SHOW DATABASES LIKE 'projeto%%';" 2>&1
)
echo.