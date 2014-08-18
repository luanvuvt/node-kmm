#!/usr/bin/env node
var Kmm = require('../lib/kmm'),
	utils = require('../lib/utils'),
	Liftoff = require('Liftoff'),
	chalk = require('chalk'),
	argv = require('minimist')(process.argv.slice(2));

var cli = new Liftoff({
	name: 'kmm'
});

cli.launch({
	cwd: argv.cwd,
	configPath: argv.kmmfile
}, handleArguments);

function handleArguments(env) {
	if (!env.configPath) {
		utils.log(chalk.red('No kmmfile found'));
		process.exit(1);
	}

	var config = require(env.configPath);
	config.currentDir = env.cwd;

	var kmm = new Kmm(config);

	kmm.on('message', function (data) {
		if (data.status == 'success') {
			console.log(chalk.green(data.message));
		} else if (data.status == 'error') {
			console.log(chalk.red(data.message));
		} else {
			console.log(data.message);
		}
	});

	kmm.install();
}
