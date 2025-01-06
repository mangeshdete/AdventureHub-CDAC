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
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Water Adventures'),(2,'High Altitude Adventures'),(3,'Mountain Adventures'),(4,'Sight Seeing'),(5,'Cold Adventures');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Hyderabad',1),(2,'Visakhapatnam',1),(3,'Vijayawada',1),(4,'Guntur',1),(5,'Tirupati',1),(6,'Itanagar',2),(7,'Pasighat',2),(8,'Tezu',2),(9,'Ziro',2),(10,'Bomdila',2),(11,'Guwahati',3),(12,'Silchar',3),(13,'Dibrugarh',3),(14,'Jorhat',3),(15,'Tezpur',3),(16,'Patna',4),(17,'Gaya',4),(18,'Bhagalpur',4),(19,'Muzaffarpur',4),(20,'Darbhanga',4),(21,'Raipur',5),(22,'Bilaspur',5),(23,'Durg',5),(24,'Bhilai',5),(25,'Raigarh',5),(26,'Panaji',6),(27,'Vasco da Gama',6),(28,'Margao',6),(29,'Mapusa',6),(30,'Ponda',6),(31,'Ahmedabad',7),(32,'Surat',7),(33,'Vadodara',7),(34,'Rajkot',7),(35,'Gandhinagar',7),(36,'Faridabad',8),(37,'Gurugram',8),(38,'Panipat',8),(39,'Rohtak',8),(40,'Hisar',8),(41,'Shimla',9),(42,'Dharamshala',9),(43,'Kullu',9),(44,'Manali',9),(45,'Solan',9),(46,'Ranchi',10),(47,'Jamshedpur',10),(48,'Dhanbad',10),(49,'Bokaro Steel City',10),(50,'Deoghar',10),(51,'Bengaluru',11),(52,'Mysuru',11),(53,'Mangaluru',11),(54,'Hubli-Dharwad',11),(55,'Belagavi',11),(56,'Kochi',12),(57,'Thiruvananthapuram',12),(58,'Kozhikode',12),(59,'Thrissur',12),(60,'Kollam',12),(61,'Bhopal',13),(62,'Indore',13),(63,'Jabalpur',13),(64,'Gwalior',13),(65,'Ujjain',13),(66,'Mumbai',14),(67,'Pune',14),(68,'Nagpur',14),(69,'Nashik',14),(70,'Aurangabad',14),(71,'Imphal',15),(72,'Churachandpur',15),(73,'Ukhrul',15),(74,'Thoubal',15),(75,'Moirang',15),(76,'Shillong',16),(77,'Tura',16),(78,'Jowai',16),(79,'Nongstoin',16),(80,'Mawkyrwat',16),(81,'Aizawl',17),(82,'Lunglei',17),(83,'Champhai',17),(84,'Saiha',17),(85,'Mamit',17),(86,'Kohima',18),(87,'Dimapur',18),(88,'Mokokchung',18),(89,'Wokha',18),(90,'Mon',18),(91,'Bhubaneswar',19),(92,'Cuttack',19),(93,'Rourkela',19),(94,'Puri',19),(95,'Sambalpur',19),(96,'Amritsar',20),(97,'Ludhiana',20),(98,'Jalandhar',20),(99,'Patiala',20),(100,'Bathinda',20),(101,'Jaipur',21),(102,'Jodhpur',21),(103,'Udaipur',21),(104,'Kota',21),(105,'Ajmer',21),(106,'Gangtok',22),(107,'Pelling',22),(108,'Namchi',22),(109,'Gyalshing',22),(110,'Mangan',22),(111,'Chennai',23),(112,'Coimbatore',23),(113,'Madurai',23),(114,'Tiruchirappalli',23),(115,'Salem',23),(116,'Hyderabad',24),(117,'Warangal',24),(118,'Nizamabad',24),(119,'Karimnagar',24),(120,'Khammam',24),(121,'Agartala',25),(122,'Udaipur',25),(123,'Dharmanagar',25),(124,'Kailashahar',25),(125,'Sabroom',25),(126,'Dehradun',26),(127,'Haridwar',26),(128,'Rishikesh',26),(129,'Nainital',26),(130,'Haldwani',26),(131,'Kolkata',28),(132,'Siliguri',28),(133,'Asansol',28),(134,'Durgapur',28),(135,'Bardhaman',28),(136,'Lucknow',27),(137,'Kanpur',27),(138,'Varanasi',27),(139,'Agra',27),(140,'Allahabad',27);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,2,'Chandrakant','Sharma','223456789012','Street 2, Opposite Mall',2,'530001','1985-05-25'),(2,3,'Chaitanya','Patel','323456789012','Street 3, Main Road',3,'520001','1992-02-10'),(3,4,'Charulata','Reddy','423456789012','Street 4, Near School',4,'522001','1987-07-18'),(4,5,'Chandan','Mishra','523456789012','Street 5, Above Shop',5,'530002','1991-03-23'),(5,6,'Chetan','Verma','623456789012','Street 6, By the Lake',6,'790001','1988-11-30'),(6,7,'Charan','Singh','723456789012','Street 7, Green Park',7,'790002','1995-01-10'),(7,8,'Chirag','Joshi','823456789012','Street 8, Behind Mall',8,'790003','1993-07-21');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `eventregistrations`
--

LOCK TABLES `eventregistrations` WRITE;
/*!40000 ALTER TABLE `eventregistrations` DISABLE KEYS */;
INSERT INTO `eventregistrations` VALUES (1,1,1,2),(2,2,2,1),(3,3,3,3),(4,4,4,2),(5,5,5,5),(6,6,6,1),(7,7,7,2),(8,1,8,4),(9,3,9,2),(10,2,10,3);
/*!40000 ALTER TABLE `eventregistrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Sunset Kayaking',1),(2,'Mountain Trekking Expedition',2),(3,'Everest Base Camp Trek',2),(4,'Himalayan Hiking Trails',3),(5,'Lake View Sightseeing Tour',4),(6,'Antarctic Ice Climbing Expedition',5),(7,'Deep Sea Diving Experience',1),(8,'Alpine Skiing Adventure',5),(9,'Rock Climbing at Machu Picchu',3),(10,'Desert Safari Experience',4);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `organisers`
--

LOCK TABLES `organisers` WRITE;
/*!40000 ALTER TABLE `organisers` DISABLE KEYS */;
INSERT INTO `organisers` VALUES (1,9,'Omkar Gatherings','GSTIN456789012','UVWX9876J','Street 9, Near School',9,'790004',4.0),(2,10,'Ojas Events','GSTIN567890123','XYZAB1234L','Street 10, Close to Mall',10,'790005',3.1);
/*!40000 ALTER TABLE `organisers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `paymentmode`
--

LOCK TABLES `paymentmode` WRITE;
/*!40000 ALTER TABLE `paymentmode` DISABLE KEYS */;
INSERT INTO `paymentmode` VALUES (1,'Credit Card'),(2,'Debit Card'),(3,'Net Banking'),(4,'UPI');
/*!40000 ALTER TABLE `paymentmode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,1,'2025-02-14 03:30:00',200,'SUCCESSFULL'),(2,2,2,'2025-03-09 10:30:00',600,'SUCCESSFULL'),(3,3,1,'2025-03-31 04:30:00',1500,'FAILED'),(4,4,3,'2025-05-19 06:30:00',400,'SUCCESSFULL'),(5,5,2,'2025-06-09 08:30:00',250,'FAILED'),(6,6,1,'2025-07-14 03:30:00',1200,'SUCCESSFULL'),(7,7,3,'2025-08-04 07:30:00',300,'SUCCESSFULL'),(8,8,1,'2025-11-30 04:30:00',500,'SUCCESSFULL'),(9,9,2,'2025-09-09 06:30:00',700,'FAILED'),(10,10,3,'2025-11-04 05:30:00',200,'SUCCESSFULL');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `publishevents`
--

LOCK TABLES `publishevents` WRITE;
/*!40000 ALTER TABLE `publishevents` DISABLE KEYS */;
INSERT INTO `publishevents` VALUES (1,1,1,'2025-02-15','10:00:00',100,50,'ACTIVE','Beach Road',1,'500001'),(2,2,1,'2025-03-10','08:00:00',300,30,'ACTIVE','Trekking Base Camp',2,'800002'),(3,3,2,'2025-04-01','07:00:00',500,20,'PROCESSING','Everest Base Camp',3,'900003'),(4,4,2,'2025-05-20','06:00:00',200,40,'ACTIVE','Mountain Ridge',4,'110004'),(5,5,1,'2025-06-10','14:00:00',50,100,'CANCELLED','Lakeside Promenade',5,'120005'),(6,6,1,'2025-07-15','09:00:00',1200,10,'ACTIVE','Ice Climbing Camp',6,'130006'),(7,7,2,'2025-08-05','10:00:00',150,30,'COMPLETED','Underwater Exploration Center',7,'140007'),(8,8,1,'2025-12-01','08:00:00',250,50,'ACTIVE','Ski Resort',8,'150008'),(9,9,2,'2025-09-10','07:30:00',350,20,'ACTIVE','Machu Picchu Base',9,'160009'),(10,10,1,'2025-11-05','16:00:00',80,100,'ACTIVE','Desert Safari Camp',10,'170010');
/*!40000 ALTER TABLE `publishevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (41,1,1,4.2),(42,2,1,3.9),(43,3,2,1.5),(44,4,2,4.1),(45,5,1,3.8),(46,6,1,4.3),(47,7,2,3.7),(48,7,1,4.0);
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

/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Customer'),(2,'Organizer'),(3,'Admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `securityquestions`
--

LOCK TABLES `securityquestions` WRITE;
/*!40000 ALTER TABLE `securityquestions` DISABLE KEYS */;
INSERT INTO `securityquestions` VALUES (1,'What was the name of your first pet?'),(2,'What is your mother’s maiden name?'),(3,'What was the name of your first school?'),(4,'What is your favorite book?'),(5,'What city were you born in?'),(6,'What is your favorite movie?'),(7,'What is the name of your favorite teacher?'),(8,'What was the make of your first car?'),(9,'What is your favorite childhood memory?'),(10,'What is your favorite cuisine?');
/*!40000 ALTER TABLE `securityquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Andhra Pradesh'),(2,'Arunachal Pradesh'),(3,'Assam'),(4,'Bihar'),(5,'Chhattisgarh'),(6,'Goa'),(7,'Gujarat'),(8,'Haryana'),(9,'Himachal Pradesh'),(10,'Jharkhand'),(11,'Karnataka'),(12,'Kerala'),(13,'Madhya Pradesh'),(14,'Maharashtra'),(15,'Manipur'),(16,'Meghalaya'),(17,'Mizoram'),(18,'Nagaland'),(19,'Odisha'),(20,'Punjab'),(21,'Rajasthan'),(22,'Sikkim'),(23,'Tamil Nadu'),(24,'Telangana'),(25,'Tripura'),(26,'Uttarakhand'),(27,'Uttar Pradesh'),(28,'West Bengal');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'amit_123','9876543210','amit@example.com',1,'Blue',3),(2,'chandrakant123','9123456789','chandrakant@example.com',2,'Tommy',1),(3,'chaitanya123','9234567890','chaitanya@example.com',3,'Smith',1),(4,'charulata123','9345678901','charulata@example.com',4,'St. Peter School',1),(5,'chandan123','9456789012','chandan@example.com',5,'Harry Potter',1),(6,'chetan123','9567890123','chetan@example.com',6,'Delhi',1),(7,'charan123','9678901234','charan@example.com',7,'Inception',1),(8,'chirag123','9789012345','chirag@example.com',8,'Honda',1),(9,'omkar123','9890123456','omkar@example.com',9,'Summer Camp Memories',2),(10,'ojas123','9901234567','ojas@example.com',10,'Indian Cuisine',2);
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

-- Dump completed on 2025-01-03 16:06:21
