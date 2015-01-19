/* jshint node:true */
'use strict';
var	APP = 'app',
	TMP = '.tmp',
	TMPAPP = TMP + '/' + APP,
	TMPGIT = TMP + '/git',
	DIST = 'dist',
	BOWER = 'bower_components';

var	gulp = require('gulp'),
	del = require('del'),
	optipng = require('imagemin-optipng'),
	sass = require('gulp-ruby-sass'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	htmlclean = require('gulp-htmlclean'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	size = require('gulp-size'),
	deploy = require('gulp-gh-pages'),
	manifest = require("gulp-manifest");

////////////////////////////////////////////////////////////////////////////////
gulp.task('build', ['content', 'images', 'styles'],
function () {});

////////////////////////////////////////////////////////////////////////////////
gulp.task('clean',
function () {
	del(TMP);
	del(DIST);
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('content', ['content_html'],
function () {
	return gulp.src([
		APP + '/**/*.xml',
		APP + '/**/*.txt',
		APP + '/CNAME',
		APP + '/.gitignore'
	])
	.pipe(gulp.dest(TMPAPP))
	.pipe(livereload());
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('content_html',
function () {
	return gulp.src([APP + '/**/*.html'])
	.pipe(htmlclean())
	.pipe(gulp.dest(TMPAPP))
	.pipe(livereload());
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('images', ['images_favicon', 'images_png'],
function () {});

////////////////////////////////////////////////////////////////////////////////
gulp.task('images_favicon',
function () {
	return gulp.src(APP + '/favicon.ico')
	.pipe(gulp.dest(TMPAPP))
	.pipe(livereload());
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('images_png',
function () {
	return gulp.src(APP + '/**/*.png')
	.pipe(optipng({ optimizationLevel: 3 })())
	.pipe(gulp.dest(TMPAPP))
	.pipe(livereload());
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('manifest', ['build', 'clean'],
function () {
	return gulp.src(TMPAPP + '/**/*')
    .pipe(manifest({
    	exclude: [
    		'app.manifest',
    		'sitemap.xml',
    		'robots.txt',
    		'humans.txt',
    		'CNAME'
    	],
    	timestamp: true
    }))
    .pipe(gulp.dest(TMPAPP));
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('styles', ['styles_sass'],
function () {
	return gulp.src([BOWER + '/normalize.css/normalize.css', TMP + '/main.css'])
	.pipe(concat('styles/main.css'))
	.pipe(autoprefixer({
		browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
		cascade: true,
		remove: true
	}))
	.pipe(csso())
	.pipe(gulp.dest(TMPAPP))
	.pipe(livereload());
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('styles_sass',
function () {
	return gulp.src(APP + '/styles/main.scss')
	.pipe(sass({ sourcemap: false, quiet: true, precision: 4 }))
	.pipe(gulp.dest(TMP))
	.pipe(livereload());
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', ['build'],
function () {
	livereload.listen();
	gulp.watch([APP + '/**/*.html', APP + '/**/*.xml', APP + '/**/*.txt'], ['content']);
	gulp.watch([APP + '/**/*.js', APP + '/**/*.coffee'], ['scripts']);
	gulp.watch([APP + '/**/*.css', APP + '/**/*.scss'], ['styles']);
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('webserver', ['watch'],
function() {
	connect.server({
		root: TMPAPP,
		livereload: true,
		port: 9000,
		host: 'localhost',
		"livereload.port": 35729
	});
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////// Real gulp tasks /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
gulp.task('serve', ['webserver'],
function () {});

////////////////////////////////////////////////////////////////////////////////
gulp.task('dist', ['clean', 'build', 'manifest'],
function () {
	return gulp.src(TMPAPP + '/**/*')
	.pipe(size({ title: 'App', gzip: false }))
	.pipe(size({ title: 'App', gzip: true }))
	.pipe(gulp.dest(DIST));
});

////////////////////////////////////////////////////////////////////////////////
gulp.task('publish', ['dist'],
function () {
	return gulp.src(DIST + '/**/*').pipe(deploy({
		origin: 'origin',
		branch: 'master',
		cacheDir: TMPGIT,
		push: true
	}));
});
