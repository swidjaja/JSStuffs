require.config({
	baseUrl: 'js',
	paths: {
		underscore: 'thirdparty/underscore',
		backbone: 'thirdparty/backbone',
		jquery: 'thirdparty/jquery-1.11.1.min',
		marionette: 'thirdparty/backbone.marionette',
		text: 'thirdparty/require_text',
		templates: '../templates',
		modules: 'modules',
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

define(function(require) {
	'use strict';

	var App = require('App');

	$(document).ready(function() {
		App.initialize();
	});
});