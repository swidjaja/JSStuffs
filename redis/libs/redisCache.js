'use strict';

var redis 	= require('redis');
var rsvp 	= require('rsvp'); 

module.exports = function (options) {
	options = options || {};
	var host = options.host || 'localhost';
	var portNumber = options.portNumber || 6379;
    var redisClientConnected = false;
	var redisClient = redis.createClient(portNumber, host, options);
	
	redisClient.on('error', function (err) {
        redisClientConnected = false;
	});

    redisClient.on('ready', function () {
        redisClientConnected = true;
    });

	var apis = {
        isConnected: function () {
            return redisClientConnected;
        },
        disconnect: function () {
            redisClient.quit();
        },
        getServerInfo: function () {
        	return redisClient.server_info;
        },
		get: function (key) {
			// Why not rsvp.denodeify(redisClient.get)(key)?
			// denodeify will get the redisClient.get function object and
			// it will be just a function and the relationship to parent (redisClient) is lost
			// Thus, we need to bind the function to the parent.
			// http://stackoverflow.com/questions/22419382/cannot-denodeify-methods-in-node-ftp-module
			return rsvp.denodeify(redisClient.get.bind(redisClient))(key);
		},
		set: function (key, value) {
			return rsvp.denodeify(redisClient.set.bind(redisClient))(key, value);
		},
		del: function (key) {
			return rsvp.denodeify(redisClient.del.bind(redisClient))(key);
		}
	};

	return apis;
};
