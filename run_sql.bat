@echo off
echo ============================================
echo Creating database projeto_restaurante_5_teste...
echo ============================================
"C:\xampp\mysql\bin\mysql.exe" -u root --default-character-set=utf8 < "C:\Users\fabia\Documentos\Unidade3-LocadoraVeiculos\Unidade3-LocadoraVeiculos\projeto_restaurante-8-teste\setup_database.sql" 2>&1
if %ERRORLEVEL% EQU 0 (
  echo.
  echo SUCCESS: Database created and data inserted!
) else (
  echo.
  echo ERROR: Something went wrong. Check output above.
)
echo.
pause