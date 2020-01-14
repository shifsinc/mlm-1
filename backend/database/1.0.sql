SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema yodafxpr_mlm_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `yodafxpr_mlm_db` ;

-- -----------------------------------------------------
-- Schema yodafxpr_mlm_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `yodafxpr_mlm_db` DEFAULT CHARACTER SET utf8 ;
USE `yodafxpr_mlm_db` ;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`roles` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`roles` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC),
  UNIQUE INDEX `role_id_UNIQUE` (`role_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`sessions` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`sessions` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`token`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  CONSTRAINT `user`
    FOREIGN KEY (`user_id`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`users` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_login` VARCHAR(30) NOT NULL,
  `user_password_hash` VARCHAR(65) NOT NULL,
  `user_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` INT(11) NOT NULL DEFAULT '2',
  `user_blocked` BOOL NOT NULL DEFAULT '0',
  `user_refer` INT(11) NULL DEFAULT NULL,
  `user_refer_type` ENUM('l', 'r') NULL DEFAULT NULL,
  `user_name` VARCHAR(40) NULL DEFAULT NULL,
  `user_surname` VARCHAR(40) NULL DEFAULT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_phone` VARCHAR(16) NULL DEFAULT NULL,
  `user_social` VARCHAR(45) NULL DEFAULT NULL,
  `user_telegram` VARCHAR(64) NULL DEFAULT NULL,
  `user_photo` VARCHAR(45) NULL DEFAULT 'noPhoto.png',
  `user_status` ENUM('investor', 'bronze', 'silver', 'gold', 'platinum', 'sapphire', 'emerald', 'diamond', 'diamond2') NOT NULL DEFAULT 'investor',
  `user_rate` ENUM('client', 'light', 'advanced', 'master') NULL DEFAULT NULL,
  `user_rate_ts` TIMESTAMP NULL DEFAULT NULL,
  `user_rate_first` BOOL NULL DEFAULT NULL,
  `password_reset_token` VARCHAR(32) NULL DEFAULT NULL,
  `password_reset_token_ts` TIMESTAMP(6) NULL DEFAULT NULL,
  `user_data_filled` TINYINT(4) NOT NULL DEFAULT '0',
  `user_start_work` TINYINT(4) NOT NULL DEFAULT '0',
  `email_confirm_token` VARCHAR(32) NULL DEFAULT NULL,
  `general_link_type` ENUM('l', 'r') NOT NULL DEFAULT 'l',
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `user_login_UNIQUE` (`user_login` ASC),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC),
  UNIQUE INDEX `user_phone_UNIQUE` (`user_phone` ASC),
  INDEX `role_idx` (`role_id` ASC),
  INDEX `refer_idx` (`user_refer` ASC),
  CONSTRAINT `refer`
    FOREIGN KEY (`user_refer`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `role`
    FOREIGN KEY (`role_id`)
    REFERENCES `yodafxpr_mlm_db`.`roles` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`users_stats`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`users_stats` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`users_stats` (
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
  `stats_yt_sum_left` DOUBLE NOT NULL DEFAULT '0',
  `stats_yt_sum_right` DOUBLE NOT NULL DEFAULT '0',
  `stats_binary_cycles` INT(11) NOT NULL DEFAULT '0',
  `stats_purchase_sum` INT(11) NOT NULL DEFAULT '0',
  `stats_day_profit` DOUBLE NOT NULL DEFAULT '0',
  `stats_day_profit_ts` TIMESTAMP NULL DEFAULT NULL,
  `stats_total_profit` DOUBLE NOT NULL DEFAULT '0',
  PRIMARY KEY (`stats_id`),
  UNIQUE INDEX `stats_id_UNIQUE` (`stats_id` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  CONSTRAINT `user_fk0`
    FOREIGN KEY (`user_id`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`users_bonuses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`users_bonuses` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`users_bonuses` (
  `bonus_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `bonus_linear` INT(11) NOT NULL DEFAULT '0',
  `bonus_binary` INT(11) NOT NULL DEFAULT '0',
  `bonus_match` INT(11) NOT NULL DEFAULT '0',
  `bonus_lead` INT(11) NOT NULL DEFAULT '0',
  `bonus_lead_counter` INT(11) NOT NULL DEFAULT '0',
  `bonus_lead_counter_initial` INT(11) NOT NULL DEFAULT '0',
  `bonus_extra` INT(11) NOT NULL DEFAULT '0',
  `bonus_extra_counter` INT(11) NOT NULL DEFAULT '0',
  `bonus_start_reached` INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`bonus_id`),
  UNIQUE INDEX `bonus_id_UNIQUE` (`bonus_id` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  CONSTRAINT `user_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`users_tree_status_counter`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`users_tree_status_counter` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`users_tree_status_counter` (
  `counter_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `counter_status` ENUM('investor', 'bronze', 'silver', 'gold', 'platinum', 'sapphire', 'emerald', 'diamond', 'diamond2') NOT NULL,
  `counter_value` INT(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`counter_id`),
  UNIQUE INDEX `counter_id_UNIQUE` (`counter_id` ASC),
  CONSTRAINT `user_fk3`
    FOREIGN KEY (`user_id`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `user_idx` (`user_id`),
  INDEX `counter_status_idx` (`counter_status`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`accounts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`accounts` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`accounts` (
  `account_id` INT(11) NOT NULL AUTO_INCREMENT,
  `account_owner` INT(11) NOT NULL,
  `account_balance` DOUBLE NOT NULL DEFAULT '0',
  `account_balance_reserved` DOUBLE NOT NULL DEFAULT '0',
  `account_withdraws` DOUBLE NOT NULL DEFAULT '0',
  `account_last_payment_ts` TIMESTAMP NULL DEFAULT NULL,
  `account_ethereum` VARCHAR(64) NULL DEFAULT NULL,
  `account_paypal` VARCHAR(64) NULL DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE INDEX `account_id_UNIQUE` (`account_id` ASC),
  UNIQUE INDEX `owner_id_UNIQUE` (`account_owner` ASC),
  CONSTRAINT `owner_fk`
    FOREIGN KEY (`account_owner`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`money_rate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`money_rate` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`money_rate` (
  `rate_eth` DOUBLE NOT NULL,
  `rate_usd` DOUBLE NOT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`transactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`transactions` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`transactions` (
  `tr_id` INT NOT NULL AUTO_INCREMENT,
  `tr_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    REFERENCES `yodafxpr_mlm_db`.`accounts` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `receiver`
    FOREIGN KEY (`tr_receiver_id`)
    REFERENCES `yodafxpr_mlm_db`.`accounts` (`account_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `sender_idx` (`tr_sender_id`),
  INDEX `receiver_idx` (`tr_receiver_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`news`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`news` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`news` (
  `news_id` INT NOT NULL AUTO_INCREMENT,
  `news_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `news_title` VARCHAR(64) NULL,
  `news_text` TEXT(4000) NULL,
  `news_author` INT(11) NOT NULL,
  `news_rate` ENUM('client', 'light', 'advanced', 'master') NULL DEFAULT NULL,
  `news_type` ENUM('news', 'blog', 'robot_update') NOT NULL DEFAULT 'news',
  PRIMARY KEY (`news_id`),
  UNIQUE INDEX `news_id_UNIQUE` (`news_id` ASC),
  INDEX `author_idx` (`news_author` ASC),
  CONSTRAINT `author`
    FOREIGN KEY (`news_author`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`files`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`files` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`files` (
  `file_id` INT NOT NULL AUTO_INCREMENT,
  `file_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `file_author` INT(11) NOT NULL,
  `file_type` VARCHAR(16) NOT NULL DEFAULT 'file',
  `file_title` VARCHAR(64) NULL,
  `file_descr` VARCHAR(16384) NULL,
  `file_rate` ENUM('client', 'light', 'advanced', 'master') NULL DEFAULT NULL,
  `file_section` ENUM('marketing', 'instructions', 'videos', 'robot', 'news_image', 'news_video') NOT NULL,
  `file_fk` INT(11) NULL,
  `file_name` VARCHAR(48) NULL,
  PRIMARY KEY (`file_id`),
  UNIQUE INDEX `file_id_UNIQUE` (`file_id` ASC),
  INDEX `author_idx` (`file_author` ASC),
  INDEX `section` (`file_section`),
  CONSTRAINT `author_fk`
    FOREIGN KEY (`file_author`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`robot_keys`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`robot_keys` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`robot_keys` (
  `key_id` INT NOT NULL AUTO_INCREMENT,
  `key_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT(11) NOT NULL,
  `key_rate` ENUM('client', 'light', 'advanced', 'master') NOT NULL,
  `key_account` INT(11) NOT NULL,
  `key_max_deposit` INT(11) NOT NULL,
  `key_valid_dt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`key_id`),
  UNIQUE INDEX `key_id_UNIQUE` (`key_id` ASC),
  INDEX `user_idx` (`user_id` ASC),
  CONSTRAINT `user_fk1`
    FOREIGN KEY (`user_id`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `yodafxpr_mlm_db`.`events`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `yodafxpr_mlm_db`.`events` ;

CREATE TABLE IF NOT EXISTS `yodafxpr_mlm_db`.`events` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `tr_id` INT(11) NULL DEFAULT NULL,
  `event_dt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `event_type` ENUM('payment', 'withdraw', 'new_status', 'bonus_start') NOT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE INDEX `event_id_UNIQUE` (`event_id` ASC),
  CONSTRAINT `user_id_fk2`
    FOREIGN KEY (`user_id`)
    REFERENCES `yodafxpr_mlm_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `tr_id_fk`
    FOREIGN KEY (`tr_id`)
    REFERENCES `yodafxpr_mlm_db`.`transactions` (`tr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



USE `yodafxpr_mlm_db`;
DELIMITER $$

/*stats_first_line_referals, stats_second_line_referals, stats_left_referals, stats_right_referals*/
DROP TRIGGER IF EXISTS `yodafxpr_mlm_db`.`users_AFTER_INSERT` $$
CREATE DEFINER = CURRENT_USER TRIGGER `yodafxpr_mlm_db`.`users_AFTER_INSERT` AFTER INSERT ON `users` FOR EACH ROW
BEGIN
  INSERT INTO accounts(account_owner) VALUES(new.user_id);
  INSERT INTO users_bonuses(user_id) VALUES(new.user_id);
  INSERT INTO users_stats(user_id) VALUES(new.user_id);
  INSERT INTO users_tree_status_counter(user_id, counter_status) VALUES(new.user_id, 'investor'),(new.user_id, 'bronze'),(new.user_id, 'silver'),(new.user_id, 'gold'),(new.user_id, 'platinum'),(new.user_id, 'sapphire'),(new.user_id, 'emerald'),(new.user_id, 'diamond'),(new.user_id, 'diamond2');

	IF(new.user_refer) THEN
    SET @refer = new.user_refer;
    SET @refer_type = new.user_refer_type;

    IF(@refer_type ='l') THEN
		UPDATE users_stats SET
        	stats_first_line_referals=stats_first_line_referals+1,
        	stats_left_referals=stats_left_referals+1
       	WHERE user_id=@refer;
    END IF;
    IF(@refer_type = 'r') THEN
    	UPDATE users_stats SET
        	stats_first_line_referals=stats_first_line_referals+1,
        	stats_right_referals=stats_right_referals+1
       	WHERE user_id=@refer;
    END IF;

    SET @refer_type = (SELECT user_refer_type FROM users WHERE user_id=@refer);
    SET @refer = (SELECT user_refer FROM users WHERE user_id=@refer);

    WHILE @refer IS NOT NULL DO

        IF(@refer_type = 'l') THEN
			UPDATE users_stats SET
       		 	stats_second_line_referals=stats_second_line_referals+1,
        		stats_left_referals=stats_left_referals+1
       		WHERE user_id=@refer;
    	END IF;
        IF(@refer_type = 'r') THEN
    		UPDATE users_stats SET
        		stats_second_line_referals=stats_second_line_referals+1,
       	 	stats_right_referals=stats_right_referals+1
      	 	WHERE user_id=@refer;
        END IF;

		SET @refer_type = (SELECT user_refer_type FROM users WHERE user_id=@refer);
    	SET @refer = (SELECT user_refer FROM users WHERE user_id=@refer);
    END WHILE;

    END IF;
END$$


/*stats_first_line_active_referals, stats_second_line_active_referals, bonus_lead_counter*/
DROP TRIGGER IF EXISTS `yodafxpr_mlm_db`.`users_AFTER_UPDATE` $$
CREATE DEFINER = CURRENT_USER TRIGGER `yodafxpr_mlm_db`.`users_AFTER_UPDATE` AFTER UPDATE ON `users` FOR EACH ROW
BEGIN
  IF(new.user_rate IS NOT NULL && old.user_rate IS NULL) THEN
    UPDATE users_stats SET stats_first_line_active_referals=stats_first_line_active_referals+1 WHERE user_id=new.user_refer;
    SET @user_id = (SELECT user_refer FROM users WHERE user_id=new.user_refer);

    WHILE @user_id IS NOT NULL DO

      UPDATE users_stats SET stats_second_line_active_referals=stats_second_line_active_referals+1 WHERE user_id=@user_id;
      SET @user_id = (SELECT user_refer FROM users WHERE user_id=@user_id);

    END WHILE;
  END IF;

  IF(new.user_status <> old.user_status) THEN
    SET @new_status = new.user_status;
    SET @old_status = old.user_status;
    SET @user_id = new.user_id;
    SET @user_status = new.user_status;

    WHILE @user_id IS NOT NULL DO
      IF( @user_id <> new.user_id ) THEN
        UPDATE users_tree_status_counter SET counter_value=counter_value+1 WHERE user_id=@user_id AND counter_status=@new_status;
        UPDATE users_tree_status_counter SET counter_value=counter_value-1 WHERE user_id=@user_id AND counter_status=@old_status;
      END IF;

      SET @ref_status = NULL;
      IF(@user_status = "gold") THEN
        SET @counter = 40;
      ELSEIF(@user_status = "platinum") THEN
        SET @counter = 100;
        SET @ref_status = "gold";
      ELSEIF(@user_status = "sapphire") THEN
        SET @counter = 250;
        SET @ref_status = "platinum";
      ELSEIF(@user_status = "diamond") THEN
        SET @counter = 600;
        SET @ref_status = "sapphire";
      ELSE SET @counter = 0;
      END IF;

      SET @fl = 1;
      IF( @ref_status IS NOT NULL ) THEN

        SET @ref_count = (SELECT counter_value FROM users_tree_status_counter WHERE user_id=@user_id AND counter_status=@ref_status LIMIT 1);
        SET @direct_ref = (SELECT COUNT(*) FROM users WHERE user_refer=@user_id AND user_status=@ref_status);
        IF( @ref_count < 2 || @direct_ref = 0 ) THEN
          SET @fl = 0;
        END IF;

      END IF;

      IF( @fl = 1 ) THEN
        SET @counter_init = (SELECT bonus_lead_counter_initial FROM users_bonuses WHERE user_id=@user_id);
        IF( @counter_init <> @counter ) THEN
          UPDATE users_bonuses SET bonus_lead_counter=@counter, bonus_lead_counter_initial=@counter WHERE user_id=@user_id;
        END IF;
      END IF;

      SET @user_id = (SELECT user_refer FROM users WHERE user_id=@user_id);
      SET @user_status = (SELECT user_status FROM users WHERE user_id=@user_id);
    END WHILE;

  END IF;
END$$


/*bonus_lead_counter*/
DROP TRIGGER IF EXISTS `yodafxpr_mlm_db`.`users_AFTER_INSERT_bonus_lead` $$
CREATE DEFINER = CURRENT_USER TRIGGER `yodafxpr_mlm_db`.`users_AFTER_INSERT_bonus_lead` AFTER INSERT ON `users` FOR EACH ROW
BEGIN
  SET @new_status = new.user_status;
  SET @user_id = new.user_id;
  SET @user_status = new.user_status;

  WHILE @user_id IS NOT NULL DO
    IF( @user_id <> new.user_id ) THEN
      UPDATE users_tree_status_counter SET counter_value=counter_value+1 WHERE user_id=@user_id AND counter_status=@new_status;
    END IF;

    SET @ref_status = NULL;
    IF(@user_status = "gold") THEN
      SET @counter = 40;
    ELSEIF(@user_status = "platinum") THEN
      SET @counter = 100;
      SET @ref_status = "gold";
    ELSEIF(@user_status = "sapphire") THEN
      SET @counter = 250;
      SET @ref_status = "platinum";
    ELSEIF(@user_status = "diamond") THEN
      SET @counter = 600;
      SET @ref_status = "sapphire";
    ELSE SET @counter = 0;
    END IF;

    SET @fl = 1;
    IF( @ref_status IS NOT NULL ) THEN

      SET @ref_count = (SELECT counter_value FROM users_tree_status_counter WHERE user_id=@user_id AND counter_status=@ref_status LIMIT 1);
      SET @direct_ref = (SELECT COUNT(*) FROM users WHERE user_refer=@user_id AND user_status=@ref_status);
      IF( @ref_count < 2 || @direct_ref = 0 ) THEN
        SET @fl = 0;
      END IF;

    END IF;

    IF( @fl = 1 ) THEN
      SET @counter_init = (SELECT bonus_lead_counter_initial FROM users_bonuses WHERE user_id=@user_id);
      IF( @counter_init <> @counter ) THEN
        UPDATE users_bonuses SET bonus_lead_counter=@counter, bonus_lead_counter_initial=@counter WHERE user_id=@user_id;
      END IF;
    END IF;

    SET @user_id = (SELECT user_refer FROM users WHERE user_id=@user_id);
    SET @user_status = (SELECT user_status FROM users WHERE user_id=@user_id);
  END WHILE;

END$$


/*internal transaction, out transaction*/
DROP TRIGGER IF EXISTS `yodafxpr_mlm_db`.`transactions_BEFORE_INSERT` $$
CREATE DEFINER = CURRENT_USER TRIGGER `yodafxpr_mlm_db`.`transactions_BEFORE_INSERT` BEFORE INSERT ON `transactions` FOR EACH ROW
BEGIN
  IF(new.tr_type = 'internal') THEN

    SET @sender_balance = (SELECT account_balance FROM accounts WHERE account_id=new.tr_sender_id);
    IF( @sender_balance < new.tr_platform_amount  ) THEN
      SET new.tr_status = 'rejected';
    ELSE
      UPDATE accounts SET account_balance=account_balance-new.tr_platform_amount WHERE account_id=new.tr_sender_id;
      UPDATE accounts SET account_balance=account_balance+new.tr_platform_amount WHERE account_id=new.tr_receiver_id;
      SET new.tr_status = 'ok';
    END IF;

  ELSEIF(new.tr_type = "out") THEN

    SET @rec_balance = (SELECT account_balance FROM accounts WHERE account_id=new.tr_receiver_id);
    IF( @rec_balance < new.tr_platform_amount  ) THEN
      SET new.tr_status = 'rejected';
    ELSE
      UPDATE accounts SET
        account_balance_reserved=account_balance_reserved+new.tr_platform_amount,
        account_balance=account_balance-new.tr_platform_amount
        WHERE account_id=new.tr_receiver_id;
    END IF;

  END IF;
END$$

/*event payment, event withdraw*/
DROP TRIGGER IF EXISTS `yodafxpr_mlm_db`.`transactions_AFTER_INSERT` $$
CREATE DEFINER = CURRENT_USER TRIGGER `yodafxpr_mlm_db`.`transactions_AFTER_INSERT` AFTER INSERT ON `transactions` FOR EACH ROW
BEGIN
  SET @user_id = (SELECT account_owner FROM accounts WHERE account_id=new.tr_receiver_id);
  IF(new.tr_type = "in") THEN
    INSERT INTO events(user_id, tr_id, event_type) VALUES(@user_id, new.tr_id, 'payment');
  ELSEIF(new.tr_type = "out") THEN
      INSERT INTO events(user_id, tr_id, event_type) VALUES(@user_id, new.tr_id, 'withdraw');
  END IF;
END$$


/*transaction change status from 'wait' to 'ok'*/
DROP TRIGGER IF EXISTS `yodafxpr_mlm_db`.`transactions_BEFORE_UPDATE` $$
CREATE DEFINER = CURRENT_USER TRIGGER `yodafxpr_mlm_db`.`transactions_BEFORE_UPDATE` BEFORE UPDATE ON `transactions` FOR EACH ROW
BEGIN
  IF(old.tr_status = "wait" && new.tr_status = "ok") THEN
    IF(new.tr_type = "in") THEN
      UPDATE accounts SET
        account_balance=account_balance+new.tr_platform_amount,
        account_last_payment_ts=CURRENT_TIMESTAMP
      WHERE account_id=new.tr_receiver_id;
    ELSEIF(new.tr_type = "out") THEN
      SET @reserved_balance = (SELECT account_balance_reserved FROM accounts WHERE account_id=new.tr_receiver_id);
      IF( @reserved_balance < new.tr_platform_amount ) THEN
        SET new.tr_status = 'rejected';
      ELSE
        UPDATE accounts SET
          account_balance_reserved=account_balance_reserved-new.tr_platform_amount,
          account_withdraws=account_withdraws+new.tr_platform_amount
        WHERE account_id=new.tr_receiver_id;
      END IF;
    END IF;
  END IF;
  IF(old.tr_status = "wait" && new.tr_status = "rejected") THEN
    IF( new.tr_type = "out" ) THEN
    UPDATE accounts SET
      account_balance_reserved=account_balance_reserved-new.tr_platform_amount,
      account_balance=account_balance+new.tr_platform_amount
      WHERE account_id=new.tr_receiver_id;
    END IF;
  END IF;
END$$


/*stats_day_profit*/
DROP TRIGGER IF EXISTS `yodafxpr_mlm_db`.`accounts_AFTER_UPDATE` $$
CREATE DEFINER = CURRENT_USER TRIGGER `yodafxpr_mlm_db`.`accounts_AFTER_UPDATE` AFTER UPDATE ON `accounts` FOR EACH ROW
BEGIN
  IF(new.account_balance > old.account_balance) THEN

    SET @profit = new.account_balance - old.account_balance;
    SET @today = (SELECT user_id FROM users_stats WHERE DATE(stats_day_profit_ts)=CURDATE() AND user_id=new.account_owner);
    IF(@today IS NULL) THEN
      UPDATE users_stats SET
        stats_day_profit=@profit, stats_day_profit_ts=CURRENT_TIMESTAMP,
        stats_total_profit=stats_total_profit+@profit
        WHERE user_id=new.account_owner;
    ELSE
      UPDATE users_stats SET
        stats_day_profit=stats_day_profit+@profit, stats_day_profit_ts=CURRENT_TIMESTAMP,
        stats_total_profit=stats_total_profit+@profit
        WHERE user_id=new.account_owner;
    END IF;

  END IF;
END$$



DROP FUNCTION IF EXISTS `yodafxpr_mlm_db`.`calc_user_status` $$
CREATE FUNCTION `calc_user_status`( rate INT(11), cycles INT(11) )
RETURNS INT
BEGIN
  IF(cycles >= 6000 && rate >= 4) THEN
    RETURN 9;
  ELSEIF(cycles >= 2000 && rate >= 4) THEN
    RETURN 8;
  ELSEIF(cycles >= 1000 && rate >= 4) THEN
    RETURN 7;
  ELSEIF(cycles >= 500 && rate >= 4) THEN
    RETURN 6;
  ELSEIF(cycles >= 250 && rate >= 3) THEN
    RETURN 5;
  ELSEIF(cycles >= 100 && rate >= 3) THEN
    RETURN 4;
  ELSEIF(cycles >= 25 && rate >= 2) THEN
    RETURN 3;
  ELSEIF(cycles >= 5 && rate >= 2) THEN
    RETURN 2;
  ELSE RETURN 1;
  END IF;
END$$


/*user_status*/
DROP TRIGGER IF EXISTS `yodafxpr_mlm_db`.`users_stats_BEFORE_UPDATE` $$
CREATE DEFINER = CURRENT_USER TRIGGER `yodafxpr_mlm_db`.`users_stats_BEFORE_UPDATE` BEFORE UPDATE ON `users_stats` FOR EACH ROW
BEGIN
  IF(new.stats_binary_cycles <> old.stats_binary_cycles) THEN
    SET @rate = (SELECT user_rate+0 FROM users WHERE user_id=new.user_id);
    SET @status = calc_user_status( @rate, new.stats_binary_cycles );
    UPDATE users SET user_status=@status WHERE user_id=new.user_id;
  END IF;
END$$


/*user_rate_ts, user_status, bonus_start_reached, event new_status*/
DROP TRIGGER IF EXISTS `yodafxpr_mlm_db`.`users_BEFORE_UPDATE` $$
CREATE DEFINER = CURRENT_USER TRIGGER `yodafxpr_mlm_db`.`users_BEFORE_UPDATE` BEFORE UPDATE ON `users` FOR EACH ROW
BEGIN
  IF( old.user_status <> new.user_status ) THEN
    INSERT INTO events(user_id, event_type) VALUES(new.user_id, 'new_status');
  END IF;
  IF( old.user_rate IS NULL && new.user_rate IS NOT NULL ) THEN
    SET new.user_rate_first=1;
  ELSE SET new.user_rate_first=0;
  END IF;
  IF(new.user_rate <> old.user_rate || ( old.user_rate IS NULL && new.user_rate IS NOT NULL )) THEN
    UPDATE users_bonuses SET bonus_start_reached=0 WHERE user_id=new.user_id;
    SET new.user_rate_ts=CURRENT_TIMESTAMP;

    SET @cycles = (SELECT stats_binary_cycles FROM users_stats WHERE user_id=new.user_id);
    SET new.user_status = calc_user_status(new.user_rate, @cycles);
  END IF;
END$$



DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `yodafxpr_mlm_db`.`roles`
-- -----------------------------------------------------
START TRANSACTION;
USE `yodafxpr_mlm_db`;
INSERT INTO `yodafxpr_mlm_db`.`roles` (`role_id`, `role_name`) VALUES (1, 'admin');
INSERT INTO `yodafxpr_mlm_db`.`roles` (`role_id`, `role_name`) VALUES (2, 'user');
INSERT INTO `yodafxpr_mlm_db`.`roles` (`role_id`, `role_name`) VALUES (3, 'guest');

COMMIT;


-- -----------------------------------------------------
-- Data for table `yodafxpr_mlm_db`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `yodafxpr_mlm_db`;
INSERT INTO `yodafxpr_mlm_db`.`users` (`user_id`, `user_login`, `user_password_hash`, `user_name`, `user_email`, `user_data_filled`) VALUES (1, 'root', md5('rootPass12345aA!'), 'root', 'root@email', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `yodafxpr_mlm_db`.`money_rate`
-- -----------------------------------------------------
START TRANSACTION;
USE `yodafxpr_mlm_db`;
INSERT INTO `yodafxpr_mlm_db`.`money_rate` (`rate_eth`, `rate_usd`) VALUES (1, 1);

COMMIT;
