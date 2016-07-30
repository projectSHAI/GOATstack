'use strict';

module.exports = {
	client: {
		lib: {
			css: [],
			js: []
		},
		css: [
			'client/styles.css',
			'client/app/components/**/*.css'
		],
		ts: [
			'client/app/*.ts',
			'client/app/components/**/*.ts'
		],		
		js: [
			'client/app/*.js',
			'client/app/components/**/*.js'
		],
		img: [],
		views: [
			'client/index.html',
			'client/app/components/**/*.html'
		],
		tests: ''
	},
	server: {
		gulpConfig: ['gulpfile.js'],
		allJS: ['config/**/*.js', 
			'server/**/**/*controller.js',
			'server/**/**/*events.js',
			'server/**/**/*model.js',
			'server/**/**/*router.js'
		],
	    models: 'server/api/**/*.model.js',
	    routes: 'server/api/**/*.router.js',
	    sockets: 'server/api/**/*.socket.js',
	    tests: {
	    	integration: 'server/api/**/*.integration.js',
	    	unit: 'server/api/**/*.spec.js'
	    }
	}
};