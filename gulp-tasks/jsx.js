module.exports = function (gulp, plugins, path) {
  var browserifyContext = plugins.browserify({
    entries: path.SOURCE + "js/main.js",
    extensions: ['.js', '.jsx'],
    transform: [plugins.babelify],
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  function build() {
    browserifyContext.bundle()
      .pipe(plugins.vss('bundle.js'))
      .pipe(gulp.dest(path.BUILD))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest(path.DIST))
      .pipe(plugins.connect.reload());
    console.log('[' + new Date().toLocaleTimeString('en-US', {hour12: false}) + '] Updated JSX!');
  }

  function watch() {
    build();
    plugins.watchify(browserifyContext)
      .on('update', function () { build(); });
  }

  gulp.task('jsx', build);
  gulp.task('watch-jsx', watch);
};