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
  `account_owner` INT(11) NOT NULL,
  `account_balance` DOUBLE NOT NULL DEFAULT '0',
  `account_withdraws` DOUBLE(11) NOT NULL DEFAULT '0',
  `account_last_payment_ts` TIMESTAMP NULL DEFAULT NULL,
  `account_ethereum` VARCHAR(64) NULL DEFAULT NULL,
  `account_paypal` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC),
  UNIQUE INDEX `owner_id_UNIQUE` (`account_owner` ASC),
  CONSTRAINT `owner_fk`
    FOREIGN KEY (`account_owner`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mlm_db`.`user_bonuses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`user_bonuses` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`user_bonuses` (
  `bonuses_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `bonus_binary` INT(11) NOT NULL DEFAULT '0',
  `bonus_match` INT(11) NOT NULL DEFAULT '0',
  `bonus_yoda` INT(11) NOT NULL DEFAULT '0',
  `bonus_linear1` INT(11) NOT NULL DEFAULT '0',
  `bonus_linear2` INT(11) NOT NULL DEFAULT '0',
  `bonus_lead` INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`bonuses_id`),
  UNIQUE INDEX `bonuses_id_UNIQUE` (`bonuses_id` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  CONSTRAINT `user_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mlm_db`.`stats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`stats` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`stats` (
  `stats_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `stats_first_line_referals` INT(11) NOT NULL DEFAULT '0',
  `stats_second_line_referals` INT(11) NOT NULL DEFAULT '0',
  `stats_first_line_active_referals` INT(11) NOT NULL DEFAULT '0',
  `stats_second_line_active_referals` INT(11) NOT NULL DEFAULT '0',
  `stats_left_referals` INT(11) NOT NULL DEFAULT '0',
  `stats_right_referals` INT(11) NOT NULL DEFAULT '0',
  `stats_yt_left` DOUBLE NOT NULL DEFAULT '0',
  `stats_yt_right` DOUBLE NOT NULL DEFAULT '0',
  `stats_yt_total` DOUBLE NOT NULL DEFAULT '0',
  `stats_binary_cycles_left` INT(11) NOT NULL DEFAULT '0',
  `stats_binary_cycles_right` INT(11) NOT NULL DEFAULT '0',
  `stats_day_profit` DOUBLE NOT NULL DEFAULT '0',
  `stats_day_profit_ts` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`stats_id`),
  UNIQUE INDEX `stats_id_UNIQUE` (`stats_id` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  CONSTRAINT `user_fk0`
    FOREIGN KEY (`user_id`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `user_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` INT(11) NOT NULL DEFAULT '2',
  `user_blocked` BOOL NOT NULL DEFAULT '0',
  `user_refer` INT(11) NULL DEFAULT NULL,
  `user_refer_type` ENUM('l', 'r') NULL DEFAULT NULL,
  `user_has_team` BOOL NOT NULL DEFAULT '0',
  `user_name` VARCHAR(40) NULL DEFAULT NULL,
  `user_surname` VARCHAR(40) NULL DEFAULT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_phone` VARCHAR(16) NULL DEFAULT NULL,
  `user_social` VARCHAR(45) NULL DEFAULT NULL,
  `user_telegram` VARCHAR(64) NULL DEFAULT NULL,
  `user_photo` VARCHAR(45) NULL DEFAULT 'noPhoto.png',
  `user_status` ENUM('investor', 'bronze', 'silver', 'gold', 'platinum', 'sapphire', 'emerald', 'diamond', 'diamond2') NOT NULL DEFAULT 'investor',
  `user_bonus_level` INT(10) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `user_rate` ENUM('client', 'light', 'advanced', 'master') NULL DEFAULT NULL,
  `password_reset_token` VARCHAR(32) NULL DEFAULT NULL,
  `password_reset_token_ts` TIMESTAMP(6) NULL DEFAULT NULL,
  `user_data_filled` TINYINT(4) NOT NULL DEFAULT '0',
  `user_start_work` TINYINT(4) NOT NULL DEFAULT '0',
  `email_confirm_token` VARCHAR(32) NULL DEFAULT NULL,
  `general_link_type` ENUM('l', 'r') NOT NULL DEFAULT 'l',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_login_UNIQUE` (`user_login` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC),
  UNIQUE INDEX `user_phone_UNIQUE` (`user_phone` ASC),
  INDEX `role_idx` (`role_id` ASC),
  INDEX `refer_idx` (`user_refer` ASC),
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
  `news_title` VARCHAR(64) NOT NULL,
  `news_text` TEXT(4000) NULL,
  `news_image` VARCHAR(64) NULL DEFAULT NULL,
  `news_author` INT(11) NOT NULL,
  `news_type` ENUM('news', 'blog', 'robot_update') NOT NULL DEFAULT 'news',
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
  `file_section` ENUM('marketing', 'instructions', 'videos', 'robot') NOT NULL,
  `file_name` VARCHAR(32) NOT NULL,
  `file_rate` ENUM('client', 'light', 'advanced', 'master') NULL DEFAULT NULL,
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
-- Table `mlm_db`.`robot_keys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`robot_keys` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`robot_keys` (
  `key_id` INT NOT NULL AUTO_INCREMENT,
  `key_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT(11) NOT NULL,
  `key_rate` ENUM('client', 'light', 'advanced', 'master') NOT NULL,
  `key_account` INT(11) NOT NULL,
  `key_max_deposit` INT(11) NOT NULL,
  `key_license_active` BOOL NOT NULL DEFAULT '1',
  `key_valid_dt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`key_id`),
  UNIQUE INDEX `key_id_UNIQUE` (`key_id` ASC),
  INDEX `user_idx` (`user_id` ASC),
  CONSTRAINT `user_fk1`
    FOREIGN KEY (`user_id`)
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
  `tr_pay_method` ENUM('paypal', 'ethereum') NULL,
  `tr_status` ENUM('wait', 'ok', 'rejected') NOT NULL DEFAULT 'wait',
  `tr_sender_id` INT NULL,
  `tr_receiver_id` INT NOT NULL,
  `tr_type` ENUM('in', 'out', 'internal') NOT NULL,
  PRIMARY KEY (`tr_id`),
  UNIQUE INDEX `tr_id_UNIQUE` (`tr_id` ASC),
  CONSTRAINT `sender`
    FOREIGN KEY (`tr_sender_id`)
    REFERENCES `mlm_db`.`accounts` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `receiver`
    FOREIGN KEY (`tr_receiver_id`)
    REFERENCES `mlm_db`.`accounts` (`account_id`)
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
  PRIMARY KEY (`token`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  CONSTRAINT `user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `mlm_db`;

DELIMITER $$

USE `mlm_db`$$
DROP TRIGGER IF EXISTS `mlm_db`.`users_AFTER_INSERT` $$
USE `mlm_db`$$
CREATE DEFINER = CURRENT_USER TRIGGER `mlm_db`.`users_AFTER_INSERT` AFTER INSERT ON `users` FOR EACH ROW
BEGIN
  INSERT INTO accounts(account_owner) VALUES(new.user_id);
  INSERT INTO user_bonuses(user_id) VALUES(new.user_id);
  INSERT INTO stats(user_id) VALUES(new.user_id);
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
