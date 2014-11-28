define(function(require) {
	'use strict';

	var BaseController = require('modules/BaseController');

	var NavigatableItemController = BaseController.extend({
		initialize: function(options) {
			NavigatableItemController.__super__.initialize.apply(this, arguments);
			this.active = false;
		},

		setActive: function(active) {
			this.active = active;
		},

		enterPressed: function() {
		}
	});

	return NavigatableItemController;
});