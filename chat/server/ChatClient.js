'use strict';

var chatClientCounter = 0;

function ChatClient(client) {
	this.client = client;
	this.nickName = 'Guest' + chatClientCounter++;
	this.ipAddress = client.remoteAddress;
}

ChatClient.prototype.getNickname = function() {
	return this.nickName;
};

ChatClient.prototype.setNickname = function(nickName) {
	this.nickName = nickName;
};

ChatClient.prototype.getIPAddress = function() {
	return this.ipAddress;
};

ChatClient.prototype.getClientParam = function() {
	return this.client;
};

ChatClient.prototype.destroy = function() {

	// Remove this attribute so it can be GC'd
	delete this.client;
};

function initialize(client) {
	return new ChatClient(client);
}

exports.initialize = initialize;