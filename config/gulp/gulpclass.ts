import {Gulpclass, Task, SequenceTask} from "gulpclass/Decorators";

let fs = require('graceful-fs');
let _ = require('lodash');
let chalk = require('chalk');
let del = require('del');
let path = require('path');
let gulp = require('gulp');
let sass = require('gulp-sass');
let sassLint = require('gulp-sass-lint');
let watch = require('gulp-watch');
let replace = require('gulp-replace');
let KarmaServer = require('karma').Server;
let JasmineReporter = require('jasmine-spec-reporter');
let ts = require('gulp-typescript');
let embedTemplates = require('gulp-angular-embed-templates');
let embedSass = require('gulp-angular2-embed-sass');
let runSequence = require('run-sequence');
let plugins = require('gulp-load-plugins')();
let shell = require('gulp-shell');
let imagemin = require('imagemin');
let imageminJPEGOptim = require('imagemin-jpegoptim');
let imageminOptiPNG = require('imagemin-optipng');
let imageminSVGO = require('imagemin-svgo');
let exec = require('child_process').exec;

// tslint:disable-next-line
let defaultAssets = eval(require("typescript")
  .transpile(fs
    .readFileSync("./config/assets/default.ts")
    .toString()));

// tslint:disable-next-line
let defaultConfig = eval(require("typescript")
  .transpile(fs
    .readFileSync("./config/env/default/default.ts")
    .toString()));

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
    del([
      'dist/**',
      '!dist',
      'ngc-aot/**',
      'app/**/**/*.js*',
      'app/**/**/*.ngfactory*',
      'app/**/**/*.shim*',
      '!app/**/*e2e-spec.js',
      'tmp/**'
    ]);
    done();
  }

  @Task()
  build_clean_prod(done) {
    del([
      'ngc-aot/**',
      'app/**/**/*.js*',
      'app/**/**/*.ngfactory*',
      'app/**/**/*.shim*',
      '!app/**/*e2e-spec.js'
    ]);
    done();
  }

  ////////////////////////////////////////////////////////////////////////////////
  // REPLACEMENT TASKS: Used to replace strings in files depending on environment
  ////////////////////////////////////////////////////////////////////////////////
  @Task()
  replace_process(done) {
    return gulp.src(['dist/app/app.module.js'])
      .pipe(process.env.NODE_ENV === 'development' ?
        replace('process.env.NODE_ENV', "'development'") :
        replace('process.env.NODE_ENV', "'test'"))
      .pipe(replace('redux_logger_1.default', 'redux_logger_1'))
      .pipe(gulp.dest('dist/app', { overwrite: true }));
  }

  @SequenceTask()
  replace_first_compile(done) {
    return [
      'replace_main_dev',
      'replace_aot_pre'
    ];
  }
  replace_second_compile(done) {
    return [
      'replace_main_prod',
      'replace_aot_fin'
    ];
  }

  @Task()
  replace_main_prod(done) {
    return gulp.src(['app/main.ts'])
      .pipe(replace("import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'",
        "import { platformBrowser } from '@angular/platform-browser'"))
      .pipe(replace("import { AppModule } from './app.module';",
        `import { AppModuleNgFactory } from '../ngc-aot/app/app.module.ngfactory';
        import { enableProdMode } from '@angular/core';
        enableProdMode();`))
      .pipe(replace("platformBrowserDynamic().bootstrapModule(AppModule)",
        "platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)"))
      .pipe(gulp.dest('app', { overwrite: true }));
  }
  @Task()
  replace_main_dev(done) {
    return gulp.src(['app/main.ts'])
      .pipe(replace("import { platformBrowser } from '@angular/platform-browser'",
        "import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'"))
      .pipe(replace(
        `import { AppModuleNgFactory } from '../ngc-aot/app/app.module.ngfactory';
        import { enableProdMode } from '@angular/core';
        enableProdMode();`,
        "import { AppModule } from './app.module';"))
      .pipe(replace("platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)",
        "platformBrowserDynamic().bootstrapModule(AppModule)"))
      .pipe(gulp.dest('app', { overwrite: true }));
  }
  @Task()
  replace_aot_pre(done) {
    return gulp.src(['tsconfig-aot.json'])
      .pipe(replace(
        `/*Start of replacement fin*/ "experimentalDecorators": true, /*End of replacement fin*/`,
        `/*Start of replacement pre*/ "experimentalDecorators": true,"outDir": "ngc-aot/tsc", /*End of replacement pre*/`))
      .pipe(replace(
        `/*Start of replacement fin*/ "genDir": "ngc-aot","skipMetadataEmit" : true /*End of replacement fin*/`,
        `/*Start of replacement pre*/ "skipMetadataEmit" : true /*End of replacement pre*/`))
      .pipe(gulp.dest('./', { overwrite: true }));
  }
  @Task()
  replace_aot_fin(done) {
    return gulp.src(['tsconfig-aot.json'])
      .pipe(replace(
        `/*Start of replacement pre*/ "experimentalDecorators": true,"outDir": "ngc-aot/tsc", /*End of replacement pre*/`,
        `/*Start of replacement fin*/ "experimentalDecorators": true, /*End of replacement fin*/`))
      .pipe(replace(
        `/*Start of replacement pre*/ "skipMetadataEmit" : true /*End of replacement pre*/`,
        `/*Start of replacement fin*/ "genDir": "ngc-aot","skipMetadataEmit" : true /*End of replacement fin*/`))
      .pipe(gulp.dest('./', { overwrite: true }));
  }

  ////////////////////////////////////////////////////////////////////////////////
  // BUILD TASKS: Used build the app into the dist folder
  ////////////////////////////////////////////////////////////////////////////////
  @Task()
  build_html(done) {
    return gulp.src('config/env/development/index.html')
      .pipe(replace("<!-- <title></title> -->", "<title>"+ defaultConfig.app.title +"</title>"))
      .pipe(replace('<!-- <link rel="icon"> -->', '<link id="favicon" rel="icon" href="'+ defaultConfig.app.favicon +'">'))
      .pipe(replace('<!-- <meta name="description"> -->', '<meta name="description" content="'+ defaultConfig.app.description +'">'))
      .pipe(replace('<!-- <meta name="keywords"> -->', '<meta name="keywords" content="'+ defaultConfig.app.keywords +'">'))
      .pipe(gulp.dest('./dist/app'));
  }
  @Task()
  build_html_prod(done) {
    return gulp.src('config/env/production/index.html')
      .pipe(replace("<!-- <title></title> -->", "<title>"+ defaultConfig.app.title +"</title>"))
      .pipe(replace('<!-- <link rel="icon"> -->', '<link id="favicon" rel="icon" href="'+ defaultConfig.app.favicon +'">'))
      .pipe(replace('<!-- <meta name="description"> -->', '<meta name="description" content="'+ defaultConfig.app.description +'">'))
      .pipe(replace('<!-- <meta name="keywords"> -->', '<meta name="keywords" content="'+ defaultConfig.app.keywords +'">'))
      .pipe(gulp.dest('./dist/app'));
  }

  @Task()
  build_sass(done) {
    // Brute force fix for angular material import .css .scss error
    del('node_modules/@angular/material/core/overlay/overlay.css');

    return gulp.src('app/styles.scss')
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

  @Task()
  build_systemConf() {
    return gulp.src('config/env/development/systemjs.config.js')
      .pipe(gulp.dest('./dist/app'));
  }

  @Task()
  build_index(done) {
    return gulp.src(['config/env/production/index.js', 'config/env/production/systemjs.server.js'])
      .pipe(gulp.dest('./dist'));
  }

  // Transpile client side TS files
  @Task()
  build(done) {
    let tsProject = ts.createProject('./tsconfig.json');
    let tsResult = tsProject.src()
      .pipe(embedTemplates())
      .pipe(embedSass())
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./dist'));
  }

  @SequenceTask()
  build_client_prod() {
    return [
      'replace_main_dev',
      'replace_aot_pre',
      'compile_client_prod',
      'replace_main_prod',
      'replace_aot_fin',
      'compile_client_prod',
      'rollup_client',
      'build_clean_prod',
      // Bring of back now
      'replace_main_dev',
      'replace_aot_pre'
    ];
  }

  @Task()
  compile_client_prod(done) {
    return gulp.src('')
      .pipe(shell(['"node_modules/.bin/ngc" -p tsconfig-aot.json']));
  }
  @Task()
  rollup_client(done) {
    return gulp.src('')
      .pipe(shell(['"node_modules/.bin/rollup" -c rollup-config.js']));
  }

  @Task()
  build_server_prod() {
    let tsProject = ts.createProject('./tsconfig.json', { module: 'system', outFile: 'server.js' });
    let tsResult = gulp.src(`server/**/**/!(*.spec|*.integration).ts`)
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./tmp'));
  }

  // Transpile single TS file
  buildFile(file: any) {
    let relativePath = file.path.replace(file.cwd + '\\', ''); // copy of relative path

    const tsProject = ts.createProject('tsconfig.json');

    const ht = relativePath.includes('html');
    const sc = relativePath.includes('scss');
    const app = relativePath.includes('app');
    const ser = relativePath.includes('server');

    let fName = relativePath.substring(relativePath.lastIndexOf('\\') + 1, relativePath.length);

    if (fName !== 'index.html' && fName !== 'styles.scss') {
      relativePath = ht ? relativePath.replace('html', 'ts') : sc ? relativePath.replace('scss', 'ts') : relativePath;
      fName = ht ? fName.replace('html', 'ts') : sc ? fName.replace('scss', 'ts') : fName;

      console.log('\n Compiling ----> ' + chalk.green.bold(fName + '\n'));

      const tsResult = gulp.src(relativePath)
        .pipe(embedTemplates())
        .pipe(embedSass())
        .pipe(tsProject());

      relativePath = app ? relativePath.replace('app', 'dist\\app') : ser ?
        relativePath.replace('server', 'dist\\server') : relativePath.replace('config', 'dist\\config');

      relativePath = relativePath.substring(0, relativePath.lastIndexOf('\\'));

      return fName !== 'app.module.ts' ? tsResult.js.pipe(gulp.dest(relativePath)) :
        tsResult.js.pipe(replace('process.env.NODE_ENV', "'development'"))
          .pipe(replace('redux_logger_1.default', 'redux_logger_1')) // workaround
          .pipe(gulp.dest(relativePath));
    } else if (fName === 'index.html') {
      // if file was the index.html
      console.log('\n Moving ----> ' + chalk.green.bold(fName + '\n'));
      return gulp.src('config/env/development/index.html').pipe(gulp.dest('dist/app'));
    } else {
      // if file was the styles.scss
      console.log('\n Compiling ----> ' + chalk.green.bold(fName + '\n'));
      return gulp.src('app/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/app'));
    }
  }

  // Essential sequences for built project
  @SequenceTask()
  build_sequence() {
    return ['build_sass', 'build_html', 'build_assets', 'build_systemConf'];
  }
  @SequenceTask()
  build_sequence_prod() {
    return ['build_sass', 'build_html_prod', 'build_assets', 'build_index'];
  }

  @SequenceTask()
  build_project() {
    return [
      // Make sure the main.ts is back to dev
      'replace_main_dev',
      ///////////////////////////////////////
      'build',
      'build_sequence',
      'replace_process',
      'compress_css'
    ];
  }
  @SequenceTask()
  build_project_prod() {
    return [
      'build_client_prod',
      'build_sequence_prod',
      'build_server_prod',
      'compress_server',
      'compress_css',
      'delete_tmp'
    ];
  }

  ////////////////////////////////////////////////////////////////////////////////
  // COMPRESS TASKS: Used to compress compiled files for space, and speed efficiency
  ////////////////////////////////////////////////////////////////////////////////
  compressAsset(file) {
    const relativePath = file.relative.concat('');
    console.log('\n Inserting ----> ' + chalk.green.bold(
      relativePath.substring(relativePath.lastIndexOf('\\') + 1, relativePath.length)) +
      '\n');

    return imagemin([relativePath], 'dist/app/assets', {
      plugins: [
        imageminJPEGOptim(),
        imageminOptiPNG(),
        imageminSVGO()
      ]
    });
  }
  deleteAsset(file) {   
    const relativePath = file.relative.concat('').replace('app', 'dist\\app'); // make copy of relative path

    console.log('\n Deleting ----> ' + chalk.green.bold(
      relativePath.substring(relativePath.lastIndexOf('\\') + 1, relativePath.length)) +
      '\n');

    del(relativePath);
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

  // Delete tmp folder
  @Task()
  delete_tmp() {
    return del('tmp/**');
  }

  ////////////////////////////////////////////////////////////////////////////////
  // NODEMON TASKS: Used to start the server for dev and prod
  ////////////////////////////////////////////////////////////////////////////////
  // Nodemon task
  @Task()
  nodemon() {
    return plugins.nodemon({
      script: 'dist/server/server.js',
      ext: 'js,html',
      watch: defaultAssets.server.allJS
    });
  }

  // Nodemon production task
  @Task()
  nodemon_prod() {
    return plugins.nodemon({
      script: 'dist/index.js',
      ext: 'js,html'
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  // TESTING TASKS: Used to test the server, client, and e2e
  ////////////////////////////////////////////////////////////////////////////////
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
      configFile: __dirname + '/config/env/test/karma.conf.js',
      singleRun: true
    }, done).start();
  }

  @Task()
  protractor(done) {
    return gulp.src('')
      .pipe(shell(['npm run e2e']));
  }
  @Task()
  protractor_prod(done) {
    return gulp.src('')
      .pipe(shell(['npm run e2e_prod']));
  }

  ////////////////////////////////////////////////////////////////////////////////
  // WATCH TASK: Used for dev environment to watch for file changes to update the
  //             running application (single file compilation)
  ////////////////////////////////////////////////////////////////////////////////
  // Watch Files For Changes
  @Task()
  watch() {
    const serverts = _.union(
      defaultAssets.server.allTS,
      defaultAssets.config.allTS
    );

    // Start livereload
    plugins.livereload.listen();
    // Watch all server TS files to build JS
    watch(serverts, file => this.buildFile(file));
    watch(defaultAssets.server.allJS, plugins.livereload.changed);
    // Watch all TS files in client and compiles JS files in dist
    watch(defaultAssets.client.ts, { events: ['change'] }, file => this.buildFile(file));
    // Watch all scss files to build css is change
    watch(defaultAssets.client.scss, { events: ['change'] }, file => this.buildFile(file));
    watch(defaultAssets.client.dist.css, plugins.livereload.changed);
    // Watch all html files to build them in dist
    watch(defaultAssets.client.views, { events: ['change'] }, file => this.buildFile(file));
    watch(defaultAssets.client.dist.js, plugins.livereload.changed);
    watch(['dist/app/index.html'], plugins.livereload.changed);
    // Watch all client assets to compress in dist
    watch(defaultAssets.client.assets, { events: ['add'] }, file => this.compressAsset(file));
    watch(defaultAssets.client.assets, { events: ['unlink'] }, file => this.deleteAsset(file));
    watch(defaultAssets.client.dist.assets, plugins.livereload.changed);
    // Watch if system.config files are changed
    watch(defaultAssets.client.system, { events: ['change'] }, file => runSequence('build_systemConf'));
    watch(['dist/app/systemjs.config.js'], plugins.livereload.changed);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // LINTING TASKS: Used to lint the projects SCSS and TS files before building
  ////////////////////////////////////////////////////////////////////////////////
  // SASS linting task
  @Task()
  scsslint(done) {
    return gulp.src(['client/styles.scss', 'client/app/components/**/*.scss'])
      .pipe(sassLint({
        rules: {
          'no-css-comments': 0,
          'single-line-per-selector': 0,
          'property-sort-order': 0,
          'empty-args': 0,
          'indentation': 0,
          'empty-line-between-blocks': 0,
          'force-pseudo-nesting': 0,
          'pseudo-element': 0,
          'no-vendor-prefixes': 0,
          'no-color-literals': 0,
          'no-color-keywords': 0,
          'quotes': 0,
          'force-element-nesting': 0,
          'no-ids': 0,
          'leading-zero': 0,
          'space-after-comma': 0
        }
      }))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
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
    return ['scsslint', 'tslint'];
  }

  @Task()
  exit(done) {
    process.exit();
    done();
  }

  ////////////////////////////////////////////////////////////////////////////////
  // MONGO TASKS: Used to start mongod as a child process in dev mode
  ////////////////////////////////////////////////////////////////////////////////
  // @Task()
  // mongod_start(done, cb) {
  //   exec('mongod --dbpath=/data', function(err, stdout, stderr) {
  //     console.log(stdout);
  //     console.log(stderr);
  //     cb(err);
  //   });
  //   done();
  // }

  ////////////////////////////////////////////////////////////////////////////////
  // GULP TASKS: Tasks used to execute project initialization, testing, etc...
  //     gulp             ->         start project compilation in dev environment
  //     gulp prod        ->         start the poject compilation in prod environment
  //     gulp build:prod  ->         only build the project in production mode (not run)
  //     gulp test        ->         start project compilaiton and test server and client
  //     gulp test:e2e    ->         start project compilation and test e2e
  ////////////////////////////////////////////////////////////////////////////////
  // Run the project in development mode
  @SequenceTask()
  default() {
    return [
      'env_dev',
      'lint',
      'build_clean',
      'build_project',
      ['nodemon', 'watch']
    ];
  }
  // Build the project for production and run
  @SequenceTask()
  prod() {
    return [
      'env_prod',
      'build_clean',
      'build_project_prod',
      'nodemon_prod'
    ];
  }
  // Build project for production only
  @SequenceTask('build:prod')
  build_prod() {
    return [
      'build_clean',
      'build_project_prod',
    ];
  }
  // Run the project in test mode
  @SequenceTask()
  test() {
    return [
      'env_test',
      'lint',
      'build_clean',
      'build_project',
      'test_server',
      'test_client',
      'exit'
    ];
  }
  // Run all e2e tests
  @SequenceTask('test:e2e')
  test_e2e() {
    return [
      'env_test',
      'build_clean',
      'build_project',
      'protractor',
    ];
  }
  // Run all e2e tests in production
  @SequenceTask('test:e2e:prod')
  test_e2e_prod() {
    return [
      'env_test',
      'build_clean',
      'build_project_prod',
      'protractor_prod',
    ];
  }
}
