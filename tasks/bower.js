var gulp = require('gulp');
var wiredep = require('wiredep').stream;

var config = require('./../gulp-config');

gulp.task('bower', function() {
  gulp.src(config.bower.src, { base: './' })
    .pipe(wiredep())
    .pipe(gulp.dest(config.bower.dist));
});