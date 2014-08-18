'use strict';

var util = require('util'),
	EventEmitter = require('events').EventEmitter,
	install = require('./install.js');

function Kmm(options) {
	this.options = options;
}

util.inherits(Kmm, EventEmitter);

Kmm.prototype.install = install;

module.exports = Kmm;