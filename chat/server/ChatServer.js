'use strict';

var ChatClient = require('./ChatClient');
var NickServ = require('./NicknameService');

function ChatServer(options) {
	options = options || {};
	this.encodingType = options.encodingType || 'utf8';
	this.anonUserPrefix = 'Guest';
	this.clients = [];
	this.nickServ = NickServ.initialize();
}

ChatServer.prototype.portNumber = 8001;

ChatServer.prototype.MAX_NUMBER_OF_USERS = 2;

ChatServer.prototype.getPortNumber = function() {
	return this.portNumber;
};

ChatServer.prototype.addClient = function(client) {
	var newClient = false;
	var nickname;
	var ipAddress;
	var msgStr;

	try {
		if (this.clients.length < this.MAX_NUMBER_OF_USERS) {
			newClient = ChatClient.initialize(client);
			nickname = newClient.getNickname();
			ipAddress = newClient.getIPAddress();
			this.clients.push(newClient);
			var msgStr = this._getUserConnectedMsgStr(nickname, ipAddress);
			this._broadcastMsg(newClient, msgStr);
		}
	} catch (ex) {
		newClient = false;
		console.log(ex.stack);
	}
	return newClient;
};

ChatServer.prototype.removeClient = function(client) {
	var success = true;
	var nickname;
	var ipAddress;
	var msgStr;

	try {
		for (var idx = 0, max = this.clients.length; idx < max; ++idx) {
			var thisClient = this.clients[idx];
			if (thisClient === client) {
				nickname = thisClient.getNickname();
				ipAddress = thisClient.getIPAddress();
				this.clients.splice(idx, 1);
				thisClient.destroy();
				break;
			}
		}
		if (nickname && ipAddress) {
			msgStr = this._getUserDisconnectedMsgStr(nickname, ipAddress);
			this._broadcastMsg(client, msgStr);
		}
	} catch (ex) {
		success = false;
		console.log(ex.stack);
	}
	return success;
};

ChatServer.prototype.processUserMsg = function(msgingClient, msg) {
	var msg = msg.toString();
	// TODO: This is service msg case. Not yet implemented!
	if (msg.substring(0, 1) === '/') {
		this._processServiceMsg(msgingClient, msg);
	} else {
		this._broadcastUserMsg(msgingClient, msg);
	}
};

ChatServer.prototype._processServiceMsg = function(msgingClient, msg) {
};

ChatServer.prototype._broadcastUserMsg = function(msgingClient, msg) {
	var nickname = msgingClient.getNickname();
	var msgStr = this._getUserPublicMsgStr(nickname, msg);
	this._broadcastMsgAll(msgingClient, msgStr );
};

ChatServer.prototype._broadcastMsgAll = function(msgingClient, msg) {
	var success = true;
	var thisClientParam;

	try {
		for (var idx = 0, max = this.clients.length; idx < max; ++idx) {
			var thisClient = this.clients[idx];
			thisClientParam = thisClient.getClientParam();
			thisClientParam.write(msg);
		}
	} catch (ex) {
		success = false;
		console.log(ex.stack);
	}
	return success;
};

ChatServer.prototype._broadcastMsg = function(msgingClient, msg) {
	var success = true;
	var thisClientParam;

	try {
		for (var idx = 0, max = this.clients.length; idx < max; ++idx) {
			var thisClient = this.clients[idx];
			if (msgingClient !== thisClient) {
				thisClientParam = thisClient.getClientParam();
				thisClientParam.write(msg);
			}
		}
	} catch (ex) {
		success = false;
		console.log(ex.stack);
	}
	return success;
};

ChatServer.prototype._broadcastPrivateMsg = function(msgingClient, msg) {
	var success = true;
	var thisClientParam;

	try {
		for (var idx = 0, max = this.clients.length; idx < max; ++idx) {
			var thisClient = this.clients[idx];
			if (msgingClient === thisClient) {
				thisClientParam = thisClient.getClientParam();
				thisClientParam.write(msg);
				break;
			}
		}
	} catch (ex) {
		success = false;
		console.log(ex.stack);
	}
	return success;
};

ChatServer.prototype._getUserPublicMsgStr = function(nickname, msg) {
	msg = nickname + ' : ' + msg;
	return msg;
};

ChatServer.prototype._getUserConnectedMsgStr = function(nickname, ipAddress) {
	var msg = '*** ' + nickname + ' ( ' + ipAddress + ' ) has joined the chat\n';
	return msg;
};

ChatServer.prototype._getUserDisconnectedMsgStr = function(nickname, ipAddress) {
	var msg = '*** ' + nickname + ' ( ' + ipAddress + ' ) has left the chat\n';
	return msg;
};

function initialize(options) {
	return new ChatServer(options);
}

exports.initialize = initialize;