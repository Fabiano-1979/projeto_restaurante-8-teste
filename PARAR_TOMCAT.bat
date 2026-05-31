@echo off
title Parar Tomcat - Sistema Restaurante

echo Parando Tomcat...

set "TOMCAT_HOME=C:\Tomcat9"

if exist "%TOMCAT_HOME%\bin\shutdown.bat" (
    cd /d "%TOMCAT_HOME%\bin"
    call shutdown.bat
    echo Tomcat parado com sucesso.
) else (
    echo Tomcat não encontrado em %TOMCAT_HOME%
)

timeout /t 3 >nul
pause