@echo off
echo ============================================
echo Verifying projeto_restaurante_5_teste database
echo ============================================
"C:\xampp\mysql\bin\mysql.exe" -u root projeto_restaurante_5_teste --protocol=tcp < verify_db.sql 2>&1
echo.