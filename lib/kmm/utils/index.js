'use strict';

var fs = require('fs');

var sys = require('sys')
var exec = require('child_process').exec;
var path = require('path');

var mkdirp = require('mkdirp');

var Q = require('q');

module.exports = {
	traverseFileSystem: function (currentPath, foundCallback) {
		var files = fs.readdirSync(currentPath);
		
		for (var i in files) {
			var currentFile = currentPath + '/' + files[i];
			var stats = fs.statSync(currentFile);

			if (stats.isFile()) {
				foundCallback({type: 'file', path: currentFile});
			} else if (stats.isDirectory()) {
				if (foundCallback({type: 'folder', path: currentFile})) {
					this.traverseFileSystem(currentFile, foundCallback);
				}
			}
		}
	},
	makeLink: function (type, source, dist) {
			dist = path.normalize(dist);
			source = path.normalize(source);

			return Q.nfcall(mkdirp, path.dirname(dist))
						.then(function () {
							var defered = Q.defer();

							fs.exists(dist, function (result) {
								defered.resolve(result);
							});

							defered.promise
								.then(function (result) {
									var defered2 = Q.defer();

									if (result) {
										return Q.nfcall(fs.unlink, dist).then(function () {
											defered2.resolve();
										});
									} else {
										defered2.resolve();
									}

									return defered2.promise;
								})
								.then(function () {
									return fs.symlink(source, dist, type);
								});
						});
	}
};