/**
 * browserify + babel react
 * @param gulp
 * @param plugins
 * @param growl
 */
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const babelify = require("babelify");
const gutil = require("gulp-util");
const reactify = require('reactify');
const sourcemaps = require("gulp-sourcemaps");

console.log("br");

module.exports = function(gulp, plugins, growl) {
  gulp.task("browserify", function () {
    browserify(require("../pipeline").browserifyEntranceJS, { transform: [babelify.configure(
      {
        presets: ["es2015", "react"],
        compact: true
      }
    )], debug: true })
      .bundle()
      .on("error", gutil.log)
      .pipe(source("app.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(plugins.uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest('./.tmp/public/browserify'))
      .pipe(plugins.if(growl, plugins.notify({ message: 'Browserify task complete' })));
  });

};
