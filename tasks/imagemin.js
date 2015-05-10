var gulp = require('gulp');
var imageop = require('gulp-image-optimization');

var config = require('./../gulp-config');
 
gulp.task('images', function() {
    gulp.src([config.img.src]).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest(config.img.dist));
});