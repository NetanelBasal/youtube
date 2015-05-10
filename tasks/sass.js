var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./../gulp-config');

gulp.task('sass', function() {
  var onError = function( err ) {
    $.notify.onError({
      title   : "Gulp",
      subtitle: "Sass Failure!",
      message : "Error: <%= error.message %>",
      sound   : "Beep"
    })(err);
  };
  return $.rubySass(config.sass.src)
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.autoprefixer("last 10 versions", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest(config.sass.dist))
    .pipe($.wait(1000))
    .pipe($.livereload())
    .pipe($.notify("Sass Finished!"));
});
