/// <reference path="../../node_modules/@types/node/index.d.ts" />

import {Gulpclass, Task, SequenceTask} from "gulpclass/Decorators";

let fs = require('graceful-fs');
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
let runSequence = require('run-sequence');
let plugins = require('gulp-load-plugins')();

let defaultAssets = eval(require("typescript")  // jshint ignore:line
  .transpile(fs
    .readFileSync("./config/assets/default.ts")
    .toString()));

const clientPath = 'client/app';
const serverPath = 'server/api';
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
    del(['dist/**', '!dist', '!dist/index.js']);
    done();
  }

  @Task()
  build_html(done) {
    return gulp.src(defaultAssets.client.views)
      .pipe(gulp.dest('./dist/app'));
  }
  @Task()
  build_sass(done) {
    // Brute force fix for angular material import .css .scss error
    del('node_modules/@angular/material/core/overlay/overlay.css');

    return gulp.src(defaultAssets.client.scss)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/app'));
  }
  @Task()
  build_assets(done) {
    return gulp.src(defaultAssets.client.assets)
      .pipe(gulp.dest('./dist/app/assets'));
  }
  // Transpile client side TS files
  @Task()
  build_client(done) {
    let tsProject = ts.createProject('./tsconfig.json', { module: 'system', outFile: 'app.js' });
    let tsResult = gulp.src(`client/**/**/!(*.spec).ts`)
      .pipe(tsProject())

    return tsResult.js.pipe(gulp.dest('./dist/app'));
  }
  @Task()
  build_server() {
    let tsProject = ts.createProject('./tsconfig.json', { module: 'system', outFile: 'server.js' });
    let tsResult = tsProject.src() //`**/**/**/!(*.spec|*.integration).ts`
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./dist'));
  }

  // Transpile client test TS files
  @Task()
  client_test(done) {
    let tsProject = ts.createProject('./tsconfig.json', { module: 'system' });
    let tsResult = tsProject.src()
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./dist/app'));
  }
  // Transpile server test TS files
  @Task()
  server_test(done) {
    let tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    let tsResult = gulp.src(`server/**/**/*.{spec,integration}.ts`)
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./dist'));
  }

  @SequenceTask()
  build_client_test() {
    return ['client_test', 'build_client_sequence'];
  }
  @SequenceTask()
  build_server_test() {
    return ['server_test', 'build_server']
  }

  @SequenceTask()
  build_client_sequence() {
    return ['build_sass', 'build_html', 'build_assets']
  }

  @SequenceTask()
  build_project() {
    return ['build_client', 'build_client_sequence', 'build_server', 'compress_client']
  }
  @SequenceTask()
  build_project_test() {
    return ['client_test', 'build_client_sequence', 'build_server_test']
  }


  buildFile(file: any) {
    let tsProject = ts.createProject('./tsconfig.json');
    let tsResult = gulp.src([file.path])
      .pipe(tsProject());

    let fPath;
    if (file.path.includes('client')) {
      fPath = file.path.replace('client', 'dist');
    } else {
      fPath = file.path.replace('server\\', 'dist\\');
    }

    fPath = fPath.substring(0, fPath.lastIndexOf('\\'));

    return tsResult.js.pipe(gulp.dest(path.resolve(fPath)));
  }

  @SequenceTask()
  compress_client() {
    return ['compress_js', 'compress_css'];
  }

  // Compress the app.js file
  @Task()
  compress_js() {
    return gulp.src('dist/app/app.js')
      .pipe(plugins.uglify({
        compress: {
          sequences: true,  // join consecutive statemets with the “comma operator”
          properties: true,  // optimize property access: a["foo"] → a.foo
          dead_code: true,  // discard unreachable code
          drop_debugger: true,  // discard “debugger” statements
          unsafe: false, // some unsafe optimizations (see below)
          conditionals: true,  // optimize if-s and conditional expressions
          comparisons: true,  // optimize comparisons
          evaluate: true,  // evaluate constant expressions
          booleans: true,  // optimize boolean expressions
          loops: true,  // optimize loops
          unused: true,  // drop unused variables/functions
          hoist_funs: true,  // hoist function declarations
          hoist_vars: false, // hoist variable declarations
          if_return: true,  // optimize if-s followed by return/continue
          join_vars: true,  // join var declarations
          cascade: true,  // try to cascade `right` into `left` in sequences
          side_effects: true,  // drop side-effect-free statements
        }
      }))
      .pipe(gulp.dest('dist/app'));
  }

  // Compress css
  @Task()
  compress_css() {
    return gulp.src('dist/app/styles.css')
      .pipe(plugins.uglifycss({
        "maxLineLen": 80
      }))
      .pipe(gulp.dest('dist/app'));
  }

  // Nodemon task
  @Task()
  nodemon() {
    return plugins.nodemon({
      script: 'dist/index.js',
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
    return ['client_karma_test'];
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
  protractor(done) {
    runSequence('nodemon', webdriver_update);

    return gulp.src('../../' + defaultAssets.client.e2e)
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
    // Watch all server TS files to build JS
    gulp.watch(defaultAssets.server.allTS).on('change', file => this.buildFile(file));
    // Watch all server JS files
    gulp.watch(defaultAssets.server.allJS).on('change', plugins.livereload.changed);
    // Watch all TS files in client and compiles JS files in dist
    gulp.watch(defaultAssets.client.ts).on('change', file => runSequence('build_client', 'compress_js'));
    gulp.watch(defaultAssets.client.dist.js).on('change', plugins.livereload.changed);
    // Watch all scss files to build css is change
    gulp.watch(defaultAssets.client.scss).on('change', file => runSequence('build_sass', 'compress_css'));
    gulp.watch(defaultAssets.client.dist.css).on('change', plugins.livereload.changed);
    // Watch all html files to build them in dist
    gulp.watch(defaultAssets.client.views).on('change', file => runSequence('build_html'));
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
  jshint(done) {
    return gulp.src(defaultAssets.config.allJS)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('default'));
  }

  @Task()
  tslint(done) {
    let assets = _.union(
      defaultAssets.client.ts,
      defaultAssets.server.allTS
    );

    return gulp.src(assets)
      .pipe(plugins.tslint({
        // contains rules in the tslint.json format
        configuration: "./tslint.json"
      }))
      .pipe(plugins.tslint.report());
  }
  // Lint CSS and JavaScript files.
  @SequenceTask()
  lint() {
    return ['csslint', 'jshint', 'tslint'];
  }

  @Task()
  exit(done) {
    process.exit();
    done();
  }

  // Run the project in development mode
  @SequenceTask()
  default() {
    return [
      'env_dev',
      'build_clean',
      'build_project',
      'lint', ['nodemon', 'watch']
    ];
  }
  // Run the project in production mode
  @SequenceTask()
  prod() {
    return [
      'env_prod',
      'build_clean',
      'build_project',
      'lint', ['nodemon', 'watch']
    ];
  }
  // Run the project in test mode
  @SequenceTask()
  test() {
    return [
      'env_test',
      'build_clean',
      'build_project_test',
      'lint',
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
      'protractor',
      'exit'
    ];
  }
}
