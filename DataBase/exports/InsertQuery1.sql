CREATE DATABASE  IF NOT EXISTS `p14_adventurehub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `p14_adventurehub`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: p14_adventurehub
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
-- Dumping data for table `cancelrequests`
--

LOCK TABLES `cancelrequests` WRITE;
/*!40000 ALTER TABLE `cancelrequests` DISABLE KEYS */;
/*!40000 ALTER TABLE `cancelrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Water Adventures'),(2,'High Altitude Adventures'),(3,'Mountain Adventures'),(4,'Sight Seeing'),(5,'Cold Adventures'),(6,'Desert Adventures'),(7,'Wildlife Adventures'),(8,'Aero Adventures'),(9,'Caving Adventures'),(10,'Cycling & Biking Adventures');
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
INSERT INTO `customers` VALUES (1,26,'Chaman','Sharma','123456789012','Street 1, Near Park',1,'500001','1990-01-01'),(2,27,'Chatur','Patel','223456789012','Street 2, Opposite Mall',2,'500002','1992-02-10'),(3,28,'Charvi','Singh','323456789012','Street 3, Main Road',3,'520001','1992-02-10'),(4,29,'Chayan','Gupta','423456789012','Street 4, Near School',4,'522001','1987-07-18'),(5,30,'Chirag','Kumar','523456789012','Street 5, Above Shop',5,'530002','1991-03-23'),(6,31,'Chintan','Reddy','623456789012','Street 6, By the Lake',6,'790001','1988-11-30'),(7,32,'Chatura','Iyer','723456789012','Street 7, Green Park',7,'790002','1995-01-10'),(8,33,'Chanchal','Joshi','823456789012','Street 8, Behind Mall',8,'790003','1993-07-21'),(9,34,'Chandni','Mehta','923456789012','Street 9, Near School',9,'500001','1990-01-01'),(10,35,'Chavvi','Verma','123456789013','Street 10, Close to Mall',10,'500002','1992-02-10'),(11,36,'Charul','Rao','123456789014','Street 1, Near Park',1,'500001','1990-01-01'),(12,37,'Chandan','Nair','123456789015','Street 2, Opposite Mall',2,'500002','1992-02-10'),(13,38,'Chahana','Choudhary','123456789016','Street 3, Main Road',3,'520001','1992-02-10'),(14,39,'Chinmay','Yadav','123456789017','Street 4, Near School',4,'522001','1987-07-18'),(15,40,'Chikoo','Das','123456789018','Street 5, Above Shop',5,'530002','1991-03-23'),(16,41,'Chakri','Mukherjee','123456789019','Street 6, By the Lake',6,'790001','1988-11-30'),(17,42,'Chitwan','Banerjee','123456789020','Street 7, Green Park',7,'790002','1991-01-10'),(18,43,'Chaitali','Bhatia','123456789021','Street 8, Behind Mall',8,'790003','1993-07-21'),(19,44,'Chiman','Kapoor','123456789022','Street 9, Near School',9,'500001','1990-01-01'),(20,45,'Chandresh','Jain','123456789023','Street 10, Close to Mall',10,'500002','1992-02-10'),(21,46,'Champa','Sethi','123456789024','At Post Jawala Tq Arni',67,'445105','2002-08-14'),(22,47,'Charisma','Saxena','123456789025','Street 1, Near Park',1,'500001','1990-01-01'),(23,48,'Chintamani','Agarwal','123456789026','Street 2, Opposite Mall',2,'500002','1992-02-10'),(24,49,'Chaturbhuj','Malhotra','123456789027','Street 3, Main Road',3,'520001','1992-02-10'),(25,50,'Chayana','Bhattacharya','123456789028','Street 4, Near School',4,'522001','1987-07-18'),(26,51,'Chanchita','Ghosh','123456789029','Street 5, Above Shop',5,'530002','1991-03-23'),(27,52,'Chiranya','Dutta','123456789030','Street 6, By the Lake',6,'790001','1988-11-30'),(28,53,'Chattarpal','Chatterjee','123456789031','Street 7, Green Park',7,'790002','1995-01-10'),(29,54,'Chitresh','Pillai','123456789032','Street 8, Behind Mall',8,'790003','1993-07-21'),(30,55,'Chitra','Menon','123456789033','Street 9, Near School',9,'500001','1990-01-01'),(31,56,'Chaturya','Thomas','123456789034','Street 10, Close to Mall',10,'500002','1992-02-10'),(32,57,'Chavisha','Kaur','123456789035','At Post Jawala Tq Arni',67,'445105','2002-08-14'),(33,58,'Chathura','Bansal','123456789036','Street 1, Near Park',1,'500001','1990-01-01'),(34,59,'Chirakshi','Sinha','123456789037','Street 2, Opposite Mall',2,'500002','1992-02-10'),(35,60,'Chintesh','Bhargava','123456789038','Street 3, Main Road',3,'520001','1992-02-10'),(36,61,'Chandrika','Tiwari','123456789039','Street 4, Near School',4,'522001','1987-07-18'),(37,62,'Chiranjeev','Rathi','123456789040','Street 5, Above Shop',5,'530002','1991-03-23'),(38,63,'Chitravansh','Chawla','123456789041','Street 6, By the Lake',6,'790001','1988-11-30'),(39,64,'Chandratan','Khanna','123456789042','Street 7, Green Park',7,'790002','1995-01-10'),(40,65,'Chalapathi','Ahuja','123456789043','Street 8, Behind Mall',8,'790003','1993-07-21'),(41,66,'Chidambara','Bhat','123456789044','Street 9, Near School',9,'500001','1990-01-01'),(42,67,'Chirasvi','Khatri','123456789045','Street 10, Close to Mall',10,'500002','1992-02-10'),(43,68,'Chiranth','Sharma','123456789046','At Post Jawala Tq Arni',67,'445105','2002-08-14'),(44,69,'Chaturik','Sood','123456789047','Street 1, Near Park',1,'500001','1990-01-01'),(45,70,'Chayadevi','Bhandari','123456789048','Street 2, Opposite Mall',2,'500002','1992-02-10'),(46,71,'Chanshikha','Bansal','123456789049','Street 3, Main Road',3,'520001','1992-02-10'),(47,72,'Chinmayananda','Bhandari','123456789050','Street 4, Near School',4,'522001','1987-07-18'),(48,73,'Chiranjeevan','Khandelwal','123456789051','Street 5, Above Shop',5,'530002','1991-03-23'),(49,74,'Chaturanga','Choudhury','123456789052','Street 6, By the Lake',6,'790001','1988-11-30');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `eventregistrations`
--

LOCK TABLES `eventregistrations` WRITE;
/*!40000 ALTER TABLE `eventregistrations` DISABLE KEYS */;
INSERT INTO `eventregistrations` VALUES (1,1,1,2,'ACTIVE',NULL),(2,2,2,2,'ACTIVE',NULL),(3,3,3,2,'ACTIVE',NULL),(4,4,4,2,'ACTIVE',NULL),(5,5,5,2,'ACTIVE',NULL),(6,6,6,2,'ACTIVE',NULL),(7,7,7,2,'ACTIVE',NULL),(8,8,8,2,'ACTIVE',NULL),(9,9,9,2,'ACTIVE',NULL),(10,10,10,2,'ACTIVE',NULL),(11,11,11,2,'ACTIVE',NULL),(12,12,12,2,'ACTIVE',NULL),(13,13,13,2,'ACTIVE',NULL),(14,14,14,2,'ACTIVE',NULL),(15,15,15,2,'ACTIVE',NULL),(16,16,16,2,'ACTIVE',NULL),(17,17,17,2,'ACTIVE',NULL),(18,18,18,2,'ACTIVE',NULL),(19,19,19,2,'ACTIVE',NULL),(20,20,20,2,'ACTIVE',NULL),(21,21,1,2,'ACTIVE',NULL),(22,22,2,2,'ACTIVE',NULL),(23,23,3,2,'ACTIVE',NULL),(24,24,4,2,'ACTIVE',NULL),(25,25,5,2,'ACTIVE',NULL),(26,26,6,2,'ACTIVE',NULL),(27,27,7,2,'ACTIVE',NULL),(28,28,8,2,'ACTIVE',NULL),(29,29,9,2,'ACTIVE',NULL),(30,30,10,2,'ACTIVE',NULL),(31,31,11,2,'ACTIVE',NULL),(32,32,12,2,'ACTIVE',NULL),(33,33,13,2,'ACTIVE',NULL),(34,34,14,2,'ACTIVE',NULL),(35,35,15,2,'ACTIVE',NULL),(36,36,16,2,'ACTIVE',NULL),(37,37,17,2,'ACTIVE',NULL),(38,38,18,2,'ACTIVE',NULL),(39,39,19,2,'ACTIVE',NULL),(40,40,20,2,'ACTIVE',NULL),(41,41,1,2,'ACTIVE',NULL),(42,42,2,2,'ACTIVE',NULL),(43,43,3,2,'ACTIVE',NULL),(44,44,4,2,'ACTIVE',NULL),(45,45,5,2,'ACTIVE',NULL),(46,46,6,2,'ACTIVE',NULL),(47,47,7,2,'ACTIVE',NULL),(48,48,8,2,'ACTIVE',NULL),(49,49,9,2,'ACTIVE',NULL);
/*!40000 ALTER TABLE `eventregistrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (11,'Kayaking in the Lake',1),(12,'Scuba Diving Experience',1),(13,'Everest Base Camp Trek',2),(14,'Kilimanjaro Climb',2),(15,'Rock Climbing at Yosemite',3),(16,'Mountain Biking in the Alps',3),(17,'City Tour of Paris',4),(18,'Historical Sites of Rome',4),(19,'Skiing in the Swiss Alps',5),(20,'Ice Fishing in Canada',5),(21,'Camel Safari in the Sahara',6),(22,'Hot Air Balloon Ride over the Desert',6),(23,'Safari in the Serengeti',7),(24,'Whale Watching in Alaska',7),(25,'Skydiving over Dubai',8),(26,'Paragliding in the Himalayas',8),(27,'Exploring the Mammoth Cave',9),(28,'Spelunking in the Blue Hole',9),(29,'Cycling Tour of Tuscany',10),(30,'Mountain Biking in Moab',10);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `organisers`
--

LOCK TABLES `organisers` WRITE;
/*!40000 ALTER TABLE `organisers` DISABLE KEYS */;
INSERT INTO `organisers` VALUES (1,16,'Om Sharma Events','GST123456789','ABCDE1234F','Street 1, Near Park',1,'500002',4.5),(2,17,'Omprakriti Creations','GST987654321','FGHIJ5678K','Street 2, Opposite Mall',2,'500002',4.6),(3,18,'Omnath Enterprises','GST456789123','LMNOP3456Q','Street 3, Main Road',3,'520001',4.1),(4,19,'Omdayal Productions','GST321654987','QRSTU7890V','Street 4, Near School',4,'522001',4.2),(5,20,'Ompal Services','GST654321789','WXYZ1234A','Street 5, Above Shop',5,'530002',4.4),(6,21,'Omshiv Solutions','GST789123456','BCDEF5678G','Street 6, By the Lake',6,'790001',4.6),(7,22,'Omchatur Events','GST123789456','HIJKL9012M','Street 7, Green Park',7,'790002',4.2),(8,23,'Ompratap Organizers','GST456123789','MNOPQ3456R','Street 8, Behind Mall',8,'790003',4.4),(9,24,'Omkanta Events','GST789456123','RSTUV7890W','Street 9, Near School',9,'500001',4.5),(10,25,'Omvijay Productions','GST321456987','XYZAB1234C','Street 10, Close to Mall',10,'500002',4.7);
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
INSERT INTO `payments` VALUES (55,1,1,'2025-02-11 13:42:29',3000,'SUCCESSFULL'),(56,2,2,'2025-02-11 13:42:29',4000,'SUCCESSFULL'),(57,3,3,'2025-02-11 13:42:29',5000,'SUCCESSFULL'),(58,4,4,'2025-02-11 13:42:29',6000,'SUCCESSFULL'),(59,5,1,'2025-02-11 13:42:29',3600,'SUCCESSFULL'),(60,6,2,'2025-02-11 13:42:29',4400,'SUCCESSFULL'),(61,7,3,'2025-02-11 13:42:29',2400,'SUCCESSFULL'),(62,8,4,'2025-02-11 13:42:29',2800,'SUCCESSFULL'),(63,9,1,'2025-02-11 13:42:29',3200,'SUCCESSFULL'),(64,10,2,'2025-02-11 13:42:29',3800,'SUCCESSFULL'),(65,11,3,'2025-02-11 13:42:29',3400,'SUCCESSFULL'),(66,12,4,'2025-02-11 13:42:29',4200,'SUCCESSFULL'),(67,13,1,'2025-02-11 13:42:29',2600,'SUCCESSFULL'),(68,14,2,'2025-02-11 13:42:29',3200,'SUCCESSFULL'),(69,15,3,'2025-02-11 13:42:29',3600,'SUCCESSFULL'),(70,16,4,'2025-02-11 13:42:29',4200,'SUCCESSFULL'),(71,17,1,'2025-02-11 13:42:29',3800,'SUCCESSFULL'),(72,18,2,'2025-02-11 13:42:29',4400,'SUCCESSFULL'),(73,19,3,'2025-02-11 13:42:29',5000,'SUCCESSFULL'),(74,20,4,'2025-02-11 13:42:29',5400,'SUCCESSFULL'),(75,21,1,'2025-02-11 13:42:29',3000,'SUCCESSFULL'),(76,22,2,'2025-02-11 13:42:29',4000,'SUCCESSFULL'),(77,23,3,'2025-02-11 13:42:29',5000,'SUCCESSFULL'),(78,24,4,'2025-02-11 13:42:29',6000,'SUCCESSFULL'),(79,25,1,'2025-02-11 13:42:29',3600,'SUCCESSFULL'),(80,26,2,'2025-02-11 13:42:29',4400,'SUCCESSFULL'),(81,27,3,'2025-02-11 13:42:29',2400,'SUCCESSFULL'),(82,28,4,'2025-02-11 13:42:29',2800,'SUCCESSFULL'),(83,29,1,'2025-02-11 13:42:29',3200,'SUCCESSFULL'),(84,30,2,'2025-02-11 13:42:29',3800,'SUCCESSFULL'),(85,31,3,'2025-02-11 13:42:29',3400,'SUCCESSFULL'),(86,32,4,'2025-02-11 13:42:29',4200,'SUCCESSFULL'),(87,33,1,'2025-02-11 13:42:29',2600,'SUCCESSFULL'),(88,34,2,'2025-02-11 13:42:29',3200,'SUCCESSFULL'),(89,35,3,'2025-02-11 13:42:29',3600,'SUCCESSFULL'),(90,36,4,'2025-02-11 13:42:29',4200,'SUCCESSFULL'),(91,37,1,'2025-02-11 13:42:29',3800,'SUCCESSFULL'),(92,38,3,'2025-02-11 13:42:29',4400,'SUCCESSFULL'),(93,39,2,'2025-02-11 13:42:29',5000,'SUCCESSFULL'),(94,40,4,'2025-02-11 13:42:29',5400,'SUCCESSFULL');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `publishevents`
--

LOCK TABLES `publishevents` WRITE;
/*!40000 ALTER TABLE `publishevents` DISABLE KEYS */;
INSERT INTO `publishevents` VALUES (1,11,1,'2025-02-15','10:00:00',1500,50,'ACTIVE','Street 1, Near Park',1,'500002'),(2,12,1,'2025-02-16','11:00:00',2000,30,'ACTIVE','Street 1, Near Park',1,'500002'),(3,13,2,'2025-02-17','09:00:00',2500,20,'ACTIVE','Street 2, Opposite Mall',2,'500002'),(4,14,2,'2025-02-18','08:00:00',3000,25,'ACTIVE','Street 2, Opposite Mall',2,'500002'),(5,15,3,'2025-02-19','14:00:00',1800,40,'ACTIVE','Street 3, Main Road',3,'520001'),(6,16,3,'2025-02-20','15:00:00',2200,35,'ACTIVE','Street 3, Main Road',3,'520001'),(7,17,4,'2025-02-21','12:00:00',1200,60,'ACTIVE','Street 4, Near School',4,'522001'),(8,18,4,'2025-02-22','13:00:00',1400,50,'ACTIVE','Street 4, Near School',4,'522001'),(9,19,5,'2025-02-23','16:00:00',1600,45,'ACTIVE','Street 5, Above Shop',5,'530002'),(10,20,5,'2025-02-24','17:00:00',1900,30,'ACTIVE','Street 5, Above Shop',5,'530002'),(11,21,6,'2025-02-25','10:30:00',1700,55,'ACTIVE','Street 6, By the Lake',6,'790001'),(12,22,6,'2025-02-26','11:30:00',2100,40,'ACTIVE','Street 6, By the Lake',6,'790001'),(13,23,7,'2025-02-27','14:30:00',1300,70,'ACTIVE','Street 7, Green Park',7,'790002'),(14,24,7,'2025-02-28','15:30:00',1600,50,'ACTIVE','Street 7, Green Park',7,'790002'),(15,25,8,'2025-03-01','12:00:00',1800,45,'ACTIVE','Street 8, Near River',8,'800001'),(16,26,8,'2025-03-02','13:00:00',2000,35,'ACTIVE','Street 8, Near River',8,'800001'),(17,27,9,'2025-03-03','10:00:00',1900,60,'ACTIVE','Street 9, Central Market',9,'900001'),(18,28,9,'2025-03-04','11:00:00',2200,50,'ACTIVE','Street 9, Central Market',9,'900001'),(19,29,10,'2025-03-05','14:00:00',2500,40,'ACTIVE','Street 10, Near Stadium',10,'100001'),(20,30,10,'2025-03-06','15:00:00',2700,30,'ACTIVE','Street 10, Near Stadium',10,'100001');
/*!40000 ALTER TABLE `publishevents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (156,1,1,4.5),(157,2,1,4.0),(158,3,2,4.5),(159,4,2,4.0),(160,5,3,4.3),(161,6,3,4.1),(162,7,4,4.2),(163,8,4,4.4),(164,9,5,4.6),(165,10,5,4.7),(166,11,6,4.8),(167,12,6,4.9),(168,13,7,4.0),(169,14,7,4.1),(170,15,8,4.2),(171,16,8,4.3),(172,17,9,4.4),(173,18,9,4.5),(174,19,10,4.6),(175,20,10,4.7),(176,21,1,4.8),(177,22,2,4.9),(178,23,3,4.0),(179,24,4,4.1),(180,25,5,4.2),(181,26,6,4.3),(182,27,7,4.4),(183,28,8,4.5),(184,29,9,4.6),(185,30,10,4.7),(186,41,1,4.8),(187,42,2,4.9),(188,43,3,4.0),(189,44,4,4.1),(190,45,5,4.2),(191,46,6,4.3),(192,47,7,4.4),(193,48,8,4.5),(194,49,9,4.6);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `users` VALUES (15,'Amit_123','9876543210','amit@example.com',1,'Dog',3),(16,'Omsharma@123','9112345678','omsharma@example.com',1,'Cat',2),(17,'Omprakriti#456','9123456789','omprakriti@example.com',2,'Tommy',2),(18,'Omnath$789','9134567890','omnath@example.com',3,'St. Mary School',2),(19,'Omdayal%147','9145678901','omdayal@example.com',4,'Harry Potter',2),(20,'Ompal@258','9156789012','ompal@example.com',5,'Delhi',2),(21,'Omshiv*369','9167890123','omshiv@example.com',6,'Inception',2),(22,'Omchatur#753','9178901234','omchatur@example.com',7,'Mr. Sharma',2),(23,'Ompratap$852','9189012345','ompratap@example.com',8,'Toyota',2),(24,'Omkanta%951','9190123456','omkanta@example.com',9,'Summer Camp',2),(25,'Omvijay@357','9201234567','omvijay@example.com',10,'Indian Cuisine',2),(26,'Chaman@123','9212345678','chaman@example.com',1,'Dog',1),(27,'Chatur#456','9223456789','chatur@example.com',2,'Tommy',1),(28,'Charvi$789','9234567890','charvi@example.com',3,'St. Peter',1),(29,'Chayan%147','9245678901','chayan@example.com',4,'The Bible',1),(30,'Chirag@258','9256789012','chira@example.com',5,'Shimla',1),(31,'Chintan*369','9267890123','chintan@example.com',6,'Avengers',1),(32,'Chatura#753','9278901234','chatura@example.com',7,'Mr. Roy',1),(33,'Chanchal$852','9289012345','chanchal@example.com',8,'Honda',1),(34,'Chandni%951','9290123456','chandni@example.com',9,'Beach Trip',1),(35,'Chavvi@357','9301234567','chavvi@example.com',10,'Pasta',1),(36,'Charul@124','9312345678','charul@example.com',1,'Tommy',1),(37,'Chandan#568','9323456789','chanda@example.com',2,'Jane',1),(38,'Chahana$897','9334567890','chahana@example.com',3,'Bright Future',1),(39,'Chinmay%453','9345678901','chinmay@example.com',4,'Harry Potter',1),(40,'Chikoo@976','9356789012','chikoo@example.com',5,'Goa',1),(41,'Chakri*412','9367890123','chakri@example.com',6,'Batman',1),(42,'Chitwan#721','9378901234','chitwan@example.com',7,'Mr. Kumar',1),(43,'Chaitali$623','9389012345','chaitali@example.com',8,'Ford',1),(44,'Chiman%846','9390123456','chiman@example.com',9,'Mountain Climb',1),(45,'Chandresh@375','9401234567','chandresh@example.com',10,'Sushi',1),(46,'Champa@823','9412345678','champa@example.com',1,'Parrot',1),(47,'Charisma#476','9423456789','charisma@example.com',2,'David',1),(48,'Chintamani$987','9434567890','chintamani@example.com',3,'Everest Academy',1),(49,'Chaturbhuj%523','9445678901','chaturbhuj@example.com',4,'War and Peace',1),(50,'Chayana@689','9456789012','chayana@example.com',5,'Mumbai',1),(51,'Chanchita*241','9467890123','chanchita@example.com',6,'Avatar',1),(52,'Chiranya#768','9478901234','chiranya@example.com',7,'Mrs. Gupta',1),(53,'Chattarpal$985','9489012345','chattarpal@example.com',8,'Chevrolet',1),(54,'Chitresh%467','9490123456','chitresh@example.com',9,'Summer Beach',1),(55,'Chitra@239','9501234567','chitra@example.com',10,'Mexican Food',1),(56,'Chaturya@124','9512345678','chaturya@example.com',1,'Rabbit',1),(57,'Chavisha#568','9523456789','chavisha@example.com',2,'Mia',1),(58,'Chathura$897','9534567890','chathura@example.com',3,'Sunrise School',1),(59,'Chirakshi%453','9545678901','chirakshi@example.com',4,'The Hobbit',1),(60,'Chintesh@976','9556789012','chintesh@example.com',5,'Chennai',1),(61,'Chandrika*412','9567890123','chandrika@example.com',6,'Matrix',1),(62,'Chiranjeev#721','9578901234','chiranjeev@example.com',7,'Mr. Kapoor',1),(63,'Chitravansh$623','9589012345','chitravansh@example.com',8,'BMW',1),(64,'Chandratan%846','9590123456','chandratan@example.com',9,'Picnic',1),(65,'Chalapathi@375','9601234567','chalapathi@example.com',10,'Chinese Cuisine',1),(66,'Chidambara@823','9612345678','chidambara@example.com',1,'Goldfish',1),(67,'Chirasvi#476','9623456789','chirasvi@example.com',2,'Rachel',1),(68,'Chiranth$987','9634567890','chiranth@example.com',3,'Star School',1),(69,'Chaturik%523','9645678901','chaturik@example.com',4,'The Alchemist',1),(70,'Chayadevi@689','9656789012','chayadevi@example.com',5,'Pune',1),(71,'Chanshikha*241','9667890123','chanshikha@example.com',6,'Iron Man',1),(72,'Chinmayananda#768','9678901234','chinmayananda@example.com',7,'Mr. Reddy',1),(73,'Chiranjeevan$985','9689012345','chiranjeevan@example.com',8,'Tesla',1),(74,'Chaturanga%467','9690123456','chaturanga@example.com',9,'School Trip',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-11 19:38:04
