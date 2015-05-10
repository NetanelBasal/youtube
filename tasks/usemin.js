var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./../gulp-config');

gulp.task('usemin', function() {
  gulp.src(config.mainFile)
    .pipe($.usemin({
      assetsDir: __dirname + '/../',
      js       : [$.uglify({ mangle: false }), $.rev()],
      css      : [$.minifyCss(), $.rev()]
    }))

    .pipe(gulp.dest('./production'));
});