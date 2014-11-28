define(function(require) {
	'use strict';

	var _ = require('underscore');
	var $ = require('jquery');
	var NavigatableItemView = require('modules/NavigatableItemView');
	var template = require('text!templates/gridImage.html');

	var GridPhotoView = NavigatableItemView.extend({
		initialize: function(options) {
			GridPhotoView.__super__.initialize.apply(this, arguments);
			this.url = options.url;
			this.description = options.description || '';
			this.template = _.template(template);
			this.render();
		},

		render: function() {
			var content = this.template({url: this.url, description: this.description});
			this.$el.html(content);
			this.$el.addClass('gridImage');
			$('body').append(this.$el);
		},

		setActive: function() {
			this.$el.addClass('active');
		}
	});

	return GridPhotoView;
});