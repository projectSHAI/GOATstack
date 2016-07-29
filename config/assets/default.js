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
		]
	},
	server: {
		gulpConfig: ['gulpfile.js'],
		allJS: ['server/server.js', 'config/**/*.js'],
	    models: 'server/api/**/*.model.js',
	    routes: 'server/api/**/*.route.js'
	}
};