CREATE DATABASE  IF NOT EXISTS `bebidasonline` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bebidasonline`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: bebidasonline
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `idcategoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Gaseosa'),(2,'Alcohol'),(3,'Agua'),(4,'Soda'),(5,'Jugo'),(6,'Energetica');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `idcliente` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `fecha_nac` date NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `celular` bigint unsigned NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idcliente`),
  UNIQUE KEY `dni_UNIQUE` (`dni`),
  UNIQUE KEY `celular_UNIQUE` (`celular`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Juan Pérez','250000','1990-01-01','juanperez@gmail.com',3851234567,'Calle 123, Santiago del Estero','abc123','2024-02-23 12:52:21','2024-02-23 12:52:21'),(2,'María Gómez','280000','1985-02-15','mariagomez@gmail.com',3852345678,'Avenida 456, Santiago del Estero','xyz456','2024-02-23 12:52:49','2024-02-23 12:52:49'),(3,'Carlos Rodríguez','310000','1988-05-20','carlosrodriguez@gmail.com',3853456789,'Calle 789, Santiago del Estero','123abc','2024-02-23 12:52:49','2024-02-23 12:52:49'),(4,'Laura Martínez','340000','1992-09-10','lauramartinez@gmail.com',3854567890,'Avenida 1011, Santiago del Estero','456xyz','2024-02-23 12:52:49','2024-02-23 12:52:49'),(5,'Pedro Sánchez','370000','1983-11-30','pedrosanchez@gmail.com',3855678901,'Calle 1213, Santiago del Estero','789abc','2024-02-23 12:52:49','2024-02-23 12:52:49'),(6,'Ana López','400000','1995-04-25','analopez@gmail.com',3856789012,'Avenida 1415, Santiago del Estero','abc456','2024-02-23 12:52:49','2024-02-23 12:52:49'),(7,'Gabriel González','430000','1987-08-08','gabrielgonzalez@gmail.com',3857890123,'Calle 1617, Santiago del Estero','xyz123','2024-02-23 12:52:49','2024-02-23 12:52:49'),(8,'Lucía Díaz','460000','1998-03-12','luciadiaz@gmail.com',3858901234,'Avenida 1819, Santiago del Estero','123xyz','2024-02-23 12:52:49','2024-02-23 12:52:49'),(9,'Javier Herrera','490000','1980-06-18','javierherrera@gmail.com',3859012345,'Calle 2021, Santiago del Estero','456abc','2024-02-23 12:52:49','2024-02-23 12:52:49'),(10,'Martina Fernández','420000','1993-12-05','martinafernandez@gmail.com',3850123456,'Avenida 2223, Santiago del Estero','789xyz','2024-02-23 12:53:15','2024-02-23 12:53:15'),(14,'Atilio Maximiliano, Coronel','34994102','1990-01-09','maxi-935@hotmail.com',3855360160,'Rio Jordan N° 1486','$2a$10$D9hlQJyQgYxVDtfHhiCjzO7GB45J5DoRD6C9cxwZ.OwSJp9wJv7.a','2024-03-03 12:36:57','2024-03-03 12:36:57');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `idpedido` int unsigned NOT NULL AUTO_INCREMENT,
  `estado` varchar(45) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fk_idcliente` int unsigned DEFAULT NULL,
  `cantidad` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idpedido`),
  KEY `fk_idcliente` (`fk_idcliente`),
  CONSTRAINT `fk_idcliente` FOREIGN KEY (`fk_idcliente`) REFERENCES `clientes` (`idcliente`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',1,3),(2,'Entregado','2024-02-23 13:34:50','2024-02-23 13:34:50',2,2),(3,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',3,1),(4,'Entregado','2024-02-23 13:34:50','2024-02-23 13:34:50',4,1),(5,'Cancelado','2024-02-23 13:34:50','2024-02-23 13:34:50',5,4),(6,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',6,1),(7,'Entregado','2024-02-23 13:34:50','2024-02-23 13:34:50',7,2),(8,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',8,5),(9,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',9,3),(10,'Entregado','2024-02-23 13:34:50','2024-02-23 13:34:50',8,2),(11,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',1,3),(12,'Entregado','2024-02-23 13:34:50','2024-02-23 13:34:50',2,2),(13,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',3,1),(14,'Entregado','2024-02-23 13:34:50','2024-02-23 13:34:50',4,1),(15,'Cancelado','2024-02-23 13:34:50','2024-02-23 13:34:50',5,4),(16,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',6,1),(17,'Entregado','2024-02-23 13:34:50','2024-02-23 13:34:50',7,2),(18,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',8,5),(19,'En proceso','2024-02-23 13:34:50','2024-02-23 13:34:50',9,3),(20,'Entregado','2024-02-23 13:35:19','2024-02-23 13:35:19',10,2);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idproducto` int unsigned NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `volumen` decimal(10,3) unsigned NOT NULL,
  `disponibilidad` int unsigned DEFAULT NULL,
  `precio` decimal(10,2) unsigned NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fk_idpedido` int unsigned DEFAULT NULL,
  `fk_idcategoria` int DEFAULT NULL,
  PRIMARY KEY (`idproducto`),
  KEY `fk_idpedido` (`fk_idpedido`),
  KEY `fk_idcategoria` (`fk_idcategoria`),
  CONSTRAINT `fk_idcategoria` FOREIGN KEY (`fk_idcategoria`) REFERENCES `categorias` (`idcategoria`),
  CONSTRAINT `fk_idpedido` FOREIGN KEY (`fk_idpedido`) REFERENCES `pedidos` (`idpedido`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES 
(2,'Coca-Cola','Refresco de cola',2.000,100,2.50,'1709210411791_img.png','2024-02-23 13:59:49','2024-03-01 22:35:57',1,1),
(3,'Pepsi','Refresco de cola',1.500,80,2.00,'1709210361768_img.png','2024-02-23 13:59:49','2024-03-01 22:35:57',2,1),
(4,'Jack Daniel\'s','Whisky Tennessee',1.000,20,45.00,'1709210533251_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',3,2),
(5,'Absolut','Vodka',0.700,30,20.00,'1709210624634_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',4,2),
(6,'Agua Mineral','Agua sin gas',0.500,120,1.00,'1709210822258_img.png','2024-02-23 13:59:49','2024-03-01 22:42:17',5,3),
(7,'Corona','Cerveza',0.330,50,3.50,'1709210921441_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',6,2),
(8,'Red Bull','Bebida energética',0.250,40,3.00,'1709211014698_img.png','2024-02-23 13:59:49','2024-03-01 22:44:45',7,6),
(9,'Mojito','Cóctel de ron y menta',0.300,25,8.00,'1709211189689_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',8,2),
(10,'Vino Tinto','Vino tinto seco',0.750,15,12.00,'1709211286618_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',9,2),
(11,'Sprite','Refresco de limón-lima',2.000,90,2.30,'1709211426226_img.png','2024-02-23 13:59:49','2024-03-01 22:35:57',10,1),
(12,'Heineken','Cerveza',0.330,60,3.00,'1709211515923_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',11,2),
(13,'Tequila','Tequila añejo',0.750,25,25.00,'1709211598905_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',12,2),
(14,'Gin Tonic','Cóctel de ginebra y tónica',0.500,30,10.00,'1709211886881_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',13,2),
(15,'Agua con gas','Agua con burbujas',0.500,100,1.50,'1709211976569_img.png','2024-02-23 13:59:49','2024-03-01 22:43:33',14,4),
(16,'Fernet Branca','Licor de hierbas',0.750,20,15.00,'1709212050761_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',15,2),
(17,'Margarita','Cóctel de tequila y limón',0.300,25,8.50,'1709212205705_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',16,2),
(18,'Vino Blanco','Vino blanco seco',0.750,18,14.00,'1709212366406_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',17,2),
(19,'Pepsi Light','Refresco de cola light',1.500,70,2.20,'1709212456626_img.png','2024-02-23 13:59:49','2024-03-01 22:35:57',18,1),
(20,'Tequila Patron','Tequila premium',0.750,15,40.00,'1709212539223_img.png','2024-02-23 13:59:49','2024-03-01 22:40:25',19,2),
(21,'Tónica','Agua tónica',0.500,80,2.50,'1709212622418_img.png','2024-02-23 14:00:09','2024-03-01 22:35:57',20,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-03 23:38:21
