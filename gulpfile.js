var gulp = require('gulp');
var concat = require('gulp-concat');
var unglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var merge = require('merge-stream');

gulp.task('clean', function() {
    return del(['dist/**/*']);
});

gulp.task('ts-scripts', function() {
    var files = [
        'ts/build/_helpers.js',
        'ts/build/c_base.js',
        'ts/build/core.js',
        'ts/build/t_test.js',
    ];
    return gulp.src(files)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compress-js', function() {
    return gulp.src(['./dist/js/*.js'])
        .pipe(unglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', [
    'ts-scripts',
]);

gulp.task('default', []);