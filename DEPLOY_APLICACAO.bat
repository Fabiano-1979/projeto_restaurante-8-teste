@echo off
chcp 65001 >nul
title Deploy - Sistema Restaurante no Tomcat

echo ================================================
echo   DEPLOY DA APLICAÇÃO NO TOMCAT
echo ================================================
echo.

set "TOMCAT_HOME=C:\Tomcat9"
set "APP_SOURCE=C:\Users\fabia\Documentos\Unidade3-LocadoraVeiculos\Unidade3-LocadoraVeiculos\projeto_restaurante-8-teste\build\web"
set "APP_DEST=%TOMCAT_HOME%\webapps\restaurante"

if not exist "%TOMCAT_HOME%\bin\startup.bat" (
    echo [ERRO] Tomcat não encontrado em %TOMCAT_HOME%
    pause
    exit /b
)

if not exist "%APP_SOURCE%" (
    echo [ERRO] Pasta da aplicação não encontrada:
    echo %APP_SOURCE%
    echo.
    echo Certifique-se que a pasta "build\web" existe no projeto.
    pause
    exit /b
)

echo Parando Tomcat (se estiver rodando)...
call "%TOMCAT_HOME%\bin\shutdown.bat" >nul 2>&1
timeout /t 3 >nul

echo Removendo deploy anterior (se existir)...
if exist "%APP_DEST%" rmdir /s /q "%APP_DEST%"

echo Copiando aplicação para o Tomcat...
xcopy "%APP_SOURCE%\*" "%APP_DEST%\" /E /I /Y >nul

echo.
echo ================================================
echo   DEPLOY CONCLUÍDO COM SUCESSO!
echo ================================================
echo.
echo Aplicação instalada em: %APP_DEST%
echo.
echo Agora execute INICIAR_TOMCAT.bat para subir o servidor.
echo Depois acesse: http://localhost:8080/restaurante/login.jsp
echo.
pause