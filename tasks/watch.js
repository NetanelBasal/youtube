var gulp = require('gulp');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var config = require('./../gulp-config');

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(config.js.watch, ['js']);
  gulp.watch(config.sass.watch, ['sass']);
  gulp.watch(config.bower.file, ['bower']);

  gulp.watch(config.live.watch).on('change', function() {
    livereload.reload();
  });
});