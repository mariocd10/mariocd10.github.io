var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');

gulp.task('default', function(){
    runSequence(['sass', 'browserSync', 'watch'], callback)
})

gulp.task('useref', function(){
    return gulp.src('./*.html')
        .pipe(useref())
        //minifies only if it's a js file
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('./'))
})

gulp.task('build', function(callback){
    runSequence('sass', ['useref'], callback)
})

// Development Process
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('./index.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});