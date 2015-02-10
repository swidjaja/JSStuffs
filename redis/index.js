'use strict';

var express 	= require('express');
var redisCache 	= require('./libs/redisCache');
var rsvp 		= require('rsvp');
var _           = require('lodash');
var app 		= express();

var cache = redisCache({
	host: 'localhost',
	portNumber: 6379,
	max_attempts: 1
});

_.assign(app.locals, {
    startTime: new Date().toISOString()
});

app.get('/test1', function (req, res) {
    var response = {
        startTime: req.app.locals.startTime
    };
    cache.set('myKey', 'myVal2').then( 
    	function (resp) {
    		cache.get('myKey').then(
                function (resp) {
                    response.key = 'myKey';
                    response.value = resp;
                    response.error = '';
                    res.json(response);
                },
                function (err) {
                    response.error = err;
                    res.json(response);
                }
            );
    	},
    	function (err) {
    		response.error = err;
            res.json(response);
    	}
    );
});

app.listen(8888);
