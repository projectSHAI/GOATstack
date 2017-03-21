'use strict';

var exec = require('child_process').exec;
var glob = require('glob');

var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var JasmineReporter = require('jasmine-spec-reporter').SpecReporter;

process.env.NODE_ENV = 'test';

// Server SPEC tests
glob('server/**/api/**', function(er, files) {
	exec('tsc ' + files.join(' ') + ' --outDir dist', () => {
			
		jasmine.loadConfig({
			spec_dir: 'dist',
			spec_files: [
				'server/mongo-db/api/**/*.spec.js',
				'server/mongo-db/api/user/user.integration.js',
				'server/mongo-db/api/**/*.integration.js'
			]
		});

		jasmine.env.clearReporters();
		jasmine.addReporter(new JasmineReporter());

		jasmine.execute();

	});
});
