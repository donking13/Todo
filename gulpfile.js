var gulp 			= require('gulp'),
	concat 			= require('gulp-concat'),
	minifyCss 		= require('gulp-minify-css'),
	sass 			= require('gulp-sass'),
	watch 			= require('gulp-watch'),
	plumber 		= require('gulp-plumber'),
	uglify 			= require('gulp-uglify'),
	autoprefixer 	= require('gulp-autoprefixer'),
	sourcemaps 		= require('gulp-sourcemaps'),
	imagemin 		= require('gulp-imagemin'),
	pngquant 		= require('imagemin-pngquant'),
	notify 			= require('gulp-notify');


var desc_js = 'public/js',
	desc_css = 'public/css',
	desc_html = 'public',
	src_js = 'app/scripts/**/*.js',
	src_html = 'app/**/*.html',
	src_sass = 'app/sass/**/*.scss';
/*error handler*/

var onError = function(err){
	console.log(err);
	this.emit('end');
}
/*SCSS to CSS*/

gulp.task('sass',function(){
	return gulp.src(src_sass)
		.pipe(plumber({
			errorHandler:onError
		}))
		.pipe(sass())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest(desc_css))
		.pipe(minifyCss())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(desc_css));
});

/*html*/
gulp.task('html',function(){
	return gulp.src(src_html)
		.pipe(gulp.dest(desc_html));

});

/*---------------------------------------------------*/

/*compile JS*/

gulp.task('js',function(){
	gulp.src(src_js)
	.pipe(plumber())
	//.pipe(uglify())
	.pipe(concat('app.min.js'))
	.pipe(gulp.dest(desc_js));
});


/*---------------------------------------------------*/

/*watch changes*/

gulp.task('watch',function(){
	gulp.watch(src_sass,['sass']);
	gulp.watch(src_js,['js']);
	gulp.watch(src_html,['html']);
});