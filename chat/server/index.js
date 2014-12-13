'use strict';

var net = require('net');
var ChatServer = require('./ChatServer');

var chatServer = ChatServer.initialize();
var portNumber = chatServer.getPortNumber();

var server = net.createServer(function(client) {

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
	console.log("Chat server is now up at port ", portNumber);
});