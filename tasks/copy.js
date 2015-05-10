var gulp = require('gulp');

var config = require('./../gulp-config');

gulp.task('copy', function() {
  gulp.src(config.copy.src)
    .pipe(gulp.dest(config.copy.dist));
});