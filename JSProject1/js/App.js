define(function(require) {
	'use strict';

	var GridPhotoController = require('modules/GridPhotoController');

	var initialize = function() {
		var photo = new GridPhotoController({
			url: 'http://img2.timeinc.net/people/i/2013/specials/beauties/sneek-peak/zooey-deschanel-435.jpg',
			description: 'Zooey Deschanel'
		});

		photo.setActive(true);
		photo.destroy();
	};

	return {
		initialize: initialize
	};
});