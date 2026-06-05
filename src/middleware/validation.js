const { ZodError } = require('zod');

/**
 * Middleware para validar requisição com schema Zod
 * @param {*} schema - Schema do Zod
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.validatedData = validated;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        req.flash('error', 'Dados inválidos fornecidos.');
        return res.status(400).render('error', {
          title: 'Erro de Validação',
          message: 'Por favor, verifique os dados fornecidos.',
          details: err.errors,
        });
      }
      next(err);
    }
  };
};

module.exports = { validateRequest };
