var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

gulp.task('nodemon', function() {
  nodemon({ script: './../app.js'})
    .on('restart', function() {
      console.log('restarted!')
    })
})