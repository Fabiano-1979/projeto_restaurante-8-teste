const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

/**
 * Controller para autenticação
 */
class AuthController {
  /**
   * Exibir página de login
   */
  async showLoginPage(req, res) {
    try {
      res.render('auth/login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
      });
    } catch (err) {
      logger.error(err);
      res.status(500).render('error', {
        title: 'Erro',
        message: 'Erro ao carregar página de login',
      });
    }
  }

  /**
   * Processar login
   */
  async handleLogin(req, res) {
    try {
      const { email, password } = req.validatedData;

      const user = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!user) {
        logger.warn(`Login attempt with non-existent email: ${email}`);
        req.flash('error', 'Email ou senha incorretos.');
        return res.redirect('/login');
      }

      const isValidPassword = await bcrypt.compare(password, user.senha);

      if (!isValidPassword) {
        logger.warn(`Failed login attempt for user: ${email}`);
        req.flash('error', 'Email ou senha incorretos.');
        return res.redirect('/login');
      }

      req.session.user = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      };

      logger.info(`User logged in: ${email}`);
      req.flash('success', `Bem-vindo, ${user.nome}!`);
      res.redirect('/mesas');
    } catch (err) {
      logger.error(err);
      res.status(500).render('error', {
        title: 'Erro',
        message: 'Erro ao fazer login',
      });
    }
  }

  /**
   * Exibir página de registro
   */
  async showRegisterPage(req, res) {
    try {
      res.render('auth/register', {
        title: 'Registrar',
        csrfToken: req.csrfToken(),
      });
    } catch (err) {
      logger.error(err);
      res.status(500).render('error', {
        title: 'Erro',
        message: 'Erro ao carregar página de registro',
      });
    }
  }

  /**
   * Processar registro
   */
  async handleRegister(req, res) {
    try {
      const { name, email, password } = req.validatedData;

      const existingUser = await prisma.usuario.findUnique({
        where: { email },
      });

      if (existingUser) {
        req.flash('error', 'Email já registrado.');
        return res.redirect('/register');
      }

      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_ROUNDS || 10)
      );

      await prisma.usuario.create({
        data: {
          nome: name,
          email,
          senha: hashedPassword,
          role: 'USER',
        },
      });

      logger.info(`New user registered: ${email}`);
      req.flash('success', 'Usuário registrado com sucesso! Faça login.');
      res.redirect('/login');
    } catch (err) {
      logger.error(err);
      res.status(500).render('error', {
        title: 'Erro',
        message: 'Erro ao registrar usuário',
      });
    }
  }

  /**
   * Fazer logout
   */
  async handleLogout(req, res) {
    try {
      const userEmail = req.session.user?.email;
      req.session.destroy((err) => {
        if (err) {
          logger.error('Error destroying session:', err);
          return res.status(500).render('error', {
            title: 'Erro',
            message: 'Erro ao fazer logout',
          });
        }
        logger.info(`User logged out: ${userEmail}`);
        req.flash('success', 'Logout realizado com sucesso.');
        res.redirect('/login');
      });
    } catch (err) {
      logger.error(err);
      res.status(500).render('error', {
        title: 'Erro',
        message: 'Erro ao fazer logout',
      });
    }
  }
}

module.exports = new AuthController();
