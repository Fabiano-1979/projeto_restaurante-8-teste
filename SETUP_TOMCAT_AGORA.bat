@echo off
chcp 65001 >nul
title Configurar Tomcat 9 - Sistema Restaurante (Automático)

echo ================================================
echo   CONFIGURAÇÃO AUTOMÁTICA DO TOMCAT 9
echo ================================================
echo.
echo Este script vai:
echo  1. Procurar o Tomcat zip na pasta Downloads
echo  2. Extrair para C:\Tomcat9 (pedirá permissão de admin)
echo  3. Fazer o deploy da aplicação do restaurante
echo  4. Deixar pronto para rodar
echo.

set "TOMCAT_DEST=C:\Tomcat9"
set "PROJECT_PATH=C:\Users\fabia\Documentos\Unidade3-LocadoraVeiculos\Unidade3-LocadoraVeiculos\projeto_restaurante-8-teste"

:: Procura por qualquer versão válida do Tomcat 9.0.118
set "ZIP_PATH="
if exist "%USERPROFILE%\Downloads\apache-tomcat-9.0.118.zip" set "ZIP_PATH=%USERPROFILE%\Downloads\apache-tomcat-9.0.118.zip"
if exist "%USERPROFILE%\Downloads\apache-tomcat-9.0.118-windows-x64.zip" set "ZIP_PATH=%USERPROFILE%\Downloads\apache-tomcat-9.0.118-windows-x64.zip"

if not defined ZIP_PATH (
    echo [ERRO] Não encontrei o arquivo do Tomcat na pasta Downloads.
    echo.
    echo Baixe uma das versões abaixo e salve na pasta Downloads:
    echo   - Core: https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.118/bin/apache-tomcat-9.0.118.zip
    echo   - Windows x64: https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.118/bin/apache-tomcat-9.0.118-windows-x64.zip
    echo.
    echo Depois rode este arquivo novamente.
    echo.
    pause
    exit /b
)

echo Arquivo encontrado: %ZIP_PATH%
powershell -Command "$size = (Get-Item '%ZIP_PATH%').Length / 1MB; Write-Host ('Tamanho: ' + [math]::Round($size,1) + ' MB')"

powershell -Command "$size = (Get-Item '%ZIP_PATH%').Length / 1MB; if ($size -lt 70) { exit 1 } else { exit 0 }"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] O arquivo está muito pequeno (download incompleto).
    echo Delete o arquivo atual e baixe novamente.
    echo.
    pause
    exit /b
)

echo.
echo Extraindo Tomcat para %TOMCAT_DEST% ...
echo (Vai pedir permissão de Administrador - aprove quando aparecer)

powershell -Command "Start-Process powershell -ArgumentList '-NoProfile -Command Expand-Archive -Path ''%ZIP_PATH%'' -DestinationPath ''%TOMCAT_DEST%'' -Force' -Verb RunAs -Wait"

if not exist "%TOMCAT_DEST%\bin\startup.bat" (
    echo.
    echo [ERRO] Extração falhou ou permissão não foi dada.
    echo Tente extrair manualmente o zip para C:\Tomcat9
    pause
    exit /b
)

echo.
echo Extração concluída!

echo.
echo Fazendo deploy da aplicação do restaurante...

call "%PROJECT_PATH%\DEPLOY_APLICACAO.bat"

echo.
echo ================================================
echo   TOMCAT CONFIGURADO COM SUCESSO!
echo ================================================
echo.
echo Para iniciar o sistema:
echo   1. Rode: INICIAR_TOMCAT.bat
echo   2. Aguarde uns 15 segundos
echo   3. Acesse: http://localhost:8080/restaurante/login.jsp
echo.
echo Login: admin
echo Senha: 123
echo.
echo Para parar depois: PARAR_TOMCAT.bat
echo.
pause