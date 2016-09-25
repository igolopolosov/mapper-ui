var gulp = require('gulp');
var less = require('gulp-less');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var uncss = require('gulp-uncss');

gulp.task('less', function() {
  return gulp.src('app/less/**/*.less')
           .pipe(plumber())
         .pipe(less())
         .pipe(gulp.dest('app/css'))
         .pipe(browserSync.reload({
            stream: true
         }));
});

gulp.task('babel', function() {
  return gulp.src('app/babel/**/*.js')
           .pipe(plumber())
         .pipe(babel({
           presets: ['es2015']
         }))
         .pipe(gulp.dest('app/js'))
         .pipe(browserSync.reload({
            stream: true
         }));
});

gulp.task('uncss', function() {
  return gulp.src('app/css/*.css')
         .pipe(uncss({
           html: ['app/index.html']
         }))
         .pipe(gulp.dest('final'));
});

gulp.task('useref', function() {
  return gulp.src('app/*.html')
         .pipe(useref())
         .pipe(gulpIf('*.js', uglify()))
         .pipe(gulp.dest('final'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('watch', ['browserSync', 'less', 'babel'], function() {
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/babel/**/*.js', ['babel']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/babel/**/*.js', browserSync.reload);
});
