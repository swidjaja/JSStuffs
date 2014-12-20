'use strict';

/**
 * This is the nickname service for ChatServer. 
 * Duties:
 * - Handle user nickname change request (allow/reject)
 * TODO:
 * - Handle user nickname registration
 */

function NicknameService() {
    this.nicknames = {};
};

NicknameService.prototype.rejectReason = {
	NICKNAME_BEING_USED: 1,
	NICKNAME_IS_REGISTERED: 2,
	NICKNAME_IS_RESERVED: 3
};

NicknameService.prototype.addNickname = function(nickname, client) {
    var searchKey = nickname.toLowerCase();
    if (this.nicknames[searchKey]) {
        return {'okToAdd': false, 'errorCode': this.rejectReason.NICKNAME_BEING_USED};
    } else {
        this.nicknames[searchKey] = client;
        return {'okToAdd': true};
    }
};

NicknameService.prototype.removeNickname = function(nickname) {
    delete this.nicknames[nickname.toLowerCase()];
};

NicknameService.prototype.handleNicknameChange = function(oldNickname, newNickname, client) {
    var searchKey = newNickname.toLowerCase();
    if (this.nicknames[searchKey]) {
        return {'okToSwitch': false, 'errorCode': this.rejectReason.NICKNAME_BEING_USED};
    } else {
        delete this.nicknames[oldNickname.toLowerCase()];
        this.nicknames[searchKey] = client;
        return {'okToSwitch': true}
    }
};

NicknameService.prototype.userLookupFromNickname = function(nickname) {
    return this.nicknames[nickname.toLowerCase()];
};

function initialize(client) {
	return new NicknameService();
}

exports.initialize = initialize;
