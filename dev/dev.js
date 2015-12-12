var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
var css = fs.readFileSync(path.join(__dirname, '../example/src/style.css'), 'utf8');
var parsedCss = postcss([ require('../') ]).process(css).css;
console.log('result', new Date());
console.log('-----------------\n');
console.log(parsedCss);
