const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
const concat = require('gulp-concat');
const less = require('gulp-less');
const gulp = require('gulp');
 
function defaultTask(c) {
    return gulp.src('./less/solfeggio.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(concat("common.css"))
        .pipe(gulp.dest('../assets/css/'));
}
  
exports.default = defaultTask;
