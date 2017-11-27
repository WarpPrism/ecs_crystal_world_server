var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCss = require('gulp-clean-css')
var autoprefixer = require('gulp-autoprefixer')
var rename = require('gulp-rename')

var base = './static/index'

gulp.task('style', function() {
  var src = base + '/*.scss'
  var dest = base + '/'
  gulp.src(src)
  .pipe(sass().on('error'), sass.logError)
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(cleanCss())
  .pipe(gulp.dest(dest));
})

gulp.task('watch', function() {
  gulp.watch(base + '/*.scss', ['style'])
})

gulp.task('default', function() {
  gulp.start('style')
})