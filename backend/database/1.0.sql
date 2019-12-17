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
  `account_current_value` DOUBLE NOT NULL DEFAULT '0',
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
  `user_phone` BIGINT(13) NULL DEFAULT NULL,
  `user_social` VARCHAR(45) NULL DEFAULT NULL,
  `user_telegram` VARCHAR(45) NULL DEFAULT NULL,
  `user_photo` VARCHAR(45) NULL DEFAULT NULL,
  `user_bonus_level` INT(10) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `user_rate` INT(10) NULL DEFAULT NULL,
  `left_ref` VARCHAR(45) NULL DEFAULT NULL,
  `right_ref` VARCHAR(45) NULL DEFAULT NULL,
  `common_ref` VARCHAR(45) NULL DEFAULT NULL,
  `account_id` INT(11) NULL DEFAULT NULL,
  `user_refer_type` ENUM('l', 'r', 'g') NOT NULL DEFAULT 'g',
  `password_reset_token` VARCHAR(32) NULL DEFAULT NULL,
  `password_reset_token_ts` TIMESTAMP(6) NULL DEFAULT NULL,
  `user_data_filled` TINYINT(4) NOT NULL DEFAULT '0',
  `email_confirm_token` VARCHAR(32) NULL DEFAULT NULL,
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
INSERT INTO `mlm_db`.`users` (`user_id`, `user_login`, `user_password_hash`, `user_name`, `user_surname`, `user_status`, `user_dt`, `role_id`, `user_refer`, `user_email`, `user_phone`, `user_social`, `user_telegram`, `user_photo`, `user_bonus_level`, `user_rate`, `left_ref`, `right_ref`, `common_ref`, `account_id`, `user_refer_type`, `password_reset_token`, `password_reset_token_ts`, `user_data_filled`, `email_confirm_token`) VALUES (1, 'root', 'dsadada', 'root', NULL, '0', DEFAULT, 1, 1, 'example@email.com', 213312345, 'vk.com/id0', '@telegram', '/home/mlm/default.png', NULL, 12, NULL, NULL, NULL, NULL, DEFAULT, NULL, NULL, 1, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mlm_db`.`news`
-- -----------------------------------------------------
START TRANSACTION;
USE `mlm_db`;
INSERT INTO `mlm_db`.`news` (`news_id`, `news_dt`, `news_title`, `news_text`, `news_status`, `news_author`) VALUES (1, DEFAULT, 'Открытие сайта!', 'Поздравляем', 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mlm_db`.`sessions`
-- -----------------------------------------------------
START TRANSACTION;
USE `mlm_db`;
INSERT INTO `mlm_db`.`sessions` (`user_id`, `token`) VALUES (1, 'sdfsfsdf');

COMMIT;

