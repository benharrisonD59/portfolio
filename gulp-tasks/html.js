module.exports = function( gulp, plugins, path ) {
  var htmlIndex = path.SOURCE + "index.html";

  function build() {
    gulp.src( htmlIndex )
      .pipe( gulp.dest( path.BUILD ) )
      .pipe( plugins.htmlmin( {
        collapseWhitespace: true
      } ) )
      .pipe( gulp.dest( path.DIST ) )
      .pipe( plugins.connect.reload() );
    console.log( '[' + new Date().toLocaleTimeString( 'en-US', { hour12: false } ) + '] Updated HTML!' );
  }

  function watch() {
    build();
    gulp.watch( htmlIndex, build );
  }

  gulp.task( "html", build );
  gulp.task( "watch-html", watch );
};
