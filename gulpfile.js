/*jshint globalstrict: true*/
'use strict';

var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    jshint = require('gulp-jshint'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    open = require('gulp-open'),
    changed = require('gulp-changed'),
    usemin = require('gulp-jade-usemin'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver');

/***********************************************************
 Build Tasks
***********************************************************/

var paths = {
  dist: './dist'
};

gulp.task('usemin', function () {
  return gulp.src(paths.dist + '/index.jade')
    .pipe(usemin({
      js: [uglify()]
    }))
    .pipe(gulp.dest(paths.dist));
});

// Remove everything from dist folder at the beginning
gulp.task('clean', function (done) {
  del([paths.dist + '/**'], done);
});

// Compress images and copy to dist
gulp.task('imagemin', function () {
  return gulp.src('./src/images/*.{png,jpg,jpeg}')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist + '/images'));
});

// Compress images and copy to dist
gulp.task('copy-images', function () {
  return gulp.src('./src/images/**')
    .pipe(gulp.dest(paths.dist + '/images'));
});

// Lint JS files and copy to dist
gulp.task('lint', function () {
  gulp.src('./src/js/scripts.js')
    .pipe(changed(paths.dist))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist + '/js'));
});

// Compile changed Jade files to HTML and copy to dev_server
gulp.task('jade', function () {
  return gulp.src('./src/**/*.jade')
    .pipe(changed(paths.dist))
    .pipe(jade({ pretty : true }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('jade-index', function () {
  return gulp.src('./dist/index.jade')
    .pipe(jade({ pretty : true }))
    .pipe(gulp.dest('./dist'));
});

// Compile changed Sass files to CSS and copy to dev_server
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(changed(paths.dist))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.dist + '/css'));
});

// Compile changed Stylus files to CSS and copy to dev_server
gulp.task('clean-up', function (done) {
  del(['./dist/index.jade'], done);
});

// Set up watchers for files
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('./src/**/*.js', ['lint']);
  gulp.watch('./src/**/*.jade', ['jade']);
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch(['./dist/**']).on('change', livereload.changed);
});

gulp.task('webserver', function() {
  gulp.src(paths.dist)
    .pipe(webserver({
      directoryListing: false,
      port: 3000,
      fallback: 'index.html',
      open: true
    }));
});

// Open Chrome to the site
gulp.task('open', function () {
  setTimeout( function () {
    gulp.src('./dist/index.html')
      .pipe(open('', {
        url: 'http://localhost:3000',
        app: 'Google Chrome'
      }));
  }, 2000);
});

// Copy bower_components folder and index.jade to dist
gulp.task('copy-build', function () {
  gulp.src('./ResponsiveImageGallery/**')
    .pipe(gulp.dest('./dist/ResponsiveImageGallery'));
  gulp.src('./bootstrap/**')
    .pipe(gulp.dest('./dist/bootstrap'));
  gulp.src(['./src/js/**', '!./js/scripts.js'])
    .pipe(gulp.dest('./dist/js'));
  gulp.src('./src/images/*.svg')
    .pipe(gulp.dest('./dist/images/'));
  gulp.src('./src/index.jade')
    .pipe(gulp.dest('./dist'));
});

// Run all the dev tasks in sequence, the ones in [] will run in parallel
gulp.task('default', function () {
  runSequence(
    'clean',
    'copy-build',
    ['lint', 'jade', 'sass', 'copy-images'],
    'jade-index',
    'clean-up',
    ['webserver', 'watch']
  );
});

// Run all the build tasks in sequence, the ones in [] will run in parallel
gulp.task('build', function () {
  runSequence(
    'clean',
    'copy-build',
    ['lint', 'sass', 'jade', 'imagemin'],
    'usemin',
    'jade-index',
    'clean-up'
  );
});
