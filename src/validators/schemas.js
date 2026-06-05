const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Email inválido').toLowerCase(),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome não pode exceder 100 caracteres'),
  email: z.string().email('Email inválido').toLowerCase(),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Senha deve conter letras maiúsculas, minúsculas e números'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});

const mesaSchema = z.object({
  numero: z.number().int('Número da mesa deve ser um inteiro').positive('Número da mesa deve ser positivo'),
  capacidade: z.number().int('Capacidade deve ser um inteiro').positive('Capacidade deve ser positiva'),
  localizacao: z.string().max(100, 'Localização não pode exceder 100 caracteres').optional(),
});

const produtoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome não pode exceder 100 caracteres'),
  descricao: z.string().max(500, 'Descrição não pode exceder 500 caracteres').optional(),
  preco: z.number().positive('Preço deve ser positivo'),
  categoria: z.string().min(2, 'Categoria deve ter pelo menos 2 caracteres'),
});

const itemPedidoSchema = z.object({
  produtoId: z.number().int('ID do produto deve ser um inteiro'),
  quantidade: z.number().int('Quantidade deve ser um inteiro').positive('Quantidade deve ser positiva'),
});

const pedidoSchema = z.object({
  mesaId: z.number().int('ID da mesa deve ser um inteiro'),
  itens: z.array(itemPedidoSchema).min(1, 'Pedido deve ter pelo menos um item'),
  observacoes: z.string().max(500, 'Observações não podem exceder 500 caracteres').optional(),
});

module.exports = {
  loginSchema,
  registerSchema,
  mesaSchema,
  produtoSchema,
  itemPedidoSchema,
  pedidoSchema,
};
