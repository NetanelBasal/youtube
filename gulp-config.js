// The paths are relative to the gulpfile.js

var config = {

  server: {
    root: './index.html'
  },

  js: {
    mainFileName: 'main.js',
    src         : './app/main.js',
    dist        : './dist',
    watch       : ['./app/**/**/*.js']
  },

  mainFile: './index.html',

  sass: {
    src  : './sass/main.scss',
    dist : './dist',
    watch: ['./sass/**/*.scss', './app/**/**/*.scss']
  },

  img: {
    src : './app/img/**/**/*.{png,gif,jpg,jpeg}',
    dist: './app/img/'
  },

  bower: {
    src : './index.ejs',
    dist: './',
    file: './bower.json'
  },

  live: {
    watch: ['./app/**/**/*.html', './index.ejs']
  },

  copy: {
    src : ['./img'],
    dist: './production'
  }

}

module.exports = config;
