module.exports = function (gulp, plugins) {
	gulp.task('prod', function(cb) {
		plugins.sequence(
			'compileAssets',
			'concat:css',
			'cssmin:dist',
      'browserify',
			'sails-linker-gulp:prodAssets',
			'sails-linker-gulp:prodViews',
            'images',
			cb
		);
	});
};
