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
-- Table `mlm_db`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`roles` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`roles` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) ,
  UNIQUE INDEX `role_id_UNIQUE` (`role_id` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mlm_db`.`accounts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`accounts` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`accounts` (
  `account_id` INT NOT NULL AUTO_INCREMENT,
  `account_current_value` DOUBLE NOT NULL DEFAULT 0,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC) )
ENGINE = InnoDB;


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
  `user_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` INT(11) NOT NULL DEFAULT 2,
  `user_refer` INT(11) NULL DEFAULT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_phone` BIGINT(52) NULL DEFAULT NULL,
  `user_social` VARCHAR(45) NULL DEFAULT NULL,
  `user_telegram` VARCHAR(45) NULL DEFAULT NULL,
  `user_photo` VARCHAR(45) NULL DEFAULT NULL,
  `user_bonus_level` INT(10) ZEROFILL NULL,
  `user_rate` INT(10) NULL,
  `account_id` INT NOT NULL,

  `user_refer_type` ENUM('l', 'r', 'g') NOT NULL DEFAULT 'g',
  `password_reset_token` VARCHAR(32) NULL DEFAULT NULL,
  `password_reset_token_ts` TIMESTAMP NULL DEFAULT NULL,
  `user_data_filled` BOOL NOT NULL DEFAULT FALSE,
  `email_confirm_token` VARCHAR(32) NULL DEFAULT NULL,

  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_login_UNIQUE` (`user_login` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC),
  UNIQUE INDEX `user_phone_UNIQUE` (`user_phone` ASC),
  INDEX `role_idx` (`role_id` ASC),
  INDEX `refer_idx` (`user_refer` ASC),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC),
  CONSTRAINT `role`
    FOREIGN KEY (`role_id`)
    REFERENCES `mlm_db`.`roles` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `refer`
    FOREIGN KEY (`user_refer`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `money`
    FOREIGN KEY (`account_id`)
    REFERENCES `mlm_db`.`accounts` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mlm_db`.`users_sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`users_sessions` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`users_sessions` (
  `user_id` INT NOT NULL,
  `token` VARCHAR(32) NOT NULL,
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  CONSTRAINT `user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
