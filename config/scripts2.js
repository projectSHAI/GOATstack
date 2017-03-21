var fs = require('graceful-fs'),
	readline = require('readline'),
  	exec = require('child_process').exec,
  	execSync = require('child_process').execSync,
  	spawn = require('child_process').spawn,
  	spawnSync = require('child_process').spawnSync,
  	chalk = require('chalk'),
  	inquirer = require('inquirer'),

	config = eval(require('typescript')
	    .transpile(require('graceful-fs')
	      .readFileSync('./config/env/default.ts')
	      .toString())),

	helpers = require('./helpers');

function windowsCheck(command) {
	return /^win/.test(process.platform) ? command.replace(/\//g, '\\') : command;
}

// Base commands
var cmd = {
	concurrently: windowsCheck('node_modules/.bin/concurrently'),
	node_sass: windowsCheck('node_modules/.bin/node-sass'),
	nodemon: windowsCheck('node_modules/.bin/nodemon'),
	webpack: windowsCheck('node_modules/.bin/webpack'),
	webpackDevServer: windowsCheck('node_modules/.bin/webpack-dev-server'),
	karma: windowsCheck('node_modules/.bin/karma'),
	protractor: windowsCheck('node_modules/.bin/protractor'),
	webdriverManager: windowsCheck('node_modules/.bin/webdriver-manager'),
	ngc: windowsCheck('node_modules/.bin/ngc')
};

exports.cmd = cmd;

// Script Commands
var ngc = `${cmd.ngc} -p tsconfig-aot.json --exclude client/**/**/**/*.spec.ts`;
var nodeSass = `${cmd.node_sass} -q client -o client`;
var server_test = `node config/test-libs/server.test && ${cmd.karma} start config/test-libs/karma.config.js`;
var protractor = `${cmd.concurrently} --raw \"node dist -s\" \"${cmd.protractor} config/test-libs/protractor.config.js\" --kill-others --success first`;
var e2e = `${cmd.webdriverManager} update && ${cmd.webpack} --progress --hide-modules true --env test && ${cmd.webpack} --hide-modules true --env server:test && ${protractor}`;
var prod_e2e = `${cmd.webdriverManager} update && ${ngc} && ${cmd.webpack} --progress --hide-modules true --env prod:e2e && node -e "require('./config/helpers').cleanup('client')" && ${protractor}`;

// Script Functions
function prepare(dev) {
	helpers.cleanup();
	return dev ? null : execSync(nodeSass);
};

/*
 *	Build server and client => start server/client tests with karma
 */
exports.startTest = function startTest() {
	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	prepare(true);

	return spawn(server_test, {stdio: 'inherit', shell: true});
};

/*
 *	Build server and client => start E2E with protractor
 */
exports.startE2E = function startE2E() {
	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	prepare(true);

	return spawn(e2e, {shell: true, stdio: 'inherit'});
};

/*
 *	Build server and client in Prod => start E2E with protractor
 */
exports.startProdE2E = function startProdE2E() {	
	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	prepare();

	return spawn(prod_e2e, {shell: true, stdio: 'inherit'});
}

/*
 *	Build webpack-dev-server/express server => proxy to express server
 */
exports.startDev = function startDev() {
	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	prepare(true);

	return spawn(`${cmd.webpackDevServer} --progress --inline --env dev`, {shell: true, stdio: 'inherit'});
};

/*
 *	Build server and client => start the express server in production
 */
exports.startProd = function startProd() {
	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	prepare();

	return spawn(`${ngc} && ${cmd.webpack} --progress --hide-modules true --env prod && node -e "require('./config/helpers').cleanup('client')" && node dist`, {shell: true, stdio: 'inherit'});
};

/*
 *	Prompt developer to push dist to heroku
 */
exports.herokuPrompt = function herokuPrompt() {

	if (config.https_secure)
	  console.log('\n' + chalk.red.bold('\tWARNING:\n\n\tYou are about to deploy to Heroku with GOAT configured for HTTPS!!\n\n' +
	    '\tThe deployed applicaiton WILL FAIL unless you configure the\n\tcertificates in Heroku correctly!!\n\n') +
	    chalk.green.bold('\tWe suggest setting https_secure: false in "config/env/default"\n\tuntil your heroku repo is prepped for custom certificates.\n\n'));

	return inquirer.prompt([{
		type:     'list',
		name:     'heroku_choice',
		message:  'What action would you like to do? (on your account)',
		choices:  ['1) Push to existing repo', '2) Create new heroku app'],
		default:  0
	}]).then(function(answers) {
		switch (answers.heroku_choice) {
			case '1) Push to existing repo':
				return inquirer.prompt([{
	              type:     'input',
	              name:     'appname',
	              message:  'The name of the heroku application?'
	            }]).then(function(answers) {
	            	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	            	prepare();	            		

            		const command = [
		            	`${cmd.webpack} --progress --hide-modules true --env prod`,
		            	`node -e "require('./config/helpers').cleanup('client')"`,
		            	'cd dist',
		            	'git init',
		            	'git add .',
		            	'git commit -m "goat-stack:deploy"',
		            	`git remote add heroku https://git.heroku.com/${answers.appname}.git`,
		            	'git push --force heroku master',
		            	`heroku open --app ${answers.appname}`
            		];

            		return spawn(`${ngc} && ` + command.join(' && '), {shell: true, stdio: 'inherit'});

				});
			default:
				return inquirer.prompt([{
	              type:      'input',
	              name:      'appname',
	              message:   'What name would like the app to have?'
	            }, {
	              type:      'input',
	              name:      'db_uri',
	              message:   'What is the database URI?'
	            }, {
	              type:      'input',
	              name:      'db_user',
	              message:   'What is the username for the database?'
	            }, {
	              type:      'input',
	              name:      'db_pw',
	              message:   'What is the password for this user?'
	            }]).then(function(answers) {
            		console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
            		prepare();

        			const command = [
            			'cd dist',
            			'git init',
            			`heroku create ${answers.appname}`,
            			`heroku config:set --app ${answers.appname} DB_URI=${answers.db_uri} DB_USER=${answers.db_user} DB_PW=${answers.db_pw}`,
            			'cd ..',
            			`${ngc}`,
        				`${cmd.webpack} --progress --hide-modules true --env prod`,
        				`node -e "require('./config/helpers').cleanup('client')"`,
        				'cd dist',
        				'git add .',
        				'git commit -m "goat-stack:deploy"',
        				'git push --force heroku master',
        				`heroku open --app ${answers.appname}`
        			];

        			return spawn(command.join(' && '), {shell: true, stdio: 'inherit'});

				});
		}
	});
};
