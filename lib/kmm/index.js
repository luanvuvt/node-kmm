'use strict';

var path = require('path'),
	_ = require('lodash'),
	config = require('../config')();

module.exports = function (route, options) {
	var func = require('./' + route),
		options = _.merge(options, config);

	if (typeof func == 'function') {
		func(options);
	}
};