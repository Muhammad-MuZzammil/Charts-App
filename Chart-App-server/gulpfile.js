var gulp = require('gulp');
var nodemon = require('gulp-nodemon')

// nodemon task
gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: '9000'
        },
        Ignore:'./node_modules/**'
    })
    .on('restart', function(){
        console.log('Auto Restarting Server ...')
    });
});