/**
 * Minify files with UglifyJS.
 *
 * ---------------------------------------------------------------
 *
 * Minifies client-side javascript `assets`.
 *
 */
module.exports = function(gulp, plugins, growl) {

	gulp.task('uglify:dist', function() {
		return gulp.src('.tmp/public/browserify/app.js')
				.pipe(plugins.uglify(/* {mangle: true} */))
				.pipe(gulp.dest('.tmp/public/min'))
				.pipe(plugins.if(growl, plugins.notify({ message: 'uglify dist task complete' })));
		});
};
