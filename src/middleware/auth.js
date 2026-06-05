/**
 * Middleware de autenticação
 */

const requireAuth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  req.flash('error', 'Faça login para continuar.');
  res.redirect('/login');
};

const requireAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'ADMIN') {
    return next();
  }
  req.flash('error', 'Acesso restrito a administradores.');
  res.redirect('/mesas');
};

const optionalAuth = (req, res, next) => {
  next();
};

module.exports = {
  requireAuth,
  requireAdmin,
  optionalAuth,
};
