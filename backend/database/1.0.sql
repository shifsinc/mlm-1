-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mlm_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mlm_db` ;

-- -----------------------------------------------------
-- Schema mlm_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mlm_db` DEFAULT CHARACTER SET utf8 ;
USE `mlm_db` ;

-- -----------------------------------------------------
-- Table `mlm_db`.`accounts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`accounts` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`accounts` (
  `account_id` INT(11) NOT NULL AUTO_INCREMENT,
  `account_value` DOUBLE NOT NULL DEFAULT '0',
  `account_ethereum` VARCHAR(64) NULL DEFAULT NULL,
  `account_paypal` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mlm_db`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`roles` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`roles` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC),
  UNIQUE INDEX `role_id_UNIQUE` (`role_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mlm_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`users` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_login` VARCHAR(30) NOT NULL,
  `user_password_hash` VARCHAR(65) NOT NULL,
  `user_name` VARCHAR(40) NULL DEFAULT NULL,
  `user_surname` VARCHAR(40) NULL DEFAULT NULL,
  `user_status` VARCHAR(45) NULL DEFAULT NULL,
  `user_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` INT(11) NOT NULL DEFAULT '2',
  `user_refer` INT(11) NULL DEFAULT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_phone` VARCHAR(16) NULL DEFAULT NULL,
  `user_social` VARCHAR(45) NULL DEFAULT NULL,
  `user_telegram` VARCHAR(45) NULL DEFAULT NULL,
  `user_photo` VARCHAR(45) NULL DEFAULT 'noPhoto.png',
  `user_bonus_level` INT(10) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `user_rate` INT(10) NULL DEFAULT NULL,
  `account_id` INT(11) NULL DEFAULT NULL,
  `user_refer_type` ENUM('l', 'r') NULL DEFAULT NULL,
  `password_reset_token` VARCHAR(32) NULL DEFAULT NULL,
  `password_reset_token_ts` TIMESTAMP(6) NULL DEFAULT NULL,
  `user_data_filled` TINYINT(4) NOT NULL DEFAULT '0',
  `email_confirm_token` VARCHAR(32) NULL DEFAULT NULL,
  `general_link_type` ENUM('l', 'r') NOT NULL DEFAULT 'l',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_login_UNIQUE` (`user_login` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC),
  UNIQUE INDEX `user_phone_UNIQUE` (`user_phone` ASC),
  INDEX `role_idx` (`role_id` ASC),
  INDEX `refer_idx` (`user_refer` ASC),
  CONSTRAINT `money`
    FOREIGN KEY (`account_id`)
    REFERENCES `mlm_db`.`accounts` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `refer`
    FOREIGN KEY (`user_refer`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `role`
    FOREIGN KEY (`role_id`)
    REFERENCES `mlm_db`.`roles` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mlm_db`.`news`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`news` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`news` (
  `news_id` INT NOT NULL AUTO_INCREMENT,
  `news_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `news_title` VARCHAR(45) NOT NULL,
  `news_text` TEXT(4000) NULL,
  `news_status` TINYINT(4) NOT NULL DEFAULT 0,
  `news_author` INT(11) NOT NULL,
  PRIMARY KEY (`news_id`),
  UNIQUE INDEX `news_id_UNIQUE` (`news_id` ASC),
  INDEX `author_idx` (`news_author` ASC),
  CONSTRAINT `author`
    FOREIGN KEY (`news_author`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mlm_db`.`files`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`files` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`files` (
  `file_id` INT NOT NULL AUTO_INCREMENT,
  `file_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `file_author` INT(11) NOT NULL,
  `file_type` VARCHAR(16) NOT NULL DEFAULT 'file',
  `file_title` VARCHAR(64) NULL,
  `file_descr` VARCHAR(128) NULL,
  `file_section` ENUM('marketing', 'instructions', 'videos') NOT NULL,
  `file_name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`file_id`),
  UNIQUE INDEX `file_id_UNIQUE` (`file_id` ASC),
  INDEX `author_idx` (`file_author` ASC),
  INDEX `section` (`file_section`),
  CONSTRAINT `author_fk`
    FOREIGN KEY (`file_author`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mlm_db`.`transactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`transactions` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`transactions` (
  `tr_id` INT NOT NULL AUTO_INCREMENT,
  `tr_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tr_descr` VARCHAR(128) NULL,
  `tr_real_amount` DOUBLE NULL,
  `tr_platform_amount` DOUBLE NOT NULL,
  `tr_pay_method` ENUM('ethereum', 'paypal') NULL,
  `tr_status` ENUM('wait', 'ok', 'rejected') NOT NULL DEFAULT 'wait',
  `tr_sender_id` INT NULL,
  `tr_receiver_id` INT NOT NULL,
  `tr_type` ENUM('in', 'out', 'internal') NOT NULL,
  PRIMARY KEY (`tr_id`),
  UNIQUE INDEX `tr_id_UNIQUE` (`tr_id` ASC),
  CONSTRAINT `sender`
    FOREIGN KEY (`tr_sender_id`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `receiver`
    FOREIGN KEY (`tr_receiver_id`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `sender_idx` (`tr_sender_id`),
  INDEX `receiver_idx` (`tr_receiver_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mlm_db`.`sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`sessions` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`sessions` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  CONSTRAINT `user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `mlm_db`;

DELIMITER $$

USE `mlm_db`$$
DROP TRIGGER IF EXISTS `mlm_db`.`users_BEFORE_INSERT` $$
USE `mlm_db`$$
CREATE DEFINER = CURRENT_USER TRIGGER `mlm_db`.`users_BEFORE_INSERT` BEFORE INSERT ON `users` FOR EACH ROW
BEGIN
	DECLARE acc_id INT(11);
	INSERT INTO accounts
    VALUES ();
    SELECT LAST_INSERT_ID() INTO acc_id FROM accounts LIMIT 1;
    SET new.account_id = acc_id;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mlm_db`.`roles`
-- -----------------------------------------------------
START TRANSACTION;
USE `mlm_db`;
INSERT INTO `mlm_db`.`roles` (`role_id`, `role_name`) VALUES (1, 'admin');
INSERT INTO `mlm_db`.`roles` (`role_id`, `role_name`) VALUES (2, 'user');
INSERT INTO `mlm_db`.`roles` (`role_id`, `role_name`) VALUES (3, 'guest');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mlm_db`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `mlm_db`;
INSERT INTO `mlm_db`.`users` (`user_id`, `user_login`, `user_password_hash`, `user_name`, `user_email`, `user_data_filled`) VALUES (1, 'root', md5('rootPass12345aA!'), 'root', 'root@email', 1);

COMMIT;
