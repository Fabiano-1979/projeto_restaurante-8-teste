@echo off
title Criar Banco de Dados - Sistema Restaurante (XAMPP)

echo ================================================
echo   CRIANDO BANCO DE DADOS NO XAMPP
echo   projeto_restaurante_5_teste
echo ================================================
echo.

set MYSQL_BIN=C:\xampp\mysql\bin

if not exist "%MYSQL_BIN%\mysql.exe" (
    echo ERRO: XAMPP MySQL nao encontrado em %MYSQL_BIN%
    echo.
    echo Verifique se o XAMPP esta instalado em C:\xampp
    echo ou edite este arquivo com o caminho correto.
    echo.
    pause
    exit /b
)

echo Iniciando criacao do banco de dados...
echo.

cd /d "%MYSQL_BIN%"

mysql -u root --protocol=tcp < "C:\Users\fabia\Documentos\Unidade3-LocadoraVeiculos\Unidade3-LocadoraVeiculos\projeto_restaurante-8-teste\setup_database.sql"

if %errorlevel% == 0 (
    echo.
    echo ================================================
    echo   BANCO DE DADOS CRIADO COM SUCESSO!
    echo ================================================
    echo.
    echo Banco: projeto_restaurante_5_teste
    echo Usuario: root (sem senha)
    echo.
    echo Agora voce pode iniciar o Tomcat.
    echo.
) else (
    echo.
    echo Ocorreu algum erro ao criar o banco.
    echo Verifique se o MySQL do XAMPP esta rodando.
    echo.
)

pause