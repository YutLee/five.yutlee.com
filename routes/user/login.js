var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtauth = require('./jwtauth');
var mysql = require('mysql');
var cache = require('memory-cache');
var $db = require('../../conf/db');

/**
 * @api {post} /login Login
 * @apiGroup User
 * @apiName Login
 * @apiVersion 0.1.0
 *
 * @apiParam {String} username 登录名（用户名/邮箱/手机号）
 * @apiParam {String} password 密码
 *
 * @apiSuccess {Number} code 提示代码（200， 4001， 4002， 4003）。
 * @apiSuccess {String} message 提示信息。
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "code": 200,	//登录成功
 *      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwMDAwMDAsInVzZXJfaWQiOjEwMDAwMDAwLCJpYXQiOjE0NzczNjc4ODAsImV4cCI6MTQ3NzM2OTY4MH0.tXoaawIr3Ln5rYFviAso0K9R9DPN_qe8AF2R-y1dwpU"
 *  }
 *
 *  HTTP/1.1 200 OK
 *  {
 *      "code": 4001,
 *      "message": "用户名不能为空"
 *  }
 *
 *  HTTP/1.1 200 OK
 *  {
 *      "code": 4002,
 *      "message": "密码不能为空"
 *  }
 *
 *  HTTP/1.1 200 OK
 *  {
 *      "code": 4003,
 *      "message": "用户名或密码错误"
 *  }
 *
 * @apiError {Number} code 提示代码。
 * @apiError {String} message 提示信息。
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 404 Not Found
 *  {
 *      "code": 404,
 *      "message": "请求页面不存在"
 *  }
 */
router.post('/', jwtauth.next, function(req, res, next) {

	var connection, password;
	const TIMEOUT = 1800;

	if(req.status == 401) {
		if(!req.body || !req.body.username || req.body.username.trim() == '') {
			res.status(200).json({code: 4001, message: '用户名不能为空'});
			return;
		}
		if(!req.body || !req.body.password || req.body.password.trim() == '') {
			res.status(200).json({code: 4002, message: '密码不能为空'});
			return;
		}

		password = jwt.sign({ password: req.body.password }, 'password', {noTimestamp: true});

		connection = mysql.createConnection($db.mysql);
		connection.query('select * from user_auths where identifier="' + req.body.username + '" and credential="' + password + '"', function(err, rows, fields) {
			if(err || (rows && rows.length <= 0)) {
				// throw err;
				res.status(200).json({code: 4003, message: '用户名或密码错误'});//better 401?
				return;
			}

			var token = jwt.sign({ id: rows[0].id, user_id: rows[0].user_id }, 'access_token', {expiresIn: TIMEOUT});
			cache.put('access_token_last_' + rows[0].id, Date.now(), TIMEOUT * 1000);
			cache.put('access_token_' + rows[0].id, token, TIMEOUT * 1000, function(key, value) {
				// console.log(key + ' : ' + value);
			});
			// res.cookie('access_token', token, { maxAge: 7 * 24 * 3600000, httpOnly: true });
			res.cookie('access_token', token, { maxAge: TIMEOUT * 1000 });
			// res.header('x-access-token', token);
			// req.session.access_token = token;
			res.status(200).json({code: 200, access_token: token});
		});
	}else if(req.status == 200) {
		var decoded = req.tokenDecoded;
		var accessToken = req.token;
		if(Date.now() - cache.get('access_token_last_' + decoded.id) > (TIMEOUT - 60) * 1000) {
			accessToken = jwt.sign({ id: decoded.id, user_id: decoded.user_id }, 'access_token', {expiresIn: TIMEOUT});
			cache.put('access_token_last_' + decoded.id, Date.now(), TIMEOUT * 1000);
			cache.put('access_token_' + decoded.id, accessToken, TIMEOUT * 1000, function(key, value) {
				// console.log(key + ' : ' + value);
			});
			res.cookie('access_token', accessToken, { maxAge: TIMEOUT * 1000 });
		}
		res.status(200).json({code: 200, access_token: accessToken});
	}else {
		res.status(200).json({code: 5000, message: '未知错误'});
	}
});

module.exports = router;

