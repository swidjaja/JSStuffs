'use strict';

var express 	= require('express');
var redisCache 	= require('./libs/redisCache');
var rsvp 		= require('rsvp');
var _           = require('lodash');
var app 		= express();

var redisStatusCacheTime = 60000;

var cache = redisCache({
	host: 'localhost',
	portNumber: 6379//,
	//max_attempts: 1
});

var redisStatus = {
    isAlive: false,
    serverInfo: {}
};

var checkRedisCacheStatus = function () {
    redisStatus.isAlive = cache.isConnected();
    if (redisStatus.isAlive) {
        redisStatus.serverInfo = cache.getServerInfo();
    } else {
        redisStatus.serverInfo = {};
    }

    setTimeout(function () {
        checkRedisCacheStatus();
    }, redisStatusCacheTime);
};

checkRedisCacheStatus();

app.get('/redishealthcheck', function (req, res) {
    res.json(redisStatus);
});

app.listen(8888);
