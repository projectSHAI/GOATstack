var fs = require('graceful-fs'),
	readline = require('readline'),
  	exec = require('child_process').exec,
  	execSync = require('child_process').execSync,
  	spawn = require('child_process').spawn,
  	spawnSync = require('child_process').spawnSync,
  	chalk = require('chalk'),
  	stevedore = require('stevedore'),
  	inquirer = require('inquirer'),

	config = eval(require('typescript')
	    .transpile(require('graceful-fs')
	      .readFileSync('./config/env/default.ts')
	      .toString())),

	helpers = require('./helpers'),
	loader;

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
var e2e = `${cmd.webdriverManager} update && ${cmd.webpack} --hide-modules true --env test && ${cmd.webpack} --hide-modules true --env server:test && ${protractor}`;
var prod_e2e = `${cmd.webdriverManager} update && ${ngc} && ${cmd.webpack} --hide-modules true --env prod:e2e && ${protractor}`;

// Helpers
function startLoader(str = 'compiling => tree-shaking => bundling...') {
	return loader = stevedore({
		message: chalk.cyan.bold(str),
		interval: 100,
		frames: [
			'\t[          ]',
			'\t['+chalk.magenta.bold('>        <')+']',
			'\t['+chalk.cyan.bold(' >      < ')+']',
			'\t['+chalk.yellow.bold('  >    <  ')+']',
			'\t['+chalk.green.bold('   >  <   ')+']',
			'\t['+chalk.red.bold('    ><    ')+']',
			'\t['+chalk.green.bold('   <  >   ')+']',
			'\t['+chalk.yellow.bold('  <    >  ')+']',
			'\t['+chalk.cyan.bold(' <      > ')+']',
			'\t['+chalk.magenta.bold('<        >')+']'
		]
	});
};
function loaderMessage(str = 'compiling => tree-shaking => bundling...') {
	process.stdout.clearLine();
	return loader.message(chalk.cyan.bold(str));
};
function stopLoader() {
	loader.stop();
	process.stdout.clearLine();
	process.stdout.moveCursor(0, -3);
	process.stdout.clearLine();
};

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
	// startLoader('building Dev => running server/client tests...');

	return spawn(server_test, {stdio: 'inherit', shell: true});
};

/*
 *	Build server and client => start E2E with protractor
 */
exports.startE2E = function startE2E() {
	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	prepare(true);
	startLoader('update webdriver => building Dev => running E2E tests...');

	return exec(e2e, (err, stdout, stderr) => {
		stopLoader();
		process.stdout.clearLine();
		helpers.cleanup();
		if (stdout) console.log(stdout);
		if (err) console.log(err);
	});
};

/*
 *	Build server and client in Prod => start E2E with protractor
 */
exports.startProdE2E = function startProdE2E() {	
	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	prepare();
	process.stdout.clearLine();
	startLoader('update webdriver => building Prod => running E2E tests...');

	return exec(prod_e2e, (err, stdout, stderr) => {
		stopLoader();
		process.stdout.clearLine();
		helpers.cleanup();
		if (stdout) console.log(stdout);
		if (err) console.log(err);
	});
}

/*
 *	Build webpack-dev-server/express server => proxy to express server
 */
exports.startDev = function startDev() {
	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	prepare(true);
	startLoader();

	var waiting = false;

	// spawn a new process to start building
	const serv = spawn(`${cmd.webpackDevServer} --inline --env dev`, {shell: true});

	serv.stdout.on('data', (data) => {
		if (!config.show_console_detail) {
			// Indicate that the app is finished building hook
			if (data.includes('Server Address:')) {
				stopLoader();
				if (!waiting) {
					// Remember when the server is waiting or changes
					waiting = true;
					console.log(chalk.green.bold('\tDevelopment server serving on') + chalk.yellow.bold('\thttp://localhost:1701'));
					console.log(chalk.magenta.bold('\tProxying to Express Server on') + chalk.yellow.bold('\thttp://localhost:5000\n\n'));
				} else {
					// Reposition the cursor so the next print will be aligned
					process.stdout.moveCursor(0, 2);
				}
				return;
			}
			// Print RESTFUL responces in the console
			else if (/GET|POST|PUT|DELETE/.test(data.toString())) {
				process.stdout.moveCursor(0, -1);
				console.log(`${data}`);
				return;
			}
			// After the server is started indicate if changes are made
			else if (waiting && data.includes('webpack: bundle is now INVALID.')) {
				startLoader('building new additions...');
				return;
			}
			// If nodemon does not restart the server secondary hook to turn off loader
			else if (waiting && data.includes('webpack: bundle is now VALID.')) {
				loader.stop();
				process.stdout.clearLine();
				return;
			}
			else if (/Could not connect to MongoDB!/.test(data.toString())) {
				stopLoader();
				console.log(chalk.red.bold('\tCould not connect to MongoDB!'));
			}
		} else {
			process.stdout.clearLine();
			process.stdout.moveCursor(0,-1);				
			console.log(`${data}`);
			if (data.includes('Server Address:')) {
				loader.stop();
				process.stdout.clearLine();
			}
		}
		
	});
	serv.stderr.on('data', (data) => {
		if (/!keywords/.test(data.toString())) {
			process.stdout.clearLine();
			console.log(`${data}`);
		}
	});
	serv.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});
	serv.on('error', (err) => {
	  stopLoader();
	  console.log('Failed to start child process.');
	  console.log(`${err}`);
	});
};

/*
 *	Build server and client => start the express server in production
 */
exports.startProd = function startProd() {
	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	prepare();
	startLoader('compiling client with ngc...');

	// Start the angular compiler
	exec(ngc, {cwd:process.cwd()}, (err, stdout, stderr) => {
		loaderMessage('tree-shaking => bundling...');

		// spawn a new process to start building
		const serv = spawn(`${cmd.webpack} --env prod && node dist`, {cwd: process.cwd(), shell: true});

		serv.stdout.on('data', (data) => {
			if (!config.show_console_detail) {
				if (data.includes('Server Address:')) {
					stopLoader();
					helpers.cleanup('client');
					console.log(chalk.green.bold('\tProduction serving on') + chalk.yellow.bold(' http://localhost:8443\n\n'));			
					return;
				}
				// Print RESTFUL responces in the console
				else if (/GET|POST|PUT|DELETE/.test(data.toString())) {
					process.stdout.moveCursor(0, -1);
					console.log(`${data}`);
					return;
				}
				else if (/Could not connect to MongoDB!/.test(data.toString())) {
					stopLoader();
					console.log(chalk.red.bold('\tCould not connect to MongoDB!'));
				}
			} else {
				process.stdout.clearLine();
				process.stdout.moveCursor(0,-1);				
				console.log(`${data}`);
				if (data.includes('Server Address:')) {
					loader.stop();
					helpers.cleanup('client');
					process.stdout.clearLine();
				}
			}
		});
		serv.stderr.on('data', (data) => {
			if (/!keywords/.test(data.toString())) {
				process.stdout.clearLine();
				console.log(`${data}`);
			}
		});
		serv.on('close', (code) => {
		  if (code !== 0)
		  	console.log(`Make sure you have mongod running!`);
		});
		serv.on('error', (err) => {
		  stopLoader();
		  console.log('Failed to start child process.');
		  console.log(`${err}`);
		});

		if (err) {
			console.log(stdout);
			console.log(err);
		}
	});
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
				inquirer.prompt([{
	              type:     'input',
	              name:     'appname',
	              message:  'The name of the heroku application?'
	            }]).then(function(answers) {
	            	console.log(chalk.bold.magenta('\n\tPlease Wait ... This will take some time\n\n'));
	            	prepare();
	            	startLoader('compiling with ngc...');

	            	return exec(ngc, (err, stdout, stderr) => {
	            		if (err) {
	            			console.log(stdout);
	            			console.log(err);
	            		}
	            		loaderMessage('tree-shaking => bundling => deploying to heroku...');

	            		const command = [
			            	`${cmd.webpack} --env prod`,
			            	'cd dist',
			            	'git init',
			            	'git add .',
			            	'git commit -m "goat-stack:deploy"',
			            	`git remote add heroku https://git.heroku.com/${answers.appname}.git`,
			            	'git push --force heroku master',
			            	`heroku open --app ${answers.appname}`
	            		];

	            		const serv = spawn(command.join(' && '), {shell: true});

	            		serv.stdout.on('data', (data) => {
	            			if (config.show_console_detail) {
	            				process.stdout.clearLine();
	            				process.stdout.moveCursor(0,-1);
	            				process.stdout.clearLine();				
	            				console.log(`${data}`);
	            			}
	            		});
	            		serv.stderr.on('data', (data) => {
	            			if (config.show_console_detail) {
	            				process.stdout.clearLine();
	            				process.stdout.moveCursor(0,-1);
	            				process.stdout.clearLine();				
	            				console.log(`${data}`);
	            			}
	            		});
	            		serv.on('close', (code) => {
	            			stopLoader();
	            			helpers.cleanup('client');
	            			if (code === 0) {
	            				console.log(chalk.bold.green('\n\n\tYour application has been deployed to Heroku!\n'));
	            			} else {	            				
	            				console.log(`child process exited with code ${code}`);
	            			}
	            		});
	            		serv.on('error', (err) => {
	            		  	stopLoader();	            		  
	            			helpers.clenup('client');
	            		  	console.log('Failed to start child process.');
	            		  	console.log(`${err}`);
	            		});
	            	});
				});
				break;
			default:
				inquirer.prompt([{
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
	            		startLoader('compiling with ngc...');

	            		const command = [
	            			'cd dist',
	            			'git init',
	            			`heroku create ${answers.appname}`,
	            			`heroku config:set --app ${answers.appname} DB_URI=${answers.db_uri} DB_USER=${answers.db_user} DB_PW=${answers.db_pw}`,
	            			'cd ..',
	            			`${ngc}`
	            		];

	            		return exec(command.join(' && '), (err, stdout, stderr) => {
	            			if (err) {
	            				console.log(stdout);
	            				console.log(err);
	            			}
	            			loaderMessage('tree-shaking => bundling => deploying to heroku...');

	            			const command = [
	            				`${cmd.webpack} --env prod`,
	            				'cd dist',
	            				'git add .',
	            				'git commit -m "goat-stack:deploy"',
	            				'git push --force heroku master',
	            				`heroku open --app ${answers.appname}`
	            			];

	            			const serv = spawn(command.join(' && '), {shell: true});

	            			serv.stdout.on('data', (data) => {
	            				if (config.show_console_detail) {
	            					process.stdout.clearLine();
	            					process.stdout.moveCursor(0,-1);
	            					process.stdout.clearLine();				
	            					console.log(`${data}`);
	            				}
	            			});
	            			serv.stderr.on('data', (data) => {
	            				if (config.show_console_detail) {
	            					process.stdout.clearLine();
	            					process.stdout.moveCursor(0,-1);
	            					process.stdout.clearLine();				
	            					console.log(`${data}`);
	            				}
	            			});
	            			serv.on('close', (code) => {
	            				stopLoader();
	            				helpers.cleanup('client');
	            				if (code === 0) {
	            					console.log(chalk.bold.green('\n\n\tYour application has been deployed to Heroku!\n'));
	            				} else {	            				
	            					console.log(`child process exited with code ${code}`);
	            				}
	            			});
	            			serv.on('error', (err) => {
	            			  	stopLoader();	            		  
	            				helpers.clenup('client');
	            			  	console.log('Failed to start child process.');
	            			  	console.log(`${err}`);
	            			});
	            		});
				});
				break;
		}
	});
};
