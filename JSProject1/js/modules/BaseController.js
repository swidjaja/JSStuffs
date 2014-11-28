define(function(require) {
	'use strict';

	var Marionette = require('marionette');

	var BaseController = Marionette.Controller.extend({
		initialize: function(options) {
		},
		destroy: function() {
			BaseController.__super__.destroy.apply(this, arguments);
			if (this.view) {
				this.view.destroy();
				this.view = null;
			}
			if (this.model) {
				this.model = null;
			}
		}
	});

	return BaseController;
});