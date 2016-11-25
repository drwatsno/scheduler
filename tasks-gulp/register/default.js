module.exports = function (gulp, plugins) {
	gulp.task('default', function(cb) {
		plugins.sequence(
			'compileAssets',
      'browserify',
			['images', 'linkAssets'],
			['watch:api', 'watch:assets'],
			cb
		);
	});
};
