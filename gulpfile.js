var gulp = require('gulp');

var plugins = {
  autoprefixer: require('gulp-autoprefixer'),
  babelify: require('babelify'),
  browserify: require('browserify'),
  changed: require('gulp-changed'),
  clean: require('gulp-clean'),
  connect: require("gulp-connect"),
  htmlReplace: require('gulp-html-replace'),
  htmlmin: require('gulp-htmlmin'),
  jshint: require('gulp-jshint'),
  minifyCss: require('gulp-minify-css'),
  rename: require('gulp-rename'),
  sass: require('gulp-sass'),
  sourcemaps: require('gulp-sourcemaps'),
  streamify: require('gulp-streamify'),
  uglify: require('gulp-uglify'),
  vss: require('vinyl-source-stream'),
  watchify: require('watchify')
};

var path = {
  SOURCE: './src/',
  BUILD: './build/',
  DIST: './dist/'
};

var files = ["jsx", "sass", "html"];

function defineTasks() {
  // Pull in task definitions
  files.forEach(function(file) {
    require("./gulp-tasks/" + file)(gulp, plugins, path);
  });

  gulp.task('clean', clean);
  gulp.task('jshint', jshint);
  gulp.task('webserver', webserver);
  gulp.task('watch', ['webserver', 'watch-jsx', 'watch-html', 'watch-sass']);
  gulp.task('default', ['clean', 'html', 'jsx', 'sass', 'jshint']);
}

function clean() {
  gulp.src(path.DIST + "/*", {
      read: false
    })
    .pipe(plugins.clean());
}

function webserver() {
  plugins.connect.server({
    livereload: true,
    root: './build'
  });
}

function jshint() {
  gulp.src(path.BUILD + 'js/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
}

defineTasks();
