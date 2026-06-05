# 🍽️ Sistema Restaurante Moderno v2.1

> **Sistema de Controle de Pedidos para Restaurante** — Reformulação completa do projeto original Java/Tomcat para uma stack moderna, segura e escalável em 2026.

[![Node.js](https://img.shields.io/badge/Node.js->=18.0.0-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-blue?style=flat-square&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.15.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Latest-003B57?style=flat-square&logo=sqlite)](https://www.sqlite.org/)
[![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325?style=flat-square&logo=jest)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-ISC-yellow?style=flat-square)](LICENSE)

---

## 📋 Sumário

- [✨ O que mudou?](#-o-que-mudou)
- [🏗️ Stack Tecnológica](#-stack-tecnológica)
- [🚀 Quick Start](#-quick-start)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔒 Segurança](#-segurança)
- [✅ Funcionalidades](#-funcionalidades)
- [🧪 Testes](#-testes)
- [📝 Scripts Disponíveis](#-scripts-disponíveis)
- [🔧 Configuração](#-configuração)
- [📚 Documentação](#-documentação)
- [🚧 Roadmap](#-roadmap)
- [👨‍💻 Desenvolvimento](#-desenvolvimento)
- [📄 Licença](#-licença)

---

## ✨ O que mudou?

| Aspecto | Antes (Legado Java) | Agora (Moderno 2026) |
|---------|---------------------|----------------------|
| **Backend** | Java Servlets + JSP | Node.js + Express |
| **Servidor Web** | Apache Tomcat 9 | Node.js nativo |
| **Banco de Dados** | XAMPP + MySQL 5.1 | SQLite + Prisma |
| **Senhas** | Texto plano ❌ | bcrypt + salt 🔐 |
| **Interface** | JSP 2015 | EJS + Tailwind + Alpine.js |
| **IDE** | NetBeans + Ant | VS Code + npm + hot-reload |
| **Configuração** | Complexa (3+ serviços) | Zero-config (um arquivo!) |
| **Segurança** | Básica | Rate limiting + CSRF + Helmet |
| **Testes** | Nenhuns | Jest + Supertest (unitários + integração) |
| **Validação** | Manual | Zod (type-safe) |

---

## 🏗️ Stack Tecnológica

### Core
- **Runtime**: [Node.js](https://nodejs.org/) ≥ 18.0.0
- **Framework Web**: [Express](https://expressjs.com/) 5.2.1
- **Template Engine**: [EJS](https://ejs.co/)
- **Database**: [SQLite](https://www.sqlite.org/) (arquivo único)
- **ORM**: [Prisma](https://www.prisma.io/) 6.15.0

### Frontend
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (CDN)
- **Interatividade**: [Alpine.js](https://alpinejs.dev/)
- **Responsivo**: Mobile-first design

### Segurança
- **Senhas**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js) 3.0.3
- **Sessions**: [express-session](https://github.com/expressjs/session)
- **CSRF Protection**: [csurf](https://github.com/expressjs/csurf)
- **Security Headers**: [Helmet](https://helmetjs.github.io/) 8.2.0
- **Rate Limiting**: [express-rate-limit](https://github.com/nfriedly/express-rate-limit) 7.1.0
- **Validação**: [Zod](https://zod.dev/) 3.22.0

### Desenvolvimento & Testes
- **Testing**: [Jest](https://jestjs.io/) 29.7.0 + [Supertest](https://github.com/visionmedia/supertest)
- **Logging**: [Pino](https://getpino.io/) 8.14.0
- **Linting**: [ESLint](https://eslint.org/) 8.54.0
- **Formatting**: [Prettier](https://prettier.io/) 3.1.0
- **Dev Server**: [Nodemon](https://nodemon.io/) 3.1.14

---

## 🚀 Quick Start

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18.0.0 ou superior
- npm ou yarn
- Git (opcional)

### Instalação (3 passos)

```bash
# 1️⃣ Clone ou baixe o repositório
git clone https://github.com/Fabiano-1979/projeto_restaurante-8-teste.git
cd projeto_restaurante-8-teste

# 2️⃣ Instale as dependências
npm install

# 3️⃣ Setup inicial (gera Prisma client, migra DB, popula dados)
npm run setup
```

### Executar em Desenvolvimento

```bash
npm run dev
```

**Acesse em seu navegador**: `http://localhost:3000`

### Logins Padrão

| Email | Senha | Perfil |
|-------|-------|--------|
| `admin@restaurante.com` | `Admin123` | 🔑 Administrador |
| `garcom@restaurante.com` | `Garcom123` | 👨‍🍳 Garçom |

> ⚠️ **Importante**: Altere as senhas padrão em produção!

---

## 📂 Estrutura do Projeto

```
projeto_restaurante-8-teste/
│
├── 📁 src/
│   ├── server.js                    # Inicialização do servidor
│   ├── app.js                       # Configuração da aplicação Express
│   │
│   ├── 📁 controllers/              # Lógica de negócio
│   │   ├── authController.js        # Autenticação (login, registro)
│   │   ├── mesasController.js       # Gerenciamento de mesas
│   │   ├── pedidosController.js     # Gerenciamento de pedidos
│   │   └── produtosController.js    # Catálogo de produtos
│   │
│   ├── 📁 routes/                   # Definição de rotas
│   │   ├── auth.js                  # Rotas de autenticação
│   │   ├── mesas.js                 # Rotas de mesas
│   │   ├── pedidos.js               # Rotas de pedidos
│   │   └── admin.js                 # Rotas administrativas
│   │
│   ├── 📁 middleware/               # Middlewares Express
│   │   ├── auth.js                  # Autenticação/Autorização
│   │   ├── security.js              # Rate limit, CSRF, Helmet
│   │   ├── errorHandler.js          # Tratamento de erros
│   │   └── validation.js            # Validação de requisições
│   │
│   ├── 📁 validators/               # Schemas de validação
│   │   └── schemas.js               # Schemas Zod
│   │
│   ├── 📁 utils/                    # Funções utilitárias
│   │   └── logger.js                # Sistema de logging
│   │
│   ├── 📁 public/                   # Assets estáticos
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   │
│   └── 📁 views/                    # Templates EJS
│       ├── layouts/
│       ├── auth/
│       │   ├── login.ejs
│       │   └── register.ejs
│       ├── mesas/
│       ├── pedidos/
│       ├── produtos/
│       └── admin/
│
├── 📁 prisma/
│   ├── schema.prisma                # Modelo de dados
│   ├── seed.js                      # Dados iniciais
│   └── 📁 migrations/               # Histórico de mudanças
│
├── 📁 tests/
│   ├── 📁 unit/                     # Testes unitários
│   │   ├── validators.test.js
│   │   ├── authController.test.js
│   │   ├── security.test.js
│   │   └── auth.test.js
│   │
│   └── 📁 integration/              # Testes de integração
│       ├── auth.integration.test.js
│       └── security.integration.test.js
│
├── 📁 docs/                         # Documentação adicional
│
├── .env                             # Variáveis de ambiente (NÃO versionar)
├── .env.example                     # Exemplo de .env
├── .eslintrc.json                   # Configuração ESLint
├── .prettierrc                      # Configuração Prettier
├── jest.config.js                   # Configuração Jest
├── jest.setup.js                    # Setup Jest
├── package.json                     # Dependências e scripts
├── package-lock.json                # Lock de versões
│
└── README.md                        # Este arquivo!
```

---

## 🔒 Segurança

O projeto implementa múltiplas camadas de segurança:

### 1. **Rate Limiting** 🛡️
```javascript
// Login: máx 5 tentativas em 15 min
// API geral: máx 100 requisições em 15 min
```

### 2. **CSRF Protection** 🔐
- Token CSRF em todas as formas POST/PUT/DELETE
- Middleware `csurf` integrado

### 3. **Security Headers** 📋
- Content Security Policy (CSP)
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection

### 4. **Validação de Dados** ✅
- Schemas Zod type-safe
- Validação em camada de middleware
- Mensagens de erro personalizadas

### 5. **Senhas Seguras** 🔑
- Hashing com bcryptjs (10 rounds)
- Nunca armazenadas em texto plano
- Senhas validadas com força mínima

### 6. **Sessions Seguras** 🍪
- HttpOnly cookies (protege contra XSS)
- SameSite=strict (protege contra CSRF)
- Secure flag em produção
- Expiração em 8 horas

### 7. **Logging & Auditoria** 📊
- Todas as tentativas de login registradas
- Alertas de ações sensíveis
- Rastreamento de erros estruturado

---

## ✅ Funcionalidades

### 👨‍🍳 Para Garçons

- ✅ **Dashboard de Mesas**
  - Visualização de todas as mesas em tempo real
  - Status visual (livre, ocupada, pagamento pendente)
  - Cards interativos com Alpine.js

- ✅ **Atendimento de Mesa**
  - Iniciar atendimento com informações do cliente
  - Ver histórico de comanda
  - Modal para adicionar novos itens

- ✅ **Cardápio Moderno**
  - Visualização de produtos com imagens
  - Descrições completas
  - Preços atualizados em tempo real
  - Filtro por categoria

- ✅ **Carrinho / Comanda**
  - Adicionar/remover itens
  - Aumentar/diminuir quantidade
  - Observações por item
  - Total calculado automaticamente

- ✅ **Formas de Pagamento**
  - PIX
  - Cartão de Crédito/Débito
  - Dinheiro
  - Múltiplas formas (ex: 50% PIX + 50% Dinheiro)
  - Cálculo automático de troco

- ✅ **Recibos**
  - Impressão bonita em A4
  - QR Code de pagamento (PIX)
  - Detalhamento de itens
  - Horário e data

### 🔑 Para Administradores

- ✅ **Dashboard**
  - Estatísticas de vendas
  - Gráficos de performance
  - Pedidos por período

- ✅ **CRUD de Usuários**
  - Criar/editar/deletar usuários
  - Gerenciamento de roles (Admin, Garçom, Cozinha)
  - Status ativo/inativo

- ✅ **CRUD de Mesas**
  - Criar/editar/deletar mesas
  - Definir capacidade
  - Localização (perto da janela, etc)
  - Status e histórico

- ✅ **CRUD de Produtos**
  - Gerenciar cardápio
  - Upload de imagens
  - Categorização
  - Controle de preços
  - Ativar/desativar itens

- ✅ **Relatórios**
  - Vendas por período
  - Produtos mais vendidos
  - Histórico completo de pedidos
  - Filtros avançados

---

## 🧪 Testes

O projeto inclui testes automatizados para garantir qualidade:

### Estrutura de Testes

```
tests/
├── unit/                              # Testes unitários isolados
│   ├── validators.test.js             # Validação Zod
│   ├── authController.test.js         # Controller de autenticação
│   ├── security.test.js               # Middleware de segurança
│   └── auth.test.js                   # Autenticação/Autorização
│
└── integration/                       # Testes end-to-end
    ├── auth.integration.test.js       # Fluxo de autenticação completo
    └── security.integration.test.js   # Verificação de headers e proteções
```

### Executar Testes

```bash
# Todos os testes com coverage
npm test

# Apenas testes unitários
npm run test:unit

# Apenas testes de integração
npm run test:integration

# Modo watch (reexecuta ao mudar arquivos)
npm run test:watch

# Com relatório de coverage detalhado
npm test -- --coverage --verbose
```

### Cobertura de Testes Esperada

```
Statements   : 85%+
Branches     : 80%+
Functions    : 85%+
Lines        : 85%+
```

---

## 📝 Scripts Disponíveis

### Desenvolvimento

```bash
# Iniciar servidor com hot-reload (Nodemon)
npm run dev

# Iniciar servidor em produção
npm start
```

### Banco de Dados

```bash
# Gerar Prisma Client
npm run db:generate

# Executar migrations pendentes
npm run db:migrate

# Popular banco com dados iniciais
npm run db:seed

# Abrir Prisma Studio (GUI para o banco)
npm run db:studio

# Setup completo (install + generate + migrate + seed)
npm run setup
```

### Testes

```bash
# Executar todos os testes com coverage
npm test

# Testes unitários apenas
npm run test:unit

# Testes de integração apenas
npm run test:integration

# Modo watch
npm run test:watch
```

### Qualidade de Código

```bash
# Verificar com ESLint
npm run lint

# Formatar código com Prettier
npm run format

# Formatar + Lint (sequência recomendada)
npm run format && npm run lint
```

---

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (baseado em `.env.example`):

```env
# Servidor
PORT=3000
NODE_ENV=development

# Session
SESSION_SECRET=sua-chave-secreta-muito-segura-aqui-min-32-chars

# Database
DATABASE_URL=file:./dev.db

# Segurança
BCRYPT_ROUNDS=10
MAX_LOGIN_ATTEMPTS=5
LOGIN_ATTEMPT_WINDOW_MS=900000  # 15 minutos

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000      # 15 minutos
RATE_LIMIT_MAX_REQUESTS=100      # requisições por janela

# Logging
LOG_LEVEL=info  # debug, info, warn, error
```

### Gerar SESSION_SECRET Seguro

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie a saída e cole no `.env`.

### Configuração em Produção

Para deploy em produção:

```env
NODE_ENV=production
PORT=3000
# Use um banco de dados real (MySQL, PostgreSQL)
DATABASE_URL=postgresql://user:pass@host/dbname
# Aumente segurança
BCRYPT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=3
LOG_LEVEL=warn
```

---

## 📚 Documentação

### Arquivos de Documentação

- 📄 **[README-NOVO-SISTEMA.md](./README-NOVO-SISTEMA.md)** — Comparação com versão legada
- 📄 **[README-REFACTORING.md](./README-REFACTORING.md)** — Detalhes da refatoração (segurança, controllers, testes)
- 📄 **[COMO_INSTALAR_XAMPP.md](./COMO_INSTALAR_XAMPP.md)** — Instalação XAMPP (para versão legada)
- 📄 **[COMO_DEPLOY_TOMCAT.md](./COMO_DEPLOY_TOMCAT.md)** — Deploy Tomcat (para versão legada)

### Recursos Externos

- [Express.js Documentation](https://expressjs.com/)
- [Prisma ORM Guide](https://www.prisma.io/docs/)
- [Zod Validation](https://zod.dev/)
- [Jest Testing](https://jestjs.io/docs/getting-started)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Alpine.js](https://alpinejs.dev/)
- [OWASP Security](https://owasp.org/)

---

## 🚧 Roadmap

### v2.2 (Próximo)
- [ ] API REST completa (`/api/...`)
- [ ] Dashboard com gráficos (Chart.js)
- [ ] Impressão automática de comanda para cozinha
- [ ] Controle de estoque
- [ ] Notificações push

### v2.3
- [ ] App mobile (React Native)
- [ ] Totem de pedidos (tablet)
- [ ] Integração com gateway de pagamento (Stripe, MercadoPago)
- [ ] Sistema de fidelidade

### v3.0
- [ ] Autenticação com 2FA (OTP)
- [ ] JWT para mobile apps
- [ ] Banco de dados em produção (PostgreSQL)
- [ ] CI/CD (GitHub Actions)
- [ ] Docker + Docker Compose
- [ ] Monitoramento (Sentry, New Relic)

---

## 👨‍💻 Desenvolvimento

### Pré-requisitos

- Node.js ≥ 18.0.0
- npm ou yarn
- Git
- Um editor de código (VS Code recomendado)

### Extensões Recomendadas (VS Code)

- **ES7+ React/Redux/React-Native snippets** — dsznajder.es7-react-js-snippets
- **Prisma** — Prisma.prisma
- **Thunder Client** — rangav.vscode-thunder-client
- **Jest** — firsttris.vscode-jest-runner
- **ESLint** — dbaeumer.vscode-eslint
- **Prettier** — esbenp.prettier-vscode

### Fluxo de Desenvolvimento

1. **Criar branch**: `git checkout -b feature/sua-feature`
2. **Desenvolver**: Use `npm run dev` para hot-reload
3. **Testar**: `npm test` antes de commitar
4. **Formatar**: `npm run format && npm run lint`
5. **Commitar**: Mensagens descritivas em português
6. **Push**: `git push origin feature/sua-feature`
7. **Pull Request**: Descreva as mudanças

### Padrões de Código

- ✅ Use `const` por padrão, `let` quando necessário
- ✅ Funções em arrow function `(param) => {}`
- ✅ Nomes em português para variáveis de negócio
- ✅ Nomes em inglês para código técnico
- ✅ Comentários em português
- ✅ JSDoc para funções públicas

### Como Adicionar uma Rota

```javascript
// 1. Criar controller (src/controllers/minhaController.js)
class MinhaController {
  async minhaAcao(req, res) {
    try {
      // lógica
    } catch (err) {
      logger.error(err);
      res.status(500).render('error');
    }
  }
}

// 2. Criar rota (src/routes/minha.js)
router.get('/lista', minhaController.minhaAcao);

// 3. Registrar em app.js
app.use('/minha', requireAuth, minhaRoutes);

// 4. Criar template (src/views/minha/lista.ejs)
// 5. Testar!
```

---

## 📄 Licença

Este projeto está licenciado sob a licença **ISC**.

```
Copyright (c) 2026 Fabiano de Albuquerque

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
```

---

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a [documentação](./docs/)
2. Abra uma [issue](https://github.com/Fabiano-1979/projeto_restaurante-8-teste/issues)
3. Consulte a [discussão](https://github.com/Fabiano-1979/projeto_restaurante-8-teste/discussions)

---

## 🎓 Projeto Final

> Projeto final apresentado à **Escola Técnica de Brasília** como requisito parcial para obtenção do título de **Técnico em Informática**.

Feito com ❤️ para substituir Tomcat + XAMPP de vez.

**Versão Legada**: [README.md legado](./docs/README-LEGACY.md)
