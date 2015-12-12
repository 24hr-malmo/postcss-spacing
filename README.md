# PostCSS Spacing

[PostCSS](https://github.com/postcss/postcss) plugin for simpler control of all paddings and margins in your project. The original idea of having a global padding and margin setup was created by [Jens Nilsson](https://github.com/jensjns) when he created it as classes in [stylus](https://learnboost.github.io/stylus/). 

This plugin uses the same idea but implements it as custom CSS values. You basically just use a new unit (size) which will be replaced by the sized defined in a settings statment.

It's much easier to understand in code:

First we define what each margin and padding step will correspond to:

    @spacing 1rem, 2rem, 4rem, 8rem;

Then we can use it in our css:

    #main {
        padding: s1;
        margin-top: s3;
    }

Which will create the following CSS:

    #main {
        padding: 1rem;
        margin-top: 4rem;
    }

The power of having defined steps is that you have one place where you set all spacings, which makes it quite easy to change if the design changes.

The other benefit is that media queries can be used to change all paddings and margins easily as well:

    @spacing 1rem, 2rem, 4rem, 8rem;

    #main {
        padding: s1;
        margin-top: s3;
    }

    @media (min-width: 100px) {
        @spacing 20px, 40px, 80px, 160px;
    }


Which will create the following CSS:

    #main {
        padding: 1rem;
        margin-top: 4rem;
    }

    @media (min-width: 100px) {
        #main {
            padding: 20px;
            margin-top: 80px;
        }
    }

## How to use it

### Gulp

    const gulp = require('gulp');
    const postcss = require('gulp-postcss');
    const postcssSpacing = require('postcss-spacing');

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



