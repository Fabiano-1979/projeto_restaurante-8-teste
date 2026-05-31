const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /pedidos - List all orders (history)
router.get('/', async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        mesa: true,
        cliente: true,
        usuario: true,
        itens: { include: { produto: true } }
      },
      orderBy: { data_venda: 'desc' },
      take: 50
    });

    res.render('pedidos/index', {
      title: 'Histórico de Pedidos',
      pedidos
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao listar pedidos.');
    res.redirect('/mesas');
  }
});

// GET /pedidos/:id/carrinho - Current order / add products (main order screen)
router.get('/:id/carrinho', async (req, res) => {
  try {
    const pedidoId = parseInt(req.params.id);

    const pedido = await prisma.pedido.findUnique({
      where: { id: pedidoId },
      include: {
        mesa: true,
        cliente: true,
        usuario: true,
        itens: {
          include: { produto: true },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!pedido) {
      req.flash('error', 'Pedido não encontrado.');
      return res.redirect('/mesas');
    }

    // All active products for the catalog
    const produtos = await prisma.produto.findMany({
      where: { ativo: true },
      orderBy: [{ tipo_produto: 'asc' }, { nome: 'asc' }]
    });

    const total = pedido.itens.reduce((sum, item) => {
      return sum + (Number(item.preco) * item.quantidade);
    }, 0);

    res.render('pedidos/carrinho', {
      title: `Pedido #${pedido.id} - ${pedido.mesa?.nome || 'Mesa'}`,
      pedido,
      produtos,
      total: total.toFixed(2)
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao abrir carrinho.');
    res.redirect('/mesas');
  }
});

// POST /pedidos/:id/itens - Add product to order
router.post('/:id/itens', async (req, res) => {
  try {
    const pedidoId = parseInt(req.params.id);
    const { id_produto, quantidade, observacao } = req.body;

    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(id_produto) }
    });

    if (!produto) throw new Error('Produto inválido');

    const qtd = parseInt(quantidade) || 1;

    await prisma.itemPedido.create({
      data: {
        id_pedido: pedidoId,
        id_produto: produto.id,
        quantidade: qtd,
        preco: produto.valor,
        observacao: observacao?.trim() || null
      }
    });

    res.redirect(`/pedidos/${pedidoId}/carrinho`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao adicionar item.');
    res.redirect(`/pedidos/${req.params.id}/carrinho`);
  }
});

// POST /pedidos/:id/itens/:itemId/remover
router.post('/:id/itens/:itemId/remover', async (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const pedidoId = parseInt(req.params.id);

    await prisma.itemPedido.delete({ where: { id: itemId } });

    res.redirect(`/pedidos/${pedidoId}/carrinho`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao remover item.');
    res.redirect(`/pedidos/${req.params.id}/carrinho`);
  }
});

// POST /pedidos/:id/fechar - Close order and ask for payment
router.post('/:id/fechar', async (req, res) => {
  try {
    const pedidoId = parseInt(req.params.id);
    const { forma_pagamento } = req.body;

    const pedido = await prisma.pedido.findUnique({
      where: { id: pedidoId },
      include: { itens: true, mesa: true }
    });

    if (!pedido || pedido.itens.length === 0) {
      req.flash('error', 'Pedido vazio. Adicione itens antes de fechar.');
      return res.redirect(`/pedidos/${pedidoId}/carrinho`);
    }

    await prisma.pedido.update({
      where: { id: pedidoId },
      data: {
        status: 'pago',
        forma_pagamento: forma_pagamento || 'Dinheiro',
        data_pagamento: new Date()
      }
    });

    if (pedido.id_mesa) {
      await prisma.mesa.update({
        where: { id: pedido.id_mesa },
        data: { status: 'livre' }
      });
    }

    req.flash('success', `Pedido #${pedidoId} finalizado com sucesso!`);
    res.redirect('/mesas');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao fechar pedido.');
    res.redirect(`/pedidos/${req.params.id}/carrinho`);
  }
});

// GET /pedidos/:id/recibo - Simple receipt view (print friendly)
router.get('/:id/recibo', async (req, res) => {
  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        mesa: true,
        cliente: true,
        usuario: true,
        itens: { include: { produto: true } }
      }
    });

    if (!pedido) return res.status(404).send('Pedido não encontrado');

    const total = pedido.itens.reduce((s, i) => s + Number(i.preco) * i.quantidade, 0);

    res.render('pedidos/recibo', {
      title: `Recibo #${pedido.id}`,
      pedido,
      total: total.toFixed(2)
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao gerar recibo');
  }
});

module.exports = router;