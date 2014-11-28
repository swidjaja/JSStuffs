define(function(require) {
	'use strict';

	var NavigatableItemController = require('modules/NavigatableItemController');
	var GridPhotoView = require('modules/GridPhotoView');

	var GridPhotoController = NavigatableItemController.extend({
		initialize: function(options) {
			GridPhotoController.__super__.initialize.apply(this, arguments);
			this.view = new GridPhotoView({
				url: options.url || '',
				description: options.description
			});
			this.view.render();
			this.setActive(true);
		},

		setActive: function(active) {
			GridPhotoController.__super__.setActive.apply(this, arguments);
			this.view.setActive(active);
		}
	});

	return GridPhotoController;
});