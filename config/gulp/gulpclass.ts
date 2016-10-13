import {Gulpclass, Task, SequenceTask} from "gulpclass/Decorators";

let fs = require('fs');
let _ = require('lodash');
let del = require('del');
let path = require('path');
let gulp = require('gulp');
let sass = require('gulp-sass');
let KarmaServer = require('karma').Server;
let JasmineReporter = require('jasmine-spec-reporter');
let protractor = require('gulp-protractor').protractor;
let webdriver_update = require('gulp-protractor').webdriver_update;
let ts = require('gulp-typescript');
let defaultAssets = require('./config/assets/default');
let runSequence = require('run-sequence');
let plugins = require('gulp-load-plugins')();
let chalk = require('chalk');

const clientPath = 'client/app';
const distPath = 'dist';

@Gulpclass()
export class Gulpfile {

  // Set NODE_ENV to 'test'
  @Task()
  env_test(done) {
    process.env.NODE_ENV = 'test';
    done();
  }
  // Set NODE_ENV to 'development'
  @Task()
  env_dev(done) {
    process.env.NODE_ENV = 'development';
    done();
  }
  // Set NODE_ENV to 'production'
  @Task()
  env_prod(done) {
    process.env.NODE_ENV = 'production';
    done();
  }

  @Task()
  build_clean(done) {
    var all = _.union(
      defaultAssets.client.dist.js,
      defaultAssets.client.dist.css,
      defaultAssets.client.dist.views,
      defaultAssets.client.dist.assets
    );

    del(all);
    done();
  }

  @Task()
  build_html(done) {
    return gulp.src(defaultAssets.client.views)
      .pipe(gulp.dest('./dist'));
  }
  @Task()
  build_sass(done) {
    // Brute force fix for angular material import .css .scss error
    del('node_modules/@angular/material/core/overlay/overlay.css');

    return gulp.src(defaultAssets.client.scss)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist'));
  }
  @Task()
  build_assets(done) {
    return gulp.src(defaultAssets.client.assets)
      .pipe(gulp.dest('./dist/assets'));
  }

  @SequenceTask()
  build_client() {
    return ['build_sass', 'build_html', 'build_assets', 'client']
  }
  @SequenceTask()
  build_client_test() {
    return ['client_test', 'build_client'];
  }

  // Transpile client side TS files
  @Task()
  client(done) {
    let tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));
    let tsResult = gulp.src(`${clientPath}/**/**/!(*.spec).ts`)
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(path.resolve('./dist')));
  }
  // Transpile client test TS files
  @Task()
  client_test(done) {
    let tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));
    let tsResult = gulp.src(`${clientPath}/**/**/*.spec.ts`)
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(path.resolve('./dist')));
  }

  buildFile(file: any) {
    let tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));
    let tsResult = gulp.src(['./client/typings/*.ts', file.path])
      .pipe(tsProject());

    let fPath = file.path.replace('client\\app', 'dist');
    fPath = fPath.substring(0, fPath.lastIndexOf('\\'))

    return tsResult.js.pipe(gulp.dest(path.resolve(fPath)));
  }

  // Nodemon task
  @Task()
  nodemon() {
    return plugins.nodemon({
      script: 'server/server.js',
      ext: 'js,html',
      watch: defaultAssets.server.allJS
    });
  }

  @SequenceTask()
  test_server() {
    return ['server_jasmine_unit', 'server_jasmine_integration'];
  }
  // Mocha unit
  @Task()
  server_jasmine_unit(done) {
    return gulp.src(defaultAssets.server.tests.unit)
      .pipe(plugins.jasmine({
        reporter: new JasmineReporter()
      }));
  }
  // Mocha integration
  @Task()
  server_jasmine_integration(done) {
    return gulp.src(defaultAssets.server.tests.integration)
      .pipe(plugins.jasmine({
        reporter: new JasmineReporter()
      }));
  }

  @SequenceTask()
  test_client() {
    return ['client_karma_test', 'clean_test'];
  }
  // Mocha integration
  @Task()
  client_karma_test(done) {
    return new KarmaServer({
      configFile: __dirname + '/config/sys/karma.conf.js',
      singleRun: true
    }, done).start();
  }
  @Task()
  clean_test(done) {
    return del(['dist/components/**/*.spec.js']);
  }

  // Downloads the selenium webdriver
  @Task()
  webdriver_update() {
    webdriver_update();
  }

  @SequenceTask()
  test_protractor() {
    return ['nodemon', 'webdriver_update', 'protractor'];
  }
  @Task()
  protractor(done) {
    gulp.src('../../' + defaultAssets.client.e2e)
      .pipe(protractor({
        configFile: 'config/sys/protractor.config.js',
      })).on('end', () => {
        done();
      });
  }

  // Watch Files For Changes
  @Task()
  watch() {
    // Start livereload
    plugins.livereload.listen();
    // Watch all server JS files
    gulp.watch(defaultAssets.server.allJS).on('change', plugins.livereload.changed);
    // Watch all TS files in client and compiles JS files in dist
    gulp.watch(defaultAssets.client.ts).on('change', file => this.buildFile(file));
    gulp.watch(defaultAssets.client.dist.js).on('change', plugins.livereload.changed);
    // Watch all scss files to build css is change
    gulp.watch(defaultAssets.client.scss).on('change', file => runSequence('build:sass'));
    gulp.watch(defaultAssets.client.dist.css).on('change', plugins.livereload.changed);
    // Watch all html files to build them in dist
    gulp.watch(defaultAssets.client.views).on('change', file => runSequence('build:html'));
    gulp.watch(defaultAssets.client.dist.views).on('change', plugins.livereload.changed);
  }

  // CSS linting task
  @Task()
  csslint(done) {
    return gulp.src(defaultAssets.client.dist.css)
      .pipe(plugins.csslint('.csslintrc'))
      .pipe(plugins.csslint.formatter());
  }
  // JS linting task
  @Task()
  jshint_server(done) {
    var assets = _.union(
      defaultAssets.server.gulpConfig,
      defaultAssets.server.allJS
    );

    return gulp.src(assets)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default'));
  }
  //JS linting server tests
  @Task()
  jshint_server_test(done) {
    var assets = _.union(
      defaultAssets.server.tests.unit,
      defaultAssets.server.tests.integration
    );

    return gulp.src(assets)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default'));
  }

  @Task()
  tslint(done) {
    return gulp.src(defaultAssets.client.ts)
      .pipe(plugins.tslint({
        // contains rules in the tslint.json format
        configuration: "./tslint.json"
      }))
      .pipe(plugins.tslint.report());
  }
  // Lint CSS and JavaScript files.
  @SequenceTask()
  lint() {
    return ['csslint', 'jshint_server', 'tslint'];
  }
  // Lint test JavaScript files.
  @SequenceTask()
  lint_test() {
    return ['jshint_server_test', 'lint'];
  }

  @Task()
  exit(done) {
    process.exit();
  }

  // Run the project in development mode
  @SequenceTask()
  default() {
    return [
      'env_dev',
      'build_clean',
      'build_client',
      'lint', ['nodemon', 'watch']
    ];
  }
  // Run the project in production mode
  @SequenceTask()
  prod() {
    return [
      'env_prod',
      'build_client',
      'lint', ['nodemon', 'watch']
    ];
  }
  // Run the project in test mode
  @SequenceTask()
  test() {
    return [
      'env_test',
      'build_client_test',
      'lint_test',
      'test_server',
      'test_client',
      'exit'
    ];
  }
  // Run all e2e tests
  @SequenceTask()
  test_e2e() {
    return [
      'env_test',
      'test_protractor',
      'exit'
    ];
  }
}
