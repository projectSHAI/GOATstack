'use strict';

var _ = require('lodash');
var del = require('del');
var path = require('path');
var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var JasmineReporter = require('jasmine-spec-reporter');
var protractor = require('gulp-protractor').protractor;
var webdriver_update = require('gulp-protractor').webdriver_update;
var ts = require('gulp-typescript');
var defaultAssets = require('./config/assets/default');
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();
var chalk = require('chalk');

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test';
  return null;
});
// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development';
});
// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

gulp.task('build:clean', () => {
  del(defaultAssets.client.js);
});

// Transpile client side TS files
gulp.task('build:client', ['build:clean'], function (done) {
  var tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));

  var tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest(path.resolve('./dist')));
});

var buildFile = function (file) {
  var tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));
  var tsResult = gulp.src(['./client/typings/*.ts', file.path])
    .pipe(tsProject());

  var fPath = file.path.replace('client\\app', 'dist');
  fPath = fPath.substring(0, fPath.lastIndexOf('\\'))

  return tsResult.js.pipe(gulp.dest(path.resolve(fPath)));
};

// Nodemon task
gulp.task('nodemon', function () {
  return plugins.nodemon({
    script: 'server/server.js',
    ext: 'js,html',
    watch: defaultAssets.server.allJS
  });
});

gulp.task('test:server', function (done) {
  runSequence('server:jasmine:unit', 'server:jasmine:integration', done);
});

// Mocha unit
gulp.task('server:jasmine:unit', function (done) {
  return gulp.src(defaultAssets.server.tests.unit)
    .pipe(plugins.jasmine({
      reporter: new JasmineReporter()
    }));
});

// Mocha integration
gulp.task('server:jasmine:integration', function (done) {
  return gulp.src(defaultAssets.server.tests.integration)
    .pipe(plugins.jasmine({
      reporter: new JasmineReporter()
    }));
});

gulp.task('test:client', function (done) {
  runSequence('client:karma:test', done);
});

// Mocha integration
gulp.task('client:karma:test', function (done) {
  return new KarmaServer({
    configFile: __dirname + '/config/sys/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Downloads the selenium webdriver
gulp.task('webdriver_update', webdriver_update);

gulp.task('test:protractor', ['nodemon', 'webdriver_update'], (done) => {
  gulp.src('../../' + defaultAssets.client.e2e)
    .pipe(protractor({
      configFile: 'config/sys/protractor.config.js',
    })).on('end', () => {
      done();
    });
});

// Watch Files For Changes
gulp.task('watch', function () {
  // Start livereload
  plugins.livereload.listen();
  // Add watch rules
  gulp.watch(defaultAssets.server.allJS).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.ts).on('change', function (file) {
    buildFile(file);
  });
  gulp.watch(defaultAssets.client.js).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.css).on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.views).on('change', plugins.livereload.changed);

});

// CSS linting task
gulp.task('csslint', function (done) {
  return gulp.src(defaultAssets.client.css)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.formatter());
});

// JS linting task
gulp.task('jshint:server', function (done) {
  var assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS
  );

  return gulp.src(assets)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

//JS linting server tests
gulp.task('jshint:server:test', function (done) {
  var assets = _.union(
    defaultAssets.server.tests.unit,
    defaultAssets.server.tests.integration
  );

  return gulp.src(assets)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('tslint', function (done) {
  return gulp.src(defaultAssets.client.ts)
    .pipe(plugins.tslint({
      // contains rules in the tslint.json format
      configuration: "./tslint.json"
    }))
    .pipe(plugins.tslint.report());
});

// Lint CSS and JavaScript files.
gulp.task('lint', function (done) {
  runSequence(['csslint', 'jshint:server', 'tslint'], done);
});

// Lint test JavaScript files.
gulp.task('lint:test', function (done) {
  runSequence(['jshint:server:test', 'lint'], done);
});

gulp.task('exit', function () {
  process.exit();
});

// Run the project in development mode
gulp.task('default', function (done) {
  runSequence(
    'env:dev',
    'build:client',
    'lint', ['nodemon', 'watch'],
    done);
});

// Run the project in production mode
gulp.task('prod', function (done) {
  runSequence(
    'env:prod',
    'build:client',
    'lint', ['nodemon', 'watch'],
    done);
});

// Run the project in test mode
gulp.task('test', function (done) {
  runSequence(
    'env:test',
    'build:client',
    'lint:test',
    'test:server',
    'test:client',
    'exit',
    done
  );
});

gulp.task('test:e2e', (done) => {
  runSequence(
    'env:test',
    'test:protractor',
    'exit',
    done);
});
