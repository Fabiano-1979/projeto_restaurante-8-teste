-- Setup script for projeto_restaurante_5_teste
-- Compatible with the Java code (fixed missing columns)

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Create database matching DataBaseDAO.java
CREATE DATABASE IF NOT EXISTS `projeto_restaurante_5_teste` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `projeto_restaurante_5_teste`;

-- -----------------------------------------------------
-- Table `perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `perfil` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `menu` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  `icone` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `login` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `situacao` TINYINT(1) NOT NULL,
  `id_perfil` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_perfil_idx` (`id_perfil` ASC),
  CONSTRAINT `fk_usuario_perfil`
    FOREIGN KEY (`id_perfil`)
    REFERENCES `perfil` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `perfil_menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `perfil_menu` (
  `id_perfil` INT NOT NULL,
  `id_menu` INT NOT NULL,
  PRIMARY KEY (`id_perfil`, `id_menu`),
  INDEX `fk_perfil_has_menu_menu1_idx` (`id_menu` ASC),
  INDEX `fk_perfil_has_menu_perfil1_idx` (`id_perfil` ASC),
  CONSTRAINT `fk_perfil_has_menu_perfil1`
    FOREIGN KEY (`id_perfil`)
    REFERENCES `perfil` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_perfil_has_menu_menu1`
    FOREIGN KEY (`id_menu`)
    REFERENCES `menu` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `cliente`  (FIXED: added id_mesa to match ClienteDAO and forms)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `cpf` VARCHAR(15) NOT NULL,
  `id_mesa` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cliente_mesa_idx` (`id_mesa` ASC),
  CONSTRAINT `fk_cliente_mesa`
    FOREIGN KEY (`id_mesa`)
    REFERENCES `mesa` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mesa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `produto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `tipo_produto` VARCHAR(100) NOT NULL,
  `volume` VARCHAR(45) NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `descricao` VARCHAR(100) NULL,
  `imagem` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `pedido` (FIXED: made id_mesa and forma_pagamento nullable to allow initial insert from GerenciarPedido)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_pagamento` DATETIME NULL,
  `data_venda` DATETIME NOT NULL,
  `forma_pagamento` VARCHAR(45) NULL,
  `id_mesa` INT NULL,
  `id_cliente` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedido_mesa1_idx` (`id_mesa` ASC),
  INDEX `fk_pedido_cliente1_idx` (`id_cliente` ASC),
  INDEX `fk_pedido_usuario1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_pedido_mesa1`
    FOREIGN KEY (`id_mesa`)
    REFERENCES `mesa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_cliente1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_usuario1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `item_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `item_pedido` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `quantidade` DECIMAL(10,2) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `obeservacao` VARCHAR(250) NULL,
  `id_produto` INT NOT NULL,
  `id_pedido` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produto_pedido_produto1_idx` (`id_produto` ASC),
  INDEX `fk_produto_pedido_pedido1_idx` (`id_pedido` ASC),
  CONSTRAINT `fk_produto_pedido_produto1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `produto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produto_pedido_pedido1`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `pedido` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Perfis
INSERT INTO `perfil` (`id`, `nome`, `descricao`) VALUES 
(1, 'Administrador', 'Acesso total ao sistema'),
(2, 'Garçom', 'Realiza atendimentos e pedidos nas mesas');

-- Menus (links to main features - JSPs and forms)
INSERT INTO `menu` (`id`, `titulo`, `link`, `icone`) VALUES 
(1, 'Usuários', 'listar_usuario.jsp', 'user.png'),
(2, 'Perfis', 'listar_perfil.jsp', 'perfil.png'),
(3, 'Menus', 'listar_menu.jsp', 'menu.png'),
(4, 'Mesas', 'listar_mesa.jsp', 'mesa.png'),
(5, 'Produtos', 'listar_produto.jsp', 'produto.png'),
(6, 'Clientes', 'listar_cliente.jsp', 'cliente.png'),
(7, 'Vendas', 'listar_pedido.jsp', 'venda.png'),
(8, 'Iniciar Atendimento', 'listar_cliente.jsp', 'atendimento.png');

-- Associate all menus to Administrador (perfil 1)
INSERT INTO `perfil_menu` (`id_perfil`, `id_menu`) VALUES 
(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8);

-- Admin user (login: admin / senha: 123)
INSERT INTO `usuario` (`id`, `nome`, `login`, `senha`, `situacao`, `id_perfil`) VALUES 
(1, 'Administrador', 'admin', '123', 1, 1);

-- Some tables (mesas)
INSERT INTO `mesa` (`id`, `nome`, `status`) VALUES 
(1, 'Mesa 01', 'livre'),
(2, 'Mesa 02', 'livre'),
(3, 'Mesa 03', 'livre'),
(4, 'Mesa 04', 'livre'),
(5, 'Mesa 05', 'livre'),
(6, 'Mesa 06', 'livre');

-- Some products matching available images
INSERT INTO `produto` (`id`, `nome`, `tipo_produto`, `volume`, `valor`, `descricao`, `imagem`) VALUES 
(1, 'Hambúrguer', 'Lanche', 'Único', 18.90, 'Hambúrguer artesanal', 'hamburguer.png'),
(2, 'Picanha na Chapa', 'Carne', '300g', 49.90, 'Picanha grelhada', 'picanha.png'),
(3, 'Batata Frita', 'Acompanhamento', 'Porção', 12.50, 'Batata frita crocante', 'batata_frita.png'),
(4, 'Heineken 600ml', 'Bebida', '600ml', 14.00, 'Cerveja Heineken', 'heineken_600.png'),
(5, 'Skol Lata 350ml', 'Bebida', '350ml', 6.50, 'Cerveja Skol', 'skol_lata350.png'),
(6, 'Suco Laranja 300ml', 'Bebida', '300ml', 8.00, 'Suco natural de laranja', 'suco_laranja_300ml.png'),
(7, 'Petit Gateau', 'Sobremesa', 'Único', 15.90, 'Petit gateau com sorvete', 'petit_gateau.png'),
(8, 'Eisenbahn 600ml', 'Bebida', '600ml', 15.00, 'Cerveja Eisenbahn', 'eisenbahn_600.png');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;