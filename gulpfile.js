var gulp = require('gulp');

var requireDir = require('require-dir');

var runSequence = require('gulp-run-sequence');

requireDir('./tasks', {
  recurse: true
});

gulp.task('dev', function( cb ) {
  runSequence('bower', 'js', 'sass', 'watch', cb);
});

gulp.task('build', function( cb ) {
  runSequence('images', 'clean', 'copy','tc', 'usemin', cb);
});




