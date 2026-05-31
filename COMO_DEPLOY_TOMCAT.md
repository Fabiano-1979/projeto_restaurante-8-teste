# Como Fazer o Deploy da Aplicação no Tomcat

Depois que você tiver o **XAMPP** (com MySQL rodando) e o **Apache Tomcat 9** instalado, siga estes passos:

## Passo 1: Certifique-se que o banco está criado

Execute o arquivo `CRIAR_BANCO_XAMPP.bat` que está nesta pasta (ou importe manualmente o `setup_database.sql` pelo phpMyAdmin).

O banco `projeto_restaurante_5_teste` deve existir.

## Passo 2: Preparar a pasta da aplicação

1. Vá até a pasta do projeto.
2. Copie a pasta inteira:
   ```
   build\web
   ```
3. Cole ela dentro da pasta do Tomcat com o nome `restaurante`:

   Exemplo de destino:
   ```
   C:\Tomcat9\webapps\restaurante
   ```

   > Importante: A pasta final deve se chamar exatamente `restaurante`.

## Passo 3: Iniciar o Tomcat

Execute o arquivo `INICIAR_TOMCAT.bat` que está nesta pasta.

Ou manualmente:
```cmd
C:\Tomcat9\bin\startup.bat
```

## Passo 4: Acessar o sistema

Abra o navegador e acesse:

**http://localhost:8080/restaurante/login.jsp**

Login: `admin`  
Senha: `123`

---

## Se der erro de conexão com o banco

O driver antigo (mysql-connector 5.1) às vezes tem problema com o MariaDB do XAMPP.

Se aparecer erro de conexão, me avise que eu te passo a correção exata (geralmente é só ajustar a URL no DataBaseDAO).

## Dicas

- Sempre pare o Tomcat antes de copiar novos arquivos (use `shutdown.bat`).
- Se quiser limpar o deploy antigo, delete a pasta `C:\Tomcat9\webapps\restaurante` e recopie.
- O Tomcat compila as JSPs na primeira vez que você acessa (pode demorar um pouco).

Qualquer erro que aparecer na tela ou no log do Tomcat, cole aqui que eu resolvo com você.
