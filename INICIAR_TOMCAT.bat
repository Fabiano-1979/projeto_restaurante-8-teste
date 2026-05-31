@echo off
chcp 65001 >nul
title Iniciar Tomcat 9 - Sistema Restaurante

echo ================================================
echo   INICIANDO APACHE TOMCAT 9
echo   Sistema de Controle de Pedidos - Restaurante
echo ================================================
echo.

:: ================================================
:: CONFIGURAÇÕES - AJUSTE AQUI SE NECESSÁRIO
:: ================================================

set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot"
set "TOMCAT_HOME=C:\Tomcat9"

:: ================================================

echo Java configurado em: %JAVA_HOME%
echo Tomcat configurado em: %TOMCAT_HOME%
echo.

if not exist "%JAVA_HOME%\bin\java.exe" (
    echo [ERRO] Java não encontrado em: %JAVA_HOME%
    echo.
    echo Por favor edite este arquivo e corrija o caminho do JAVA_HOME.
    pause
    exit /b
)

if not exist "%TOMCAT_HOME%\bin\startup.bat" (
    echo [ERRO] Tomcat não encontrado em: %TOMCAT_HOME%
    echo.
    echo 1. Baixe Tomcat 9 em: https://tomcat.apache.org/download-90.cgi
    echo 2. Extraia para a pasta C:\Tomcat9
    echo 3. Rode este arquivo novamente.
    echo.
    pause
    exit /b
)

:: Define variáveis de ambiente para esta sessão
set "JAVA_HOME=%JAVA_HOME%"
set "CATALINA_HOME=%TOMCAT_HOME%"

cd /d "%TOMCAT_HOME%\bin"

echo Iniciando Tomcat...
echo.
echo Depois que subir, acesse no navegador:
echo   http://localhost:8080/restaurante/login.jsp
echo.
echo Login: admin
echo Senha: 123
echo.

start "Tomcat - Restaurante" catalina.bat start

echo.
echo Tomcat foi iniciado em segundo plano.
echo Aguarde 10~20 segundos e acesse o link acima.
echo.
echo Para PARAR o Tomcat, execute: PARAR_TOMCAT.bat
echo.
pause