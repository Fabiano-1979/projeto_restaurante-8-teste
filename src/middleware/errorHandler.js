const logger = require('../utils/logger');

/**
 * Middleware de tratamento de erros centralizado
 */
const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).render('error', {
      title: 'Erro de Validação',
      message: 'Dados inválidos fornecidos.',
      details: err.errors,
    });
  }

  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).render('error', {
      title: 'Erro de Segurança',
      message: 'Token de segurança inválido. Por favor, tente novamente.',
    });
  }

  if (err.code === 'P2002') {
    return res.status(400).render('error', {
      title: 'Erro de Duplicação',
      message: 'Este registro já existe no banco de dados.',
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).render('error', {
      title: 'Não Encontrado',
      message: 'O registro solicitado não foi encontrado.',
    });
  }

  res.status(err.status || 500).render('error', {
    title: 'Erro Interno do Servidor',
    message:
      process.env.NODE_ENV === 'production'
        ? 'Um erro interno ocorreu. Por favor, tente novamente.'
        : err.message,
  });
};

/**
 * Middleware para 404 - Página não encontrada
 */
const notFoundHandler = (req, res) => {
  res.status(404).render('404', { title: 'Página não encontrada' });
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
