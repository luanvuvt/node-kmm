var fs = require('fs');

var utils = require('./utils/index');

var emitter = require('./utils/emitter');

var Q = require('q');

module.exports = function (config) {
	var promises = [];

	utils.traverseFileSystem(config.currentDir, function (item) {
		var promise = fs.exists(item.path, function (isExist) {
			if (!isExist) {
				return Q.nfcall(fs.unlink, item.path);
			} else {
				return Q.nfcall(fs.lstat, item.path)
							.then(function (stats) {
								var defered = Q.defer();

								if (stats.isSymbolicLink()) {
									Q.nfcall(fs.unlink, item.path).then(function () {
										defered.resolve();
									});
								} else {
									defered.resolve();
								}

								return defered;
							});
			}
		});

		promises.push(promise);

		return true;
	});

	Q.all(promises)
		.then(function () {
			emitter.emit('message', {
				status: 'success',
				message: 'Removed links'
			});
		});
};