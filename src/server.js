require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Security & middleware
app.use(helmet({
  contentSecurityPolicy: false, // allow Tailwind CDN + inline for simplicity
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session (SQLite store would be better in prod, but memory is fine for local restaurant system)
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 8, // 8 hours
    httpOnly: true,
  }
}));

app.use(flash());

// Make user available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const mesasRoutes = require('./routes/mesas');
const produtosRoutes = require('./routes/produtos');
const pedidosRoutes = require('./routes/pedidos');
const adminRoutes = require('./routes/admin');

app.use('/', authRoutes);
app.use('/mesas', requireAuth, mesasRoutes);
app.use('/produtos', requireAuth, produtosRoutes);
app.use('/pedidos', requireAuth, pedidosRoutes);
app.use('/admin', requireAdmin, adminRoutes);

// Home redirect
app.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/mesas');
  }
  res.redirect('/login');
});

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página não encontrada' });
});

// Middleware de autenticação
function requireAuth(req, res, next) {
  if (req.session.user) return next();
  req.flash('error', 'Faça login para continuar.');
  res.redirect('/login');
}

function requireAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'ADMIN') return next();
  req.flash('error', 'Acesso restrito a administradores.');
  res.redirect('/mesas');
}

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║   🍽️  SISTEMA RESTAURANTE MODERNO v2.0                     ║
║   Node.js + Express + Prisma + SQLite + Tailwind           ║
╠════════════════════════════════════════════════════════════╣
║   Servidor rodando em: http://localhost:${PORT}            ║
║                                                            ║
║   Login padrão:                                            ║
║     • admin / 123     (Administrador)                      ║
║     • garcom / 123    (Garçom)                             ║
╚════════════════════════════════════════════════════════════╝
  `);
});