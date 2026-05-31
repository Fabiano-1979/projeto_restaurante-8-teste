# Como Instalar XAMPP e Rodar o Sistema Restaurante

## Passo 1: Baixar o XAMPP

1. Acesse o site oficial:
   **https://www.apachefriends.org/download.html**

2. Baixe a versão mais recente do **XAMPP for Windows** (arquivo .exe, geralmente com mais de 150MB).

   > **Importante**: Baixe a versão completa (inclui MariaDB/MySQL, Apache, PHP e phpMyAdmin).

## Passo 2: Instalar o XAMPP

1. **Execute o instalador como Administrador** (botão direito → Executar como administrador).

2. Siga o assistente:
   - Aceite os termos
   - **Selecione os componentes**: Deixe marcados pelo menos:
     - Server
     - MariaDB/MySQL
     - phpMyAdmin
     - (Apache pode ser desmarcado se não quiser usar)
   - Escolha a pasta de instalação (recomendado: `C:\xampp`)
   - **Desmarque** a opção de instalar o Bitnami (não é necessário)

3. Clique em **Install** e aguarde o processo terminar.

4. Ao final, **não marque** a opção de abrir o XAMPP Control Panel ainda.

## Passo 3: Iniciar o XAMPP Control Panel

1. Abra a pasta onde instalou o XAMPP (geralmente `C:\xampp`).
2. Execute o arquivo **`xampp-control.exe`** como Administrador.
3. Na janela que abrir, você verá vários serviços.

## Passo 4: Iniciar o MySQL (MariaDB)

- Clique no botão **Start** ao lado de **MySQL**.
- Ele deve ficar verde quando estiver rodando.

> **Atenção**: O XAMPP instala o **MariaDB** (não MySQL puro). É compatível, mas o driver JDBC antigo do projeto precisa de ajustes.

## Passo 5: Criar o Banco de Dados

Depois que o MySQL estiver verde:

### Opção A - Usando o phpMyAdmin (mais fácil)

1. No XAMPP Control Panel, clique no botão **Admin** ao lado de MySQL (ou acesse `http://localhost/phpmyadmin`).
2. Crie um novo banco de dados chamado exatamente:
   ```
   projeto_restaurante_5_teste
   ```
3. Depois importe o arquivo `setup_database.sql` que está na pasta do projeto (ou cole o conteúdo).

### Opção B - Usando linha de comando (mais rápido)

1. Abra o Prompt de Comando como Administrador.
2. Vá até a pasta do MySQL do XAMPP:
   ```cmd
   cd C:\xampp\mysql\bin
   ```
3. Execute:
   ```cmd
   mysql -u root -p
   ```
   (deixe a senha em branco e pressione Enter)

4. No prompt do MySQL, digite:
   ```sql
   SOURCE C:/caminho/completo/para/seu/projeto/setup_database.sql
   ```
   (substitua pelo caminho real do arquivo `setup_database.sql` que está na pasta do projeto)

5. Pressione Enter e aguarde a execução.

## Passo 6: Instalar o Tomcat (Obrigatório!)

**Atenção importante**: O XAMPP **não inclui mais o Tomcat** nas versões recentes.

Você vai precisar instalar o Apache Tomcat separadamente para rodar a aplicação Java.

### Como instalar o Tomcat:

1. Baixe o **Apache Tomcat 9** (versão 9.0.x):
   - Link recomendado: https://tomcat.apache.org/download-90.cgi
   - Baixe o arquivo **zip** (ex: `apache-tomcat-9.0.98.zip`)

2. Extraia o conteúdo para uma pasta simples, exemplo:
   ```
   C:\Tomcat9
   ```

3. Configure a variável de ambiente `JAVA_HOME` apontando para sua instalação do Java 21.

4. Inicie o Tomcat executando:
   ```
   C:\Tomcat9\bin\startup.bat
   ```

## Próximos Passos (Depois de Instalar Tudo)

Depois que XAMPP + Tomcat estiverem rodando:

1. Copie a pasta `build/web` do projeto para dentro de `C:\Tomcat9\webapps\restaurante`
2. Atualize o arquivo `DataBaseDAO.java` com a URL correta para MariaDB (já temos um script preparado).
3. Reinicie o Tomcat.
4. Acesse: `http://localhost:8080/restaurante/login.jsp`
5. Login: `admin` | Senha: `123`

---

## Problemas Comuns

- **Erro de conexão com banco**: O driver JDBC antigo (5.1) tem problemas com MariaDB novo. Vamos precisar atualizar a URL de conexão.
- **Porta 3306 já em uso**: Feche outros programas que usam MySQL (como outro XAMPP ou MySQL Workbench).
- **Tomcat não sobe**: Verifique se o Java 21 está corretamente configurado na variável JAVA_HOME.

---

Qualquer erro que aparecer depois da instalação, cole aqui que eu te ajudo a resolver na hora!
