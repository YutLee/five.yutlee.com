CREATE DATABASE  IF NOT EXISTS `five` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `five`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: five
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` bigint(100) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(100) NOT NULL,
  `mateiial_id` bigint(100) NOT NULL COMMENT '评论的视频/图文/音频等id',
  `content` varchar(300) NOT NULL COMMENT '评论内容',
  `create_time` int(13) NOT NULL COMMENT '评论时间',
  `user_name` varchar(45) NOT NULL,
  `to_user_id` bigint(100) DEFAULT NULL,
  `to_user_name` varchar(45) DEFAULT NULL COMMENT '该评论回复的评论的用户名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='评论表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` bigint(100) NOT NULL AUTO_INCREMENT,
  `path` varchar(200) NOT NULL,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `size` varchar(100) NOT NULL,
  `attr` varchar(45) DEFAULT NULL,
  `create_time` varchar(13) DEFAULT NULL,
  `update_time` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COMMENT='文件表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (5,'/','test','txt',10000000,'10',NULL,NULL,NULL),(6,'uploads/10000002/','02403ca82b2802edda68e7bcda487ec2','application/javascript',10000002,'2231',NULL,NULL,NULL),(7,'uploads/10000002/','4086a4b163bd10682be2cc6ff1129d9f','application/octet-stream',10000002,'1589',NULL,'1490513548282','1490513548282'),(8,'uploads/10000002/','af39c116bee76d0a62136ba3080dad4a','text/html',10000002,'13132',NULL,'1490513745673','1490513745673');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `production` (
  `id` bigint(100) NOT NULL AUTO_INCREMENT,
  `file_id` bigint(100) NOT NULL,
  `title` varchar(200) NOT NULL COMMENT '标题',
  `sub` varchar(200) DEFAULT NULL COMMENT '副标题',
  `type` varchar(45) NOT NULL COMMENT '类型：视频、图片、音频、文档',
  `author` varchar(45) NOT NULL COMMENT '作者',
  `create_time` int(13) NOT NULL COMMENT '创建时间',
  `issue_time` int(13) DEFAULT NULL COMMENT '发布时间',
  `update_time` int(13) NOT NULL COMMENT '更新时间',
  `status` int(11) NOT NULL COMMENT '状态：已发布，未发布',
  `description` varchar(400) DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='产品表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production`
--

LOCK TABLES `production` WRITE;
/*!40000 ALTER TABLE `production` DISABLE KEYS */;
/*!40000 ALTER TABLE `production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_auths`
--

DROP TABLE IF EXISTS `user_auths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_auths` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL COMMENT '用户信息表id',
  `identity_type` varchar(64) NOT NULL COMMENT '登录类型（手机号 邮箱 用户名）或第三方应用名称（微信 微博等）',
  `identifier` varchar(128) NOT NULL COMMENT '标识（手机号 邮箱 用户名或第三方应用的唯一标识）',
  `credential` varchar(512) NOT NULL COMMENT '密码凭证（站内的保存密码，站外的不保存或保存token）',
  `status` bigint(1) NOT NULL DEFAULT '0',
  `activation_code` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000003 DEFAULT CHARSET=utf8 COMMENT='用户授权信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auths`
--

LOCK TABLES `user_auths` WRITE;
/*!40000 ALTER TABLE `user_auths` DISABLE KEYS */;
INSERT INTO `user_auths` VALUES (10000000,10000000,'username','test','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjQ3RUMyREQ3OTFFMzFFMkVGMjA3NkNBRjY0RUQ5QjNEIn0.pwF6qR8Sz9ZF5sZk5ABkfqHUCJyY6qrpFRLctnDMACU',0,NULL),(10000001,10000000,'username','test1','111111',0,NULL),(10000002,10000001,'username','test2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjExMTExMSJ9.yPu6NxyaHGoKb_eQMPTsB-Rh4Sqb2faRbrefShI5r7M',0,NULL);
/*!40000 ALTER TABLE `user_auths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(128) DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(256) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000002 DEFAULT CHARSET=utf8 COMMENT='用户基础信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10000000,NULL,NULL),(10000001,NULL,NULL);
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

-- Dump completed on 2017-04-24  1:53:12
