const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const helmet = require('helmet');

/**
 * Rate limiting para login (proteção contra brute force)
 */
const loginLimiter = rateLimit({
  windowMs: parseInt(process.env.LOGIN_ATTEMPT_WINDOW_MS || 900000),
  max: parseInt(process.env.MAX_LOGIN_ATTEMPTS || 5),
  message: 'Muitas tentativas de login. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiting geral da API
 */
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 900000),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
  message: 'Muitas requisições. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Configuração de CSRF protection
 */
const csrfProtection = csrf({ cookie: false });

/**
 * Configuração de Helmet para headers de segurança
 */
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'cdn.tailwindcss.com'],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
});

module.exports = {
  loginLimiter,
  apiLimiter,
  csrfProtection,
  helmetConfig,
};
