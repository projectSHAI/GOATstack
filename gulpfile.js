'use strict';

var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var JasmineReporter = require('jasmine-spec-reporter');
var ts = require('gulp-typescript');
var defaultAssets = require('./config/assets/default');
var runSequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();
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
gulp.task('build:client', function () {
  var tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));
  return gulp.src(path.resolve('./client/**/*.ts'))
    .pipe(ts(tsProject))
    .js
    .pipe(gulp.dest(path.resolve('./client')));
});

var buildFile = function (file) {
  // console.log(file.path);
  // var index = file.path.lastIndexOf('\\');

  var tsProject = ts.createProject({
    target: 'es5',
    module: 'commonjs',
    moduleResolution: 'node',
    sourceMap: false,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    removeComments: false,
    noImplicitAny: false
  });
  return gulp.src(['./client/typings/*.ts', file.path])
    .pipe(ts(tsProject))
    .js
    .pipe(gulp.dest(path.resolve(file.path.replace('client', 'dist'))));
};

// Nodemon task
gulp.task('nodemon', function () {
  return plugins.nodemon({
    script: 'server/server.js',
    //nodeArgs: ['--debug'],
    ext: 'js,html',
    watch: defaultAssets.server.allJS
  });
});

gulp.task('test:server', function (done) {
  runSequence('server:mocha:unit', 'server:mocha:integration', done);
});

// Mocha unit
gulp.task('server:mocha:unit', function (done) {
  return gulp.src(defaultAssets.server.tests.unit)
    .pipe(plugins.mocha({
      reporter: 'spec',
      timeout: 5000,
      require: [
        './config/sys/mocha.conf'
      ]
    }), done);
});

// Mocha integration
gulp.task('server:mocha:integration', function (done) {
  return gulp.src(defaultAssets.server.tests.integration)
    .pipe(plugins.jasmine({
      reporter: new JasmineReporter()
    }), done);
});

gulp.task('test:client', function (done) {
  runSequence('client:mocha:test', done);
});

// Mocha integration
gulp.task('client:mocha:test', function (done) {
  return new KarmaServer({
    configFile: __dirname + '/config/sys/karma.conf.js',
    singleRun: true
  }, done).start();
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
gulp.task('jshint:server', function () {
  var assets = _.union(
    defaultAssets.server.gulpConfig,
    defaultAssets.server.allJS
  );

  return gulp.src(assets)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

//JS linting server tests
gulp.task('jshint:server:test', function () {
  var assets = _.union(
    defaultAssets.server.tests.unit,
    defaultAssets.server.tests.integration
  );

  return gulp.src(assets)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('tslint', function () {
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
    'lint:test',
    'test:server',
    'test:client',
    done);
});
