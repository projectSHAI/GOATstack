'use strict';

var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var defaultAssets = require('./config/assets/default');
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();
var nodemon = require('gulp-nodemon');
var chalk = require('chalk');

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test';
});
// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development';
});
// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

// Transpile client side TS files
gulp.task('buildClient', function () {
	var tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));
	return gulp.src(path.resolve('./client/**/*.ts'))
		.pipe(ts(tsProject))
		.js
		.pipe(gulp.dest(path.resolve('./client')));
});

var buildFile = function (file) {
  var index = file.path.lastIndexOf('\\');

  var tsProject = ts.createProject({
    target: 'es5',
    module: 'commonjs',
    moduleResolution: 'node',
    sourceMap: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    noExternalResolve: false,
    removeComments: false,
    noImplicitAny: false
  });
  return gulp.src(['./client/typings/*.ts', file.path])
    .pipe(ts(tsProject))
    .js
    .pipe(gulp.dest(path.resolve(file.path.substring(0,index))));
};

// Nodemon task
gulp.task('nodemon', function () {
  return nodemon({
    script: 'server/server.js',
    //nodeArgs: ['--debug'],
    ext: 'js,html',
    watch: ['server/server.js', ]
  });
});

// Watch Files For Changes
gulp.task('watch', function () {
  // Start livereload
  plugins.livereload.listen();

  // Add watch rules
  gulp.watch(defaultAssets.server.allJS).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.ts).on('change', function(file) {
    buildFile(file);
  });
  gulp.watch(defaultAssets.client.js).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.css).on('change', plugins.livereload.changed);

});

// CSS linting task
gulp.task('csslint', function (done) {
  return gulp.src(defaultAssets.client.css)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter())
    .pipe(plugins.csslint.reporter(function (file) {
      if (!file.csslint.errorCount) {
        done();
      }
    }));
});

// JS linting task
gulp.task('jshint', function () {
  var assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS
  );

  return gulp.src(assets)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('tslint', function() {
  return gulp.src(defaultAssets.client.ts)
    .pipe(plugins.tslint({
        // contains rules in the tslint.json format
        configuration: "./tslint.json"
    }))
    .pipe(plugins.tslint.report());
});

// Lint CSS and JavaScript files.
gulp.task('lint', function (done) {
  runSequence(['csslint', 'jshint', 'tslint'], done);
});

// Run the project in development mode
gulp.task('default', function (done) {
  runSequence('env:dev', 'buildClient', 'lint', ['nodemon', 'watch'], done);
});

// Run the project in production mode
gulp.task('prod', function (done) {
  runSequence('env:prod', 'buildClient', 'lint', ['nodemon', 'watch'], done);
});

// Run the project in test mode
gulp.task('test', function (done) {
  runSequence('env:test', 'buildClient', 'lint', ['nodemon', 'watch'], done);
});