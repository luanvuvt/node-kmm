'use strict';

var utils = require('../utils');
var path = require('path');
var fs = require('fs');
var Q = require('q');

module.exports = function () {
	var kmm = this,
		linkItems = []

	kmm.options.items.forEach(function (configItem) {
		utils.traverseFileSystem(configItem.path, function (item) {
			// Check if this path is in excludes
			if (Array.isArray(configItem['excludes'])) {
				var isExclude = false;

				configItem['excludes'].forEach(function (excludePath) {
					if (item.path.indexOf(excludePath) >= 0) {
						isExclude = true;
					}
				});

				if (isExclude) {
					return false; // Don't create link for this path
				}
			}

			item.path = item.path.replace(configItem.path, '');

			var distPath = typeof configItem.distPath != 'undefined' ? configItem.distPath + '/' : '';

			// This path is file
			if (item.type == 'file') {
				linkItems.push({
					type: 'file',
					path: item.path,
					root: configItem.path,
					distPath: distPath
				});

				return true;
			} else { // This path is folder
				var link = false;

				if (Array.isArray(configItem.linkFolders)) {
					configItem.linkFolders.forEach(function (linkFolder) {
						if (item.path.indexOf(linkFolder) >= 0) {
							link = true;
						}
					});
				}

				if (link) {
					linkItems.push({
						type: 'dir',
						path: item.path,
						root: configItem.path,
						distPath: distPath
					});

					return false;
				} else {
					return true;
				}
			}
		});
	});

	// Create link from files and folder
	var promises = linkItems.map(function (linkItem) {
		var distPath = linkItem.distPath ? path.normalize(linkItem.distPath) : kmm.options.currentDir;;

		kmm.emit('message', {
			status: 'success',
			message: linkItem.path
		});

		return utils.makeLink(linkItem.type, linkItem.root + linkItem.path, distPath + linkItem.path);
	});

	Q.all(promises)
		.then(function () {
			kmm.emit('message', {
				status: 'success',
				message: "\n\n===========\n\nInstalled module(s) and theme(s)"
			});
		})
		.catch(function (err) {
		    kmm.emit('message', {
		    	status: 'error',
		    	message: err.toString()
		    });
		});
};