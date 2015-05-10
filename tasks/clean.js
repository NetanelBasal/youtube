var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function() {
  return gulp.src('./production')
    .pipe(clean({
      force: true,
      read: false
    }))
    .pipe(gulp.dest('./'));
});