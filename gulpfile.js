var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var clean = require('gulp-clean'); 

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
      .pipe(browserify({transform: 'reactify'}))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('clean-scripts', function () {
  return gulp.src('dist/*.*', {read: false})
    .pipe(clean());
});

gulp.task('copy',['clean-scripts'],function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
    gulp.src('src/css/*')
      .pipe(gulp.dest('dist/css'));
});

gulp.task('default',['browserify', 'copy']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});