# Projeto Restaurante - Sistema de Controle de Pedidos

> ⚠️ **VERSÃO LEGADA (Java/Tomcat/XAMPP)** — Para a **versão moderna completa em Node.js**, leia o [README-NOVO-SISTEMA.md](./README-NOVO-SISTEMA.md)

---

## Como rodar localmente (Windows)

### 1. Instale o XAMPP (para o banco de dados)

Siga o guia completo:
→ **[COMO_INSTALAR_XAMPP.md](COMO_INSTALAR_XAMPP.md)**

### 2. Instale o Apache Tomcat 9 (obrigatório para a aplicação Java)

O XAMPP atual não inclui Tomcat. Você precisa baixar separadamente:
- Baixe Tomcat 9 em: https://tomcat.apache.org/download-90.cgi (arquivo .zip)
- Extraia para `C:\Tomcat9` (recomendado)

### 3. Crie o banco de dados

Após instalar o XAMPP e iniciar o MySQL, execute:
```
CRIAR_BANCO_XAMPP.bat
```

Ou importe manualmente o arquivo `setup_database.sql` pelo phpMyAdmin.

### 4. Faça o deploy da aplicação

Siga o guia:
→ **[COMO_DEPLOY_TOMCAT.md](COMO_DEPLOY_TOMCAT.md)**

### 5. Inicie o Tomcat

Execute:
```
INICIAR_TOMCAT.bat
```

### 6. Acesse o sistema

Abra no navegador:

**http://localhost:8080/restaurante/login.jsp**

- **Login:** `admin`
- **Senha:** `123`

---

## Arquivos úteis criados

- `COMO_INSTALAR_XAMPP.md` — Passo a passo completo
- `COMO_DEPLOY_TOMCAT.md` — Como subir a aplicação
- `CRIAR_BANCO_XAMPP.bat` — Script automático para criar o banco
- `INICIAR_TOMCAT.bat` — Script para iniciar o Tomcat facilmente
- `setup_database.sql` — Script completo do banco com dados iniciais

---

## Regra de Negócio

O cliente chega e procura uma mesa vaga, em seguida é atendido pelo garçom. O mesmo mostra os itens disponíveis do cardápio para o cliente, o cliente solicita os produtos ao garçom. Se houver o produto exigido pelo cliente, o garçom anota na comanda e executa o pedido, senão o garçom pergunta se o cliente deseja outra opção, se o cliente não desejar nada, ele tem a opção de desistir.

Com o pedido pronto, o garçom verifica o número da mesa descrito no pedido e leva até o cliente, depois o garçom pergunta se deseja algo mais, caso o cliente queira, repete-se todo o procedimento acima, caso o cliente não deseje mais nada o garçom fecha a comanda e pergunta qual seria a forma de pagamento. O cliente efetua o pagamento e assim finaliza o pedido.

---

**Link da documentação original:** [BAIXAR DOCUMENTAÇÃO](https://github.com/Fabiano-1979/projeto_restaurante-8-teste/raw/main/3%C2%BA%20-%20Pontao_do_pistao_sul_final_correc%CC%A7o%CC%83es%20a%20fazer.docx)
