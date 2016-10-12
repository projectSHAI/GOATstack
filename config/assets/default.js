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
			'client/app/**/*.ts',
			'client/app/**/**/*.ts',
		],
		js: [
			'dist/*.js*',
			'dist/**/*.js*',
			'dist/**/**/*.js*'
		],
		img: [],
		views: [
			'client/index.html',
			'client/app/components/**/*.html'
		],
		tests: [
			'client/app/components/**/*.component.test.js'
		],
		e2e: [
			'client/e2e/*.e2e-spec.js'
		]
	},
	server: {
		gulpConfig: ['gulpfile.js'],
		allJS: [
			'config/**/*.js',
			'server/**/*.js',
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
	    	unit: 'server/api/**/*.spec.js',
				jas: 'server/api/user/user.integration.js'
	    }
	}
};
