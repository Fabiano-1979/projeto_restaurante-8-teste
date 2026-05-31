# 🍽️ Sistema Restaurante Moderno v2.0

**Reformulação completa** do projeto original Java/JSP/Tomcat/XAMPP para uma stack 100% atual (2026).

## O que mudou?

| Antes (Legado)              | Agora (Moderno)                          |
|----------------------------|------------------------------------------|
| Java + Servlets + JSP      | Node.js 20+ + Express                    |
| Tomcat 9                   | Nenhum servidor Java necessário          |
| XAMPP + MySQL 5.1          | **SQLite** (arquivo único, zero config) + Prisma |
| Senhas em texto plano      | Senhas com **bcrypt**                    |
| Interface 2015 (scriptlets)| Interface linda 2026 com **Tailwind + Alpine.js** |
| NetBeans / Ant             | `npm run dev` (hot reload)               |

## Stack Tecnológica

- **Backend**: Node.js + Express
- **ORM + DB**: Prisma + **SQLite** (`dev.db`)
- **Templates**: EJS + **Tailwind CSS** (CDN) + **Alpine.js**
- **Autenticação**: Sessions + bcrypt
- **Totalmente sem dependência** de XAMPP, Tomcat, MySQL Server ou Java

## Como rodar (3 comandos)

```bash
# 1. Instale as dependências
npm install

# 2. (Opcional) Rode o setup completo (gera client, migra e popula dados)
npm run setup

# 3. Inicie o servidor com hot-reload
npm run dev
```

Acesse: **http://localhost:3000**

### Logins padrão (após o seed)

| Login    | Senha | Perfil         |
|----------|-------|----------------|
| `admin`  | `123` | Administrador  |
| `garcom` | `123` | Garçom         |

## Funcionalidades Implementadas

### Para Garçons
- Dashboard visual lindo de **Mesas** (cards com status)
- Iniciar atendimento com modal para nome do cliente
- **Catálogo moderno** com fotos dos pratos
- Carrinho / Comanda ao vivo com adicionar quantidade + observação
- Fechar comanda escolhendo forma de pagamento (PIX, Cartão, Dinheiro...)
- Mesa é automaticamente liberada após pagamento
- Recibo imprimível (bonito e simples)

### Para Administradores
- Painel com estatísticas
- CRUD completo de **Usuários**
- CRUD de **Mesas**
- CRUD de **Produtos** do cardápio
- Histórico de todos os pedidos

## Estrutura do Projeto

```
src/
├── server.js              # Ponto de entrada do Express
├── routes/
│   ├── auth.js            # Login / Logout
│   ├── mesas.js           # Fluxo principal de mesas
│   ├── pedidos.js         # Carrinho, adicionar itens, fechar
│   └── admin.js           # Todas telas administrativas
├── views/                 # EJS bonitos com Tailwind
│   ├── layout.ejs
│   ├── login.ejs
│   ├── mesas/
│   ├── pedidos/
│   └── admin/
prisma/
├── schema.prisma          # Modelo de dados moderno
├── seed.js                # Dados iniciais
└── migrations/
public/
└── images/produtos/       # Fotos originais mantidas
```

## Dicas

- O banco é um simples arquivo `dev.db` na raiz (pode copiar, versionar ou apagar).
- Para resetar tudo: delete `dev.db` + rode `npx prisma migrate deploy && node prisma/seed.js`
- Quer usar MySQL/PostgreSQL em produção? É só mudar o `provider` no `schema.prisma` e rodar migrate novamente (Prisma facilita muito).

## Próximos passos recomendados (fácil de adicionar)

- API REST completa (`/api/...`) para apps mobile / totem
- Dashboard de vendas com gráficos (Chart.js)
- Impressão automática de comanda na cozinha
- Controle de estoque

---

**Este é o projeto original completamente reformulado para 2026**, mantendo toda a regra de negócio do restaurante (atendimento de mesa, comanda, formas de pagamento) com uma cara moderna, código limpo e sem nenhuma dependência legada.

Feito com ❤️ para substituir Tomcat + XAMPP de vez.