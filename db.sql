-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: test_db
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `lens_id` char(36) DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_product_unique` (`user_id`,`product_id`,`lens_id`),
  CONSTRAINT `cart_product_quantity` CHECK ((`quantity` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `percentage` int NOT NULL,
  `max_limit` int NOT NULL,
  `code` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon`
--

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
INSERT INTO `coupon` VALUES ('f350f439-76ee-11ee-af93-f889d2b5c633',99,999999,'DBMS99'),('f350f67e-76ee-11ee-af93-f889d2b5c633',50,500,'SUPER50');
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lens`
--

DROP TABLE IF EXISTS `lens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lens` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` text NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lens`
--

LOCK TABLES `lens` WRITE;
/*!40000 ALTER TABLE `lens` DISABLE KEYS */;
INSERT INTO `lens` VALUES ('75ba1ecf-7630-11ee-a701-f889d2b5c633','No Lens','No Lens',0.00,'','Buy Only Frame','2023-10-29 13:25:00'),('75ba215e-7630-11ee-a701-f889d2b5c633','BLU Thin ZP','BLU',300.00,'','Blue Block, Double-Side Anti-Glare, Crack, Smudge & Scratch Resistant, Water & Dust Repellent, UV 420 - Protection','2023-10-29 13:25:00'),('75ba21bb-7630-11ee-a701-f889d2b5c633','AntiGlare Premium','AntiGlare',350.00,'','Double-Side Anti-Glare, Scratch Resistant','2023-10-29 13:25:00');
/*!40000 ALTER TABLE `lens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderDetails`
--

DROP TABLE IF EXISTS `orderDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderDetails` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `order_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `lens_id` char(36) DEFAULT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderDetails`
--

LOCK TABLES `orderDetails` WRITE;
/*!40000 ALTER TABLE `orderDetails` DISABLE KEYS */;
INSERT INTO `orderDetails` VALUES ('148be40b-76f9-11ee-af93-f889d2b5c633','148b894b-76f9-11ee-af93-f889d2b5c633','4bdee0f7-7530-11ee-bab4-f889d2b5c633',NULL,1),('148be609-76f9-11ee-af93-f889d2b5c633','148b894b-76f9-11ee-af93-f889d2b5c633','4bdeebea-7530-11ee-bab4-f889d2b5c633','75ba1ecf-7630-11ee-a701-f889d2b5c633',1),('148be683-76f9-11ee-af93-f889d2b5c633','148b894b-76f9-11ee-af93-f889d2b5c633','4bdeebea-7530-11ee-bab4-f889d2b5c633','75ba215e-7630-11ee-a701-f889d2b5c633',1),('148be6cf-76f9-11ee-af93-f889d2b5c633','148b894b-76f9-11ee-af93-f889d2b5c633','4bdef0a1-7530-11ee-bab4-f889d2b5c633',NULL,1),('ec126a14-76fd-11ee-af93-f889d2b5c633','ec11da4b-76fd-11ee-af93-f889d2b5c633','4bdee0f7-7530-11ee-bab4-f889d2b5c633',NULL,1),('ec126baa-76fd-11ee-af93-f889d2b5c633','ec11da4b-76fd-11ee-af93-f889d2b5c633','4bdeebea-7530-11ee-bab4-f889d2b5c633','75ba1ecf-7630-11ee-a701-f889d2b5c633',1),('ec126c30-76fd-11ee-af93-f889d2b5c633','ec11da4b-76fd-11ee-af93-f889d2b5c633','4bdeebea-7530-11ee-bab4-f889d2b5c633','75ba215e-7630-11ee-a701-f889d2b5c633',1),('ec126c78-76fd-11ee-af93-f889d2b5c633','ec11da4b-76fd-11ee-af93-f889d2b5c633','4bdef0a1-7530-11ee-bab4-f889d2b5c633',NULL,1);
/*!40000 ALTER TABLE `orderDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) NOT NULL,
  `amount` int NOT NULL,
  `address` text,
  `coupon_id` char(36) DEFAULT NULL,
  `razorpay_order_id` char(20) NOT NULL,
  `razorpay_payment_id` char(18) DEFAULT NULL,
  `razorpay_signature` char(64) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('148b894b-76f9-11ee-af93-f889d2b5c633','94b7dc9c-7647-11ee-a701-f889d2b5c633',1600,'bari','f350f439-76ee-11ee-af93-f889d2b5c633','order_MuLGvhzIHhwCbL',NULL,NULL,'2023-10-30 13:21:05'),('ec11da4b-76fd-11ee-af93-f889d2b5c633','94b7dc9c-7647-11ee-a701-f889d2b5c633',155800,'bari',NULL,'order_MuLrXs260SHgM9','pay_MuLrlKJkz4mvDi','212c48d4b1699c884e8d67396174b896a6ca1cc94061bbe743262a760a5e25fd','2023-10-30 13:55:45');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` text NOT NULL,
  `color` varchar(100) NOT NULL,
  `description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `product_type` enum('SUNGLASSES','GLASSES','CONTACTS') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('4bdee0f7-7530-11ee-bab4-f889d2b5c633','BLACK JONES UV400 Protective Sunglasses','Black Jones',563.36,'https://m.media-amazon.com/images/I/51IX7z5sNGL._UX679_.jpg','pink','BLACK JONES UV400 Protective Sunglasses for Women Stylish with Storage Box Glasses Cloth, Rimless Diamond Cutting Lens with Stone All color of Sunglasses for Driving Shades for Women.','2023-10-28 06:51:18','SUNGLASSES'),('4bdee570-7530-11ee-bab4-f889d2b5c633','BLACK JONES UV400 Protective Sunglasses','Black Jones',595.00,'https://m.media-amazon.com/images/I/51wxU-u2NNL._SX679._SX._UX._SY._UY_.jpg','brown','BLACK JONES UV400 Protective Sunglasses for Women Stylish with Storage Box Glasses Cloth, Rimless Diamond Cutting Lens with Stone All color of Sunglasses for Driving Shades for Women.','2023-10-28 06:51:18','SUNGLASSES'),('4bdee644-7530-11ee-bab4-f889d2b5c633','BLACK JONES UV400 Protective Sunglasses','Black Jones',599.00,'https://m.media-amazon.com/images/I/51yQb+X9VUL._SX679._SX._UX._SY._UY_.jpg','pink','BLACK JONES UV400 Protective Sunglasses for Women Stylish with Storage Box Glasses Cloth, Rimless Diamond Cutting Lens with Stone All color of Sunglasses for Driving Shades for Women.','2023-10-28 06:51:18','SUNGLASSES'),('4bdee69c-7530-11ee-bab4-f889d2b5c633','BLACK JONES UV400 Protective Sunglasses','Black Jones',5996.00,'https://m.media-amazon.com/images/I/51dEGUSzZFL._SX679._SX._UX._SY._UY_.jpg','purple','BLACK JONES UV400 Protective Sunglasses for Women Stylish with Storage Box Glasses Cloth, Rimless Diamond Cutting Lens with Stone All color of Sunglasses for Driving Shades for Women.','2023-10-28 06:51:18','SUNGLASSES'),('4bdee6f0-7530-11ee-bab4-f889d2b5c633','BLACK JONES UV400 Protective Sunglasses','Black Jones',596.00,'https://m.media-amazon.com/images/I/51l-bLyEEnL._SX679._SX._UX._SY._UY_.jpg','purple','BLACK JONES UV400 Protective Sunglasses for Women Stylish with Storage Box Glasses Cloth, Rimless Diamond Cutting Lens with Stone All color of Sunglasses for Driving Shades for Women.','2023-10-28 06:51:18','SUNGLASSES'),('4bdee745-7530-11ee-bab4-f889d2b5c633','Karsaer Vintage Rimless Sunglasses','Karsaer',769.00,'https://m.media-amazon.com/images/I/51UiHlzekvL._UX679_.jpg','brown','Karsaer Vintage Rimless Sunglasses Rectangle Frameless Candy Color Glasses Women Men E1036','2023-10-28 06:51:18','SUNGLASSES'),('4bdee7a1-7530-11ee-bab4-f889d2b5c633','Karsaer Vintage Rimless Sunglasses','Karsaer',769.00,'https://m.media-amazon.com/images/I/51TMmECwn7L._SX679._SX._UX._SY._UY_.jpg','pink','Karsaer Vintage Rimless Sunglasses Rectangle Frameless Candy Color Glasses Women Men E1036','2023-10-28 06:51:18','SUNGLASSES'),('4bdee839-7530-11ee-bab4-f889d2b5c633','Karsaer Vintage Rimless Sunglasses','Karsaer',769.00,'https://m.media-amazon.com/images/I/51WqZQZrGCL._SX679._SX._UX._SY._UY_.jpg','blue','Karsaer Vintage Rimless Sunglasses Rectangle Frameless Candy Color Glasses Women Men E1036','2023-10-28 06:51:18','SUNGLASSES'),('4bdee91e-7530-11ee-bab4-f889d2b5c633','Karsaer Vintage Rimless Sunglasses','Karsaer',769.00,'https://m.media-amazon.com/images/I/518Wm7cGOSL._SX679._SX._UX._SY._UY_.jpg','red','Karsaer Vintage Rimless Sunglasses Rectangle Frameless Candy Color Glasses Women Men E1036','2023-10-28 06:51:18','SUNGLASSES'),('4bdee971-7530-11ee-bab4-f889d2b5c633','Eyewearlabs OKNO','Eyewearlabs',1599.00,'https://m.media-amazon.com/images/I/71ymiOIObXL._UX679_.jpg','green','Eyewearlabs OKNO | Moto X2 | Polarized Sunglasses For Men And Women | For Driving, Sports and Adventure Activities | 100% UV Protection | Medium | Crystal','2023-10-28 06:51:18','SUNGLASSES'),('4bdee9c7-7530-11ee-bab4-f889d2b5c633','Eyewearlabs OKNO','Eyewearlabs',1599.00,'https://m.media-amazon.com/images/I/71Cq+ZXpDpL._SX679._SX._UX._SY._UY_.jpg','black','Eyewearlabs OKNO | Moto X2 | Polarized Sunglasses For Men And Women | For Driving, Sports and Adventure Activities | 100% UV Protection | Medium | Crystal','2023-10-28 06:51:18','SUNGLASSES'),('4bdeea21-7530-11ee-bab4-f889d2b5c633','Eyewearlabs OKNO','Eyewearlabs',1599.00,'https://m.media-amazon.com/images/I/71AAYfOM+tL._SX679._SX._UX._SY._UY_.jpg','blue','Eyewearlabs OKNO | Moto X2 | Polarized Sunglasses For Men And Women | For Driving, Sports and Adventure Activities | 100% UV Protection | Medium | Crystal','2023-10-28 06:51:18','SUNGLASSES'),('4bdeea72-7530-11ee-bab4-f889d2b5c633','Eyewearlabs OKNO','Eyewearlabs',1599.00,'https://m.media-amazon.com/images/I/711B9t0v+KL._SX679._SX._UX._SY._UY_.jpg','grey','Eyewearlabs OKNO | Moto X2 | Polarized Sunglasses For Men And Women | For Driving, Sports and Adventure Activities | 100% UV Protection | Medium | Crystal','2023-10-28 06:51:18','SUNGLASSES'),('4bdeeb02-7530-11ee-bab4-f889d2b5c633','Eyewearlabs OKNO','Eyewearlabs',1599.00,'https://m.media-amazon.com/images/I/71OyJrBfs6L._SX679._SX._UX._SY._UY_.jpg','orange','Eyewearlabs OKNO | Moto X2 | Polarized Sunglasses For Men And Women | For Driving, Sports and Adventure Activities | 100% UV Protection | Medium | Crystal','2023-10-28 06:51:18','SUNGLASSES'),('4bdeeb53-7530-11ee-bab4-f889d2b5c633','Eyewearlabs OKNO','Eyewearlabs',1599.00,'https://m.media-amazon.com/images/I/718fuO+q8vL._SX679._SX._UX._SY._UY_.jpg','purple','Eyewearlabs OKNO | Moto X2 | Polarized Sunglasses For Men And Women | For Driving, Sports and Adventure Activities | 100% UV Protection | Medium | Crystal','2023-10-28 06:51:18','SUNGLASSES'),('4bdeeb9d-7530-11ee-bab4-f889d2b5c633','Eyewearlabs OKNO','Eyewearlabs',1499.00,'https://m.media-amazon.com/images/I/81rVCfZx18L._SX679._SX._UX._SY._UY_.jpg','red','Eyewearlabs OKNO | Moto X2 | Polarized Sunglasses For Men And Women | For Driving, Sports and Adventure Activities | 100% UV Protection | Medium | Crystal','2023-10-28 06:51:18','SUNGLASSES'),('4bdeebea-7530-11ee-bab4-f889d2b5c633','Creature Spectacles Frame','Creature',298.00,'https://m.media-amazon.com/images/I/41CN2yf5jkL._UX679_.jpg','blue','CREATURE Spectacles Frame | Peyush Bansal Glasses | Lightweight Specs With Zero Power|Medium','2023-10-28 06:51:18','GLASSES'),('4bdeec37-7530-11ee-bab4-f889d2b5c633','Creature Spectacles Frame','Creature',298.00,'https://m.media-amazon.com/images/I/41S8cOXKmNL._SX679._SX._UX._SY._UY_.jpg','brown','CREATURE Spectacles Frame | Peyush Bansal Glasses | Lightweight Specs With Zero Power|Medium','2023-10-28 06:51:18','GLASSES'),('4bdeecc6-7530-11ee-bab4-f889d2b5c633','Creature Spectacles Frame','Creature',298.00,'https://m.media-amazon.com/images/I/41Qg6cne5CL._SX679._SX._UX._SY._UY_.jpg','green','CREATURE Spectacles Frame | Peyush Bansal Glasses | Lightweight Specs With Zero Power|Medium','2023-10-28 06:51:18','GLASSES'),('4bdeed19-7530-11ee-bab4-f889d2b5c633','Creature Spectacles Frame','Creature',298.00,'https://m.media-amazon.com/images/I/41NjwdfY-FL._SX679._SX._UX._SY._UY_.jpg','grey','CREATURE Spectacles Frame | Peyush Bansal Glasses | Lightweight Specs With Zero Power|Medium','2023-10-28 06:51:18','GLASSES'),('4bdeed62-7530-11ee-bab4-f889d2b5c633','Creature Spectacles Frame','Creature',298.00,'https://m.media-amazon.com/images/I/41wNX4riH0L._SX679._SX._UX._SY._UY_.jpg','pink','CREATURE Spectacles Frame | Peyush Bansal Glasses | Lightweight Specs With Zero Power|Medium','2023-10-28 06:51:18','GLASSES'),('4bdeedad-7530-11ee-bab4-f889d2b5c633','Creature Spectacles Frame','Creature',298.00,'https://m.media-amazon.com/images/I/31RNRyaz2EL._SX679._SX._UX._SY._UY_.jpg','white','CREATURE Spectacles Frame | Peyush Bansal Glasses | Lightweight Specs With Zero Power|Medium','2023-10-28 06:51:18','GLASSES'),('4bdeedfb-7530-11ee-bab4-f889d2b5c633','Creature Spectacles Frame','Creature',298.00,'https://m.media-amazon.com/images/I/31mQ53iQ1EL._SX679._SX._UX._SY._UY_.jpg','yellow','CREATURE Spectacles Frame | Peyush Bansal Glasses | Lightweight Specs With Zero Power|Medium','2023-10-28 06:51:18','GLASSES'),('4bdeee4c-7530-11ee-bab4-f889d2b5c633','CREEK Blue Light Blocking Glasses','CREEK',385.00,'https://m.media-amazon.com/images/I/51HioWo8rVL._UX679_.jpg','white','CREEK Blue Light Blocking Glasses Gaming Filter Square Eyeglasses for Eye Protection Men Women, Computer/Tablet/Laptop/Mobile/TV, Anti-blue & Anti eyestrain','2023-10-28 06:51:18','GLASSES'),('4bdeee9f-7530-11ee-bab4-f889d2b5c633','CREEK Blue Light Blocking Glasses','CREEK',385.00,'https://m.media-amazon.com/images/I/51dOlHEfBWL._SX679._SX._UX._SY._UY_.jpg','black','CREEK Blue Light Blocking Glasses Gaming Filter Square Eyeglasses for Eye Protection Men Women, Computer/Tablet/Laptop/Mobile/TV, Anti-blue & Anti eyestrain','2023-10-28 06:51:18','GLASSES'),('4bdeeef2-7530-11ee-bab4-f889d2b5c633','CREEK Blue Light Blocking Glasses','CREEK',385.00,'https://m.media-amazon.com/images/I/51O2cDN603L._SX679._SX._UX._SY._UY_.jpg','green','CREEK Blue Light Blocking Glasses Gaming Filter Square Eyeglasses for Eye Protection Men Women, Computer/Tablet/Laptop/Mobile/TV, Anti-blue & Anti eyestrain','2023-10-28 06:51:18','GLASSES'),('4bdeef47-7530-11ee-bab4-f889d2b5c633','CREEK Blue Light Blocking Glasses','CREEK',385.00,'https://m.media-amazon.com/images/I/51bjYiTpy3L._SX679._SX._UX._SY._UY_.jpg','red','CREEK Blue Light Blocking Glasses Gaming Filter Square Eyeglasses for Eye Protection Men Women, Computer/Tablet/Laptop/Mobile/TV, Anti-blue & Anti eyestrain','2023-10-28 06:51:18','GLASSES'),('4bdeefc5-7530-11ee-bab4-f889d2b5c633','CREEK Blue Light Blocking Glasses','CREEK',385.00,'https://m.media-amazon.com/images/I/61e3cYRxT+L._SX679._SX._UX._SY._UY_.jpg','white','CREEK Blue Light Blocking Glasses Gaming Filter Square Eyeglasses for Eye Protection Men Women, Computer/Tablet/Laptop/Mobile/TV, Anti-blue & Anti eyestrain','2023-10-28 06:51:18','GLASSES'),('4bdef010-7530-11ee-bab4-f889d2b5c633','CREEK Blue Light Blocking Glasses','CREEK',385.00,'https://m.media-amazon.com/images/I/614jSdpjVaL._SX679._SX._UX._SY._UY_.jpg','blue','CREEK Blue Light Blocking Glasses Gaming Filter Square Eyeglasses for Eye Protection Men Women, Computer/Tablet/Laptop/Mobile/TV, Anti-blue & Anti eyestrain','2023-10-28 06:51:18','GLASSES'),('4bdef05a-7530-11ee-bab4-f889d2b5c633','CREEK Blue Light Blocking Glasses','CREEK',385.00,'https://m.media-amazon.com/images/I/51gS8jfYzJL._SX679._SX._UX._SY._UY_.jpg','pink','CREEK Blue Light Blocking Glasses Gaming Filter Square Eyeglasses for Eye Protection Men Women, Computer/Tablet/Laptop/Mobile/TV, Anti-blue & Anti eyestrain','2023-10-28 06:51:18','GLASSES'),('4bdef0a1-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',99.00,'https://m.media-amazon.com/images/I/51IGZbTtRQL._SX679_.jpg','brown','AQUALENS CONTACT LENSES Aquacolor Dusky Brown Candy Pack Zero Power Colored Lenses (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef0d3-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',160.00,'https://m.media-amazon.com/images/I/61rgiKh8g9L._SX679_.jpg','green','AQUALENS CONTACT LENSES Aqua Color Envy Green Candy Pack - 0 PowerDailies (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef104-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',175.00,'https://m.media-amazon.com/images/I/61hWOXDDwtL._SX679_.jpg','blue','AQUALENS CONTACT LENSES AquaColor Icy Blue Candy Pack- 0 PowerDailies (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef139-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',175.00,'https://m.media-amazon.com/images/I/61zKoEl-GbL._SX679_.jpg','grey','Aquacolor Misty Gray Candy Pack Zero Power Colored Lenses (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef169-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',99.00,'https://m.media-amazon.com/images/I/51+-4jAHFwL._SX679_.jpg','brown','Aquacolor Mocha Brown Candy Pack Zero Power Colored Lenses (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef196-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',119.00,'https://m.media-amazon.com/images/I/51NXsSnO0yL._SX679_.jpg','yellow','Aquacolor Mystery Hazel Candy Pack Zero Power Colored Lenses (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef1c6-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',175.00,'https://m.media-amazon.com/images/I/51e-Zl04IZL._SX679_.jpg','brown','AquaColor Naughty Brown Candy Pack- 0 Power Color Contact Lens Dailies (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef1f2-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',99.00,'https://m.media-amazon.com/images/I/61tDmxdx-JL._SX679_.jpg','grey','Aquacolor Spicy Grey Candy Pack Zero Power Colored Lenses (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef26c-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',99.00,'https://m.media-amazon.com/images/I/61teOxVcrOL._SX679_.jpg','grey','Aquacolor Stormy Gray Candy Pack Zero Power Colored Lenses (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef29b-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',99.00,'https://m.media-amazon.com/images/I/615XcG5-vBL._SX679_.jpg','blue','Aquacolor Tricky Turquoise Candy Pack Zero Power Colored Lenses (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef2cb-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',99.00,'https://m.media-amazon.com/images/I/61MqA5h1pnL._SX679_.jpg','brown','Aquacolor Walnut Brown Candy Pack Zero Power Colored Lenses (2 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef2fd-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',499.00,'https://m.media-amazon.com/images/I/51MjxuhDzsL._SX679_.jpg','black','AQUALENS CONTACT LENSES Aquacolor Daily Disposable Colored Lenses with 0 Power - Black Rose - (10 Lens/Box)','2023-10-28 06:51:18','CONTACTS'),('4bdef32c-7530-11ee-bab4-f889d2b5c633','AQUALENS CONTACT LENSES','AQUALENS',99.00,'https://m.media-amazon.com/images/I/51-oqXyyuIL._SX679_.jpg','brown','AQUALENS CONTACT LENSES Aquacolor Daily Disposable Colored Lenses with 0 Power - Coco Brown - (10 Lens/Box)','2023-10-28 06:51:18','CONTACTS');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  `score` decimal(2,1) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(100) DEFAULT 'Customer',
  `email` varchar(100) NOT NULL,
  `phone` char(10) NOT NULL,
  `passwd` text NOT NULL,
  `address` text,
  `role` varchar(10) DEFAULT 'GUEST',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('45ae3f47-7648-11ee-a701-f889d2b5c633','c','c@c.c','1234567890','$2a$10$r.MhBTDqSALkqyiYNk4WCefCEn4yDTiOQnEEEkT27BSlLcU0FY/Ra','bari','GUEST','2023-10-29 16:15:27'),('5a960ec3-7648-11ee-a701-f889d2b5c633','d','d@d.d','1234567890','$2a$10$lSTHHJNVxUcIvYuUc4H8yubsOdNDplfTJBzBvvWCy/V.1GQ.2D5nW','bari','GUEST','2023-10-29 16:16:02'),('5c9e48fd-7641-11ee-a701-f889d2b5c633','Admin','admin@gmail.com','1234567890','$2a$10$qfBiG9O4/h2/qwBKlLU9ZuJRWg8ZqiXU7/9W3j7RxMc/B2K6jGQx.','Admin Address','ADMIN','2023-10-29 15:25:59'),('69293af0-7648-11ee-a701-f889d2b5c633','e','e@e.e','1234567890','$2a$10$ng.FmqZiCDHFtmiFDdL2MucAeR9EHRBSKSjOct/Y1WvjtvSg0K8.q','bari','GUEST','2023-10-29 16:16:26'),('7068677c-7647-11ee-a701-f889d2b5c633','Pedro Duarte','adrito.mukherjee.cse21@itbhu.ac.in','1234567890','$2a$10$.aOApkN/05nwE/hKrj2Ze.BGo9EIDzEs0iAt0g/WGsjRl9K.7PS8O','bari','GUEST','2023-10-29 16:09:29'),('94b7dc9c-7647-11ee-a701-f889d2b5c633','Adrito Mukherjee','a@a.a','1234567890','$2a$10$yCMt0xnymhTKUulNeo45R.QTXETHnLfggYKfitfaERgebWvQDL/dK','bari','GUEST','2023-10-29 16:10:30'),('fb007519-7647-11ee-a701-f889d2b5c633','asd','b@b.b','1234567890','$2a$10$Qn8hENUqfRHEDp4lY.iqVOL.Sic5oC19P2h14sf9G6E0mbNvO/pEm','bari','GUEST','2023-10-29 16:13:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) NOT NULL,
  `product_id` char(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES ('f1226cbd-76d2-11ee-af93-f889d2b5c633','94b7dc9c-7647-11ee-a701-f889d2b5c633','4bdee0f7-7530-11ee-bab4-f889d2b5c633'),('f1885692-76d2-11ee-af93-f889d2b5c633','94b7dc9c-7647-11ee-a701-f889d2b5c633','4bdee570-7530-11ee-bab4-f889d2b5c633'),('f2066348-76d2-11ee-af93-f889d2b5c633','94b7dc9c-7647-11ee-a701-f889d2b5c633','4bdee644-7530-11ee-bab4-f889d2b5c633');
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-30 14:28:47
