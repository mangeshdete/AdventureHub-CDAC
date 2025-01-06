CREATE DATABASE  IF NOT EXISTS `p14_adventurehub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `p14_adventurehub`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: adventurehub
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryid` int NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(50) NOT NULL,
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `cityid` int NOT NULL AUTO_INCREMENT,
  `cityname` varchar(50) NOT NULL,
  `stateid` int NOT NULL,
  PRIMARY KEY (`cityid`),
  KEY `stateid_fk` (`stateid`),
  CONSTRAINT `stateid_fk` FOREIGN KEY (`stateid`) REFERENCES `states` (`stateid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `custid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `aadhaar` varchar(16) NOT NULL,
  `street` varchar(100) NOT NULL,
  `cityid` int NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `dob` date NOT NULL DEFAULT '2000-12-12',
  PRIMARY KEY (`custid`),
  KEY `userid_fk` (`userid`),
  KEY `city_id_fk` (`cityid`),
  CONSTRAINT `city_id_fk` FOREIGN KEY (`cityid`) REFERENCES `cities` (`cityid`),
  CONSTRAINT `userid_fk` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `eventregistrations`
--

DROP TABLE IF EXISTS `eventregistrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventregistrations` (
  `registrationid` int NOT NULL AUTO_INCREMENT,
  `custid` int NOT NULL,
  `publishid` int NOT NULL,
  `participants` int NOT NULL,
  PRIMARY KEY (`registrationid`),
  KEY `eventregistrations_cust_id_fk` (`custid`),
  KEY `eventregistrations_publish_id_fk` (`publishid`),
  CONSTRAINT `eventregistrations_cust_id_fk` FOREIGN KEY (`custid`) REFERENCES `customers` (`custid`),
  CONSTRAINT `eventregistrations_publish_id_fk` FOREIGN KEY (`publishid`) REFERENCES `publishevents` (`publishid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eventid` int NOT NULL AUTO_INCREMENT,
  `eventname` varchar(50) NOT NULL,
  `categoryid` int NOT NULL,
  PRIMARY KEY (`eventid`),
  KEY `catid_fk` (`categoryid`),
  CONSTRAINT `catid_fk` FOREIGN KEY (`categoryid`) REFERENCES `categories` (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `organisers`
--

DROP TABLE IF EXISTS `organisers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organisers` (
  `organiserid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `orgname` varchar(100) NOT NULL,
  `gst` varchar(100) NOT NULL,
  `pancard` varchar(12) NOT NULL,
  `street` varchar(100) NOT NULL,
  `cityid` int NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `rating` decimal(2,1) NOT NULL DEFAULT '0.0',
  PRIMARY KEY (`organiserid`),
  KEY `org_userid_fk` (`userid`),
  KEY `org_city_id_fk` (`cityid`),
  CONSTRAINT `org_city_id_fk` FOREIGN KEY (`cityid`) REFERENCES `cities` (`cityid`),
  CONSTRAINT `org_userid_fk` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paymentmode`
--

DROP TABLE IF EXISTS `paymentmode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentmode` (
  `paymentmodeid` int NOT NULL AUTO_INCREMENT,
  `paymentmodename` varchar(20) NOT NULL,
  PRIMARY KEY (`paymentmodeid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `paymentid` int NOT NULL AUTO_INCREMENT,
  `registrationid` int NOT NULL,
  `paymentmodeid` int NOT NULL,
  `date` timestamp NOT NULL,
  `amount` float NOT NULL,
  `paymentstatus` enum('SUCCESSFULL','FAILED') NOT NULL,
  PRIMARY KEY (`paymentid`),
  KEY `payments_regid_fk` (`registrationid`),
  KEY `payments_modeid_fk` (`paymentmodeid`),
  CONSTRAINT `payments_modeid_fk` FOREIGN KEY (`paymentmodeid`) REFERENCES `paymentmode` (`paymentmodeid`),
  CONSTRAINT `payments_regid_fk` FOREIGN KEY (`registrationid`) REFERENCES `eventregistrations` (`registrationid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publishevents`
--

DROP TABLE IF EXISTS `publishevents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publishevents` (
  `publishid` int NOT NULL AUTO_INCREMENT,
  `eventid` int NOT NULL,
  `organiserid` int NOT NULL,
  `eventdate` date NOT NULL,
  `eventtime` time NOT NULL,
  `price` float NOT NULL,
  `capacity` int NOT NULL,
  `status` enum('ACTIVE','PROCESSING','CANCELLED','COMPLETED') NOT NULL,
  `street` varchar(100) NOT NULL,
  `cityid` int NOT NULL,
  `pincode` varchar(6) NOT NULL,
  PRIMARY KEY (`publishid`),
  KEY `publishevent_eventid_fk` (`eventid`),
  KEY `publishevent_orgid_fk` (`organiserid`),
  KEY `publishevent_city_id_fk` (`cityid`),
  CONSTRAINT `publishevent_city_id_fk` FOREIGN KEY (`cityid`) REFERENCES `cities` (`cityid`),
  CONSTRAINT `publishevent_eventid_fk` FOREIGN KEY (`eventid`) REFERENCES `events` (`eventid`),
  CONSTRAINT `publishevent_orgid_fk` FOREIGN KEY (`organiserid`) REFERENCES `organisers` (`organiserid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `ratingid` int NOT NULL AUTO_INCREMENT,
  `custid` int NOT NULL,
  `orgid` int NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  PRIMARY KEY (`ratingid`),
  KEY `fk_cust_id` (`custid`),
  KEY `fk_org_id` (`orgid`),
  CONSTRAINT `fk_cust_id` FOREIGN KEY (`custid`) REFERENCES `customers` (`custid`),
  CONSTRAINT `fk_org_id` FOREIGN KEY (`orgid`) REFERENCES `organisers` (`organiserid`),
  CONSTRAINT `chk_rating` CHECK ((`rating` between 1.0 and 5.0))
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_rating` AFTER INSERT ON `ratings` FOR EACH ROW begin
	declare new_rating decimal(2,1);
    select avg(rating) into new_rating
		from ratings
        where orgid=NEW.orgid;
	update organisers
    set rating=new_rating
    where organiserid=NEW.orgid;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_rating_after_update` AFTER UPDATE ON `ratings` FOR EACH ROW BEGIN
    DECLARE new_rating decimal(2,1);

    SELECT AVG(rating) INTO new_rating
    FROM ratings
    WHERE orgid = NEW.orgid;

    UPDATE organisers
    SET rating = new_rating
    WHERE organiserid = NEW.orgid;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleid` int NOT NULL AUTO_INCREMENT,
  `rolename` varchar(50) NOT NULL,
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `securityquestions`
--

DROP TABLE IF EXISTS `securityquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `securityquestions` (
  `qid` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  PRIMARY KEY (`qid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `stateid` int NOT NULL AUTO_INCREMENT,
  `statename` varchar(50) NOT NULL,
  PRIMARY KEY (`stateid`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `securityqid` int NOT NULL,
  `securityqans` varchar(100) NOT NULL,
  `roleid` int NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `user_email_unique` (`email`),
  KEY `fk_security_qid` (`securityqid`),
  KEY `fk_role_id` (`roleid`),
  CONSTRAINT `fk_role_id` FOREIGN KEY (`roleid`) REFERENCES `role` (`roleid`),
  CONSTRAINT `fk_security_qid` FOREIGN KEY (`securityqid`) REFERENCES `securityquestions` (`qid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'adventurehub'
--

--
-- Dumping routines for database 'adventurehub'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-03 16:05:55
