module.exports = function (gulp, plugins) {
	gulp.task('buildProd', function(cb) {
		plugins.sequence(
			'compileAssets',
			'concat:css',
			'cssmin:dist',
      'browserify',
			'linkAssetsBuildProd',
			'clean:build',
			'copy:build',
			cb
		);
	});
};
