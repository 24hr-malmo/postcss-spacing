# PostCSS Spacing

PostCSS plugin to easier control all padding and margin in your project. The original idea of having a global padding and margin setup was created by [Jens Nilsson](https://github.com/jensjns) when he created it as classes in [stylus](https://learnboost.github.io/stylus/). 

This plugin uses the same idea but implements it as custom CSS properties. You basically have a shorted version of all paddings and margins and define what each size will correspond to. 

Its much easier to understand in code:

First we define what each margin and padding step will correspond to:

    @spacing 1rem, 2rem, 4rem, 8rem;

Then we can use it in our css:

    #main {
        pa: 1;
        mt: 3;
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
        pa: 1;
        mt: 3;
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

## Properties

The css properties are:

    pa = padding
    pt = padding-top
    pb = padding-bottom
    pl = padding-left
    pr = padding-right

    ma = margin
    mt = margin-top
    mb = margin-bottom
    ml = margin-left
    mr = margin-right

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



