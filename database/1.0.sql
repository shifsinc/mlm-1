-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC),
  UNIQUE INDEX `role_id_UNIQUE` (`role_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mlm_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mlm_db`.`users` ;

CREATE TABLE IF NOT EXISTS `mlm_db`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_login` VARCHAR(45) NOT NULL,
  `user_password_hash` VARCHAR(65) NOT NULL,
  `user_name` VARCHAR(45) NULL,
  `user_full_name` VARCHAR(45) NULL,
  `user_status` INT NOT NULL,
  `user_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` INT NOT NULL DEFAULT 2,
  `user_refer` VARCHAR(65) NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_phone` INT(13) NULL,
  `user_social` VARCHAR(45) NULL,
  `user_telegram` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_login_UNIQUE` (`user_login` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  INDEX `role_idx` (`role_id` ASC),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC),
  UNIQUE INDEX `user_phone_UNIQUE` (`user_phone` ASC),
  CONSTRAINT `role`
    FOREIGN KEY (`role_id`)
    REFERENCES `mlm_db`.`roles` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


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

COMMIT;


-- -----------------------------------------------------
-- Data for table `mlm_db`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `mlm_db`;
INSERT INTO `mlm_db`.`users` (`user_id`, `user_login`, `user_password_hash`, `user_name`, `user_full_name`, `user_status`, `user_dt`, `role_id`, `user_refer`, `user_email`, `user_phone`, `user_social`, `user_telegram`) VALUES (1, 'root', 'qwerty12345', 'root', 'root', 1, '2018-08-08 00:00', 1, NULL, 'example@email.com', NULL, NULL, NULL);

COMMIT;

