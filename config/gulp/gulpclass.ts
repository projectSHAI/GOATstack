/// <reference path="../../node_modules/@types/node/index.d.ts" />

import {Gulpclass, Task, SequenceTask} from "gulpclass/Decorators";

let fs = require('graceful-fs');
let _ = require('lodash');
let del = require('del');
let path = require('path');
let gulp = require('gulp');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let KarmaServer = require('karma').Server;
let JasmineReporter = require('jasmine-spec-reporter');
let ts = require('gulp-typescript');
let runSequence = require('run-sequence');
let plugins = require('gulp-load-plugins')();
let shell = require('gulp-shell');
let imagemin = require('imagemin');
let imageminJPEGOptim = require('imagemin-jpegoptim');
let imageminOptiPNG = require('imagemin-optipng');
let imageminSVGO = require('imagemin-svgo');

// tslint:disable-next-line
let defaultAssets = eval(require("typescript")
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
    del(['dist/**', '!dist']);
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
    return imagemin(defaultAssets.client.assets, 'dist/app/assets', {
      plugins: [
        imageminJPEGOptim(),
        imageminOptiPNG(),
        imageminSVGO()
      ]
    });
  }
  compressAsset(file) {
    return imagemin([file.path], 'dist/app/assets', {
      plugins: [
        imageminJPEGOptim(),
        imageminOptiPNG(),
        imageminSVGO()
      ]
    });
  }
  deleteAsset(file) {
    let loc = file.path.replace('client', 'dist\\app');
    del(loc);
    console.log('DELETION OF ' + loc);
  }
  @Task()
  build_systemConf() {
    return gulp.src('config/sys/systemjs.config.js')
      .pipe(gulp.dest('./dist/app'));
  }
  @Task()
  build_index(done) {
    return gulp.src('config/sys/index.js')
      .pipe(gulp.dest('./dist'));
  }
  // Transpile client side TS files
  @Task()
  build_client(done) {
    let tsProject = ts.createProject('./tsconfig.json', { module: 'system', outFile: 'app.js' });
    let tsResult = gulp.src(`client/**/**/!(*.spec).ts`)
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./tmp'));
  }
  @Task()
  build_server() {
    let tsProject = ts.createProject('./tsconfig.json', { module: 'system', outFile: 'server.js' });
    let tsResult = tsProject.src()
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./tmp'));
  }

  // Transpile client test TS files
  @Task()
  client_test(done) {
    let tsProject = ts.createProject('./tsconfig.json', { module: 'system' });
    let tsResult = gulp.src(`client/**/**/*.ts`)
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./dist'));
  }
  // Transpile server test TS files
  @Task()
  server_test(done) {
    let tsProject = ts.createProject('./tsconfig.json');
    let tsResult = tsProject.src() //`server/**/**/*.ts`
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./dist'));
  }

  @SequenceTask()
  build_client_test() {
    return ['client_test', 'build_client_sequence'];
  }
  @SequenceTask()
  build_server_test() {
    return ['server_test'];
  }

  @SequenceTask()
  build_client_sequence() {
    return ['build_sass', 'build_html', 'build_assets', 'build_systemConf'];
  }

  @SequenceTask()
  build_project() {
    return [
      'build_client',
      'build_client_sequence',
      'build_index',
      'build_server',
      'compress_client',
      'compress_server',
      'delete_tmp'
    ];
  }
  @SequenceTask()
  build_project_test() {
    return ['client_test', 'build_client_sequence', 'build_server_test'];
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
    return gulp.src('tmp/app.js')
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

  @Task()
  compress_server() {
    return gulp.src('tmp/server.js')
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
      .pipe(gulp.dest('dist'));
  }
  @Task()
  delete_tmp() {
    return del('tmp/**');
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
  // Nodemon test task
  @Task()
  nodemon_test() {
    return plugins.nodemon({
      script: 'dist/server/server.js',
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
    return gulp.src('')
      .pipe(shell(['npm run e2e']));
  }

  // Watch Files For Changes
  @Task()
  watch() {
    let serverts = _.union(
      defaultAssets.server.allTS,
      defaultAssets.config.allTS
    );

    // Start livereload
    plugins.livereload.listen();
    // Watch all server TS files to build JS
    watch(serverts, file => runSequence('build_server', 'compress_server', 'delete_tmp'));
    watch(defaultAssets.server.allJS, plugins.livereload.changed);
    // Watch all TS files in client and compiles JS files in dist
    watch(defaultAssets.client.ts, file => runSequence('build_client', 'compress_js', 'delete_tmp'));
    watch(defaultAssets.client.dist.js, plugins.livereload.changed);
    // Watch all scss files to build css is change
    watch(defaultAssets.client.scss, file => runSequence('build_sass', 'compress_css'));
    watch(defaultAssets.client.dist.css, plugins.livereload.changed);
    // Watch all html files to build them in dist
    watch(defaultAssets.client.views, file => runSequence('build_html'));
    watch(defaultAssets.client.dist.views, plugins.livereload.changed);
    // Watch all client assets to compress in dist
    watch(defaultAssets.client.assets, { events: ['add'] },  file => this.compressAsset(file));
    watch(defaultAssets.client.assets, { events: ['unlink'] },  file => this.deleteAsset(file));
    watch(defaultAssets.client.dist.assets, plugins.livereload.changed);
    // Watch if system.config files are changed
    watch(defaultAssets.client.system, file => runSequence('build_systemConf'));
    watch(defaultAssets.server.system, file => runSequence('build_index'));
    watch(['dist/index.js', 'dist/app/systemjs.config.js'], plugins.livereload.changed);
  }

  // CSS linting task
  @Task()
  csslint(done) {
    return gulp.src(defaultAssets.client.dist.css)
      .pipe(plugins.csslint('.csslintrc'))
      .pipe(plugins.csslint.formatter());
  }
  // Typescript linting task
  @Task()
  tslint(done) {
    let assets = _.union(
      defaultAssets.client.ts,
      defaultAssets.server.allTS,
      defaultAssets.config.allTS
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
    return ['csslint', 'tslint'];
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
      'lint', ['nodemon','watch']
    ];
  }
  // Run the project in production mode
  @SequenceTask()
  prod() {
    return [
      'env_prod',
      'build_clean',
      'build_project',
      'lint', ['nodemon','watch']
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
      'build_clean',
      'build_project',
      'protractor',
    ];
  }
}
