var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
var gutil = require('gulp-util');
const babel = require('gulp-babel');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
let cleanCSS = require('gulp-clean-css');
let livereload = require('gulp-livereload');




gulp.task('reset', function() {
  return del(['build']);
});

gulp.task('js', ['reset'], function(){
  return gulp.src('*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('build/'))
});
gulp.task('onlyjs', function() {
  return gulp.src('*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('build/'))
    .pipe(livereload())
});

gulp.task('onlycss', function(){
  return gulp.src('*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/'))
    .pipe(livereload())
})
gulp.task('css', ['reset'], function(){
  return gulp.src('*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/'))
})

const imagePath = './images/**/*.{gif,jpg,png}'

gulp.task('images', ['reset'], function(){
  return gulp.src(imagePath)
    .pipe(imagemin())
    .pipe(gulp.dest('build/images/'))
})
gulp.task('onlyimages', function(){
  return gulp.src(imagePath)
    .pipe(imagemin())
    .pipe(gulp.dest('build/images/'))
    .pipe(livereload())
  
})

gulp.task('static-files', ['reset'], function(){
  return gulp.src('./*.{html,json}')
    .pipe(gulp.dest('build/'));
})

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('*.js', ['onlyjs']);
  gulp.watch('*.css', ['onlycss']);
  gulp.watch(imagePath, ['onlyimages']);
});

gulp.task('default', ['js','css', 'images', 'static-files', 'watch']);

