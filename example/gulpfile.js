const gulp = require('gulp');
const postcss = require('gulp-postcss');
const postcssSpacing = require('../');

function handleError (err) {
    console.log('ERROR');
    console.log(err.fileName ? err.fileName : '');
    console.log(err.stack);


    // emit end to allow the stream to recover
    this.emit('end');
}

gulp.task('css', () => {
    return gulp.src('./src/**/*.css')
        .pipe(postcss([
            postcssSpacing()
        ]))
        .on('error', handleError)
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['css'], () => {
    gulp.watch(['./src/**/*.css'], ['css']).on('error', handleError);
});

gulp.task('build', ['css'], () => {});
