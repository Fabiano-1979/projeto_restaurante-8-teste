const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /mesas - Visual dashboard of tables (main screen for garçom)
router.get('/', async (req, res) => {
  try {
    const mesas = await prisma.mesa.findMany({
      include: {
        clientes: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: { pedidos: { where: { status: 'aberto' } } }
        }
      },
      orderBy: { nome: 'asc' }
    });

    // Get current open orders summary per mesa
    const mesasComPedidos = await Promise.all(mesas.map(async (mesa) => {
      const pedidoAberto = await prisma.pedido.findFirst({
        where: { id_mesa: mesa.id, status: 'aberto' },
        include: {
          cliente: true,
          itens: { include: { produto: true } }
        },
        orderBy: { data_venda: 'desc' }
      });

      let totalAberto = 0;
      if (pedidoAberto) {
        totalAberto = pedidoAberto.itens.reduce((sum, item) => {
          return sum + (Number(item.preco) * item.quantidade);
        }, 0);
      }

      return {
        ...mesa,
        pedidoAberto,
        totalAberto: totalAberto.toFixed(2),
        clienteAtual: pedidoAberto?.cliente || mesa.clientes[0] || null,
      };
    }));

    res.render('mesas/index', {
      title: 'Mesas - Restaurante',
      mesas: mesasComPedidos,
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao carregar mesas.');
    res.redirect('/');
  }
});

// POST /mesas/:id/iniciar - Start service at a table (create/open client + pedido)
router.post('/:id/iniciar', async (req, res) => {
  try {
    const mesaId = parseInt(req.params.id);
    const { nomeCliente, cpf } = req.body;
    const user = req.session.user;

    const mesa = await prisma.mesa.findUnique({ where: { id: mesaId } });
    if (!mesa) throw new Error('Mesa não encontrada');

    // Create or reuse client
    let cliente = await prisma.cliente.findFirst({
      where: { id_mesa: mesaId },
      orderBy: { createdAt: 'desc' }
    });

    if (!cliente || cliente.nome !== (nomeCliente || 'Cliente Mesa ' + mesa.nome)) {
      cliente = await prisma.cliente.create({
        data: {
          nome: nomeCliente?.trim() || `Cliente ${mesa.nome}`,
          cpf: cpf?.trim() || null,
          id_mesa: mesaId,
        }
      });
    }

    // Update mesa status
    await prisma.mesa.update({
      where: { id: mesaId },
      data: { status: 'ocupada' }
    });

    // Check if there's already an open order for this table
    let pedido = await prisma.pedido.findFirst({
      where: { id_mesa: mesaId, status: 'aberto' },
      orderBy: { data_venda: 'desc' }
    });

    if (!pedido) {
      pedido = await prisma.pedido.create({
        data: {
          id_mesa: mesaId,
          id_cliente: cliente.id,
          id_usuario: user.id,
          status: 'aberto',
        }
      });
    }

    req.flash('success', `Atendimento iniciado na ${mesa.nome}`);
    res.redirect(`/pedidos/${pedido.id}/carrinho`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Não foi possível iniciar o atendimento.');
    res.redirect('/mesas');
  }
});

// POST /mesas/:id/liberar - Free a table after payment
router.post('/:id/liberar', async (req, res) => {
  try {
    const mesaId = parseInt(req.params.id);

    await prisma.mesa.update({
      where: { id: mesaId },
      data: { status: 'livre' }
    });

    // Optionally close any remaining open orders (or leave for history)
    await prisma.pedido.updateMany({
      where: { id_mesa: mesaId, status: 'aberto' },
      data: { status: 'pago' } // or keep aberto if needed
    });

    req.flash('success', 'Mesa liberada com sucesso.');
    res.redirect('/mesas');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao liberar mesa.');
    res.redirect('/mesas');
  }
});

module.exports = router;