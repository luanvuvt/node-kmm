var kmm = require('../kmm');

var emitter = require('../kmm/utils/emitter');

var colors = require('colors');

module.exports = function (argv) {
	var route = typeof argv._[0] != 'undefined' ? argv._[0] : 'install';

	emitter.on('message', function (data) {
		if (data.status == 'success') {
			console.log(data.message.green);			
		} else if (data.status == 'error') {
			console.log(data.message.red);
		} else {
			console.log(data.message);
		}
	});

	require('./' + route + '.js')(argv);

	kmm(route, argv);
};