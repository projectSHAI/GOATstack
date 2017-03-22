"use strict";

const isDevelopment = process.argv.indexOf("--dev") > -1;
const isTest = process.argv.indexOf("--test") > -1;
const isProduction = process.argv.indexOf("--prod") > -1;

if (isDevelopment) {
	console.log('development');
	require('./config/fusebox/fusebox.dev');
}
else if (isTest) {
	console.log('test');
	require('./config/fusebox/fusebox.test');
}
else if (isProduction) {
	console.log('production');
	require('./config/fusebox/fusebox.prod');
}
else {
	console.log('start dev');
	require('./config/fusebox/start.dev');
}