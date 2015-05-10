var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');

gulp.task('tc', function() {
  gulp.src('./app/**/**/*.html')
    .pipe(templateCache({
      standalone: true,
      root      : 'app',
      module    : 'templates'
    }))
    .pipe(gulp.dest('./app/'));
});