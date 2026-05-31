const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// List products (public to waiters too)
router.get('/', async (req, res) => {
  const produtos = await prisma.produto.findMany({
    orderBy: { nome: 'asc' }
  });
  res.render('produtos/index', { title: 'Cardápio / Produtos', produtos });
});

// Admin only - simple create form handled in /admin for now
module.exports = router;