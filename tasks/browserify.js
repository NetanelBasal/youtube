var config = require('./../gulp-config');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var to5ify = require('6to5ify');


gulp.task('js', function() {
  browserify(config.js.src, {
    debug: true
  })
    .transform(to5ify)
    .bundle()
    .pipe(source(config.js.mainFileName))
    .pipe(buffer())
    .pipe($.ngAnnotate())
    .pipe($.sourcemaps.init({
      loadMaps: true
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.dist))
    .pipe($.wait(1000))
    .pipe($.livereload());
});