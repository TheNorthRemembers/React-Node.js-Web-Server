// @flow
const gulp = require("gulp");
const pug = require("gulp-pug");
const replace = require("gulp-replace");
const path = require("path");
const plumber = require("gulp-plumber");

gulp.task("deploy", () => {
  return gulp
    .src("./server/web/views/**/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        basedir: path.join("server/web/views"),
        client: true,
        verbose: true,
        cache: true,
        compileDebug: false,
      })
    ) // pipe to pug plugin
    .pipe(
      replace("function template(locals)", "module.exports = function(locals)")
    )
    .pipe(gulp.dest("dist/server/web/views")); // tell gulp our output folder
});
