CREATE DATABASE  IF NOT EXISTS `adventurehub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `adventurehub`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: adventurehub
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Water Adventures'),(2,'High Altitude Adventures'),(3,'Mountain Adventures'),(4,'Sight Seeing'),(5,'Cold Adventures');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Hyderabad',1),(2,'Visakhapatnam',1),(3,'Vijayawada',1),(4,'Guntur',1),(5,'Tirupati',1),(6,'Itanagar',2),(7,'Pasighat',2),(8,'Tezu',2),(9,'Ziro',2),(10,'Bomdila',2),(11,'Guwahati',3),(12,'Silchar',3),(13,'Dibrugarh',3),(14,'Jorhat',3),(15,'Tezpur',3),(16,'Patna',4),(17,'Gaya',4),(18,'Bhagalpur',4),(19,'Muzaffarpur',4),(20,'Darbhanga',4),(21,'Raipur',5),(22,'Bilaspur',5),(23,'Durg',5),(24,'Bhilai',5),(25,'Raigarh',5),(26,'Panaji',6),(27,'Vasco da Gama',6),(28,'Margao',6),(29,'Mapusa',6),(30,'Ponda',6),(31,'Ahmedabad',7),(32,'Surat',7),(33,'Vadodara',7),(34,'Rajkot',7),(35,'Gandhinagar',7),(36,'Faridabad',8),(37,'Gurugram',8),(38,'Panipat',8),(39,'Rohtak',8),(40,'Hisar',8),(41,'Shimla',9),(42,'Dharamshala',9),(43,'Kullu',9),(44,'Manali',9),(45,'Solan',9),(46,'Ranchi',10),(47,'Jamshedpur',10),(48,'Dhanbad',10),(49,'Bokaro Steel City',10),(50,'Deoghar',10),(51,'Bengaluru',11),(52,'Mysuru',11),(53,'Mangaluru',11),(54,'Hubli-Dharwad',11),(55,'Belagavi',11),(56,'Kochi',12),(57,'Thiruvananthapuram',12),(58,'Kozhikode',12),(59,'Thrissur',12),(60,'Kollam',12),(61,'Bhopal',13),(62,'Indore',13),(63,'Jabalpur',13),(64,'Gwalior',13),(65,'Ujjain',13),(66,'Mumbai',14),(67,'Pune',14),(68,'Nagpur',14),(69,'Nashik',14),(70,'Aurangabad',14),(71,'Imphal',15),(72,'Churachandpur',15),(73,'Ukhrul',15),(74,'Thoubal',15),(75,'Moirang',15),(76,'Shillong',16),(77,'Tura',16),(78,'Jowai',16),(79,'Nongstoin',16),(80,'Mawkyrwat',16),(81,'Aizawl',17),(82,'Lunglei',17),(83,'Champhai',17),(84,'Saiha',17),(85,'Mamit',17),(86,'Kohima',18),(87,'Dimapur',18),(88,'Mokokchung',18),(89,'Wokha',18),(90,'Mon',18),(91,'Bhubaneswar',19),(92,'Cuttack',19),(93,'Rourkela',19),(94,'Puri',19),(95,'Sambalpur',19),(96,'Amritsar',20),(97,'Ludhiana',20),(98,'Jalandhar',20),(99,'Patiala',20),(100,'Bathinda',20),(101,'Jaipur',21),(102,'Jodhpur',21),(103,'Udaipur',21),(104,'Kota',21),(105,'Ajmer',21),(106,'Gangtok',22),(107,'Pelling',22),(108,'Namchi',22),(109,'Gyalshing',22),(110,'Mangan',22),(111,'Chennai',23),(112,'Coimbatore',23),(113,'Madurai',23),(114,'Tiruchirappalli',23),(115,'Salem',23),(116,'Hyderabad',24),(117,'Warangal',24),(118,'Nizamabad',24),(119,'Karimnagar',24),(120,'Khammam',24),(121,'Agartala',25),(122,'Udaipur',25),(123,'Dharmanagar',25),(124,'Kailashahar',25),(125,'Sabroom',25),(126,'Dehradun',26),(127,'Haridwar',26),(128,'Rishikesh',26),(129,'Nainital',26),(130,'Haldwani',26),(131,'Kolkata',28),(132,'Siliguri',28),(133,'Asansol',28),(134,'Durgapur',28),(135,'Bardhaman',28),(136,'Lucknow',27),(137,'Kanpur',27),(138,'Varanasi',27),(139,'Agra',27),(140,'Allahabad',27);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,1,'Mangesh','Dete','213246887328','Chakan',67,'410501','2000-12-12'),(2,2,'Vishal','Pawar','456376472872','Nashik',67,'563452','2000-12-12');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventregistrations`
--

LOCK TABLES `eventregistrations` WRITE;
/*!40000 ALTER TABLE `eventregistrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventregistrations` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `organisers`
--

LOCK TABLES `organisers` WRITE;
/*!40000 ALTER TABLE `organisers` DISABLE KEYS */;
INSERT INTO `organisers` VALUES (1,3,'Manali Adventures','653645538726ma','manali2424','Solang Valley',44,'175131',0.0),(2,4,'Manali1 Adventures','65364553872ma1','manali1242','Solang Valley1',44,'175131',4.3);
/*!40000 ALTER TABLE `organisers` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentmode`
--

LOCK TABLES `paymentmode` WRITE;
/*!40000 ALTER TABLE `paymentmode` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentmode` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publishevents`
--

LOCK TABLES `publishevents` WRITE;
/*!40000 ALTER TABLE `publishevents` DISABLE KEYS */;
/*!40000 ALTER TABLE `publishevents` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,1,2,5.0),(2,1,2,5.0),(3,1,2,3.4),(4,1,2,3.9);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;
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
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Customer'),(2,'Organizer'),(3,'Admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `securityquestions`
--

LOCK TABLES `securityquestions` WRITE;
/*!40000 ALTER TABLE `securityquestions` DISABLE KEYS */;
INSERT INTO `securityquestions` VALUES (1,'What is your favorite color?'),(2,'What is your favorite food?'),(3,'What is the name of your first school?'),(4,'What is your childhood nickname?'),(5,'What is your best friend\'s name?');
/*!40000 ALTER TABLE `securityquestions` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Andhra Pradesh'),(2,'Arunachal Pradesh'),(3,'Assam'),(4,'Bihar'),(5,'Chhattisgarh'),(6,'Goa'),(7,'Gujarat'),(8,'Haryana'),(9,'Himachal Pradesh'),(10,'Jharkhand'),(11,'Karnataka'),(12,'Kerala'),(13,'Madhya Pradesh'),(14,'Maharashtra'),(15,'Manipur'),(16,'Meghalaya'),(17,'Mizoram'),(18,'Nagaland'),(19,'Odisha'),(20,'Punjab'),(21,'Rajasthan'),(22,'Sikkim'),(23,'Tamil Nadu'),(24,'Telangana'),(25,'Tripura'),(26,'Uttarakhand'),(27,'Uttar Pradesh'),(28,'West Bengal');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mxngexh@2409','7756952964','mangesh.dete@gmail.com',1,'red',1),(2,'vishal@2409','6736743873','vishal.pawar',1,'red',1),(3,'manali@adventures','6736556256','manali.adventures',1,'white',2),(4,'manali1@adventures','8766556256','manali1.adventures',1,'white1',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2025-01-01 11:24:05
