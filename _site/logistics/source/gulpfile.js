var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;

gulp.task('sass', function () {
    return gulp.src('./static/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./static/css'));
});

gulp.task('watch', ['sass'], function() {
    gulp.watch('./static/scss/**/*.scss', ['sass']);
});