var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var cache = require('memory-cache');
var $db = require('../../conf/db');

function auth(req, res, next, isNext) {
    // res.set('Content-Type', 'application/json;charset=utf-8');
    var token = (req.cookies && req.cookies.access_token) || req.headers['x-access-token'] || (req.body && req.body.access_token) || (req.query && req.query.access_token);
    // var token = req.session.access_token || null;
    function authentication() {
        return isNext ? next() : res.status(401).json({code: 401, message: '需要身份认证'});
    }

    if(token) {
        var decoded;
        var now = Math.floor(Date.now() / 1000);
        try{
            decoded = jwt.verify(token, 'access_token');
        }catch(err) {
            req.status = 401;
            authentication();
        }

        if(!decoded || (decoded.iat > now || decoded.exp < now)) {
            req.status = 401;
            authentication();
            return;
        }

        var accessToken = cache.get('access_token_' + decoded.id);
        // console.log(accessToken);
        if(!accessToken) {
            req.status = 401;
            authentication();
            return;
        }else {
            req.tokenDecoded = decoded;
            req.token = token;
            req.status = 200;
            next();
        }
    } else {
        req.status = 401;
        authentication();
    }
};

function jwtauth(req, res, next) {
    auth(req, res, next);
}

jwtauth.next = function(req, res, next) {
    auth(req, res, next, 1);
}

module.exports = jwtauth;
