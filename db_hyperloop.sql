DROP DATABASE IF EXISTS db_hyperloop;

CREATE DATABASE IF NOT EXISTS db_hyperloop;

CREATE TABLE IF NOT EXISTS `users` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`first_name` VARCHAR(150) NOT NULL,
	`last_name` VARCHAR(150) NOT NULL,
	`login` VARCHAR(150) NOT NULL,
	`password` VARCHAR(150) NOT NULL,
	`email` VARCHAR(150) NOT NULL,
	`avatar` INT NOT NULL,
);

CREATE TABLE IF NOT EXISTS `views` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`login` VARCHAR(150) NOT NULL,
);

CREATE TABLE IF NOT EXISTS `favoris` (
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`login` VARCHAR(150) NOT NULL,
	`favoris` INT NOT NULL,
);

-- Create ADMIN account
INSERT INTO `users` (`id`, `first_name`, `last_name`, `login`, `password`, `email`, `avatar`, `code_check`) VALUES ('1', 'admin', 'admin', 'admin', 'Qwerty123', 'marferna@student.42.fr', '1.jpg', '1');
