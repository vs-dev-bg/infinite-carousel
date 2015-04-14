/**
 *Created by Victor Simeonov on 15-3-26.
 */
(function () {
    "use strict";

    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        liveReload = require('gulp-livereload');

    gulp.task('scripts', function () {
        return gulp.src('./js/*.js')
                .pipe(gulp.dest('./js/'))
                .pipe(liveReload());
    });

    gulp.task('html', function () {
        return gulp.src('./*.html')
                .pipe(gulp.dest('./'))
                .pipe(liveReload());
    });

    gulp.task('styles', function () {
        return gulp.src('./sass/styles.scss')
                .pipe(sass())
                .pipe(gulp.dest('./css/'))
                .pipe(liveReload());
    });

    gulp.task('watch', function () {
        liveReload.listen();

        gulp.watch('./js/*.js', ['scripts']);
        gulp.watch('./*.html', ['html']);
        gulp.watch('./sass/**/*.scss', ['styles']);
    });

    gulp.task('default', ['watch'], function () {});
})();