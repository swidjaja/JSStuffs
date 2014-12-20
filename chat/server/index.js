'use strict';

var net = require('net');
var ChatServer = require('./ChatServer');

var args;
var errorMsg = '';
var allOptions = {};
var chatServer;
var portNumber;
var serverName;
var server;

(function() {
	args = process.argv && process.argv.slice(2);
	args.forEach(function(arg, idx) {
		if (idx % 2 == 0) {
			var oper = arg;
			var operand = args[idx + 1];
			if (oper.indexOf('--') === 0 && oper.length > 2) {
				oper = oper.substring(2);
				if (operand && operand.indexOf('--') !== 0) {
					allOptions[oper] = operand;
				} else {
					errorMsg = 'Option ' + oper + ' does not have correct value!';
				}
				allOptions[oper] = operand;
			} else {
				errorMsg = 'Invalid option specified!';
			}
			if (errorMsg) {
				return false;
			}
		}
	});
	if (errorMsg) {
		console.log('Cannot start ChatServer! - ' + errorMsg);
		process.exit();
	}

	chatServer = ChatServer.initialize(allOptions);
	portNumber = chatServer.getPortNumber();
	serverName = chatServer.getName();

	server = net.createServer(function(client) {

		var newClient = chatServer.addClient(client);

		if (!newClient) {
			client.end();
		} else {
			client.on('data', function(data) {
				chatServer.processUserMsg(newClient, data);
			});
			client.on('close', function(hadError) {
				chatServer.removeClient(newClient);
				newClient = null;
			});
		}
	});

	server.listen(portNumber, function() {
		console.log('Chat server ' + serverName + ' is now up at port ' + portNumber);
	});
})();

