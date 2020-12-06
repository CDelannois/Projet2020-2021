-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: jeux_de_societe
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jeux` (
  `id_jeux` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `joueurs_min` int NOT NULL,
  `joueurs_max` int NOT NULL,
  `duree` int NOT NULL,
  `age_recommande` int NOT NULL,
  `mecanisme` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mecanisme2` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date_parution` date NOT NULL,
  `editeur` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `commentaire` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `appartient` int NOT NULL,
  PRIMARY KEY (`id_jeux`),
  KEY `fk_membre_jeu_idx` (`appartient`),
  CONSTRAINT `fk_membre_jeu` FOREIGN KEY (`appartient`) REFERENCES `membre` (`id_membre`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeux`
--

LOCK TABLES `jeux` WRITE;
/*!40000 ALTER TABLE `jeux` DISABLE KEYS */;
INSERT INTO `jeux` VALUES (1,'Plouf Party',3,6,15,6,'Mémoire',NULL,'2018-06-28','Cocktail Games',NULL,1),(2,'Yogi',3,10,15,8,'Habileté',NULL,'2017-06-01','Gigamic',NULL,2),(3,'6 qui prend!',2,10,45,10,'Simultané',NULL,'2007-01-01','Gigamic',NULL,2),(4,'Jet lag',3,8,30,12,'Questions',NULL,'2018-01-01','Cocktail Games',NULL,1),(5,'Lâche pas la savonette',3,6,15,16,'Gestion de main',NULL,'2018-07-13','Dont\' panic games',NULL,2),(6,'Time Bomb',4,8,30,8,'Bluff',NULL,'2016-11-04','Iello',NULL,2),(7,'Héros à louer',3,5,30,14,'Gestion de ',NULL,'2014-01-01','Iello',NULL,1),(8,'Secrets',4,8,15,10,'Rôle caché',NULL,'2017-01-01','Repos Production',NULL,1),(9,'Triple hourra pour le Maître!',2,6,30,14,'Placement',NULL,'2017-04-01','Edge Entertainement',NULL,1),(10,'Mascarade',2,13,30,8,'Rôle caché',NULL,'2013-06-01','Repos Production',NULL,2),(11,'Citadelles',2,8,90,10,'Bluff',NULL,'2000-01-01','Millenium',NULL,1),(12,'Bad News',3,10,30,18,'Ambiance',NULL,'2019-12-01','404 éditions',NULL,1),(13,'La petite mort',2,4,30,14,'Gestion de main',NULL,'2018-10-01','Lumberjack Studio',NULL,1),(14,'Bears vs Babies',2,4,15,7,'Gestion de main',NULL,'2017-06-01','Auto-édité',NULL,1),(15,'Dard Dard',3,5,25,7,'Gestion de main',NULL,'2018-03-01','Gigagmic',NULL,1),(16,'Poker des cafards',2,6,15,8,'Bluff',NULL,'2013-02-01','Gigamic',NULL,1),(17,'Scripta',2,6,30,10,'Réflexion',NULL,'2018-10-01','Aliadys',NULL,1),(18,'Exploding Kittens',2,5,20,7,'Pioche',NULL,'2015-06-01','Auto-édité',NULL,1),(19,'Mission Calaveras',3,6,25,12,'Gestion de main',NULL,'2019-03-01','Gigamic',NULL,2),(20,'Intrigue',3,5,45,12,'Négociation',NULL,'2016-02-01','Igiari',NULL,1),(21,'Galèrapagos',3,12,20,8,'Semi-coopéraif',NULL,'2017-09-01','Gigamic',NULL,1),(22,'Saboteurs',3,10,30,8,'Coopératif',NULL,'2007-01-01','Gigamic',NULL,1);
/*!40000 ALTER TABLE `jeux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membre`
--

DROP TABLE IF EXISTS `membre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membre` (
  `id_membre` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telephone` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `adresse` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date_naissance` date NOT NULL,
  PRIMARY KEY (`id_membre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membre`
--

LOCK TABLES `membre` WRITE;
/*!40000 ALTER TABLE `membre` DISABLE KEYS */;
INSERT INTO `membre` VALUES (1,'Delannois','Charles','0476017199','charles.delannois@live.be','45A Rue Basse Dottignies','1990-04-11'),(2,'Favier','Marie','0498735465','marie.favier@outlook.com','45A Rue Basse Dottignies','1992-05-27');
/*!40000 ALTER TABLE `membre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'jeux_de_societe'
--

--
-- Dumping routines for database 'jeux_de_societe'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-06 11:31:50
