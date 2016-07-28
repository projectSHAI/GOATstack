var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var defaultAssets = require('./config/assets/default');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var cleanCompiledTypeScript = require('gulp-clean-compiled-typescript');

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

gulp.task('buildClient', function () {
	var tsProject = ts.createProject(path.resolve('./client/tsconfig.json'));
	return gulp.src(path.resolve('./client/**/*.ts'))
		.pipe(ts(tsProject))
		.js
		.pipe(gulp.dest(path.resolve('./client')))
});

// Nodemon task
gulp.task('nodemon', function () {
  return nodemon({
    script: 'server/server.js',
    //nodeArgs: ['--debug'],
    ext: 'js,html',
    env: { 'NODE_ENV': 'development' },
    watch: ['server/server.js', ]
  })
  .on('stop', function() {
    return gulp.src('./client/*.ts')
      .pipe(cleanCompiledTypeScript());
  });
});

// Watch Files For Changes
gulp.task('watch', function () {
  // Add watch rules
  gulp.watch(defaultAssets.server.allJS);//.on('change', plugins.livereload.changed);
  gulp.watch(defaultAssets.client.js);
  gulp.watch(defaultAssets.client.css);

});

// Run the project in development mode
gulp.task('default', function (done) {
  runSequence('env:dev', 'buildClient', ['nodemon', 'watch'], done);
});