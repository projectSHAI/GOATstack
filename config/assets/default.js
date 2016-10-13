'use strict';

module.exports = {
	client: {
		dist: {
			js: [
				'dist/*.js*',
				'dist/**/*.js*',
				'dist/**/**/*.js*'
			],
			css: [
				'dist/styles.css',
				'dist/components/**/*.css'
			],
			assets: [
				'dist/assets/*.jpg',
				'dist/assets/*.png',
				'dist/assets/*.svg',
			],
			views: [
				'dist/index.html',
				'dist/components/**/*.html'
			]
		},
		scss: [
			'client/styles.scss'
		],
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
			'client/app/*.js*',
			'client/app/**/*.js*',
			'client/app/**/**/*.js*'
		],
		assets: [
			'client/assets/*.jpg',
			'client/assets/*.png',
			'client/assets/*.svg',
		],
		views: [
			'client/index.html',
			'client/app/components/**/*.html'
		],
		tests: [
			'client/app/components/**/*.component.spec.js'
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
