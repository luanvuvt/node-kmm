'use strict';

var util = require('util'),
	EventEmitter = require('events').EventEmitter,
	install = require('./install.js'),
	kmmPackage = require('../../package.json');

function Kmm(options) {
	this.options = options;
}

Kmm.version = kmmPackage.version;

util.inherits(Kmm, EventEmitter);

Kmm.prototype.install = install;

module.exports = Kmm;