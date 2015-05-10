var livereload = require('gulp-livereload');
var gulp = require('gulp');

gulp.task('live', function() {
  gulp.src(['index.ejs', './app/**/**/*.html'])
    .pipe(livereload());
});