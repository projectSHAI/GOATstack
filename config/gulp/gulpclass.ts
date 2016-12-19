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
let prompt = require('gulp-prompt');

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
    return del([
      'dist/**',
      '!dist',
      'ngc-aot/**',
      'client/**/**/**/*.js*',
      'client/**/**/**/*.ngfactory*',
      'client/**/**/**/*.shim*',
      'client/**/**/**/*.css',
      '!client/**/**/*e2e-spec.js',
      'tmp/**'
    ], done);
  }

  @Task()
  build_clean_prod(done) {
    return del([
      'ngc-aot/**',
      'client/**/**/**/*.js*',
      'client/**/**/**/*.ngfactory*',
      'client/**/**/**/*.shim*',
      'client/**/**/**/*.css',
      '!client/**/**/*e2e-spec.js'
    ], done);
  }

  @Task()
  build_clean_heroku(done) {
    return del([
      'dist/.git'
    ], done);
  }

  @Task()
  build_clean_css(done) {
    return del([
      'client/**/**/**/*.css'
    ], done);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // REPLACEMENT TASKS: Used to replace strings in files depending on environment
  ////////////////////////////////////////////////////////////////////////////////
  @Task()
  replace_process(done) {
    return gulp.src(['dist/client/*.module.js'])
      .pipe(replace('redux_logger_1.default', 'redux_logger_1'))
      .pipe(gulp.dest('dist/client', { overwrite: true }));
  }

  ////////////////////////////////////////////////////////////////////////////////
  // BUILD TASKS: Used build the app into the dist folder
  ////////////////////////////////////////////////////////////////////////////////
  @Task()
  build_html(done) {
    return gulp.src(['config/env/development/index.html', 'client/**/**/**/*.html'])
      .pipe(replace("<!-- <title></title> -->", "<title>"+ defaultConfig.app.title +"</title>"))
      .pipe(replace('<!-- <link rel="icon"> -->', '<link id="favicon" rel="icon" href="'+ defaultConfig.app.favicon +'">'))
      .pipe(replace('<!-- <meta name="description"> -->', '<meta name="description" content="'+ defaultConfig.app.description +'">'))
      .pipe(replace('<!-- <meta name="keywords"> -->', '<meta name="keywords" content="'+ defaultConfig.app.keywords +'">'))
      .pipe(defaultConfig.app.g_analytics !== '' ? replace('<!-- <script>Google Analytics</script> -->', defaultConfig.app.g_analytics) :
        replace('<!-- <script>Google Analytics</script> -->', ''))
      .pipe(gulp.dest('./dist/client'));
  }
  @Task()
  build_html_prod(done) {
    return gulp.src('config/env/production/index.html')
      .pipe(replace("<!-- <title></title> -->", "<title>"+ defaultConfig.app.title +"</title>"))
      .pipe(replace('<!-- <link rel="icon"> -->', '<link id="favicon" rel="icon" href="'+ defaultConfig.app.favicon +'">'))
      .pipe(replace('<!-- <meta name="description"> -->', '<meta name="description" content="'+ defaultConfig.app.description +'">'))
      .pipe(replace('<!-- <meta name="keywords"> -->', '<meta name="keywords" content="'+ defaultConfig.app.keywords +'">'))
      .pipe(defaultConfig.app.g_analytics !== '' ? replace('<!-- <script>Google Analytics</script> -->', defaultConfig.app.g_analytics) :
        replace('<!-- <script>Google Analytics</script> -->', ''))
      .pipe(gulp.dest('./dist/client'));
  }

  build_html_file(file) {
    const relativePath = file.path.replace(file.cwd + '\\', '');
    const relPathDest = relativePath.substring(0, relativePath.lastIndexOf('\\'));

    console.log('\n Moving ----> ' + chalk.green.bold(
      relativePath.substring(relativePath.lastIndexOf('\\') + 1, relativePath.length)) +
      '\n');

    return gulp.src(relativePath)
      .pipe(gulp.dest(relPathDest.replace('client', 'dist\\client')));
  }

  @Task()
  build_sass(done) {
    return gulp.src('client/**/**/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/client'));
  }
  @Task()
  build_sass_prod(done) {
    return gulp.src('client/**/**/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./client'));
  }

  build_sass_file(file) {    
    const relativePath = file.path.replace(file.cwd + '\\', '');
    const relPathDest = relativePath.substring(0, relativePath.lastIndexOf('\\'));

    console.log('\n Compiling ----> ' + chalk.green.bold(
      relativePath.substring(relativePath.lastIndexOf('\\') + 1, relativePath.length)) +
      '\n');

    return gulp.src(relativePath)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(relPathDest.replace('client', 'dist\\client')));
  }

  @Task()
  move_styles() {
    return gulp.src('client/styles.css')
      .pipe(gulp.dest('./dist/client'));
  }

  @Task()
  build_assets(done) {
    return imagemin(defaultAssets.client.assets, 'dist/public/assets', {
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
      .pipe(gulp.dest('./dist/client'));
  }

  @Task()
  build_index(done) {
    return gulp.src(['config/env/production/index.js', 'config/env/production/systemjs.server.js'])
      .pipe(gulp.dest('./dist'));
  }

  @Task()
  build_package_heroku(done) {
    return gulp.src(['package.json'])
      .pipe(replace('"start": "node dist/index"', '"start": "node index"'))
      .pipe(gulp.dest('./dist'));
  }

  // Transpile client side TS files
  @Task()
  build(done) {
    let tsProject = ts.createProject('./tsconfig.json');
    let tsResult = tsProject.src()
      .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('./dist'));
  }

  @SequenceTask()
  build_client_prod() {
    return [
      'compile_client_prod',
      'rollup_client',
      'build_clean_prod',
    ];
  }

  @Task()
  compile_client_prod(done) {
    return gulp.src('')
      .pipe(shell(['"node_modules/.bin/ngc" -p tsconfig-aot.json --exclude client/**/**/**/*.spec.ts']));
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
  @Task()
  build_server_heroku() {
    let tsProject = ts.createProject('./tsconfig.json', { module: 'system', outFile: 'server.js' });
    let tsResult = gulp.src(`server/**/**/!(*.spec|*.integration).ts`)
      .pipe(tsProject());

    return tsResult.js
      .pipe(replace("app.use(express.static('dist/client'))", "app.use(express.static('client'))"))
      .pipe(replace("app.use('*', express.static('dist/client'))", "app.use('*', express.static('client'))"))
      .pipe(replace("res.sendFile(path.resolve(__dirname, 'dist/client/index.html'))", 
        "res.sendFile(path.resolve(__dirname, 'client/index.html'))"))
      .pipe(gulp.dest('./tmp'));
  }

  // Transpile single TS file
  buildFile(file: any) {
    let relativePath = file.path.replace(file.cwd + '\\', ''); // copy of relative path

    const tsProject = ts.createProject('tsconfig.json');

    const cli = relativePath.includes('client');
    const ser = relativePath.includes('server');

    let fName = relativePath.substring(relativePath.lastIndexOf('\\') + 1, relativePath.length);

    if (fName !== 'index.html' && fName !== 'styles.scss') {
      console.log('\n Compiling ----> ' + chalk.green.bold(fName + '\n'));

      const tsResult = gulp.src(relativePath)
        .pipe(tsProject());

      relativePath = cli ? relativePath.replace('client', 'dist\\client') : ser ?
        relativePath.replace('server', 'dist\\server') : relativePath.replace('config', 'dist\\config');

      relativePath = relativePath.substring(0, relativePath.lastIndexOf('\\'));

      return fName !== 'main.module.ts' ? tsResult.js.pipe(gulp.dest(relativePath)) :
        tsResult.js.pipe(replace('redux_logger_1.default', 'redux_logger_1')) // workaround
          .pipe(gulp.dest(relativePath));
    } else if (fName === 'index.html') {
      // if file was the index.html
      console.log('\n Moving ----> ' + chalk.green.bold(fName + '\n'));
      return gulp.src('config/env/development/index.html').pipe(gulp.dest('dist/client'));
    } else {
      // if file was the styles.scss
      console.log('\n Compiling ----> ' + chalk.green.bold(fName + '\n'));
      return gulp.src('client/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/client'));
    }
  }

  // Essential sequences for built project
  @SequenceTask()
  build_sequence() {
    return ['build_sass', 'move_styles', 'build_html', 'build_assets', 'build_systemConf'];
  }
  @SequenceTask()
  build_sequence_prod() {
    return ['build_sass_prod', 'move_styles', 'build_html_prod', 'build_assets', 'build_index'];
  }
  @SequenceTask()
  build_sequence_heroku() {
    return ['build_sass_prod', 'move_styles', 'build_html_prod', 'build_assets', 'build_index', 'build_package_heroku'];
  }

  @SequenceTask()
  build_project() {
    return [
      'build_sequence',
      'build',
      'build_clean_css',
      'compress_css',
      'brute_force_fixes'
    ];
  }
  @SequenceTask()
  build_project_prod() {
    return [
      'build_sequence_prod',
      'build_client_prod',
      'build_server_prod',
      'compress_server',
      'compress_css',
      'build_clean_css',
      'delete_tmp'
    ];
  }
  @SequenceTask()
  build_project_heroku() {
    return [
      'build_sequence_heroku',
      'build_client_prod',
      'build_server_heroku',
      'compress_server',
      'compress_css',
      'build_clean_css',
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

    return imagemin([relativePath], 'dist/public/assets', {
      plugins: [
        imageminJPEGOptim(),
        imageminOptiPNG(),
        imageminSVGO()
      ]
    });
  }
  deleteAsset(file) {   
    const relativePath = file.relative.concat('').replace('public', 'dist\\public'); // make copy of relative path

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
      .pipe(gulp.dest('dist/client'));
  }

  // Compress css
  @Task()
  compress_css() {
    return gulp.src('dist/client/styles.css')
      .pipe(plugins.uglifycss({
        "maxLineLen": 80
      }))
      .pipe(gulp.dest('dist/client'));
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
    plugins.livereload.listen({
      reloadPage: process.cwd() + 'dist/client/index.html'
    });
    // Watch all server TS files to build JS
    watch(serverts, file => this.buildFile(file));
    // watch(defaultAssets.server.allJS, plugins.livereload.changed);
    // Watch all TS files in client and compiles JS files in dist
    watch(defaultAssets.client.ts, { events: ['change'] }, file => this.buildFile(file));
    watch(defaultAssets.client.dist.js, plugins.livereload.changed);
    // Watch all scss files to build css is change
    watch(defaultAssets.client.scss, { events: ['change'] }, file => this.build_sass_file(file));
    watch(defaultAssets.client.dist.css, file => plugins.livereload.reload());
    // Watch all html files to build them in dist
    watch(defaultAssets.client.views, { events: ['change'] }, file => this.build_html_file(file));
    watch(defaultAssets.client.dist.views, plugins.livereload.changed);
    // Watch all client assets to compress in dist
    watch(defaultAssets.client.assets, { events: ['add'] }, file => this.compressAsset(file));
    watch(defaultAssets.client.assets, { events: ['unlink'] }, file => this.deleteAsset(file));
    watch(defaultAssets.client.dist.assets, plugins.livereload.changed);
    // Watch if system.config files are changed
    watch(defaultAssets.client.system, { events: ['change'] }, file => runSequence('build_systemConf'));
    watch(['dist/client/systemjs.config.js'], plugins.livereload.changed);
  }

  @Task()
  watch_ngc() {
    return watch(['ngc-aot'], { events: ['add'] }, () => {
      return gulp.src('ngc-aot/client/**/**/**/*.shim.ts')
        .pipe(gulp.dest('client'));
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  // LINTING TASKS: Used to lint the projects SCSS and TS files before building
  ////////////////////////////////////////////////////////////////////////////////
  // SASS linting task
  @Task()
  scsslint(done) {
    return gulp.src(['client/styles.scss', 'client/**/components/**/*.scss'])
      .pipe(sassLint({
        rules: {
          'single-line-per-selector': 0,
          'space-after-colon': 0,
          'space-before-brace': 0,
          'property-sort-order': 0,
          'empty-args': 0,
          'indentation': 0,
          'empty-line-between-blocks': 0,
          'force-pseudo-nesting': 0,
          'pseudo-element': 0,
          'no-css-comments': 0,
          'no-empty-rulesets': 0,
          'no-important': 0,
          'no-vendor-prefixes': 0,
          'no-color-literals': 0,
          'no-color-keywords': 0,
          'no-qualifying-elements': 0,
          'no-trailing-whitespace': 0,
          'quotes': 0,
          'final-newline': 0,
          'force-element-nesting': 0,
          'no-ids': 0,
          'leading-zero': 0,
          'space-after-comma': 0,
          'space-around-operator': 0,
          'space-before-bang': 0
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

  @Task()
  heroku_prompt() {

    if (defaultConfig.https_secure)
      console.log('\n\n' + chalk.red.bold('You are about to deploy to Heroku with GOAT configured for HTTPS!!\n\n' +
        'The deployed applicaiton WILL FAIL unless you configure the\ncertificates in Heroku correctly!!\n\n') +
        chalk.green.bold('We suggest setting https_secure: false in "config/env/default"\nuntil you are prepared.\n\n'));

    return gulp.src('')
      .pipe(prompt.prompt([{
        type:     'list',
        name:     'heroku_choice',
        message:  'What action would you like to do? (on your account)',
        choices:  ['1) Push to existing repo', '2) Create new heroku app'],
        default:  0
      }], function(answers) {
        if (answers.heroku_choice === '1) Push to existing repo') {
          return gulp.src('')
            .pipe(prompt.prompt([{
              type:     'input',
              name:     'appname',
              message:  'The name of the heroku application?'
            }], function(answers) {
              return gulp.src('')
                .pipe(shell([
                  fs.existsSync('dist') ? '' : 'mkdir dist',
                  'cd dist && git init',
                  'cd dist && gulp build:heroku',
                  'cd dist && git add .',
                  'cd dist && git commit -m "goat-stack deploy"',
                  'cd dist && git remote add heroku https://git.heroku.com/' + answers.appname + '.git',
                  'cd dist && git push --force heroku master',
                  'cd dist && heroku open --app ' + answers.appname
                ]));
            }));
        } else {
          return gulp.src('')
            .pipe(prompt.prompt([{
              type:      'input',
              name:      'appname',
              message:   'What name would like the app to have?'
            }, {
              type:      'input',
              name:      'db_uri',
              message:   'What is the database URI?'
            }, {
              type:      'input',
              name:      'db_user',
              message:   'What is the username for the database?'
            }, {
              type:      'input',
              name:      'db_pw',
              message:   'What is the password for this user?'
            }], function(answers) {
              return gulp.src('')
                .pipe(shell([
                  fs.existsSync('dist') ? '' : 'mkdir dist',
                  'cd dist && git init',
                  'cd dist && heroku create ' + answers.appname,
                  'cd dist && heroku config:set DB_URI=' + answers.db_uri + ' DB_USER=' + answers.db_user + ' DB_PW=' + answers.db_pw,
                  'cd dist && gulp build:heroku',
                  'cd dist && git add .',
                  'cd dist && git commit -m "goat-stack deploy"',
                  'cd dist && git push --force heroku master',
                  'cd dist && heroku open --app ' + answers.appname
                ]));
            }));
        }
      }));
  }

  ////////////////////////////////////////////////////////////////////////////////
  // FIXES TASK: When a problem that cannot be solved by conventional means
  ////////////////////////////////////////////////////////////////////////////////
  @SequenceTask()
  brute_force_fixes() {
    return [
      'replace_process'
    ];
  }

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

  // Build project for production:heroku only
  @SequenceTask('build:heroku')
  build_heroku() {
    return [
      'build_clean',
      'build_project_heroku',
    ];
  }
  // Prompt for heroku repo options
  @SequenceTask('deploy:heroku')
  deploy_heroku() {
    return [
      'build_clean_heroku',
      'heroku_prompt'
    ];
  }
}
