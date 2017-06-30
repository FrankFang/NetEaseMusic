var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
var gutil = require('gulp-util');
const babel = require('gulp-babel');


gulp.task('reset', function() {
  return del(['build']);
});

gulp.task('js', ['reset'], function() {
  return gulp.src('*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['js']);

