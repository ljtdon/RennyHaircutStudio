var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),	
	uglify = require('gulp-uglify'),	
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create();


// styles
gulp.task('styles', function() {
   return gulp.src('sass/**/*.scss')	
	.pipe(sass({ outputStyle: 'expanded' }))
	.on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
	.pipe(autoprefixer())
	.pipe(gulp.dest('css'))
	.pipe(browserSync.stream());	
	//.pipe(notify({ message: 'Styles task complete' }));	
});




gulp.task('watch', function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./"
    }
  });

  watch('./*.html', function() {
    browserSync.reload();   
  });

  watch('./sass/**/*.scss', function() {	//?ovo umjesto ['styles']
  	gulp.start('styles');  	  	
  });
  
   watch('./assets/**/*.js', function() {
  	gulp.start('script');  	  	
  });
 
});

gulp.task('script', function(){
	return gulp.src('assets/js/*.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('js'))
	.pipe(browserSync.stream());
	//.pipe(notify({ message: 'js change complete' }));
});



