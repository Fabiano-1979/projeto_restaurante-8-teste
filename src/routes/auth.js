const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Login page
router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/mesas');
  res.render('login', { title: 'Login - Restaurante' });
});

// Login action
router.post('/login', async (req, res) => {
  try {
    const { login, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { login: login?.trim() }
    });

    if (!usuario || !usuario.situacao) {
      req.flash('error', 'Login ou senha inválidos.');
      return res.redirect('/login');
    }

    const senhaValida = await bcrypt.compare(senha || '', usuario.senha);
    if (!senhaValida) {
      req.flash('error', 'Login ou senha inválidos.');
      return res.redirect('/login');
    }

    // Save user in session (without password)
    req.session.user = {
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      role: usuario.role,
    };

    req.flash('success', `Bem-vindo(a), ${usuario.nome}!`);
    res.redirect('/mesas');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao fazer login.');
    res.redirect('/login');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;