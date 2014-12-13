'use strict';

/**
 * This is the nickname service for ChatServer. 
 * Duties:
 * - Handle user nickname change request (allow/reject)
 * TODO:
 * - Handle user nickname registration
 */

function NicknameService() {
};

NicknameService.prototype.rejectReason = {
	NICKNAME_BEING_USED: 1,
	NICKNAME_IS_REGISTERED: 2,
	NICKNAME_IS_RESERVED: 3
};

NicknameService.prototype.handleNicknameChange = function(client, newNickname) {

};

function initialize(client) {
	return new NicknameService();
}

exports.initialize = initialize;