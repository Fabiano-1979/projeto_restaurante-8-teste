const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Admin dashboard
router.get('/', async (req, res) => {
  const [totalMesas, totalProdutos, totalPedidos, usuarios] = await Promise.all([
    prisma.mesa.count(),
    prisma.produto.count(),
    prisma.pedido.count({ where: { status: 'pago' } }),
    prisma.usuario.findMany({ orderBy: { nome: 'asc' } })
  ]);

  res.render('admin/index', {
    title: 'Painel Administrativo',
    stats: { totalMesas, totalProdutos, totalPedidos },
    usuarios
  });
});

// ==================== USUÁRIOS ====================
router.get('/usuarios', async (req, res) => {
  const usuarios = await prisma.usuario.findMany({ orderBy: { nome: 'asc' } });
  res.render('admin/usuarios', { title: 'Gerenciar Usuários', usuarios });
});

router.post('/usuarios', async (req, res) => {
  try {
    const { nome, login, senha, role } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    await prisma.usuario.create({
      data: { nome, login, senha: hash, role: role || 'GARCOM', situacao: true }
    });
    req.flash('success', 'Usuário criado com sucesso!');
  } catch (e) {
    req.flash('error', 'Erro ao criar usuário (login já existe?)');
  }
  res.redirect('/admin/usuarios');
});

router.post('/usuarios/:id/excluir', async (req, res) => {
  try {
    await prisma.usuario.delete({ where: { id: parseInt(req.params.id) } });
    req.flash('success', 'Usuário excluído.');
  } catch (e) {
    req.flash('error', 'Não foi possível excluir (tem pedidos vinculados?).');
  }
  res.redirect('/admin/usuarios');
});

// ==================== MESAS ====================
router.get('/mesas', async (req, res) => {
  const mesas = await prisma.mesa.findMany({ orderBy: { nome: 'asc' } });
  res.render('admin/mesas', { title: 'Gerenciar Mesas', mesas });
});

router.post('/mesas', async (req, res) => {
  const { nome } = req.body;
  await prisma.mesa.create({ data: { nome, status: 'livre' } });
  req.flash('success', 'Mesa criada.');
  res.redirect('/admin/mesas');
});

router.post('/mesas/:id/excluir', async (req, res) => {
  await prisma.mesa.delete({ where: { id: parseInt(req.params.id) } });
  req.flash('success', 'Mesa excluída.');
  res.redirect('/admin/mesas');
});

// ==================== PRODUTOS ====================
router.get('/produtos', async (req, res) => {
  const produtos = await prisma.produto.findMany({ orderBy: { nome: 'asc' } });
  res.render('admin/produtos', { title: 'Gerenciar Cardápio', produtos });
});

router.post('/produtos', async (req, res) => {
  const { nome, tipo_produto, volume, valor, descricao, imagem } = req.body;
  await prisma.produto.create({
    data: {
      nome,
      tipo_produto,
      volume: volume || null,
      valor: parseFloat(valor),
      descricao: descricao || null,
      imagem: imagem || 'hamburguer.png'
    }
  });
  req.flash('success', 'Produto adicionado ao cardápio.');
  res.redirect('/admin/produtos');
});

router.post('/produtos/:id/excluir', async (req, res) => {
  await prisma.produto.delete({ where: { id: parseInt(req.params.id) } });
  req.flash('success', 'Produto removido.');
  res.redirect('/admin/produtos');
});

module.exports = router;