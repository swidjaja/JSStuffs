define(function(require) {
	'use strict';

	var Backbone = require('backbone');

	var BaseView = Backbone.View.extend({
		destroy: function() {
			this.remove();
		}
	});

	return BaseView;
});