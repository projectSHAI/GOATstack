'use strict';

module.exports = {
	client: {
		libs: {
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
		img: [],
		views: [
			'client/index.html',
			'client/app/components/**/*.html'
		]
	},
	server: {
		gulpConfig: ['gulpfile.js'],
		allJS: ['server/server.js', 'config/**/*.js']
	}
};