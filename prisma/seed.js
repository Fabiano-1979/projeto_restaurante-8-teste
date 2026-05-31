const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Clean existing data (for repeatable seeds in dev)
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.mesa.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.perfil.deleteMany();

  // Perfis (kept for compatibility/future)
  await prisma.perfil.createMany({
    data: [
      { nome: 'Administrador', descricao: 'Acesso total ao sistema' },
      { nome: 'Garçom', descricao: 'Realiza atendimentos e pedidos nas mesas' },
    ],
  });

  // Usuários com senhas hasheadas (admin/123 e garcom/123)
  const senhaHash = await bcrypt.hash('123', 10);

  const admin = await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      login: 'admin',
      senha: senhaHash,
      situacao: true,
      role: 'ADMIN',
    },
  });

  const garcom = await prisma.usuario.create({
    data: {
      nome: 'João Garçom',
      login: 'garcom',
      senha: senhaHash,
      situacao: true,
      role: 'GARCOM',
    },
  });

  console.log('✅ Usuários criados: admin/123 e garcom/123');

  // Mesas
  const mesas = await Promise.all(
    Array.from({ length: 8 }, (_, i) =>
      prisma.mesa.create({
        data: {
          nome: `Mesa ${String(i + 1).padStart(2, '0')}`,
          status: 'livre',
        },
      })
    )
  );
  console.log(`✅ ${mesas.length} mesas criadas`);

  // Produtos (matching original images + some more)
  const produtos = await prisma.produto.createMany({
    data: [
      { nome: 'Hambúrguer', tipo_produto: 'Lanche', volume: 'Único', valor: 18.9, descricao: 'Hambúrguer artesanal', imagem: 'hamburguer.png' },
      { nome: 'Picanha na Chapa', tipo_produto: 'Carne', volume: '300g', valor: 49.9, descricao: 'Picanha grelhada', imagem: 'picanha.png' },
      { nome: 'Batata Frita', tipo_produto: 'Acompanhamento', volume: 'Porção', valor: 12.5, descricao: 'Batata frita crocante', imagem: 'batata_frita.png' },
      { nome: 'Heineken 600ml', tipo_produto: 'Bebida', volume: '600ml', valor: 14.0, descricao: 'Cerveja Heineken', imagem: 'heineken_600.png' },
      { nome: 'Skol Lata 350ml', tipo_produto: 'Bebida', volume: '350ml', valor: 6.5, descricao: 'Cerveja Skol', imagem: 'skol_lata350.png' },
      { nome: 'Suco Laranja 300ml', tipo_produto: 'Bebida', volume: '300ml', valor: 8.0, descricao: 'Suco natural de laranja', imagem: 'suco_laranja_300ml.png' },
      { nome: 'Petit Gateau', tipo_produto: 'Sobremesa', volume: 'Único', valor: 15.9, descricao: 'Petit gateau com sorvete', imagem: 'petit_gateau.png' },
      { nome: 'Eisenbahn 600ml', tipo_produto: 'Bebida', volume: '600ml', valor: 15.0, descricao: 'Cerveja Eisenbahn', imagem: 'eisenbahn_600.png' },
      { nome: 'Coca-Cola Lata', tipo_produto: 'Bebida', volume: '350ml', valor: 5.5, descricao: 'Refrigerante Coca-Cola', imagem: 'energetico.png' },
      { nome: 'Água Mineral 500ml', tipo_produto: 'Bebida', volume: '500ml', valor: 4.0, descricao: 'Água sem gás', imagem: 'suco.png' },
    ],
  });
  console.log(`✅ ${produtos.count} produtos criados`);

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('📌 Login admin: admin / 123');
  console.log('📌 Login garçom: garcom / 123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });