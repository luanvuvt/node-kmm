'use strict';

var path = require('path');

module.exports = function () {
	var configPath = path.resolve(process.cwd(), 'kmm.json'),
		fileConfig = require(configPath);

	var config = {
		currentDir: process.cwd()
	};

	if (Array.isArray(fileConfig['items'])) {
		config.items = fileConfig['items'];
	}

	return config;
};