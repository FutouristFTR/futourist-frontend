// gulpfile.js

var gulp = require("gulp");
var sass = require("gulp-sass");

var sassSource = ["src/styles/*.scss", "src/components/**/*.scss", "src/views/**/*.scss"];

var cssDest = "public/css/";

gulp.task("styles", function() {
  return gulp
    .src(sassSource)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(cssDest));
});

gulp.task("watch", function() {
  gulp.watch(sassSource, gulp.series("styles"));
});
