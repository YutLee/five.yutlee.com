-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: five
-- ------------------------------------------------------
-- Server version	5.7.15

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` bigint(10) NOT NULL,
  `name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '分类名称',
  `description` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '分类描述',
  `logo` varchar(256) COLLATE utf8_bin DEFAULT NULL COMMENT '分类logo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choice_auth`
--

DROP TABLE IF EXISTS `choice_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `choice_auth` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `create_time` bigint(13) NOT NULL,
  `user_nick_name` varchar(128) CHARACTER SET utf8 DEFAULT NULL COMMENT '作者昵称',
  `user_avatar` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '作者头像',
  `user_introduction` varchar(120) CHARACTER SET utf8 DEFAULT NULL COMMENT '作者简介',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='精选作者';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choice_auth`
--

LOCK TABLES `choice_auth` WRITE;
/*!40000 ALTER TABLE `choice_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `choice_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choice_production`
--

DROP TABLE IF EXISTS `choice_production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `choice_production` (
  `id` bigint(100) NOT NULL,
  `production_id` bigint(100) NOT NULL COMMENT '作品id',
  `create_time` bigint(13) NOT NULL COMMENT '精选时间',
  `category_name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '精选作品所属分类',
  `title` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '精选作品标题',
  `production_play_time` bigint(13) DEFAULT NULL COMMENT '精选作品（视频）时长',
  `category_id` bigint(10) NOT NULL,
  `production_cover` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '作品封面',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='精选作品';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choice_production`
--

LOCK TABLES `choice_production` WRITE;
/*!40000 ALTER TABLE `choice_production` DISABLE KEYS */;
/*!40000 ALTER TABLE `choice_production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` bigint(100) NOT NULL,
  `user_id` bigint(100) NOT NULL,
  `mateiial_id` bigint(100) NOT NULL COMMENT '评论的视频/图文/音频等id',
  `content` varchar(300) CHARACTER SET latin1 NOT NULL COMMENT '评论内容',
  `create_time` bigint(13) NOT NULL COMMENT '评论时间',
  `user_name` varchar(45) CHARACTER SET latin1 NOT NULL COMMENT '评论用户的名称',
  `to_user_id` bigint(100) DEFAULT NULL COMMENT '被回复的用户id',
  `to_user_name` varchar(45) CHARACTER SET latin1 DEFAULT NULL COMMENT '被回复的用户名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='评论表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorite` (
  `id` bigint(20) NOT NULL,
  `production_id` bigint(100) NOT NULL,
  `create_time` bigint(13) DEFAULT NULL,
  `category_name` varchar(45) CHARACTER SET utf8 NOT NULL,
  `title` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `production_play_time` bigint(13) DEFAULT NULL,
  `category_id` bigint(10) NOT NULL,
  `production_cover` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '作品封面',
  `user_id` bigint(20) NOT NULL COMMENT '收藏的用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='收藏表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` bigint(100) NOT NULL AUTO_INCREMENT,
  `path` varchar(200) CHARACTER SET latin1 NOT NULL COMMENT '文件路径',
  `name` varchar(45) CHARACTER SET latin1 NOT NULL COMMENT '文件名称',
  `type` varchar(45) CHARACTER SET latin1 NOT NULL COMMENT '文件后缀',
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `size` varchar(100) CHARACTER SET latin1 NOT NULL COMMENT '文件大小',
  `attr` varchar(45) CHARACTER SET latin1 DEFAULT NULL COMMENT '文件属性',
  `create_time` bigint(13) DEFAULT NULL COMMENT '创建文件的时间',
  `update_time` bigint(13) DEFAULT NULL COMMENT '更新文件的时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='文件表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (6,'uploads/10000002/','02403ca82b2802edda68e7bcda487ec2','application/javascript',10000002,'2231',NULL,NULL,NULL),(7,'uploads/10000002/','4086a4b163bd10682be2cc6ff1129d9f','application/octet-stream',10000002,'1589',NULL,1490513548282,1490513548282),(8,'uploads/10000002/','af39c116bee76d0a62136ba3080dad4a','text/html',10000002,'13132',NULL,1490513745673,1490513745673);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `focus_auth`
--

DROP TABLE IF EXISTS `focus_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `focus_auth` (
  `id` bigint(100) NOT NULL,
  `user_id` bigint(20) NOT NULL COMMENT '关注者id',
  `auth_nick_name` varchar(128) COLLATE utf8_bin DEFAULT NULL COMMENT '被关注作者昵称',
  `auth_avatar` varchar(256) COLLATE utf8_bin DEFAULT NULL COMMENT '被关注作者头像',
  `auth_introduction` varchar(120) COLLATE utf8_bin DEFAULT NULL COMMENT '被关注作者简介',
  `auth_id` bigint(20) NOT NULL COMMENT '被关注作者id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='关注的作者';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `focus_auth`
--

LOCK TABLES `focus_auth` WRITE;
/*!40000 ALTER TABLE `focus_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `focus_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `focus_category`
--

DROP TABLE IF EXISTS `focus_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `focus_category` (
  `id` bigint(100) NOT NULL,
  `category_id` bigint(10) NOT NULL,
  `category_name` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '分类名称',
  `user_id` bigint(20) NOT NULL COMMENT '关注者id',
  `category_logo` varchar(256) COLLATE utf8_bin DEFAULT NULL COMMENT '分类logo',
  `category_description` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '分类描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='关注的分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `focus_category`
--

LOCK TABLES `focus_category` WRITE;
/*!40000 ALTER TABLE `focus_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `focus_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `production` (
  `id` bigint(100) NOT NULL,
  `file_id` bigint(100) NOT NULL COMMENT '文件id',
  `title` varchar(200) CHARACTER SET latin1 NOT NULL COMMENT '标题',
  `sub` varchar(200) CHARACTER SET latin1 DEFAULT NULL COMMENT '副标题',
  `type` varchar(45) CHARACTER SET latin1 NOT NULL COMMENT '类型：视频、图片、音频、文档',
  `author` varchar(45) CHARACTER SET latin1 NOT NULL COMMENT '作者',
  `create_time` bigint(13) NOT NULL COMMENT '创建时间',
  `issue_time` bigint(13) DEFAULT NULL COMMENT '发布时间',
  `update_time` bigint(13) NOT NULL COMMENT '更新时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：已发布，未发布',
  `description` varchar(400) CHARACTER SET latin1 DEFAULT NULL COMMENT '描述',
  `content` text CHARACTER SET latin1 COMMENT '内容',
  `category_id` bigint(10) NOT NULL DEFAULT '10000000' COMMENT '分类id，默认为10000000表示其他',
  `category_name` varchar(45) COLLATE utf8_bin NOT NULL DEFAULT '其他' COMMENT '分类名称 - 默认为‘其他’',
  `owner` tinyint(4) NOT NULL DEFAULT '0' COMMENT '权限 - 默认为0表示公开，1表示私密，2表示关注用户可见',
  `verify` tinyint(4) NOT NULL DEFAULT '0' COMMENT '审核状态，默认为0，表示未审核，1表示审核通过，2表示审核未通过',
  `play_time` bigint(13) DEFAULT NULL COMMENT '视频时长',
  `share_times` int(100) NOT NULL DEFAULT '0' COMMENT '被分享的次数',
  `read_times` int(100) NOT NULL DEFAULT '0' COMMENT '阅读/观看次数',
  `cover` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '作品封面',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='作品表';
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
  `identity_type` varchar(64) CHARACTER SET utf8 NOT NULL COMMENT '登录类型（手机号 邮箱 用户名）或第三方应用名称（微信 微博等）',
  `identifier` varchar(128) CHARACTER SET utf8 NOT NULL COMMENT '标识（手机号 邮箱 用户名或第三方应用的唯一标识）',
  `credential` varchar(512) CHARACTER SET utf8 NOT NULL COMMENT '密码凭证（站内的保存密码，站外的不保存或保存token）',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '激活状态，默认为0表示未激活，1表示已激活',
  `activation_code` varchar(128) CHARACTER SET utf8 DEFAULT NULL COMMENT '激活码',
  PRIMARY KEY (`id`),
  KEY `id_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000003 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户授权信息表';
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
  `id` bigint(20) NOT NULL,
  `nick_name` varchar(128) CHARACTER SET utf8 DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(256) CHARACTER SET utf8 DEFAULT NULL COMMENT '头像',
  `mobile` varchar(11) COLLATE utf8_bin DEFAULT NULL COMMENT '用户手机号码',
  `email` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '用户电子邮箱',
  `level` int(11) NOT NULL DEFAULT '1' COMMENT '用户等级，默认为1',
  `sex` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '性别',
  `birthday` bigint(13) DEFAULT NULL COMMENT '生日',
  `introduction` varchar(120) COLLATE utf8_bin DEFAULT NULL COMMENT '个人简介',
  `role` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户角色，默认为0表示普通用户，1表示超级管理员，2表示认证个人，3表示认证企业',
  `share_times` int(100) NOT NULL DEFAULT '0' COMMENT '被分享次数，包括分享该作者或者其作品',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10000000,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,0,0),(10000001,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,0,0);
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

-- Dump completed on 2017-04-27 18:05:19
