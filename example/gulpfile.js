const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssSpacing = require('../');

gulp.task('css', () => {
    return gulp.src('./src/**/*.css')
        .pipe(postcss([
            postcssSpacing()
        ]))
        .on('error', console.error)
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['css'], () => {
    gulp.watch(['./src/**/*.css'], ['css']).on('error', handleError);
});

gulp.task('build', ['css'], () => {});
